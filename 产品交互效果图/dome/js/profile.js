const { createApp } = Vue

createApp({
    data() {
        return {
            currentPage: 'profile',
            userInfo: {
                nickname: '旅行达人',
                uid: '12345678',
                avatar: '../img/placeholder-logo.png'
            },
            stats: {
                trips: 12,
                favorites: 45,
                followers: 28,
                fans: 156
            },
            // 添加用户行程数据
            userTrips: [
                {
                    id: 1,
                    title: '珠海长隆海洋王国亲子游',
                    location: '广东，珠海',
                    startDate: '2023-04-10',
                    endDate: '2023-04-12',
                    image: '../img/placeholder-logo.png',
                    status: '即将出发',
                    daysLeft: 5
                },
                {
                    id: 2,
                    title: '珠海横琴度假之旅',
                    location: '广东，珠海',
                    startDate: '2023-05-15',
                    endDate: '2023-05-17',
                    image: '../img/placeholder-logo.png',
                    status: '计划中',
                    daysLeft: 40
                },
                {
                    id: 3,
                    title: '珠海情侣路海滨游',
                    location: '广东，珠海',
                    startDate: '2023-06-20',
                    endDate: '2023-06-22',
                    image: '../img/placeholder-logo.png',
                    status: '计划中',
                    daysLeft: 76
                }
            ],
            // 添加显示行程部分的控制变量
            showTrips: false
        }
    },
    mounted() {
        // 初始化导航栏
        initNavBar(this.currentPage);
        
        // 按照出发时间排序行程
        this.sortTripsByDate();
    },
    methods: {
        // 按照出发时间排序行程
        sortTripsByDate() {
            this.userTrips.sort((a, b) => {
                return new Date(a.startDate) - new Date(b.startDate);
            });
        },
        // 切换显示行程部分
        toggleTrips() {
            this.showTrips = !this.showTrips;
        },
        // 查看行程详情
        viewTripDetail(tripId) {
            window.location.href = `trip-detail.html?id=${tripId}`;
        },
        editProfile() {
            console.log('编辑个人资料');
            // 待实现：跳转到编辑资料页面
            // window.location.href = 'edit-profile.html';
        },
        viewItems(type) {
            console.log('查看', type);
            // 根据类型跳转到不同页面
            switch (type) {
                case 'trips':
                    window.location.href = 'my-trips.html';
                    break;
                case 'favorites':
                    // window.location.href = 'my-favorites.html';
                    break;
                case 'followers':
                    // window.location.href = 'my-followers.html';
                    break;
                case 'fans':
                    // window.location.href = 'my-fans.html';
                    break;
            }
        },
        navigate(page) {
            console.log('导航到', page);
            switch (page) {
                case 'home':
                    window.location.href = 'home.html';
                    break;
                case 'trips':
                    window.location.href = 'trips.html';
                    break;
                case 'all-orders':
                    // window.location.href = 'orders.html?type=all';
                    break;
                case 'unpaid':
                    // window.location.href = 'orders.html?type=unpaid';
                    break;
                case 'to-travel':
                    // window.location.href = 'orders.html?type=to-travel';
                    break;
                case 'to-review':
                    // window.location.href = 'orders.html?type=to-review';
                    break;
                case 'favorite':
                    // window.location.href = 'favorite.html';
                    break;
                case 'history':
                    // window.location.href = 'history.html';
                    break;
                case 'coupon':
                    // window.location.href = 'coupon.html';
                    break;
                case 'customer-service':
                    // window.location.href = 'customer-service.html';
                    break;
                case 'account-security':
                    // window.location.href = 'account-security.html';
                    break;
                case 'settings':
                    // window.location.href = 'settings.html';
                    break;
                case 'about':
                    // window.location.href = 'about.html';
                    break;
            }
        },
        logout() {
            console.log('退出登录');
            // 待实现：退出登录逻辑
            // 清除本地存储的登录信息
            // localStorage.removeItem('userToken');
            // 跳转到登录页
            // window.location.href = 'login.html';
        }
    }
}).mount('#app'); 