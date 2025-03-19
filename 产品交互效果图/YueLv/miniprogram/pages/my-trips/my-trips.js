Page({
  data: {
    activeTab: 'upcoming', // 'upcoming' 或 'past'
    trips: [],
    isLoading: true,
    isRefreshing: false,
    loadingMore: false,
    hasMore: true,
    pageNum: 1,
    pageSize: 10
  },

  onLoad: function (options) {
    // 加载行程数据
    this.loadTripsData();
  },

  onPullDownRefresh: function () {
    // 重置页码，重新加载数据
    this.setData({
      pageNum: 1,
      trips: [],
      hasMore: true,
      isRefreshing: true
    });
    this.loadTripsData();
  },

  onReachBottom: function () {
    // 上拉加载更多
    if (this.data.hasMore && !this.data.loadingMore) {
      this.loadMoreTrips();
    }
  },

  // 切换标签
  switchTab: function (e) {
    const tabType = e.currentTarget.dataset.tab;
    if (tabType === this.data.activeTab) return;
    
    this.setData({
      activeTab: tabType,
      trips: [],
      pageNum: 1,
      hasMore: true,
      isLoading: true
    });
    
    this.loadTripsData();
  },

  // 加载行程数据
  loadTripsData: function () {
    const that = this;
    
    // 显示加载状态
    that.setData({
      isLoading: true
    });
    
    // 模拟网络请求
    setTimeout(() => {
      const mockTrips = that.getMockTrips(that.data.activeTab);
      
      that.setData({
        trips: mockTrips,
        isLoading: false,
        isRefreshing: false
      });
      
      wx.stopPullDownRefresh();
    }, 800);
  },

  // 加载更多行程
  loadMoreTrips: function () {
    if (!this.data.hasMore) return;
    
    const that = this;
    that.setData({
      loadingMore: true
    });
    
    // 模拟网络请求
    setTimeout(() => {
      const pageNum = that.data.pageNum + 1;
      const mockTrips = that.getMockTrips(that.data.activeTab, pageNum);
      
      // 如果没有更多数据
      if (mockTrips.length === 0) {
        that.setData({
          hasMore: false,
          loadingMore: false
        });
        return;
      }
      
      that.setData({
        trips: [...that.data.trips, ...mockTrips],
        pageNum: pageNum,
        loadingMore: false
      });
    }, 800);
  },

  // 获取模拟行程数据
  getMockTrips: function (tabType, pageNum = 1) {
    // 第二页之后不返回数据，模拟没有更多数据
    if (pageNum > 1) return [];
    
    // 模拟即将出行的行程
    if (tabType === 'upcoming') {
      return [
        {
          id: 1,
          title: '日本东京5日4晚深度游',
          departureDate: '2023-12-15',
          returnDate: '2023-12-19',
          statusText: '即将出行',
          statusColor: '#2979ff',
          participants: 3,
          price: 7500,
          image: '/static/images/trip2.jpg'
        },
        {
          id: 2,
          title: '巴厘岛6日5晚网红打卡之旅',
          departureDate: '2024-01-05',
          returnDate: '2024-01-10',
          statusText: '已付款',
          statusColor: '#00c853',
          participants: 2,
          price: 6400,
          image: '/static/images/trip1.jpg'
        }
      ];
    } 
    // 模拟历史行程
    else {
      return [
        {
          id: 3,
          title: '泰国清迈文化体验4日游',
          departureDate: '2023-09-10',
          returnDate: '2023-09-13',
          statusText: '已完成',
          statusColor: '#9e9e9e',
          participants: 4,
          price: 4800,
          image: '/static/images/trip3.jpg'
        },
        {
          id: 4,
          title: '新西兰南岛自然风光7日游',
          departureDate: '2023-07-20',
          returnDate: '2023-07-26',
          statusText: '已完成',
          statusColor: '#9e9e9e',
          participants: 2,
          price: 15800,
          image: '/static/images/trip4.jpg'
        },
        {
          id: 5,
          title: '澳大利亚悉尼歌剧院观光之旅',
          departureDate: '2023-05-15',
          returnDate: '2023-05-21',
          statusText: '已完成',
          statusColor: '#9e9e9e',
          participants: 3,
          price: 12000,
          image: '/static/images/trip5.jpg'
        }
      ];
    }
  },

  // 查看行程详情
  viewTripDetail: function (e) {
    const tripId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/trip-detail/trip-detail?id=${tripId}`
    });
  },

  // 去探索
  goToExplore: function () {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 刷新
  onRefresh: function() {
    this.setData({
      isRefreshing: true,
      pageNum: 1,
      hasMore: true
    });
    this.loadTripsData();
  },
  
  // 加载更多
  loadMore: function() {
    if (this.data.hasMore && !this.data.loadingMore) {
      this.loadMoreTrips();
    }
  }
}) 