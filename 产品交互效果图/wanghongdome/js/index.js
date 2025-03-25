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
                followers: 45,
                earnings: 45*100,
                completedTrips: 15,
                ongoingTrips: 3,
                totalEarnings: 45*100
            },
            
            // 未读通知数量
            unreadNotifications: 2,
            
            // 城市选择器
            currentCity: '珠海',
            showCitySelectorModal: false,
            citySearchText: '',
            hotCities: ['北京', '上海', '广州', '深圳', '珠海', '杭州', '成都', '重庆', '西安'],
            allCities: {
                'A': ['安庆', '鞍山', '安阳'],
                'B': ['北京', '保定', '包头', '宝鸡', '蚌埠'],
                'C': ['长沙', '长春', '成都', '重庆', '常州', '常德'],
                'D': ['大连', '东莞', '大庆', '东营', '德州'],
                'F': ['福州', '佛山', '抚顺', '阜阳'],
                'G': ['广州', '贵阳', '桂林', '赣州'],
                'H': ['杭州', '合肥', '哈尔滨', '海口', '惠州', '邯郸', '湖州'],
                'J': ['济南', '嘉兴', '金华', '江门', '吉林', '锦州'],
                'K': ['昆明', '开封'],
                'L': ['兰州', '拉萨', '廊坊', '临沂', '洛阳', '连云港'],
                'M': ['绵阳', '牡丹江', '马鞍山'],
                'N': ['南京', '宁波', '南昌', '南宁', '南通'],
                'Q': ['青岛', '泉州', '秦皇岛', '齐齐哈尔'],
                'S': ['上海', '深圳', '苏州', '沈阳', '石家庄', '汕头', '绍兴'],
                'T': ['天津', '太原', '唐山', '台州', '泰州'],
                'W': ['武汉', '无锡', '温州', '乌鲁木齐', '威海'],
                'X': ['西安', '厦门', '徐州', '西宁', '新乡'],
                'Y': ['烟台', '扬州', '宜昌', '岳阳', '银川'],
                'Z': ['珠海', '郑州', '中山', '镇江', '湛江', '肇庆']
            },
            
            // 推荐行程
            recommendedTrips: [
                {
                    id: 101,
                    title: '珠海长隆海洋王国亲子2日游',
                    destination: '珠海长隆海洋王国',
                    date: '2024-06-15',
                    image: '../img/test.png',
                    commission: '1,280',
                    currentParticipants: 27,
                    maxParticipants: 30,
                    hasInfluencer: true,
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
                    currentParticipants: 18,
                    maxParticipants: 25,
                    hasInfluencer: false,
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
                    currentParticipants: 12,
                    maxParticipants: 15,
                    hasInfluencer: true,
                    status: {
                        type: 'limited',
                        text: '即将满员'
                    }
                }
            ],
            
            // 热门目的地
            popularDestinations: [
                {
                    id: 'dest1',
                    name: '珠海长隆海洋王国',
                    image: '../img/test.png',
                    tripCount: 12
                },
                {
                    id: 'dest2',
                    name: '珠海外伶仃岛',
                    image: '../img/test.png',
                    tripCount: 8
                },
                {
                    id: 'dest3',
                    name: '珠海情侣路',
                    image: '../img/test.png',
                    tripCount: 10
                },
                {
                    id: 'dest4',
                    name: '珠海圆明新园',
                    image: '../img/test.png',
                    tripCount: 6
                },
                {
                    id: 'dest5',
                    name: '珠海横琴',
                    image: '../img/test.png',
                    tripCount: 9
                }
            ],
            
            // 是否已登录
            isLoggedIn: false,
            
            // 是否加载中
            isLoading: true
        }
    },
    computed: {
        // 根据搜索过滤城市
        filteredCities() {
            if (!this.citySearchText) {
                return this.allCities;
            }
            
            const result = {};
            const searchText = this.citySearchText.toLowerCase();
            
            for (const [initial, cities] of Object.entries(this.allCities)) {
                const filteredCities = cities.filter(city => 
                    city.toLowerCase().includes(searchText)
                );
                
                if (filteredCities.length > 0) {
                    result[initial] = filteredCities;
                }
            }
            
            return result;
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
        
        // 显示城市选择器
        showCitySelector() {
            this.showCitySelectorModal = true;
            // 禁止背景滚动
            document.body.style.overflow = 'hidden';
        },
        
        // 关闭城市选择器
        closeCitySelector() {
            this.showCitySelectorModal = false;
            // 恢复背景滚动
            document.body.style.overflow = 'auto';
            // 清空搜索文本
            this.citySearchText = '';
        },
        
        // 选择城市
        selectCity(city) {
            this.currentCity = city;
            // 保存选择的城市到本地存储
            localStorage.setItem('currentCity', city);
            // 关闭城市选择器
            this.closeCitySelector();
            // 根据选择的城市更新推荐行程和热门目的地
            this.updateRecommendations();
            // 显示提示
            this.showToast(`已切换到${city}`);
        },
        
        // 根据城市更新推荐内容
        updateRecommendations() {
            // 实际项目中应该从API获取数据
            // 这里仅做简单模拟
            if (this.currentCity !== '珠海') {
                // 模拟其他城市的数据
                this.recommendedTrips = [
                    {
                        id: 201,
                        title: `${this.currentCity}热门景点一日游`,
                        destination: `${this.currentCity}景点`,
                        date: '2024-07-10',
                        image: '../img/test.png',
                        commission: '1,180',
                        currentParticipants: 15,
                        maxParticipants: 20,
                        hasInfluencer: true,
                        status: {
                            type: 'hot',
                            text: '热门'
                        }
                    },
                    {
                        id: 202,
                        title: `${this.currentCity}美食探索之旅`,
                        destination: `${this.currentCity}市中心`,
                        date: '2024-07-15',
                        image: '../img/test.png',
                        commission: '980',
                        currentParticipants: 8,
                        maxParticipants: 15,
                        hasInfluencer: false,
                        status: {
                            type: 'new',
                            text: '新上线'
                        }
                    }
                ];
                
                this.popularDestinations = [
                    {
                        id: 101,
                        name: `${this.currentCity}景点1`,
                        image: '../img/test.png',
                        tripCount: 5
                    },
                    {
                        id: 102,
                        name: `${this.currentCity}景点2`,
                        image: '../img/test.png',
                        tripCount: 3
                    },
                    {
                        id: 103,
                        name: `${this.currentCity}景点3`,
                        image: '../img/test.png',
                        tripCount: 4
                    }
                ];
            } else {
                // 恢复珠海的原始数据
                this.loadDefaultData();
            }
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
        
        // 跳转到全部行程页
        goToAllTrips() {
            window.location.href = 'all-trips.html';
        },
        
        // 跳转到全部目的地页面
        goToAllDestinations() {
            window.location.href = 'all-destinations.html';
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
        
        // 前往服务粉丝列表页面
        goToFansServed() {
            window.location.href = 'fans-served.html';
        },
        
        // 前往行程列表页面
        goToTrips() {
            window.location.href = 'trip-list-success.html';
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
        
        /**
         * 查看行程详情
         * @param {string} tripId 行程ID
         */
        viewTripDetail(tripId) {
            // 使用AppRouter导航到推荐行程的行程详情页
            if (window.AppRouter) {
                // 查找行程，获取推荐原因
                const trip = this.recommendedTrips.find(trip => trip.id === tripId);
                let recommendReason = '';
                
                if (trip) {
                    // 根据不同的状态设置不同的推荐原因
                    if (trip.status.type === 'hot') {
                        recommendReason = '热门行程，广受网红欢迎';
                    } else if (trip.status.type === 'new') {
                        recommendReason = '新上线行程，抢先体验';
                    } else if (trip.status.type === 'limited') {
                        recommendReason = '名额有限，赶快报名';
                    } else {
                        recommendReason = '根据您的偏好推荐';
                    }
                }
                
                window.AppRouter.goToTripFromRecommended(tripId, recommendReason);
                return;
            }
            
            // 兼容旧版：直接导航到行程详情页
            window.location.href = `trip-detail-success.html?id=${tripId}`;
        },
        
        // 查看全部行程
        viewAllTrips() {
            window.location.href = 'trip-list.html?source=main';
        },
        
        /**
         * 查看景点行程
         * @param {string} destinationId 景点ID
         */
        viewDestinationTrips(destinationId) {
            // 跳转到目的地详情页
            window.location.href = `destination-detail.html?id=${destinationId}`;
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
            // 检查登录状态
            this.checkLoginStatus();
            
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
            
            // 从本地存储加载城市数据
            const savedCity = localStorage.getItem('currentCity');
            if (savedCity) {
                this.currentCity = savedCity;
                // 避免递归调用，只在城市不是珠海时更新推荐内容
                if (savedCity !== '珠海') {
                    this.updateRecommendations();
                }
            } else {
                localStorage.setItem('currentCity', this.currentCity);
            }
        },
        
        // 检查登录状态
        checkLoginStatus() {
            // 从localStorage获取登录状态
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            // 如果未登录，重定向到登录页面
            if (!isLoggedIn) {
                window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
                return;
            }
            
            // 获取用户信息
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            
            // 更新页面用户信息
            if (userInfo && userInfo.id) {
                this.influencer.name = userInfo.name || this.influencer.name;
                this.influencer.avatar = userInfo.avatar || this.influencer.avatar;
                this.isLoggedIn = true;
            }
        },
        
        // 加载默认数据（珠海）
        loadDefaultData() {
            // 恢复珠海的原始推荐行程数据
            this.recommendedTrips = [
                {
                    id: 101,
                    title: '珠海长隆海洋王国亲子2日游',
                    destination: '珠海长隆海洋王国',
                    date: '2024-06-15',
                    image: '../img/test.png',
                    commission: '1,280',
                    currentParticipants: 27,
                    maxParticipants: 30,
                    hasInfluencer: true,
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
                    currentParticipants: 18,
                    maxParticipants: 25,
                    hasInfluencer: false,
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
                    currentParticipants: 12,
                    maxParticipants: 15,
                    hasInfluencer: true,
                    status: {
                        type: 'limited',
                        text: '即将满员'
                    }
                }
            ];
            
            // 恢复珠海的原始热门目的地数据
            this.popularDestinations = [
                {
                    id: 1,
                    name: '珠海长隆海洋王国',
                    image: '../img/test.png',
                    tripCount: 12
                },
                {
                    id: 2,
                    name: '珠海外伶仃岛',
                    image: '../img/test.png',
                    tripCount: 8
                },
                {
                    id: 3,
                    name: '珠海情侣路',
                    image: '../img/test.png',
                    tripCount: 10
                },
                {
                    id: 4,
                    name: '珠海圆明新园',
                    image: '../img/test.png',
                    tripCount: 6
                },
                {
                    id: 5,
                    name: '珠海横琴',
                    image: '../img/test.png',
                    tripCount: 9
                }
            ];
        }
    },
    mounted() {
        // 初始化页面
        this.initPage();
    }
}).mount('#app'); 