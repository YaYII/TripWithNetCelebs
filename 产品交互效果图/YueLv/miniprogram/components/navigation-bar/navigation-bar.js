// navigation-bar.js
Component({
  properties: {
    title: {
      type: String,
      value: '约旅'
    },
    back: {
      type: Boolean,
      value: true
    },
    color: {
      type: String,
      value: 'black'
    },
    background: {
      type: String,
      value: 'white'
    }
  },

  data: {
    statusBarHeight: 20,
    navBarHeight: 44
  },

  lifetimes: {
    attached() {
      // 获取状态栏高度
      const systemInfo = wx.getSystemInfoSync();
      let statusBarHeight = systemInfo.statusBarHeight;
      
      // 获取胶囊按钮的位置信息
      let menuButtonInfo = wx.getMenuButtonBoundingClientRect();
      let navBarHeight = (menuButtonInfo.top - statusBarHeight) * 2 + menuButtonInfo.height;
      
      this.setData({
        statusBarHeight,
        navBarHeight
      });
    }
  },

  methods: {
    // 返回上一页
    goBack() {
      wx.navigateBack({
        delta: 1
      });
    },
    
    // 返回首页
    goHome() {
      wx.switchTab({
        url: '/pages/index/index'
      });
    }
  }
}); 