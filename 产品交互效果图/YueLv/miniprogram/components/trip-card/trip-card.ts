// 定义行程接口
interface Trip {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  duration: string;
  viewCount: number;
}

Component({
  properties: {
    trip: {
      type: Object,
      value: {} as Trip
    }
  },

  data: {
    formattedViewCount: '0'
  },

  lifetimes: {
    attached() {
      this.formatViewCount();
    }
  },

  observers: {
    'trip.viewCount': function(viewCount: number) {
      this.formatViewCount();
    }
  },

  methods: {
    // 格式化查看次数，例如：1000 -> 1k
    formatViewCount() {
      const viewCount = this.data.trip.viewCount || 0;
      let formatted = '';
      
      if (viewCount >= 10000) {
        formatted = (viewCount / 10000).toFixed(1) + 'w';
      } else if (viewCount >= 1000) {
        formatted = (viewCount / 1000).toFixed(1) + 'k';
      } else {
        formatted = viewCount.toString();
      }
      
      this.setData({
        formattedViewCount: formatted
      });
    },

    // 导航到行程详情页
    navigateToDetail() {
      const tripId = this.data.trip.id;
      wx.navigateTo({
        url: `/pages/trip-detail/trip-detail?id=${tripId}`
      });
    }
  }
}); 