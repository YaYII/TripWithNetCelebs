// trips.js

// 模拟行程数据
const getTripsData = () => {
  return [
    {
      id: '1',
      title: '香港迪士尼一日游',
      description: '与米奇老鼠和朋友们共度欢乐时光',
      image: '/static/images/trips/disney-trip.jpg',
      price: 688,
      duration: '1天',
      viewCount: 12560
    },
    {
      id: '2',
      title: '香港地道美食半日游',
      description: '探索香港最地道的美食街和小吃',
      image: '/static/images/trips/food-trip.jpg',
      price: 388,
      duration: '4小时',
      viewCount: 8976
    },
    {
      id: '3',
      title: '香港海洋公园全天游',
      description: '近距离接触海洋生物，体验刺激游乐设施',
      image: '/static/images/trips/ocean-park-trip.jpg',
      price: 588,
      duration: '1天',
      viewCount: 10245
    },
    {
      id: '4',
      title: '港澳三日游',
      description: '游览港澳两地著名景点，感受不同文化',
      image: '/static/images/trips/hk-macau-trip.jpg',
      price: 1288,
      duration: '3天',
      viewCount: 15280
    },
    {
      id: '5',
      title: '香港购物一日游',
      description: '尖沙咀、铜锣湾等著名购物区逛街体验',
      image: '/static/images/trips/shopping-trip.jpg',
      price: 268,
      duration: '1天',
      viewCount: 7869
    }
  ];
};

Page({
  data: {
    trips: [],
    tabs: ['全部', '一日游', '多日游', '亲子', '购物', '美食', '文化'],
    currentTab: 0,
    sortType: 'recommend', // recommend, price, popularity
    priceSort: 'asc', // asc, desc
    currentCity: '香港',
    page: 1,
    hasMore: true,
    isLoading: false,
    isRefreshing: false,
    showFilterPopup: false,
    priceRange: 'all',
    durationRange: 'all'
  },

  onLoad() {
    this.initData();
  },

  // 初始化数据
  initData() {
    this.setData({
      trips: getTripsData()
    });
  },

  // 切换分类标签
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    if (index === this.data.currentTab) return;
    
    this.setData({
      currentTab: index,
      page: 1
    });
    
    // 可以根据分类加载不同的数据
    this.initData();
  },

  // 按推荐排序
  sortByRecommend() {
    if (this.data.sortType === 'recommend') return;
    
    this.setData({
      sortType: 'recommend'
    });
    
    // 重新加载推荐排序的数据
    this.initData();
  },

  // 按价格排序
  sortByPrice() {
    let newPriceSort = 'asc';
    
    if (this.data.sortType === 'price') {
      // 如果已经是价格排序，切换升降序
      newPriceSort = this.data.priceSort === 'asc' ? 'desc' : 'asc';
    }
    
    this.setData({
      sortType: 'price',
      priceSort: newPriceSort
    });
    
    // 按价格排序
    const sortedTrips = [...this.data.trips].sort((a, b) => {
      return newPriceSort === 'asc' ? a.price - b.price : b.price - a.price;
    });
    
    this.setData({
      trips: sortedTrips
    });
  },

  // 按人气排序
  sortByPopularity() {
    if (this.data.sortType === 'popularity') return;
    
    this.setData({
      sortType: 'popularity'
    });
    
    // 按查看人数排序（降序）
    const sortedTrips = [...this.data.trips].sort((a, b) => b.viewCount - a.viewCount);
    
    this.setData({
      trips: sortedTrips
    });
  },

  // 城市变更
  onCityChange(e) {
    const { city } = e.detail;
    this.setData({
      currentCity: city
    });
    
    // 重新加载数据
    this.initData();
  },

  // 搜索
  onSearch(e) {
    const { value, city } = e.detail;
    wx.navigateTo({
      url: `/pages/search-results/search-results?keyword=${value}&city=${city}`
    });
  },

  // 下拉刷新
  onRefresh() {
    if (this.data.isRefreshing) return;
    
    this.setData({
      isRefreshing: true
    });
    
    setTimeout(() => {
      this.setData({
        page: 1,
        isRefreshing: false
      });
      this.initData();
    }, 1000);
  },

  // 加载更多
  loadMore() {
    if (this.data.isLoading || !this.data.hasMore) return;
    
    this.setData({
      isLoading: true
    });
    
    // 模拟加载更多数据
    setTimeout(() => {
      // 这里示例中没有更多数据，实际应用中可以加载下一页
      this.setData({
        hasMore: false,
        isLoading: false
      });
    }, 1000);
  },

  // 打开筛选弹窗
  openFilter() {
    this.setData({
      showFilterPopup: true
    });
  },

  // 关闭筛选弹窗
  closeFilter() {
    this.setData({
      showFilterPopup: false
    });
  },

  // 设置价格区间
  setPriceRange(e) {
    const range = e.currentTarget.dataset.range;
    this.setData({
      priceRange: range
    });
  },

  // 设置行程天数
  setDurationRange(e) {
    const range = e.currentTarget.dataset.range;
    this.setData({
      durationRange: range
    });
  },

  // 重置筛选条件
  resetFilter() {
    this.setData({
      priceRange: 'all',
      durationRange: 'all'
    });
  },

  // 应用筛选条件
  applyFilter() {
    // 先关闭弹窗
    this.setData({
      showFilterPopup: false
    });
    
    // 应用筛选条件
    let filteredTrips = getTripsData();
    
    // 价格筛选
    if (this.data.priceRange !== 'all') {
      filteredTrips = filteredTrips.filter(trip => {
        const price = trip.price;
        switch (this.data.priceRange) {
          case '0-300':
            return price < 300;
          case '300-500':
            return price >= 300 && price <= 500;
          case '500-1000':
            return price > 500 && price <= 1000;
          case '1000+':
            return price > 1000;
          default:
            return true;
        }
      });
    }
    
    // 天数筛选
    if (this.data.durationRange !== 'all') {
      filteredTrips = filteredTrips.filter(trip => {
        const duration = trip.duration;
        // 简单判断，实际应用中可能需要更复杂的解析
        if (this.data.durationRange === '1' && duration.includes('1天')) {
          return true;
        }
        if (this.data.durationRange === '2-3' && (duration.includes('2天') || duration.includes('3天'))) {
          return true;
        }
        if (this.data.durationRange === '4-7' && (
          duration.includes('4天') || duration.includes('5天') || 
          duration.includes('6天') || duration.includes('7天')
        )) {
          return true;
        }
        if (this.data.durationRange === '7+' && parseInt(duration) > 7) {
          return true;
        }
        return false;
      });
    }
    
    // 更新数据
    this.setData({
      trips: filteredTrips
    });
  }
}); 