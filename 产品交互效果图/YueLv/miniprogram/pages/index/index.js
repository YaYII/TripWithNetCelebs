// index.js

// 模拟数据
const getDestinations = () => {
  return [
    {
      id: '1',
      name: '澳门威尼斯人',
      description: '体验东方威尼斯',
      image: '/static/images/destinations/disney.jpg'
    },
    {
      id: '2',
      name: '海洋公园',
      description: '香港著名的海洋主题公园',
      image: '/static/images/destinations/ocean-park.jpg'
    },
    {
      id: '3',
      name: '太平山顶',
      description: '俯瞰香港全景的最佳地点',
      image: '/static/images/destinations/victoria-peak.jpg'
    }
  ];
};

const getInfluencers = () => {
  return [
    {
      id: '1',
      name: '旅行达人小王',
      avatar: '/static/images/profile/profile1.png',
      followers: '1.2w'
    },
    {
      id: '2',
      name: '美食家大李',
      avatar: '/static/images/profile/profile2.png',
      followers: '8.5k'
    },
    {
      id: '3',
      name: '摄影师阿杰',
      avatar: '/static/images/profile/profile3.png',
      followers: '22.8w'
    }
  ];
};

// 获取分类图标
const getCategories = () => {
  return [
    {
      id: 'hotspot',
      name: '热门目的地',
      icon: '/static/images/circle-icons/hotspot.png'
    },
    {
      id: 'influencer',
      name: '网红推荐',
      icon: '/static/images/circle-icons/influencer.png'
    },
    {
      id: 'special',
      name: '特色行程',
      icon: '/static/images/circle-icons/special.png'
    },
    {
      id: 'live',
      name: '直播预告',
      icon: '/static/images/circle-icons/live.png'
    },
    {
      id: 'hotel',
      name: '酒店住宿',
      icon: '/static/images/circle-icons/hotel.png'
    }
  ];
};

const getPopularTrips = (page) => {
  const trips = [
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
    }
  ];
  
  // 模拟分页，第一页返回所有数据，其他页返回空数组
  return page === 1 ? trips : [];
};

Page({
  data: {
    currentCity: '珠海',
    destinations: [],
    categories: [],
    influencers: [],
    popularTrips: [],
    page: 1,
    hasMore: true,
    isLoading: false,
    isRefreshing: false
  },

  onLoad() {
    this.initData();
    
    // 调用社区相关帖子的初始化函数
    this.initCommunityPosts();
  },

  // 初始化社区相关帖子
  initCommunityPosts() {
    try {
      // 使用console.log替代Trace
      console.log('[社区功能]', '初始化社区相关帖子');
      
      // 模拟推荐数据
      const recommendedPosts = [
        {
          id: '1',
          title: '香港迪士尼必玩项目推荐',
          author: '旅行达人小李',
          likes: 128,
          comments: 35
        },
        {
          id: '2',
          title: '香港美食地图大全',
          author: '吃货王小明',
          likes: 89,
          comments: 27
        }
      ];
      
      // 在这里可以将推荐数据存储在页面数据中
      // this.setData({ recommendedPosts: recommendedPosts });
      
    } catch (error) {
      console.error('初始化社区相关帖子失败', error);
    }
  },

  // 下拉刷新处理
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

  // 初始化数据
  initData() {
    this.setData({
      destinations: getDestinations(),
      categories: getCategories(),
      influencers: getInfluencers(),
      popularTrips: getPopularTrips(1)
    });
  },

  // 搜索处理
  onSearch(e) {
    const { value, city } = e.detail;
    console.log('搜索', value, city);
    wx.navigateTo({
      url: `/pages/search-results/search-results?keyword=${value}&city=${city}`
    });
  },

  // 城市变更处理
  onCityChange(e) {
    const { city } = e.detail;
    this.setData({
      currentCity: city
    });
  },

  // 加载更多
  loadMore() {
    if (this.data.isLoading || !this.data.hasMore) return;
    
    this.setData({
      isLoading: true
    });
    
    setTimeout(() => {
      const nextPage = this.data.page + 1;
      const moreTrips = getPopularTrips(nextPage);
      
      // 如果没有更多数据，设置hasMore为false
      if (moreTrips.length === 0) {
        this.setData({
          hasMore: false,
          isLoading: false
        });
        return;
      }
      
      this.setData({
        popularTrips: [...this.data.popularTrips, ...moreTrips],
        page: nextPage,
        isLoading: false
      });
    }, 1000);
  },

  // 导航到目的地详情
  navigateToDestination(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/destination-detail/destination-detail?id=${id}`
    });
  },

  // 导航到分类页面
  navigateToCategory(e) {
    const id = e.currentTarget.dataset.id;
    console.log('导航到分类页面', id);
    
    switch(id) {
      case 'hotspot':
        wx.navigateTo({
          url: '/pages/search-results/search-results?categoryType=hotspot'
        });
        break;
      case 'influencer':
        this.viewAllInfluencers();
        break;
      case 'special':
        wx.navigateTo({
          url: '/pages/search-results/search-results?categoryType=special'
        });
        break;
      case 'live':
        wx.showToast({
          title: '直播功能开发中',
          icon: 'none'
        });
        break;
      case 'hotel':
        wx.showToast({
          title: '酒店功能开发中',
          icon: 'none'
        });
        break;
      default:
        wx.navigateTo({
          url: `/pages/search-results/search-results?categoryId=${id}`
        });
    }
  },

  // 查看所有网红
  viewAllInfluencers() {
    wx.navigateTo({
      url: '/pages/influencer-list/influencer-list'
    });
  },

  // 导航到网红详情
  navigateToInfluencer(e) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/influencer-list/influencer-list?id=${id}`
    });
  },

  // 查看所有行程
  viewAllTrips() {
    wx.navigateTo({
      url: '/pages/trips/trips'
    });
  }
}); 