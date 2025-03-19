// app.js

App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        console.log('登录成功', res)
      }
    })
    
    // 初始化社区相关帖子推荐功能
    this.initCommunityRecommendation();
  },
  
  // 初始化社区相关帖子推荐
  initCommunityRecommendation() {
    try {
      // 使用console.log记录日志
      console.log('[社区功能]', '初始化社区相关帖子推荐功能');
      
      // TODO: 这里可以添加实际的社区帖子推荐逻辑
      console.log('社区相关帖子推荐功能初始化完成');
    } catch (error) {
      console.error('初始化社区相关帖子推荐失败', error);
    }
  },
  
  globalData: {
    userInfo: null
  }
}) 