const fs = require('fs');
const path = require('path');
const officegen = require('officegen');
const markdownit = require('markdown-it');

// 检查命令行参数
if (process.argv.length < 3) {
  console.log('使用方法: node md2docx.js <markdown文件路径>');
  process.exit(1);
}

// 获取Markdown文件路径
const mdFilePath = process.argv[2];
const docxFilePath = mdFilePath.replace('.md', '.docx');

// 读取Markdown文件内容
let mdContent;
try {
  mdContent = fs.readFileSync(mdFilePath, 'utf8');
} catch (err) {
  console.error(`无法读取文件 ${mdFilePath}: ${err.message}`);
  process.exit(1);
}

// 初始化Markdown解析器
const md = new markdownit({
  html: true,
  breaks: true,
  linkify: true,
  typographer: true
});

// 创建Word文档
const docx = officegen('docx');

// 设置文档属性
docx.on('error', function(err) {
  console.error(`生成Word文档时出错: ${err}`);
});

// 解析Markdown内容
const lines = mdContent.split('\n');
let inCodeBlock = false;
let codeContent = '';
let inTable = false;
let tableRows = [];
let currentRow = [];

for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  
  // 处理代码块
  if (line.startsWith('```')) {
    if (inCodeBlock) {
      // 结束代码块
      const pObj = docx.createP();
      pObj.addText(codeContent, { font_face: 'Courier New' });
      codeContent = '';
      inCodeBlock = false;
    } else {
      // 开始代码块
      inCodeBlock = true;
    }
    continue;
  }
  
  if (inCodeBlock) {
    codeContent += line + '\n';
    continue;
  }
  
  // 处理表格
  if (line.includes('|')) {
    // 可能是表格行
    const cells = line.split('|').map(cell => cell.trim()).filter(cell => cell);
    
    if (cells.length > 0) {
      if (!inTable) {
        inTable = true;
        tableRows = [];
      }
      
      // 忽略分隔行 (---|---|---)
      if (!cells.every(cell => cell.match(/^-+$/))) {
        tableRows.push(cells);
      }
      continue;
    }
  } else if (inTable) {
    // 表格结束
    if (tableRows.length > 0) {
      try {
        const table = docx.createTable({
          rows: tableRows.length,
          cols: Math.max(...tableRows.map(row => row.length))
        });
        
        for (let r = 0; r < tableRows.length; r++) {
          for (let c = 0; c < tableRows[r].length; c++) {
            try {
              table.getRow(r).getCell(c).addText(tableRows[r][c]);
            } catch (e) {
              console.log(`表格处理错误: ${e.message}`);
            }
          }
        }
      } catch (e) {
        console.log(`创建表格错误: ${e.message}`);
        // 如果表格创建失败，将表格内容作为文本添加
        const pObj = docx.createP();
        pObj.addText('表格内容:');
        
        for (const row of tableRows) {
          const pRow = docx.createP();
          pRow.addText(row.join(' | '));
        }
      }
    }
    
    inTable = false;
    tableRows = [];
  }
  
  // 处理标题
  if (line.startsWith('#')) {
    const level = line.match(/^#+/)[0].length;
    const text = line.replace(/^#+\s+/, '');
    
    const pObj = docx.createP();
    pObj.addText(text, { bold: true, font_size: 16 - level });
    continue;
  }
  
  // 处理列表项
  if (line.match(/^\s*[\*\-\+]\s+/)) {
    const text = line.replace(/^\s*[\*\-\+]\s+/, '');
    const pObj = docx.createP();
    pObj.addText('• ' + text);
    continue;
  }
  
  // 处理有序列表
  if (line.match(/^\s*\d+\.\s+/)) {
    const text = line.replace(/^\s*\d+\.\s+/, '');
    const pObj = docx.createP();
    pObj.addText(text);
    continue;
  }
  
  // 处理普通段落
  if (line.trim() !== '') {
    const pObj = docx.createP();
    pObj.addText(line);
  }
}

// 保存Word文档
const out = fs.createWriteStream(docxFilePath);
out.on('error', function(err) {
  console.error(`无法写入文件 ${docxFilePath}: ${err.message}`);
});

// 完成Word文档生成
out.on('close', function() {
  console.log(`成功将 ${mdFilePath} 转换为 ${docxFilePath}`);
});

docx.generate(out);