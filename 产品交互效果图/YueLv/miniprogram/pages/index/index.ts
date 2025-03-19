// index.ts

// 定义接口类型
interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
}

interface Category {
  id: string;
  name: string;
  icon: string;
}

interface Influencer {
  id: string;
  name: string;
  avatar: string;
  followers: string;
}

interface Trip {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  viewCount: number;
}

interface Post {
  id: string;
  title: string;
  author: string;
  likes: number;
  comments: number;
}

// 模拟数据
const getDestinations = (): Destination[] => {
  return [
    {
      id: '1',
      name: '澳门威尼斯人',
      description: '体验东方威尼斯',
      image: '/images/destinations/disney.jpg'
    },
    {
      id: '2',
      name: '海洋公园',
      description: '香港著名的海洋主题公园',
      image: '/images/destinations/ocean-park.jpg'
    },
    {
      id: '3',
      name: '太平山顶',
      description: '俯瞰香港全景的最佳地点',
      image: '/images/destinations/victoria-peak.jpg'
    }
  ];
};

// 获取分类图标
const getCategories = (): Category[] => {
  return [
    {
      id: 'hotspot',
      name: '热门目的地',
      icon: '/images/circle-icons/hotspot.png'
    },
    {
      id: 'influencer',
      name: '网红推荐',
      icon: '/images/circle-icons/influencer.png'
    },
    {
      id: 'special',
      name: '特色行程',
      icon: '/images/circle-icons/special.png'
    },
    {
      id: 'live',
      name: '直播预告',
      icon: '/images/circle-icons/live.png'
    },
    {
      id: 'hotel',
      name: '酒店住宿',
      icon: '/images/circle-icons/hotel.png'
    }
  ];
};

const getInfluencers = (): Influencer[] => {
  return [
    {
      id: '1',
      name: '旅行达人小王',
      avatar: '/images/profile/profile1.png',
      followers: '1.2w'
    },
    {
      id: '2',
      name: '美食家大李',
      avatar: '/images/profile/profile2.png',
      followers: '8.5k'
    },
    {
      id: '3',
      name: '摄影师阿杰',
      avatar: '/images/profile/profile3.png',
      followers: '22.8w'
    }
  ];
};

const getPopularTrips = (page: number): Trip[] => {
  const trips = [
    {
      id: '1',
      title: '香港迪士尼一日游',
      description: '与米奇老鼠和朋友们共度欢乐时光',
      image: '/images/trips/disney-trip.jpg',
      price: 688,
      duration: '1天',
      viewCount: 12560
    },
    {
      id: '2',
      title: '香港地道美食半日游',
      description: '探索香港最地道的美食街和小吃',
      image: '/images/trips/food-trip.jpg',
      price: 388,
      duration: '4小时',
      viewCount: 8976
    },
    {
      id: '3',
      title: '香港海洋公园全天游',
      description: '近距离接触海洋生物，体验刺激游乐设施',
      image: '/images/trips/ocean-park-trip.jpg',
      price: 588,
      duration: '1天',
      viewCount: 10245
    }
  ];
  
  // 模拟分页，第一页返回所有数据，其他页返回空数组
  return page === 1 ? trips : [];
};

interface IPageData {
  currentCity: string;
  destinations: Destination[];
  categories: Category[];
  influencers: Influencer[];
  popularTrips: Trip[];
  recommendedPosts?: Post[];
  page: number;
  hasMore: boolean;
  isLoading: boolean;
  isRefreshing: boolean;
}

interface IPageInstance {
  data: IPageData;
  onLoad(): void;
  initCommunityPosts(): void;
  onRefresh(): void;
  initData(): void;
  onSearch(e: any): void;
  onCityChange(e: any): void;
  loadMore(): void;
  navigateToDestination(e: any): void;
  navigateToCategory(e: any): void;
  viewAllInfluencers(): void;
  navigateToInfluencer(e: any): void;
  viewAllTrips(): void;
}

Page<IPageData, IPageInstance>({
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
      const recommendedPosts: Post[] = [
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
      this.setData({ 
        recommendedPosts: recommendedPosts 
      });
      
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
  onSearch(e: any) {
    const { value, city } = e.detail;
    console.log('搜索', value, city);
    wx.navigateTo({
      url: `/pages/search-results/search-results?keyword=${value}&city=${city}`
    });
  },

  // 城市变更处理
  onCityChange(e: any) {
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
  navigateToDestination(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/destination-detail/destination-detail?id=${id}`
    });
  },

  // 导航到分类页面
  navigateToCategory(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/search-results/search-results?categoryId=${id}`
    });
  },

  // 查看所有网红
  viewAllInfluencers() {
    wx.navigateTo({
      url: '/pages/influencer-list/influencer-list'
    });
  },

  // 导航到网红详情
  navigateToInfluencer(e: any) {
    const id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/influencer-list/influencer-list?id=${id}`
    });
  },

  // 查看所有行程
  viewAllTrips() {
    wx.switchTab({
      url: '/pages/trips/trips'
    });
  }
});
