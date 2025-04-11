const fs = require('fs');
const path = require('path');
const markdownit = require('markdown-it');

// 检查命令行参数
if (process.argv.length < 3) {
  console.log('使用方法: node md2html.js <markdown文件路径>');
  process.exit(1);
}

// 获取Markdown文件路径
const mdFilePath = process.argv[2];
const htmlFilePath = mdFilePath.replace('.md', '.html');

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

// 将Markdown转换为HTML
const htmlContent = md.render(mdContent);

// 创建完整的HTML文档
const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>约旅平台项目资助申请文档</title>
  <style>
    body {
      font-family: 'Microsoft YaHei', 'SimSun', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 210mm; /* A4 width */
      margin: 0 auto;
      padding: 20px;
    }
    h1, h2, h3, h4, h5, h6 {
      font-weight: bold;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }
    h1 { font-size: 24pt; }
    h2 { font-size: 18pt; }
    h3 { font-size: 14pt; }
    h4 { font-size: 12pt; }
    p, ul, ol {
      margin-bottom: 1em;
    }
    table {
      border-collapse: collapse;
      width: 100%;
      margin-bottom: 1em;
    }
    th, td {
      border: 1px solid #ddd;
      padding: 8px;
      text-align: left;
    }
    th {
      background-color: #f2f2f2;
    }
    code {
      font-family: Consolas, Monaco, 'Courier New', monospace;
      background-color: #f5f5f5;
      padding: 2px 4px;
      border-radius: 3px;
    }
    pre {
      background-color: #f5f5f5;
      padding: 10px;
      border-radius: 5px;
      overflow-x: auto;
    }
    .instructions {
      background-color: #f8f9fa;
      border: 1px solid #ddd;
      padding: 15px;
      margin-bottom: 20px;
      border-radius: 5px;
    }
  </style>
</head>
<body>
  <div class="instructions">
    <h3>使用说明</h3>
    <p>请按照以下步骤将此HTML文件保存为Word文档：</p>
    <ol>
      <li>在浏览器中打开此HTML文件</li>
      <li>按下<strong>Ctrl+A</strong>（或Mac上的<strong>Command+A</strong>）全选内容</li>
      <li>按下<strong>Ctrl+C</strong>（或Mac上的<strong>Command+C</strong>）复制内容</li>
      <li>打开Microsoft Word</li>
      <li>按下<strong>Ctrl+V</strong>（或Mac上的<strong>Command+V</strong>）粘贴内容</li>
      <li>保存Word文档</li>
    </ol>
    <p>或者，您可以直接在浏览器中选择<strong>文件 > 打印</strong>，然后选择<strong>另存为PDF</strong>，之后可以使用Word打开PDF文件。</p>
  </div>
  ${htmlContent}
</body>
</html>
`;

// 保存HTML文件
try {
  fs.writeFileSync(htmlFilePath, fullHtml);
  console.log(`成功将 ${mdFilePath} 转换为 ${htmlFilePath}`);
  console.log('请在浏览器中打开HTML文件，然后按照说明将其保存为Word文档。');
} catch (err) {
  console.error(`无法写入文件 ${htmlFilePath}: ${err.message}`);
  process.exit(1);
}