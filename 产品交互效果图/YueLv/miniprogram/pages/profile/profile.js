// profile.js

const defaultAvatarUrl = '/static/images/default-avatar.png';

Page({
  data: {
    userInfo: {
      nickName: '',
      avatarUrl: defaultAvatarUrl
    },
    userId: '10086781',
    orderCounts: {
      unpaid: 2,
      untravel: 1,
      refund: 0
    },
    myTrips: [
      {
        id: '1',
        title: '香港迪士尼一日游',
        time: '2023-10-15 08:30',
        image: '/images/trips/disney-trip.jpg',
        status: 'upcoming',
        statusText: '即将出行'
      },
      {
        id: '2',
        title: '香港海洋公园全天游',
        time: '2023-09-20 09:00',
        image: '/images/trips/ocean-park-trip.jpg',
        status: 'completed',
        statusText: '已完成'
      }
    ],
    hasUserInfo: false
  },
  
  onLoad() {
    // 检查是否已登录
    const userInfo = wx.getStorageSync('userInfo');
    if (userInfo) {
      this.setData({
        userInfo,
        hasUserInfo: true
      });
    }
  },
  
  // 跳转到登录页
  goToLogin() {
    wx.navigateTo({
      url: '/pages/login/login'
    });
  },
  
  // 查看全部订单
  viewAllOrders() {
    wx.navigateTo({
      url: '/pages/orders/orders'
    });
  },
  
  // 根据状态查看订单
  viewOrders(e) {
    const status = e.currentTarget.dataset.status;
    wx.navigateTo({
      url: `/pages/orders/orders?status=${status}`
    });
  },
  
  // 查看我的行程
  viewMyTrips() {
    wx.navigateTo({
      url: '/pages/my-trips/my-trips'
    });
  },
  
  // 查看行程详情
  viewTripDetail(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/trip-detail/trip-detail?id=${id}`
    });
  },
  
  // 去发现行程
  goToExplore() {
    wx.switchTab({
      url: '/pages/trips/trips'
    });
  },
  
  // 跳转到指定页面
  navigateTo(e) {
    const url = e.currentTarget.dataset.url;
    wx.navigateTo({
      url
    });
  },
  
  // 联系客服
  contactService() {
    wx.showModal({
      title: '联系客服',
      content: '客服热线：400-123-4567\n服务时间：09:00-21:00',
      confirmText: '拨打电话',
      success(res) {
        if (res.confirm) {
          wx.makePhoneCall({
            phoneNumber: '4001234567'
          });
        }
      }
    });
  }
}); 