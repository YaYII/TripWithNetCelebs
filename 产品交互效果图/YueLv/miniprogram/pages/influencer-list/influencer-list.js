// influencer-list.js
Page({
  data: {
    loading: true,
    loadingMore: false,
    isRefreshing: false,
    hasMore: true,
    influencers: [],
    activeCategory: 'all',
    searchKeyword: '',
    pageNum: 1,
    pageSize: 10
  },

  onLoad: function (options) {
    // 加载网红达人列表
    this.loadInfluencers();
  },

  onPullDownRefresh: function () {
    this.setData({
      pageNum: 1,
      influencers: [],
      hasMore: true,
      isRefreshing: true
    });
    this.loadInfluencers();
  },

  onReachBottom: function () {
    if (this.data.hasMore && !this.data.loadingMore) {
      this.loadMoreInfluencers();
    }
  },

  // 搜索输入
  onSearchInput: function (e) {
    this.setData({
      searchKeyword: e.detail.value
    });
  },

  // 执行搜索
  onSearch: function () {
    this.setData({
      pageNum: 1,
      influencers: [],
      hasMore: true,
      loading: true
    });
    this.loadInfluencers();
  },

  // 设置分类
  setCategory: function (e) {
    const category = e.currentTarget.dataset.category;
    
    if (category === this.data.activeCategory) return;
    
    this.setData({
      activeCategory: category,
      pageNum: 1,
      influencers: [],
      hasMore: true,
      loading: true
    });
    
    this.loadInfluencers();
  },

  // 加载网红达人数据
  loadInfluencers: function () {
    const that = this;
    
    // 显示加载状态
    wx.showNavigationBarLoading();
    
    // 模拟网络请求
    setTimeout(() => {
      const mockInfluencers = that.getMockInfluencers();
      
      that.setData({
        influencers: mockInfluencers,
        loading: false,
        isRefreshing: false
      });
      
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 1000);
  },

  // 加载更多网红达人
  loadMoreInfluencers: function () {
    if (!this.data.hasMore) return;
    
    const that = this;
    that.setData({
      loadingMore: true
    });
    
    // 模拟网络请求
    setTimeout(() => {
      const pageNum = that.data.pageNum + 1;
      
      // 模拟第二页后没有更多数据
      if (pageNum > 2) {
        that.setData({
          hasMore: false,
          loadingMore: false
        });
        return;
      }
      
      const moreInfluencers = that.getMockInfluencers();
      
      that.setData({
        influencers: [...that.data.influencers, ...moreInfluencers],
        pageNum: pageNum,
        loadingMore: false
      });
    }, 1000);
  },

  // 获取模拟网红达人数据
  getMockInfluencers: function () {
    return [
      {
        id: 1,
        name: '旅行达人',
        avatar: '/static/images/avatar1.jpg',
        tag: '旅行博主',
        fans: '1.2万',
        trips: 25,
        rating: 4.8,
        isFollowing: false,
        description: '资深旅行爱好者，已探索超过30个国家，擅长发现小众景点和美食。',
        featuredTrips: [
          {
            id: 101,
            title: '日本东京5日4晚深度游',
            price: 7500,
            image: '/static/images/trip1.jpg'
          },
          {
            id: 102,
            title: '泰国清迈文化体验4日游',
            price: 4800,
            image: '/static/images/trip3.jpg'
          }
        ]
      },
      {
        id: 2,
        name: '美食猎人',
        avatar: '/static/images/avatar2.jpg',
        tag: '美食博主',
        fans: '5.6万',
        trips: 18,
        rating: 4.9,
        isFollowing: true,
        description: '美食评论家，探索各地美食文化，分享地道食谱和烹饪技巧。',
        featuredTrips: [
          {
            id: 103,
            title: '东南亚美食之旅6日游',
            price: 6200,
            image: '/static/images/trip4.jpg'
          }
        ]
      },
      {
        id: 3,
        name: '摄影师小王',
        avatar: '/static/images/avatar3.jpg',
        tag: '摄影博主',
        fans: '8.9万',
        trips: 32,
        rating: 4.7,
        isFollowing: false,
        description: '专业风光摄影师，擅长拍摄自然风光和人文景观，作品曾获多项国际奖项。',
        featuredTrips: [
          {
            id: 104,
            title: '新西兰南岛摄影之旅7日游',
            price: 15800,
            image: '/static/images/trip5.jpg'
          },
          {
            id: 105,
            title: '西藏风光摄影团8日游',
            price: 9600,
            image: '/static/images/trip2.jpg'
          }
        ]
      },
      {
        id: 4,
        name: '时尚达人',
        avatar: '/static/images/avatar4.jpg',
        tag: '时尚博主',
        fans: '12.5万',
        trips: 15,
        rating: 4.6,
        isFollowing: false,
        description: '时尚行业资深人士，擅长穿搭指导和时尚街拍，经常参加国际时装周。',
        featuredTrips: [
          {
            id: 106,
            title: '巴黎时装周特别之旅',
            price: 18500,
            image: '/static/images/trip6.jpg'
          }
        ]
      },
      {
        id: 5,
        name: '探险家',
        avatar: '/static/images/avatar5.jpg',
        tag: '探险博主',
        fans: '3.4万',
        trips: 28,
        rating: 4.9,
        isFollowing: false,
        description: '资深户外探险爱好者，擅长徒步、攀岩和野外生存，曾征服多座世界著名山峰。',
        featuredTrips: [
          {
            id: 107,
            title: '尼泊尔徒步探险12日游',
            price: 11200,
            image: '/static/images/trip7.jpg'
          },
          {
            id: 108,
            title: '非洲草原野生动物摄影团',
            price: 22500,
            image: '/static/images/trip8.jpg'
          }
        ]
      }
    ];
  },

  // 关注/取消关注
  toggleFollow: function (e) {
    const influencerId = e.currentTarget.dataset.id;
    const influencers = [...this.data.influencers];
    
    // 找到对应的网红达人
    const index = influencers.findIndex(item => item.id === influencerId);
    
    if (index !== -1) {
      // 切换关注状态
      influencers[index].isFollowing = !influencers[index].isFollowing;
      
      this.setData({
        influencers: influencers
      });
      
      // 显示提示信息
      wx.showToast({
        title: influencers[index].isFollowing ? '已关注' : '已取消关注',
        icon: 'success',
        duration: 1500
      });
    }
  },

  // 查看网红达人详情
  viewInfluencerDetail: function (e) {
    const influencerId = e.currentTarget.dataset.id;
    // 这里应该跳转到网红达人详情页，但当前项目可能没有这个页面
    // 可以暂时跳转到首页或者其他页面
    wx.navigateTo({
      url: `/pages/index/index?influencerId=${influencerId}`
    });
  },

  // 查看行程详情
  viewTripDetail: function (e) {
    const tripId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/trip-detail/trip-detail?id=${tripId}`
    });
  },

  // 刷新
  onRefresh: function() {
    this.setData({
      isRefreshing: true,
      pageNum: 1,
      hasMore: true
    });
    this.loadInfluencers();
  },
  
  // 加载更多
  loadMore: function() {
    if (this.data.hasMore && !this.data.loadingMore) {
      this.loadMoreInfluencers();
    }
  }
}) 