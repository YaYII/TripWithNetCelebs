const { createApp } = Vue

const app = createApp({
    data() {
        return {
            orderInfo: {
                orderNumber: 'MD202403150001',
                status: 'pending',
                statusText: '待支付',
                createTime: '2024-03-15 14:30:00',
                validityTime: '2024-03-16 14:30:00',
                adultCount: 2,
                childCount: 1,
                totalPrice: 0
            },
            tripInfo: {
                title: '珠海长隆海洋王国2日游',
                departureDate: '2024-03-20',
                meetingTime: '09:00',
                meetingPoint: '珠海长隆海洋王国正门',
                influencer: {
                    name: '旅行达人小美',
                    avatar: '../img/potato.png',
                    followers: '50万+'
                }
            },
            prices: {
                adult: 999,
                child: 699
            },
            countdown: {
                hours: 0,
                minutes: 0,
                seconds: 0,
                expired: false,
                timer: null
            },
            showCancelSuccess: false, // 控制取消成功提示的显示
            showCancelModal: false, // 控制取消确认弹窗的显示
            referrer: document.referrer || 'index.html', // 存储来源页面，默认为首页
            showRefundRules: false,
            showPaymentInfo: false,
        }
    },
    computed: {
        totalPrice() {
            return this.orderInfo.adultCount * this.prices.adult + 
                   this.orderInfo.childCount * this.prices.child
        },
        countdownText() {
            if (this.countdown.expired) {
                return '免费取消期已过';
            }
            
            const hours = this.countdown.hours.toString().padStart(2, '0');
            const minutes = this.countdown.minutes.toString().padStart(2, '0');
            const seconds = this.countdown.seconds.toString().padStart(2, '0');
            
            return `免费取消倒计时: ${hours}:${minutes}:${seconds}`;
        },
        canCancelFreely() {
            return !this.countdown.expired;
        }
    },
    methods: {
        goBack() {
            // 返回上一页，如果没有上一页则返回首页
            if (this.referrer && this.referrer !== '') {
                window.location.href = this.referrer;
            } else {
                window.location.href = 'index.html';
            }
        },
        openCancelModal() {
            // 打开取消订单确认弹窗
            this.showCancelModal = true;
        },
        closeCancelModal() {
            // 关闭取消订单确认弹窗
            this.showCancelModal = false;
        },
        confirmCancel() {
            // 确认取消订单
            this.orderInfo.status = 'cancelled';
            this.orderInfo.statusText = '已取消';
            
            // 关闭弹窗
            this.showCancelModal = false;
            
            // 停止倒计时
            if (this.countdown.timer) {
                clearInterval(this.countdown.timer);
            }
            
            // 取消成功后直接返回上一页
            this.goBack();
        },
        payOrder() {
            // 直接支付成功，不弹窗确认
            this.orderInfo.status = 'paid';
            this.orderInfo.statusText = '已支付';
            
            // 停止倒计时
            if (this.countdown.timer) {
                clearInterval(this.countdown.timer);
            }
            
            // 跳转到支付成功页面
            window.location.href = 'payment-success.html';
        },
        applyRefund() {
            // 直接申请退款，不弹窗确认
            this.orderInfo.status = 'refunding';
            this.orderInfo.statusText = '退款中';
        },
        startCountdown() {
            // 计算从下单时间开始的60分钟倒计时
            const orderTime = new Date(this.orderInfo.createTime);
            const endTime = new Date(orderTime.getTime() + 60 * 60 * 1000); // 60分钟后
            
            this.updateCountdown(endTime);
            
            // 设置倒计时定时器，每秒更新一次
            this.countdown.timer = setInterval(() => {
                this.updateCountdown(endTime);
            }, 1000);
        },
        updateCountdown(endTime) {
            const now = new Date();
            const diff = endTime - now;
            
            if (diff <= 0) {
                // 倒计时结束
                this.countdown.hours = 0;
                this.countdown.minutes = 0;
                this.countdown.seconds = 0;
                this.countdown.expired = true;
                
                // 清除定时器
                clearInterval(this.countdown.timer);
                return;
            }
            
            // 计算剩余时间
            const hours = Math.floor(diff / (1000 * 60 * 60));
            const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
            const seconds = Math.floor((diff % (1000 * 60)) / 1000);
            
            this.countdown.hours = hours;
            this.countdown.minutes = minutes;
            this.countdown.seconds = seconds;
            this.countdown.expired = false;
        },
        toggleRefundRules() {
            this.showRefundRules = !this.showRefundRules;
        },
        togglePaymentInfo() {
            this.showPaymentInfo = !this.showPaymentInfo;
        },
    },
    mounted() {
        // 计算订单总价
        this.orderInfo.totalPrice = this.totalPrice;
        
        // 启动倒计时
        this.startCountdown();
        
        // 获取来源页面
        if (document.referrer) {
            this.referrer = document.referrer;
        } else if (sessionStorage.getItem('referrer')) {
            // 如果URL中没有referrer，尝试从sessionStorage获取
            this.referrer = sessionStorage.getItem('referrer');
        }
        
        // 存储当前页面作为referrer，供其他页面使用
        sessionStorage.setItem('currentPage', window.location.href);
    },
    beforeUnmount() {
        // 组件销毁前清除定时器
        if (this.countdown.timer) {
            clearInterval(this.countdown.timer);
        }
    }
})

app.mount('#app')