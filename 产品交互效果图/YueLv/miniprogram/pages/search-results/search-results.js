// search-results.js
Page({
  data: {
    keyword: '',
    loading: true,
    loadingMore: false,
    isRefreshing: false,
    hasMore: true,
    searchResults: [],
    pageNum: 1,
    pageSize: 10,
    
    // 筛选相关
    activeFilter: 'all',
    priceSortAsc: true,
    popularitySortAsc: false,
    showFilterPanel: false,
    minPrice: '',
    maxPrice: '',
    selectedDurations: [],
    selectedType: '',
    
    durationOptions: [
      { label: '1-3天', value: '1-3' },
      { label: '4-7天', value: '4-7' },
      { label: '8-14天', value: '8-14' },
      { label: '15天以上', value: '15+' }
    ],
    
    typeOptions: [
      { label: '跟团游', value: 'group' },
      { label: '自由行', value: 'free' },
      { label: '私家团', value: 'private' },
      { label: '当地玩乐', value: 'local' }
    ]
  },

  onLoad: function (options) {
    // 获取搜索关键词
    if (options.keyword) {
      this.setData({
        keyword: options.keyword
      });
    }
    
    // 加载搜索结果
    this.searchTrips();
  },

  onPullDownRefresh: function () {
    this.setData({
      pageNum: 1,
      searchResults: [],
      hasMore: true,
      isRefreshing: true
    });
    this.searchTrips();
  },

  onReachBottom: function () {
    if (this.data.hasMore && !this.data.loadingMore) {
      this.loadMoreResults();
    }
  },

  // 关键词输入
  onKeywordInput: function (e) {
    this.setData({
      keyword: e.detail.value
    });
  },

  // 清除关键词
  clearKeyword: function () {
    this.setData({
      keyword: ''
    });
  },

  // 返回上一页
  goBack: function () {
    wx.navigateBack();
  },

  // 搜索行程
  onSearch: function () {
    this.setData({
      pageNum: 1,
      searchResults: [],
      hasMore: true,
      loading: true
    });
    this.searchTrips();
  },

  // 执行搜索
  searchTrips: function () {
    const that = this;
    
    // 显示加载状态
    wx.showNavigationBarLoading();
    
    // 模拟网络请求
    setTimeout(() => {
      const mockResults = that.getMockSearchResults();
      
      that.setData({
        searchResults: mockResults,
        loading: false,
        isRefreshing: false
      });
      
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 1000);
  },

  // 加载更多结果
  loadMoreResults: function () {
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
      
      const moreResults = that.getMockSearchResults();
      
      that.setData({
        searchResults: [...that.data.searchResults, ...moreResults],
        pageNum: pageNum,
        loadingMore: false
      });
    }, 1000);
  },

  // 获取模拟搜索结果
  getMockSearchResults: function () {
    return [
      {
        id: 1,
        title: '日本东京5日4晚深度游',
        location: '东京，日本',
        price: 7500,
        rating: 4.8,
        duration: 5,
        currentParticipants: 3,
        maxParticipants: 12,
        image: '/static/images/trip2.jpg',
        influencer: {
          name: '旅行达人',
          avatar: '/static/images/avatar2.jpg'
        }
      },
      {
        id: 2,
        title: '巴厘岛6日5晚网红打卡之旅',
        location: '巴厘岛，印度尼西亚',
        price: 6400,
        rating: 4.6,
        duration: 6,
        currentParticipants: 8,
        maxParticipants: 15,
        image: '/static/images/trip1.jpg',
        influencer: {
          name: '环球旅行家',
          avatar: '/static/images/avatar1.jpg'
        }
      },
      {
        id: 3,
        title: '泰国清迈文化体验4日游',
        location: '清迈，泰国',
        price: 4800,
        rating: 4.5,
        duration: 4,
        currentParticipants: 4,
        maxParticipants: 10,
        image: '/static/images/trip3.jpg'
      },
      {
        id: 4,
        title: '新西兰南岛自然风光7日游',
        location: '南岛，新西兰',
        price: 15800,
        rating: 4.9,
        duration: 7,
        currentParticipants: 2,
        maxParticipants: 8,
        image: '/static/images/trip4.jpg',
        influencer: {
          name: '摄影师小王',
          avatar: '/static/images/avatar4.jpg'
        }
      },
      {
        id: 5,
        title: '澳大利亚悉尼歌剧院观光之旅',
        location: '悉尼，澳大利亚',
        price: 12000,
        rating: 4.7,
        duration: 6,
        currentParticipants: 5,
        maxParticipants: 15,
        image: '/static/images/trip5.jpg'
      }
    ];
  },

  // 设置筛选条件
  setFilter: function (e) {
    const filterType = e.currentTarget.dataset.filter;
    
    if (filterType === this.data.activeFilter) {
      // 如果点击相同筛选条件，切换升/降序
      if (filterType === 'price') {
        this.setData({
          priceSortAsc: !this.data.priceSortAsc
        });
      } else if (filterType === 'popularity') {
        this.setData({
          popularitySortAsc: !this.data.popularitySortAsc
        });
      }
    } else {
      this.setData({
        activeFilter: filterType
      });
    }
    
    // 根据筛选条件重新排序
    this.sortSearchResults();
  },

  // 排序搜索结果
  sortSearchResults: function () {
    const that = this;
    const results = [...that.data.searchResults];
    
    switch (that.data.activeFilter) {
      case 'price':
        results.sort((a, b) => {
          return that.data.priceSortAsc ? a.price - b.price : b.price - a.price;
        });
        break;
      case 'popularity':
        results.sort((a, b) => {
          const popA = a.currentParticipants / a.maxParticipants;
          const popB = b.currentParticipants / b.maxParticipants;
          return that.data.popularitySortAsc ? popA - popB : popB - popA;
        });
        break;
      default:
        // 默认不排序，保持原顺序
        break;
    }
    
    that.setData({
      searchResults: results
    });
  },

  // 显示筛选面板
  showFilterPanel: function () {
    this.setData({
      showFilterPanel: true
    });
  },

  // 隐藏筛选面板
  hideFilterPanel: function () {
    this.setData({
      showFilterPanel: false
    });
  },

  // 最低价输入
  onMinPriceInput: function (e) {
    this.setData({
      minPrice: e.detail.value
    });
  },

  // 最高价输入
  onMaxPriceInput: function (e) {
    this.setData({
      maxPrice: e.detail.value
    });
  },

  // 切换行程天数
  toggleDuration: function (e) {
    const value = e.currentTarget.dataset.value;
    const selectedDurations = [...this.data.selectedDurations];
    const index = selectedDurations.indexOf(value);
    
    if (index === -1) {
      selectedDurations.push(value);
    } else {
      selectedDurations.splice(index, 1);
    }
    
    this.setData({
      selectedDurations: selectedDurations
    });
  },

  // 选择出行类型
  selectType: function (e) {
    const value = e.currentTarget.dataset.value;
    
    this.setData({
      selectedType: this.data.selectedType === value ? '' : value
    });
  },

  // 重置筛选条件
  resetFilters: function () {
    this.setData({
      minPrice: '',
      maxPrice: '',
      selectedDurations: [],
      selectedType: ''
    });
  },

  // 应用筛选条件
  applyFilters: function () {
    // 隐藏筛选面板
    this.setData({
      showFilterPanel: false,
      loading: true,
      pageNum: 1,
      hasMore: true
    });
    
    // 应用筛选条件并重新搜索
    // 实际应用中，这里应该将筛选条件传给后端API
    setTimeout(() => {
      const mockResults = this.getMockSearchResults();
      this.setData({
        searchResults: mockResults,
        loading: false
      });
    }, 800);
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
    this.searchTrips();
  },
  
  // 加载更多
  loadMore: function() {
    if (this.data.hasMore && !this.data.loadingMore) {
      this.loadMoreResults();
    }
  }
}) 