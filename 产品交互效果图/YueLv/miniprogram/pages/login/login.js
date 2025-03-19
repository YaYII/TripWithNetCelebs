// login.js
Page({
  data: {
    phone: '',
    verifyCode: '',
    agreedToTerms: false,
    counting: false,
    countdown: 60,
    canLogin: false
  },
  
  onLoad() {
    // 检查是否有缓存的手机号
    const phone = wx.getStorageSync('userPhone');
    if (phone) {
      this.setData({
        phone
      });
    }
  },
  
  // 输入手机号
  onPhoneInput(e) {
    const phone = e.detail.value;
    this.setData({
      phone
    });
    this.checkCanLogin();
  },
  
  // 输入验证码
  onCodeInput(e) {
    const verifyCode = e.detail.value;
    this.setData({
      verifyCode
    });
    this.checkCanLogin();
  },
  
  // 检查是否可以登录
  checkCanLogin() {
    const { phone, verifyCode, agreedToTerms } = this.data;
    const canLogin = phone.length === 11 && verifyCode.length === 6 && agreedToTerms;
    this.setData({
      canLogin
    });
  },
  
  // 发送验证码
  sendVerifyCode() {
    const { phone, counting } = this.data;
    
    if (counting || !phone || phone.length !== 11) {
      return;
    }
    
    // 模拟发送验证码
    wx.showToast({
      title: '验证码已发送',
      icon: 'success',
      duration: 1500
    });
    
    // 开始倒计时
    this.startCountdown();
  },
  
  // 开始倒计时
  startCountdown() {
    this.setData({
      counting: true,
      countdown: 60
    });
    
    const countdownInterval = setInterval(() => {
      if (this.data.countdown <= 1) {
        clearInterval(countdownInterval);
        this.setData({
          counting: false
        });
        return;
      }
      
      this.setData({
        countdown: this.data.countdown - 1
      });
    }, 1000);
  },
  
  // 切换协议同意状态
  toggleAgreement() {
    this.setData({
      agreedToTerms: !this.data.agreedToTerms
    });
    this.checkCanLogin();
  },
  
  // 查看用户协议
  viewTerms() {
    wx.showModal({
      title: '用户协议',
      content: '这里是用户协议内容...',
      showCancel: false
    });
  },
  
  // 查看隐私政策
  viewPrivacy() {
    wx.showModal({
      title: '隐私政策',
      content: '这里是隐私政策内容...',
      showCancel: false
    });
  },
  
  // 登录
  login() {
    const { phone, verifyCode, canLogin } = this.data;
    
    if (!canLogin) {
      return;
    }
    
    wx.showLoading({
      title: '登录中...',
      mask: true
    });
    
    // 模拟登录请求
    setTimeout(() => {
      wx.hideLoading();
      
      // 保存用户信息
      const mockUserInfo = {
        nickName: '用户' + phone.substring(7),
        avatarUrl: '/static/images/default-avatar.png'
      };
      
      wx.setStorageSync('userInfo', mockUserInfo);
      wx.setStorageSync('userPhone', phone);
      
      wx.showToast({
        title: '登录成功',
        icon: 'success',
        duration: 1500
      });
      
      // 返回上一页
      setTimeout(() => {
        wx.navigateBack();
      }, 1500);
    }, 1500);
  },
  
  // 微信登录
  wechatLogin() {
    wx.showToast({
      title: '暂不支持微信登录',
      icon: 'none',
      duration: 1500
    });
  }
});