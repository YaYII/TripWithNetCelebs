Page({
  data: {
    currentTab: 0,
    tabs: ['全部', '待付款', '待出行', '已完成', '退款/售后'],
    orders: [],
    loading: true,
    loadingMore: false,
    hasMore: true,
    isEmpty: false,
    pageNum: 1,
    pageSize: 10
  },

  onLoad: function (options) {
    // 如果从其他页面传入了tab索引，则切换到对应标签
    if (options.tab) {
      this.setData({
        currentTab: parseInt(options.tab)
      });
    }
    
    // 加载订单数据
    this.loadOrderData();
  },

  onPullDownRefresh: function () {
    // 重置页码，重新加载数据
    this.setData({
      pageNum: 1,
      orders: [],
      hasMore: true,
      isEmpty: false
    });
    this.loadOrderData();
  },

  onReachBottom: function () {
    // 上拉加载更多
    if (this.data.hasMore && !this.data.loadingMore) {
      this.loadMoreOrders();
    }
  },

  // 切换标签
  switchTab: function (e) {
    const index = e.currentTarget.dataset.index;
    if (index !== this.data.currentTab) {
      this.setData({
        currentTab: index,
        pageNum: 1,
        orders: [],
        loading: true,
        hasMore: true,
        isEmpty: false
      });
      this.loadOrderData();
    }
  },

  // 加载订单数据
  loadOrderData: function () {
    const that = this;
    
    // 模拟网络请求
    setTimeout(() => {
      const mockOrders = that.getMockOrders(that.data.currentTab);
      
      that.setData({
        orders: mockOrders,
        loading: false,
        isEmpty: mockOrders.length === 0
      });
      
      wx.stopPullDownRefresh();
    }, 1000);
  },

  // 加载更多订单
  loadMoreOrders: function () {
    if (!this.data.hasMore) return;
    
    const that = this;
    that.setData({
      loadingMore: true
    });
    
    // 模拟网络请求
    setTimeout(() => {
      const pageNum = that.data.pageNum + 1;
      const mockOrders = that.getMockOrders(that.data.currentTab, pageNum);
      
      // 如果没有更多数据
      if (mockOrders.length === 0) {
        that.setData({
          hasMore: false,
          loadingMore: false
        });
        return;
      }
      
      that.setData({
        orders: [...that.data.orders, ...mockOrders],
        pageNum: pageNum,
        loadingMore: false
      });
    }, 1000);
  },

  // 获取模拟订单数据
  getMockOrders: function (tabIndex, pageNum = 1) {
    // 第二页之后不返回数据，模拟没有更多数据
    if (pageNum > 1) return [];
    
    // 不同标签页显示不同状态的订单
    let status = '';
    switch (tabIndex) {
      case 1: status = 'unpaid'; break;
      case 2: status = 'untravel'; break;
      case 3: status = 'completed'; break;
      case 4: status = 'refund'; break;
      default: status = ''; break;
    }
    
    // 模拟订单数据
    const mockOrders = [
      {
        id: 'OD202307150001',
        status: 'unpaid',
        statusText: '待付款',
        tripTitle: '巴厘岛6日5晚网红打卡之旅',
        tripImage: '/static/images/trip1.jpg',
        departureDate: '2023-08-15',
        quantity: 2,
        totalPrice: 12800,
        createTime: '2023-07-15 10:30:25',
        expireTime: '2023-07-15 22:30:25'
      },
      {
        id: 'OD202307120002',
        status: 'untravel',
        statusText: '待出行',
        tripTitle: '日本东京5日4晚深度游',
        tripImage: '/static/images/trip2.jpg',
        departureDate: '2023-09-01',
        quantity: 1,
        totalPrice: 7500,
        createTime: '2023-07-12 15:48:33'
      },
      {
        id: 'OD202306280003',
        status: 'completed',
        statusText: '已完成',
        tripTitle: '泰国清迈文化体验4日游',
        tripImage: '/static/images/trip3.jpg',
        departureDate: '2023-07-05',
        quantity: 2,
        totalPrice: 9600,
        createTime: '2023-06-28 09:15:07'
      },
      {
        id: 'OD202306150004',
        status: 'refund',
        statusText: '退款成功',
        tripTitle: '新西兰南岛自然风光7日游',
        tripImage: '/static/images/trip4.jpg',
        departureDate: '2023-08-20',
        quantity: 1,
        totalPrice: 15800,
        createTime: '2023-06-15 14:22:51',
        refundTime: '2023-06-18 11:05:33'
      }
    ];
    
    // 根据标签筛选订单
    if (status) {
      return mockOrders.filter(order => order.status === status);
    }
    
    return mockOrders;
  },

  // 去支付
  goPay: function (e) {
    const orderId = e.currentTarget.dataset.id;
    wx.showToast({
      title: '模拟支付流程',
      icon: 'none'
    });
    
    // 演示用途，模拟支付成功后刷新页面
    setTimeout(() => {
      this.loadOrderData();
    }, 1500);
  },

  // 取消订单
  cancelOrder: function (e) {
    const that = this;
    const orderId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '提示',
      content: '确定要取消此订单吗？',
      success (res) {
        if (res.confirm) {
          wx.showLoading({
            title: '处理中',
          });
          
          // 模拟取消订单
          setTimeout(() => {
            wx.hideLoading();
            wx.showToast({
              title: '订单已取消',
              icon: 'success'
            });
            
            // 刷新订单列表
            that.loadOrderData();
          }, 1000);
        }
      }
    });
  },

  // 查看行程详情
  viewTrip: function (e) {
    wx.navigateTo({
      url: '/pages/trip-detail/trip-detail?id=1'
    });
  },

  // 申请退款
  applyRefund: function (e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/refund/refund?id=${orderId}`
    });
  },

  // 查看订单详情
  viewOrderDetail: function (e) {
    const orderId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/order-detail/order-detail?id=${orderId}`
    });
  },

  // 去探索
  goExplore: function () {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
}) 