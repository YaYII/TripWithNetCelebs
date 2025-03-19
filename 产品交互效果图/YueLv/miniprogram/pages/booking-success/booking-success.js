// booking-success.js

Page({
  data: {
    orderId: '',
    amount: 0,
    orderTime: ''
  },

  onLoad(options) {
    const { orderId, amount } = options;
    
    // 格式化当前时间为订单时间
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hour = now.getHours().toString().padStart(2, '0');
    const minute = now.getMinutes().toString().padStart(2, '0');
    const second = now.getSeconds().toString().padStart(2, '0');
    
    this.setData({
      orderId: orderId || 'ORD' + Date.now(),
      amount: amount || 0,
      orderTime: `${year}-${month}-${day} ${hour}:${minute}:${second}`
    });
  },

  // 查看订单
  viewOrder() {
    wx.navigateTo({
      url: '/pages/orders/orders'
    });
  },

  // 返回首页
  backToHome() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
}); 