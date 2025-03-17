// 首页 JavaScript
const { createApp } = Vue

createApp({
    data() {
        return {
            // 网红用户信息
            influencer: {
                id: 1,
                name: '旅行达人小王',
                avatar: '../img/potato.png',
                followers: 156000,
                earnings: 156000,
                completedTrips: 15,
                ongoingTrips: 3,
                totalEarnings: 25680
            },
            
            // 未读通知数量
            unreadNotifications: 2,
            
            // 推荐行程
            recommendedTrips: [
                {
                    id: 101,
                    title: '珠海长隆海洋王国亲子2日游',
                    destination: '珠海长隆海洋王国',
                    date: '2024-06-15',
                    image: '../img/test.png',
                    commission: '1,280',
                    status: {
                        type: 'hot',
                        text: '热门'
                    }
                },
                {
                    id: 102,
                    title: '珠海外伶仃岛探险之旅',
                    destination: '珠海外伶仃岛',
                    date: '2024-06-22',
                    image: '../img/test.png',
                    commission: '1,500',
                    status: {
                        type: 'new',
                        text: '新上线'
                    }
                },
                {
                    id: 103,
                    title: '珠海情侣路摄影之旅',
                    destination: '珠海情侣路',
                    date: '2024-06-19',
                    image: '../img/test.png',
                    commission: '980',
                    status: {
                        type: 'limited',
                        text: '即将满员'
                    }
                }
            ],
            
            // 热门目的地
            popularDestinations: [
                {
                    id: 1,
                    name: '珠海长隆海洋王国',
                    image: '../img/test.png',
                    tripsCount: 12
                },
                {
                    id: 2,
                    name: '珠海外伶仃岛',
                    image: '../img/test.png',
                    tripsCount: 8
                },
                {
                    id: 3,
                    name: '珠海情侣路',
                    image: '../img/test.png',
                    tripsCount: 10
                },
                {
                    id: 4,
                    name: '珠海圆明新园',
                    image: '../img/test.png',
                    tripsCount: 6
                },
                {
                    id: 5,
                    name: '珠海横琴',
                    image: '../img/test.png',
                    tripsCount: 9
                }
            ]
        }
    },
    methods: {
        // 格式化数字，超过1万显示为x.x万
        formatNumber(num) {
            if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万';
            }
            return num.toString();
        },
        
        // 前往通知页面
        goToNotifications() {
            // 实际项目中应该跳转到通知页面
            this.showToast('通知功能即将上线');
        },
        
        // 前往行程列表页面
        goToTripList() {
            window.location.href = 'trip-list.html';
        },
        
        // 前往订单中心页面
        goToOrders() {
            window.location.href = 'orders.html';
        },
        
        // 前往收益管理页面
        goToEarnings() {
            // 实际项目中应该跳转到收益管理页面
            this.showToast('收益管理功能即将上线');
        },
        
        // 前往粉丝数据页面
        goToFans() {
            // 实际项目中应该跳转到粉丝数据页面
            this.showToast('粉丝数据功能即将上线');
        },
        
        // 前往个人中心页面
        goToProfile() {
            window.location.href = 'profile.html';
        },
        
        // 查看行程详情
        viewTripDetail(tripId) {
            window.location.href = `trip-detail.html?id=${tripId}`;
        },
        
        // 查看目的地相关行程
        viewDestinationTrips(destinationId) {
            window.location.href = `trip-list.html?destination=${destinationId}`;
        },
        
        // 显示提示信息
        showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(toast);
                    }, 300);
                }, 2000);
            }, 100);
        },
        
        // 初始化页面
        initPage() {
            // 从本地存储加载用户数据
            const savedUser = localStorage.getItem('influencer');
            if (savedUser) {
                this.influencer = JSON.parse(savedUser);
            } else {
                // 如果没有保存的用户数据，保存当前模拟数据
                localStorage.setItem('influencer', JSON.stringify(this.influencer));
            }
            
            // 从本地存储加载通知数据
            const savedNotifications = localStorage.getItem('unreadNotifications');
            if (savedNotifications) {
                this.unreadNotifications = parseInt(savedNotifications);
            } else {
                localStorage.setItem('unreadNotifications', this.unreadNotifications.toString());
            }
        }
    },
    mounted() {
        // 初始化页面
        this.initPage();
    }
}).mount('#app'); 