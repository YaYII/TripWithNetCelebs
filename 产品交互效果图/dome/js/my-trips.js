// 创建Vue应用
const app = Vue.createApp({
    data() {
        return {
            activeTab: 'upcoming', // 默认显示即将出行的行程
            allTrips: [
                {
                    id: 1,
                    title: '珠海长隆海洋王国亲子游',
                    location: '广东，珠海',
                    startDate: '2023-04-05',
                    endDate: '2023-04-07',
                    image: '../img/test.png',
                    status: '确认出行',
                    daysLeft: 15,
                    isPast: false,
                    isCancelled: false
                },
                {
                    id: 2,
                    title: '珠海横琴度假之旅',
                    location: '广东，珠海',
                    startDate: '2023-05-20',
                    endDate: '2023-05-22',
                    image: '../img/test.png',
                    status: '确认出行',
                    daysLeft: 45,
                    isPast: false,
                    isCancelled: false
                },
                {
                    id: 3,
                    title: '珠海情侣路海滨游',
                    location: '广东，珠海',
                    startDate: '2023-03-10',
                    endDate: '2023-03-12',
                    image: '../img/test.png',
                    status: '已完成',
                    daysLeft: 0,
                    isPast: true,
                    isCancelled: false
                },
                {
                    id: 4,
                    title: '珠海外伶仃岛探索',
                    location: '广东，珠海',
                    startDate: '2023-06-15',
                    endDate: '2023-06-17',
                    image: '../img/test.png',
                    status: '已取消',
                    daysLeft: 75,
                    isPast: false,
                    isCancelled: true
                },
                {
                    id: 5,
                    title: '珠海圆明新园文化之旅',
                    location: '广东，珠海',
                    startDate: '2023-02-05',
                    endDate: '2023-02-07',
                    image: '../img/test.png',
                    status: '已完成',
                    daysLeft: 0,
                    isPast: true,
                    isCancelled: false
                }
            ]
        };
    },
    computed: {
        // 根据当前选中的标签过滤行程
        filteredTrips() {
            if (this.activeTab === 'upcoming') {
                return this.allTrips.filter(trip => !trip.isPast && !trip.isCancelled);
            } else if (this.activeTab === 'cancelled') {
                return this.allTrips.filter(trip => trip.isCancelled);
            } else if (this.activeTab === 'completed') {
                return this.allTrips.filter(trip => trip.isPast);
            }
            return [];
        }
    },
    methods: {
        // 设置当前活动标签
        setActiveTab(tab) {
            this.activeTab = tab;
        },
        
        // 查看行程详情
        viewTripDetail(tripId) {
            window.location.href = `trip-detail-success.html?id=${tripId}`;
        },
        
        // 返回上一页
        goBack() {
            window.history.back();
        },
        
        // 获取状态标签的CSS类
        getStatusClass(trip) {
            if (trip.isCancelled) {
                return 'status-cancelled';
            } else if (trip.isPast) {
                return 'status-completed';
            } else {
                return 'status-upcoming';
            }
        },
        
        // 获取状态文本
        getStatusText(trip) {
            if (trip.isCancelled) {
                return '已取消';
            } else if (trip.isPast) {
                return '已完成';
            } else {
                return '即将出行';
            }
        },
        
        // 导航到其他页面
        navigate(page) {
            switch (page) {
                case 'home':
                    window.location.href = 'home.html';
                    break;
                case 'trips':
                    window.location.href = 'trips.html';
                    break;
                case 'profile':
                    window.location.href = 'profile.html';
                    break;
            }
        }
    }
});

// 挂载Vue应用
app.mount('#app'); 