// destination-detail.js
Page({
  data: {
    destination: {},
    relatedTrips: [],
    activeTab: 'intro',
    scrollIntoView: '',
    isFavorite: false,
    showShareModal: false,
    isRefreshing: false,
    months: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
  },

  onLoad: function (options) {
    // 获取目的地ID
    const destinationId = options.id || 1;
    
    // 加载目的地数据
    this.loadDestinationData(destinationId);
    
    // 加载相关行程
    this.loadRelatedTrips(destinationId);
    
    // 检查是否已收藏
    this.checkFavoriteStatus(destinationId);
  },

  onReady: function () {
    // 页面渲染完成后，初始化图表
    setTimeout(() => {
      this.initWeatherChart();
    }, 500);
  },

  onPullDownRefresh: function () {
    const destinationId = this.data.destination.id;
    this.setData({
      isRefreshing: true
    });
    
    Promise.all([
      this.loadDestinationData(destinationId),
      this.loadRelatedTrips(destinationId)
    ]).then(() => {
      this.setData({
        isRefreshing: false
      });
      wx.stopPullDownRefresh();
    });
  },

  onShareAppMessage: function () {
    const destination = this.data.destination;
    return {
      title: `【${destination.name}】${destination.description}`,
      path: `/pages/destination-detail/destination-detail?id=${destination.id}`,
      imageUrl: destination.coverImage
    };
  },

  // 加载目的地数据
  loadDestinationData: function (destinationId) {
    const that = this;
    
    // 显示加载状态
    wx.showNavigationBarLoading();
    
    // 模拟网络请求
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockDestination = that.getMockDestinationData(destinationId);
        
        that.setData({
          destination: mockDestination
        });
        
        // 设置导航栏标题
        wx.setNavigationBarTitle({
          title: mockDestination.name
        });
        
        wx.hideNavigationBarLoading();
        resolve();
      }, 800);
    });
  },

  // 加载相关行程
  loadRelatedTrips: function (destinationId) {
    const that = this;
    
    // 模拟网络请求
    return new Promise((resolve) => {
      setTimeout(() => {
        const mockTrips = that.getMockRelatedTrips(destinationId);
        
        that.setData({
          relatedTrips: mockTrips
        });
        
        resolve();
      }, 600);
    });
  },

  // 检查收藏状态
  checkFavoriteStatus: function (destinationId) {
    // 从本地存储中读取收藏的目的地
    const favoriteDestinations = wx.getStorageSync('favoriteDestinations') || [];
    
    // 检查当前目的地是否在收藏列表中
    const isFavorite = favoriteDestinations.includes(Number(destinationId));
    
    this.setData({
      isFavorite: isFavorite
    });
  },

  // 切换标签
  switchTab: function (e) {
    const tab = e.currentTarget.dataset.tab;
    
    this.setData({
      activeTab: tab,
      scrollIntoView: `tab-${tab}`
    });
  },

  // 切换收藏状态
  toggleFavorite: function () {
    const that = this;
    const destinationId = that.data.destination.id;
    const isFavorite = !that.data.isFavorite;
    
    // 从本地存储中读取收藏的目的地
    let favoriteDestinations = wx.getStorageSync('favoriteDestinations') || [];
    
    if (isFavorite) {
      // 添加到收藏
      if (!favoriteDestinations.includes(destinationId)) {
        favoriteDestinations.push(destinationId);
      }
      wx.showToast({
        title: '已收藏',
        icon: 'success',
        duration: 1500
      });
    } else {
      // 取消收藏
      favoriteDestinations = favoriteDestinations.filter(id => id !== destinationId);
      wx.showToast({
        title: '已取消收藏',
        icon: 'success',
        duration: 1500
      });
    }
    
    // 保存到本地存储
    wx.setStorageSync('favoriteDestinations', favoriteDestinations);
    
    // 更新UI
    that.setData({
      isFavorite: isFavorite
    });
  },

  // 分享目的地
  shareDestination: function () {
    this.setData({
      showShareModal: true
    });
  },

  // 关闭分享弹窗
  closeShareModal: function () {
    this.setData({
      showShareModal: false
    });
  },

  // 分享到微信好友
  shareToWechat: function () {
    wx.showToast({
      title: '分享成功',
      icon: 'success',
      duration: 1500
    });
    this.closeShareModal();
  },

  // 分享到朋友圈
  shareToMoments: function () {
    wx.showToast({
      title: '分享成功',
      icon: 'success',
      duration: 1500
    });
    this.closeShareModal();
  },

  // 分享到微博
  shareToWeibo: function () {
    wx.showToast({
      title: '分享成功',
      icon: 'success',
      duration: 1500
    });
    this.closeShareModal();
  },

  // 保存图片
  saveImage: function () {
    wx.showLoading({
      title: '保存中...',
    });
    
    setTimeout(() => {
      wx.hideLoading();
      wx.showToast({
        title: '保存成功',
        icon: 'success',
        duration: 1500
      });
      this.closeShareModal();
    }, 1500);
  },

  // 浏览相关行程
  browseTrips: function () {
    this.setData({
      activeTab: 'trips',
      scrollIntoView: 'tab-trips'
    });
  },

  // 查看行程详情
  viewTripDetail: function (e) {
    const tripId = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: `/pages/trip-detail/trip-detail?id=${tripId}`
    });
  },

  // 图片预览
  previewImage: function (e) {
    const index = e.currentTarget.dataset.index;
    const images = this.data.destination.photos;
    
    wx.previewImage({
      current: images[index],
      urls: images
    });
  },

  // 初始化天气图表
  initWeatherChart: function () {
    // 这里应该使用实际的图表库，比如ec-canvas，这里只是模拟
    console.log('初始化天气图表');
  },

  // 刷新
  onRefresh: function() {
    const destinationId = this.data.destination.id;
    this.setData({
      isRefreshing: true
    });
    
    Promise.all([
      this.loadDestinationData(destinationId),
      this.loadRelatedTrips(destinationId)
    ]).then(() => {
      this.setData({
        isRefreshing: false
      });
    });
  },

  // 获取模拟目的地数据
  getMockDestinationData: function (destinationId) {
    const destinations = [
      {
        id: 1,
        name: '日本东京',
        description: '融合传统与现代的东方魅力之都',
        location: '日本关东',
        visitorCount: 12567,
        coverImage: '/static/images/destination/tokyo-cover.jpg',
        bestTimeStart: 3,
        bestTimeEnd: 5,
        bestTimeDesc: '3-5月樱花季和10-11月红叶季是最佳旅行时间，气候宜人，景色优美。',
        weatherDesc: '东京四季分明，春秋温和，夏季炎热多雨，冬季较为干燥寒冷。',
        features: [
          {
            title: '美食天堂',
            desc: '从米其林餐厅到街边小吃，满足各种味蕾需求',
            icon: '/static/images/icon/food.png'
          },
          {
            title: '购物胜地',
            desc: '从传统手工艺品到尖端电子产品应有尽有',
            icon: '/static/images/icon/shopping.png'
          },
          {
            title: '文化体验',
            desc: '传统神社寺庙与现代科技博物馆共存',
            icon: '/static/images/icon/culture.png'
          }
        ],
        detailContent: '<div><p>东京是一座充满活力的大都市，融合了传统与现代的魅力。在这里，你可以参观古老的明治神宫，也可以体验繁华的涩谷十字路口。</p><p>作为美食之都，东京拥有全球最多的米其林星级餐厅，从高级怀石料理到平民化的拉面小店，满足各种味蕾需求。</p><p>购物爱好者也不会失望，从银座的奢侈品商店到秋叶原的电子产品，应有尽有。</p></div>',
        photos: [
          '/static/images/destination/tokyo1.jpg',
          '/static/images/destination/tokyo2.jpg',
          '/static/images/destination/tokyo3.jpg',
          '/static/images/destination/tokyo4.jpg',
          '/static/images/destination/tokyo5.jpg',
          '/static/images/destination/tokyo6.jpg'
        ]
      },
      {
        id: 2,
        name: '泰国清迈',
        description: '北方玫瑰，古老兰纳王国的文化中心',
        location: '泰国北部',
        visitorCount: 8421,
        coverImage: '/static/images/destination/chiangmai-cover.jpg',
        bestTimeStart: 11,
        bestTimeEnd: 2,
        bestTimeDesc: '11月至次年2月是清迈的凉季，天气凉爽干燥，非常适合旅游。',
        weatherDesc: '清迈全年温暖，分为热季、雨季和凉季三个季节。',
        features: [
          {
            title: '文化古城',
            desc: '古老寺庙和历史建筑展现兰纳文化魅力',
            icon: '/static/images/icon/temple.png'
          },
          {
            title: '美食探索',
            desc: '独特的北泰菜肴，口味偏甜辣',
            icon: '/static/images/icon/food.png'
          },
          {
            title: '自然体验',
            desc: '周边山区和自然公园提供丰富的户外活动',
            icon: '/static/images/icon/nature.png'
          }
        ],
        detailContent: '<div><p>清迈是泰国北部最大的城市，被誉为"北方玫瑰"，是古兰纳王国的文化中心。这座古城拥有超过300座佛寺，其中最著名的有素贴山上的双龙寺和城内的清曼寺。</p><p>每年11月的水灯节是清迈最美丽的时刻，天空中飘满天灯，河流上漂浮着万盏花灯，场面壮观而浪漫。</p><p>清迈的夜市也非常有名，尤其是周末夜市，汇集了各种手工艺品、美食和表演。</p></div>',
        photos: [
          '/static/images/destination/chiangmai1.jpg',
          '/static/images/destination/chiangmai2.jpg',
          '/static/images/destination/chiangmai3.jpg',
          '/static/images/destination/chiangmai4.jpg'
        ]
      }
    ];

    // 根据ID返回相应的目的地数据
    return destinations.find(item => item.id === Number(destinationId)) || destinations[0];
  },

  // 获取模拟相关行程数据
  getMockRelatedTrips: function (destinationId) {
    // 东京相关行程
    if (Number(destinationId) === 1) {
      return [
        {
          id: 101,
          title: '东京5日4晚深度游',
          duration: 5,
          rating: 4.8,
          price: 7500,
          image: '/static/images/trip1.jpg',
          influencer: {
            name: '旅行达人',
            avatar: '/static/images/avatar1.jpg'
          }
        },
        {
          id: 102,
          title: '东京-箱根-富士山7日游',
          duration: 7,
          rating: 4.7,
          price: 9800,
          image: '/static/images/trip2.jpg'
        },
        {
          id: 103,
          title: '东京-京都-大阪8日游',
          duration: 8,
          rating: 4.9,
          price: 12500,
          image: '/static/images/trip3.jpg',
          influencer: {
            name: '日本通',
            avatar: '/static/images/avatar2.jpg'
          }
        }
      ];
    } 
    // 清迈相关行程
    else if (Number(destinationId) === 2) {
      return [
        {
          id: 201,
          title: '清迈文化体验4日游',
          duration: 4,
          rating: 4.5,
          price: 4800,
          image: '/static/images/trip4.jpg'
        },
        {
          id: 202,
          title: '清迈-清莱6日游',
          duration: 6,
          rating: 4.6,
          price: 5600,
          image: '/static/images/trip5.jpg',
          influencer: {
            name: '探险家',
            avatar: '/static/images/avatar3.jpg'
          }
        }
      ];
    } 
    // 默认返回空数组
    else {
      return [];
    }
  }
}) 