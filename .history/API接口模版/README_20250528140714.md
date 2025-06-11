# API接口模版文件夹

## 📁 文件夹说明

本文件夹包含约旅平台的完整API接口技术文档和测试工具，为前后端开发人员提供标准化的接口对接规范。

## 📋 文件清单

| 文件名 | 文件类型 | 作用说明 |
|--------|----------|----------|
| `约旅平台API接口文档.md` | 技术文档 | **完整的API接口技术文档**，包含所有接口定义、参数说明、响应格式 |
| `约旅平台API-Postman集合.json` | Postman集合 | **API测试集合文件**，可直接导入Postman进行接口测试 |
| `README.md` | 说明文档 | 本文件夹的使用说明和文档索引 |

## 🎯 文档特色

### ✅ 约旅平台API接口文档
- **完整性**：涵盖用户管理、网红管理、旅行服务、订单管理、支付、评价等所有核心功能
- **标准化**：统一的请求响应格式、错误码规范、分页格式
- **实用性**：包含JavaScript和微信小程序的完整调用示例
- **专业性**：JWT认证、RESTful设计、详细的参数说明

### 🔧 Postman测试集合
- **自动化**：包含自动Token管理、变量设置、测试脚本
- **完整性**：覆盖所有主要接口的测试用例
- **便捷性**：一键导入即可开始接口测试
- **智能化**：自动提取响应数据设置变量，支持接口间数据传递

## 📖 接口文档结构

### 1. 核心模块
```
├── 认证机制 (JWT Token)
├── 用户管理 (注册、登录、信息管理)
├── 网红管理 (列表、详情、服务项目)
├── 旅行服务 (预订、取消、改期)
├── 订单管理 (状态跟踪、时间线)
├── 支付接口 (微信支付、支付宝)
├── 评价系统 (提交评价、评价列表)
├── 消息通知 (推送、已读标记)
├── 数据统计 (用户数据、业务统计)
└── 文件上传 (头像、图片)
```

### 2. 技术规范
- **基础URL**: `https://api.yuelu.com`
- **认证方式**: Bearer Token (JWT)
- **数据格式**: JSON
- **请求方式**: GET、POST、PUT、DELETE
- **字符编码**: UTF-8

### 3. 响应格式
```javascript
// 统一响应格式
{
  "code": 200,           // 业务状态码
  "message": "操作成功",  // 响应消息
  "data": {},           // 具体数据
  "timestamp": 1640995200000  // 时间戳
}
```

## 🚀 快速开始

### 第一步：阅读API文档
1. 打开 `约旅平台API接口文档.md`
2. 了解接口概述和认证机制
3. 查看具体业务接口定义

### 第二步：导入Postman集合
1. 打开Postman应用
2. 点击 `Import` 按钮
3. 选择 `约旅平台API-Postman集合.json` 文件
4. 导入成功后即可看到完整的接口集合

### 第三步：配置环境变量
```javascript
// 在Postman中设置环境变量
base_url: "https://dev-api.yuelu.com"  // 开发环境
// 或
base_url: "https://api.yuelu.com"      // 生产环境
```

### 第四步：开始测试
1. 首先执行 "用户登录" 接口获取Token
2. Token会自动保存到集合变量中
3. 其他接口会自动使用Token进行认证
4. 按照业务流程依次测试各个接口

## 💻 前端集成示例

### JavaScript/Vue.js 集成
```javascript
// 安装axios
npm install axios

// API封装示例
import axios from 'axios';

class YueluAPI {
  constructor() {
    this.baseURL = 'https://api.yuelu.com';
    this.token = localStorage.getItem('access_token');
    
    // 创建axios实例
    this.http = axios.create({
      baseURL: this.baseURL,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // 请求拦截器
    this.http.interceptors.request.use(config => {
      if (this.token) {
        config.headers.Authorization = `Bearer ${this.token}`;
      }
      return config;
    });
    
    // 响应拦截器
    this.http.interceptors.response.use(
      response => {
        if (response.data.code === 200) {
          return response.data.data;
        } else {
          throw new Error(response.data.message);
        }
      },
      error => {
        console.error('API请求失败:', error);
        throw error;
      }
    );
  }
  
  // 用户登录
  async login(phone, password) {
    const data = await this.http.post('/api/v1/auth/login', {
      phone, password, type: 'user'
    });
    this.token = data.access_token;
    localStorage.setItem('access_token', this.token);
    return data;
  }
  
  // 获取网红列表
  async getCelebrities(params = {}) {
    return this.http.get('/api/v1/celebrities', { params });
  }
}

// 使用示例
const api = new YueluAPI();
const celebrities = await api.getCelebrities({ city: '北京市' });
```

### 微信小程序集成
```javascript
// 小程序API封装
class WxYueluAPI {
  constructor() {
    this.baseURL = 'https://api.yuelu.com';
    this.token = wx.getStorageSync('access_token');
  }
  
  request(options) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: `${this.baseURL}${options.url}`,
        method: options.method || 'GET',
        data: options.data || {},
        header: {
          'Content-Type': 'application/json',
          'Authorization': this.token ? `Bearer ${this.token}` : ''
        },
        success: (res) => {
          if (res.data.code === 200) {
            resolve(res.data.data);
          } else {
            wx.showToast({ title: res.data.message, icon: 'none' });
            reject(new Error(res.data.message));
          }
        },
        fail: reject
      });
    });
  }
  
  // 微信登录
  async wxLogin() {
    const { code } = await new Promise((resolve, reject) => {
      wx.login({ success: resolve, fail: reject });
    });
    
    const data = await this.request({
      url: '/api/v1/auth/wx-login',
      method: 'POST',
      data: { code }
    });
    
    this.token = data.access_token;
    wx.setStorageSync('access_token', this.token);
    return data;
  }
}
```

## 🔧 后端实现参考

### Node.js/Express 示例
```javascript
// 用户登录接口实现
app.post('/api/v1/auth/login', async (req, res) => {
  try {
    const { phone, password, type } = req.body;
    
    // 验证用户
    const user = await User.findOne({ phone, type });
    if (!user || !user.validatePassword(password)) {
      return res.json({
        code: 1003,
        message: '手机号或密码错误'
      });
    }
    
    // 生成Token
    const access_token = jwt.sign(
      { user_id: user.id, type: user.type },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );
    
    res.json({
      code: 200,
      message: '登录成功',
      data: {
        access_token,
        user_info: {
          id: user.id,
          phone: user.phone,
          nickname: user.nickname,
          avatar: user.avatar,
          type: user.type
        }
      }
    });
  } catch (error) {
    res.json({
      code: 500,
      message: '服务器内部错误'
    });
  }
});
```

## 📝 开发规范

### 接口设计原则
1. **RESTful设计**：使用标准的HTTP方法和状态码
2. **统一响应格式**：所有接口返回统一的JSON格式
3. **错误处理**：明确的错误码和错误信息
4. **安全认证**：JWT Token认证机制
5. **参数验证**：严格的参数校验和类型检查

### 命名规范
- **接口路径**：使用小写字母和连字符，如 `/api/v1/celebrities`
- **参数名称**：使用下划线命名，如 `celebrity_id`
- **响应字段**：保持一致的命名风格
- **错误码**：使用有意义的数字编码

### 版本管理
- **API版本**：在URL中包含版本号 `/api/v1/`
- **向后兼容**：新版本保持对旧版本的兼容
- **废弃通知**：提前通知接口废弃计划

## 🔍 测试指南

### Postman测试流程
1. **环境配置**：设置正确的base_url
2. **认证测试**：先测试登录接口获取Token
3. **功能测试**：按业务流程测试各个接口
4. **边界测试**：测试参数边界值和异常情况
5. **性能测试**：检查接口响应时间

### 自动化测试
```javascript
// Postman测试脚本示例
pm.test("响应状态码为200", function () {
    pm.response.to.have.status(200);
});

pm.test("响应时间小于2000ms", function () {
    pm.expect(pm.response.responseTime).to.be.below(2000);
});

pm.test("返回数据格式正确", function () {
    const response = pm.response.json();
    pm.expect(response).to.have.property('code');
    pm.expect(response).to.have.property('message');
    pm.expect(response).to.have.property('data');
});
```

## 📞 技术支持

### 联系方式
- **技术支持邮箱**: tech@yuelu.com
- **开发者QQ群**: 123456789
- **技术文档**: https://docs.yuelu.com
- **GitHub仓库**: https://github.com/yuelu/api-docs

### 常见问题
1. **Token过期怎么办？**
   - 使用refresh_token刷新访问令牌
   - 或重新登录获取新的Token

2. **接口返回401错误？**
   - 检查Token是否正确设置
   - 确认Token是否已过期

3. **如何处理分页数据？**
   - 使用page和page_size参数
   - 检查响应中的pagination信息

4. **文件上传失败？**
   - 确认Content-Type为multipart/form-data
   - 检查文件大小和格式限制

## 📅 更新记录

| 版本 | 日期 | 更新内容 |
|------|------|----------|
| v1.0 | 2024-01-01 | 初始版本，包含核心API接口文档和Postman集合 |

---

**重要提醒**：
1. 请在开发环境中充分测试后再部署到生产环境
2. 注意保护API密钥和Token，避免泄露
3. 建议实现接口调用频率限制和安全防护
4. 定期更新API文档，保持与实际接口的一致性 