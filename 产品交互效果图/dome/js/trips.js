const { createApp } = Vue

createApp({
    data() {
        return {
            currentPage: 'trips',
            isIPhone16: false,
            // 用户行程数据
            userTrips: [
                // 这里可以根据实际情况设置为空数组或者添加用户行程
                // 如果设置为空数组，则会显示"暂无行程"和推荐行程
                // 如果添加行程数据，则只显示用户行程
                {
                    id: 201,
                    title: '珠海长隆海洋王国2日游',
                    location: '广东，珠海',
                    startDate: '2023-04-15',
                    endDate: '2023-04-16',
                    image: '../img/test.png',
                    status: '即将出行',
                    daysLeft: 25
                },
                {
                    id: 202,
                    title: '珠海横琴澳门3日游',
                    location: '广东，珠海/澳门',
                    startDate: '2023-05-10',
                    endDate: '2023-05-12',
                    image: '../img/test.png',
                    status: '计划中',
                    daysLeft: 40
                }
            ],
            // 推荐行程数据
            recommendedTrips: [
                {
                    id: 101,
                    title: '珠海长隆海洋王国2日游',
                    location: '广东，珠海',
                    startDate: '2023-04-15',
                    endDate: '2023-04-16',
                    image: '../img/test.png',
                    status: '热门推荐',
                    daysLeft: 25,
                    isPast: false,
                    isCancelled: false
                },
                {
                    id: 102,
                    title: '珠海横琴澳门3日游',
                    location: '广东，珠海/澳门',
                    startDate: '2023-05-10',
                    endDate: '2023-05-12',
                    image: '../img/test.png',
                    status: '限时优惠',
                    daysLeft: 40,
                    isPast: false,
                    isCancelled: false
                },
                {
                    id: 103,
                    title: '珠海情侣路+渔女雕像1日游',
                    location: '广东，珠海',
                    startDate: '2023-06-05',
                    endDate: '2023-06-05',
                    image: '../img/test.png',
                    status: '新品上线',
                    daysLeft: 65,
                    isPast: false,
                    isCancelled: false
                },
                {
                    id: 104,
                    title: '珠海外伶仃岛2日游',
                    location: '广东，珠海',
                    startDate: '2023-07-10',
                    endDate: '2023-07-11',
                    image: '../img/test.png',
                    status: '热门推荐',
                    daysLeft: 100,
                    isPast: false,
                    isCancelled: false
                },
                {
                    id: 105,
                    title: '珠海圆明新园+御温泉2日游',
                    location: '广东，珠海',
                    startDate: '2023-08-15',
                    endDate: '2023-08-16',
                    image: '../img/test.png',
                    status: '限时优惠',
                    daysLeft: 135,
                    isPast: false,
                    isCancelled: false
                }
            ]
        }
    },
    computed: {
        // 判断用户是否有行程
        hasUserTrips() {
            return this.userTrips.length > 0;
        },
        
        // 过滤出推荐行程（不包含历史行程和已取消行程）
        filteredRecommendedTrips() {
            return this.recommendedTrips.filter(trip => !trip.isPast && !trip.isCancelled);
        }
    },
    mounted() {
        // 初始化导航栏
        initNavBar(this.currentPage);
        
        // 检测是否为iPhone 16
        this.detectDevice();
        
        // 监听窗口大小变化
        window.addEventListener('resize', this.detectDevice);
    },
    methods: {
        // 检测设备类型
        detectDevice() {
            // 检测是否为iPhone 16
            this.isIPhone16 = this.checkIsIPhone16();
            
            // 如果是iPhone 16，添加特定类名
            if (this.isIPhone16) {
                document.documentElement.classList.add('iphone16');
                document.body.classList.add('iphone16');
            } else {
                document.documentElement.classList.remove('iphone16');
                document.body.classList.remove('iphone16');
            }
        },
        
        // 检查是否为iPhone 16
        checkIsIPhone16() {
            // iPhone 16 Pro 的尺寸是 393 x 852
            const isIPhone16Size = window.screen.width === 393 && window.screen.height === 852;
            // 或者反过来（横屏情况）
            const isIPhone16SizeLandscape = window.screen.width === 852 && window.screen.height === 393;
            
            return isIPhone16Size || isIPhone16SizeLandscape;
        },
        
        // 查看行程详情
        viewTripDetail(tripId) {
            window.location.href = `trip-detail-success.html?id=${tripId}`;
        },
        
        // 返回上一页
        goBack() {
            window.history.back();
        },
        
        // 导航到其他页面
        navigate(page) {
            switch (page) {
                case 'home':
                    window.location.href = 'home.html';
                    break;
                case 'profile':
                    window.location.href = 'profile.html';
                    break;
                default:
                    break;
            }
        }
    }
}).mount('#app'); 