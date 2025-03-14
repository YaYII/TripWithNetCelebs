const { createApp } = Vue

createApp({
    data() {
        return {
            currentPage: 'trips',
            // 用户行程数据 - 空数组表示没有行程
            userTrips: [],
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
    },
    methods: {
        // 查看行程详情
        viewTripDetail(tripId) {
            window.location.href = `trip-detail.html?id=${tripId}`;
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