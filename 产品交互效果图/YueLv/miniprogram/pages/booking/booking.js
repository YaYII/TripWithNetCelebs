// booking.js

// 模拟获取行程详情数据
const getTripDetail = (id) => {
  return {
    id: id,
    title: '香港迪士尼乐园一日游',
    image: '/static/images/trips/disney1.jpg',
    price: 688,
    duration: '1天',
    departureDate: '2023-10-20',
    maxParticipants: 15,
    currentParticipants: 8
  };
};

Page({
  data: {
    tripId: '',
    trip: {},
    personCount: 1,
    contactName: '',
    contactPhone: '',
    remark: '',
    discount: 0,
    totalPrice: 0
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
  loadTripDetail(id) {
    // 实际应用中，可能需要从服务器获取数据
    const trip = getTripDetail(id);
    this.setData({
      trip,
      totalPrice: trip.price // 初始化总价（1人）
    });
  },

  // 减少预订人数
  decreasePerson() {
    if (this.data.personCount <= 1) return;
    
    const newCount = this.data.personCount - 1;
    this.setData({
      personCount: newCount,
      totalPrice: this.calculateTotalPrice(newCount)
    });
  },

  // 增加预订人数
  increasePerson() {
    const { trip, personCount } = this.data;
    const remainingSlots = trip.maxParticipants - trip.currentParticipants;
    
    if (personCount >= remainingSlots) return;
    
    const newCount = personCount + 1;
    this.setData({
      personCount: newCount,
      totalPrice: this.calculateTotalPrice(newCount)
    });
  },

  // 计算总价
  calculateTotalPrice(personCount) {
    const { trip, discount } = this.data;
    return (trip.price * personCount) - discount;
  },

  // 联系人姓名输入
  onContactNameInput(e) {
    this.setData({
      contactName: e.detail.value
    });
  },

  // 联系人手机号输入
  onContactPhoneInput(e) {
    this.setData({
      contactPhone: e.detail.value
    });
  },

  // 备注输入
  onRemarkInput(e) {
    this.setData({
      remark: e.detail.value
    });
  },

  // 提交订单
  submitOrder() {
    const { contactName, contactPhone, personCount } = this.data;
    
    // 表单验证
    if (!contactName) {
      wx.showToast({
        title: '请输入联系人姓名',
        icon: 'none'
      });
      return;
    }
    
    if (!contactPhone || !/^1\d{10}$/.test(contactPhone)) {
      wx.showToast({
        title: '请输入正确的手机号',
        icon: 'none'
      });
      return;
    }
    
    // 显示加载中
    wx.showLoading({
      title: '提交中...',
      mask: true
    });
    
    // 模拟提交订单
    setTimeout(() => {
      wx.hideLoading();
      
      // 跳转到支付成功页面
      wx.navigateTo({
        url: `/pages/booking-success/booking-success?orderId=ORD${Date.now()}&amount=${this.data.totalPrice}`
      });
    }, 1500);
  }
}); 