// my-favorites.js
Page({
  data: {
    favorites: [],
    loading: true,
    loadingMore: false,
    hasMore: true,
    isEmpty: false,
    pageNum: 1,
    pageSize: 10
  },

  onLoad: function (options) {
    // 加载收藏数据
    this.loadFavoritesData();
  },

  onPullDownRefresh: function () {
    // 重置页码，重新加载数据
    this.setData({
      pageNum: 1,
      favorites: [],
      hasMore: true,
      isEmpty: false
    });
    this.loadFavoritesData();
  },

  onReachBottom: function () {
    // 上拉加载更多
    if (this.data.hasMore && !this.data.loadingMore) {
      this.loadMoreFavorites();
    }
  },

  // 加载收藏数据
  loadFavoritesData: function () {
    const that = this;
    
    // 显示加载状态
    that.setData({
      loading: true
    });
    
    // 模拟网络请求
    setTimeout(() => {
      const mockFavorites = that.getMockFavorites();
      
      that.setData({
        favorites: mockFavorites,
        loading: false,
        isEmpty: mockFavorites.length === 0
      });
      
      wx.stopPullDownRefresh();
    }, 1000);
  },

  // 加载更多收藏
  loadMoreFavorites: function () {
    if (!this.data.hasMore) return;
    
    const that = this;
    that.setData({
      loadingMore: true
    });
    
    // 模拟网络请求
    setTimeout(() => {
      const pageNum = that.data.pageNum + 1;
      const mockFavorites = that.getMockFavorites(pageNum);
      
      // 如果没有更多数据
      if (mockFavorites.length === 0) {
        that.setData({
          hasMore: false,
          loadingMore: false
        });
        return;
      }
      
      that.setData({
        favorites: [...that.data.favorites, ...mockFavorites],
        pageNum: pageNum,
        loadingMore: false
      });
    }, 1000);
  },

  // 获取模拟收藏数据
  getMockFavorites: function (pageNum = 1) {
    // 第二页之后不返回数据，模拟没有更多数据
    if (pageNum > 1) return [];
    
    // 模拟收藏数据
    const mockFavorites = [
      {
        id: 1,
        title: '日本东京5日4晚深度游',
        location: '东京，日本',
        price: 7500,
        image: '/static/images/trip2.jpg'
      },
      {
        id: 2,
        title: '巴厘岛6日5晚网红打卡之旅',
        location: '巴厘岛，印度尼西亚',
        price: 6400,
        image: '/static/images/trip1.jpg'
      },
      {
        id: 3,
        title: '泰国清迈文化体验4日游',
        location: '清迈，泰国',
        price: 4800,
        image: '/static/images/trip3.jpg'
      },
      {
        id: 4,
        title: '新西兰南岛自然风光7日游',
        location: '南岛，新西兰',
        price: 15800,
        image: '/static/images/trip4.jpg'
      },
      {
        id: 5,
        title: '澳大利亚悉尼歌剧院观光之旅',
        location: '悉尼，澳大利亚',
        price: 12000,
        image: '/static/images/trip5.jpg'
      }
    ];
    
    return mockFavorites;
  },

  // 查看行程详情
  viewTripDetail: function (e) {
    const tripId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/trip-detail/trip-detail?id=${tripId}`
    });
  },

  // 移除收藏
  removeFavorite: function (e) {
    const that = this;
    const tripId = e.currentTarget.dataset.id;
    
    wx.showModal({
      title: '提示',
      content: '确定要取消收藏吗？',
      success (res) {
        if (res.confirm) {
          // 模拟移除收藏
          const favorites = that.data.favorites.filter(item => item.id !== tripId);
          
          that.setData({
            favorites: favorites,
            isEmpty: favorites.length === 0
          });
          
          wx.showToast({
            title: '已取消收藏',
            icon: 'success'
          });
        }
      }
    });
  },

  // 分享行程
  shareTrip: function (e) {
    const tripId = e.currentTarget.dataset.id;
    // 在实际应用中，这里应该调用微信的分享功能
    wx.showToast({
      title: '分享功能开发中',
      icon: 'none'
    });
  },

  // 去探索
  goToExplore: function () {
    wx.switchTab({
      url: '/pages/index/index'
    });
  }
}) 