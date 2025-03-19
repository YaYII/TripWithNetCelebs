// trip-detail.ts

// 模拟行程详情数据
const getTripDetail = (id: string) => {
  return {
    id: id,
    title: '香港迪士尼乐园一日游',
    description: '和米奇一起，开启奇妙的迪士尼之旅！全天畅玩迪士尼乐园，体验刺激的游乐设施，观赏精彩的表演，与迪士尼朋友们合影留念。',
    price: 688,
    images: [
      '/static/images/trips/disney1.jpg',
      '/static/images/trips/disney2.jpg',
      '/static/images/trips/disney3.jpg'
    ],
    influencer: {
      id: '1',
      name: '张小红',
      avatar: '/static/images/influencers/influencer1.jpg',
      followers: '1.2w',
      totalTrips: 42
    },
    duration: '1天',
    location: '香港迪士尼乐园',
    groupSize: '10-15人/团',
    currentParticipants: 8,
    maxParticipants: 15,
    viewCount: 12560,
    departureDate: '2023-10-20',
    daysLeft: 12,
    rating: 4.8,
    ratingCount: 268,
    schedule: [
      {
        day: 1,
        title: '迪士尼乐园畅玩',
        activities: [
          {
            time: '08:30',
            description: '集合出发，前往迪士尼乐园'
          },
          {
            time: '10:00',
            description: '抵达乐园，开始游玩'
          },
          {
            time: '12:30',
            description: '午餐时间（自理）'
          },
          {
            time: '14:00',
            description: '参观幻想世界、明日世界等主题园区'
          },
          {
            time: '16:30',
            description: '观看花车巡游表演'
          },
          {
            time: '20:00',
            description: '观赏烟花表演'
          },
          {
            time: '21:00',
            description: '集合返程'
          }
        ]
      }
    ]
  };
};

Page({
  data: {
    trip: {} as any,
    tripId: '',
    isFavorite: false
  },

  onLoad(options) {
    const { id } = options;
    if (id) {
      this.setData({
        tripId: id
      });
      this.loadTripDetail(id);
    }
  },

  // 加载行程详情
  loadTripDetail(id: string) {
    // 模拟数据加载
    const trip = getTripDetail(id);
    this.setData({
      trip
    });

    // 更新页面标题
    wx.setNavigationBarTitle({
      title: trip.title.substring(0, 10) + '...'
    });

    // 检查是否已收藏
    this.checkFavoriteStatus(id);
  },

  // 检查是否已收藏
  checkFavoriteStatus(id: string) {
    // 实际应用中，可以从本地存储或服务器获取收藏状态
    const favoriteTrips = wx.getStorageSync('favoriteTrips') || [];
    const isFavorite = favoriteTrips.includes(id);
    
    this.setData({
      isFavorite
    });
  },

  // 切换收藏状态
  toggleFavorite() {
    const { tripId, isFavorite } = this.data;
    
    // 获取现有收藏
    let favoriteTrips = wx.getStorageSync('favoriteTrips') || [];
    
    if (isFavorite) {
      // 取消收藏
      favoriteTrips = favoriteTrips.filter((id: string) => id !== tripId);
    } else {
      // 添加收藏
      favoriteTrips.push(tripId);
    }
    
    // 保存收藏状态
    wx.setStorageSync('favoriteTrips', favoriteTrips);
    
    // 更新UI
    this.setData({
      isFavorite: !isFavorite
    });
    
    // 提示用户
    wx.showToast({
      title: isFavorite ? '已取消收藏' : '已加入收藏',
      icon: 'success',
      duration: 1500
    });
  },

  // 前往预订页面
  goToBooking() {
    const { tripId } = this.data;
    wx.navigateTo({
      url: `/pages/booking/booking?id=${tripId}`
    });
  },

  // 分享行程
  onShareAppMessage() {
    const { trip } = this.data;
    return {
      title: trip.title,
      path: `/pages/trip-detail/trip-detail?id=${trip.id}`,
      imageUrl: trip.images[0]
    };
  }
}); 