// 行程管理 JavaScript
const { createApp } = Vue

createApp({
    data() {
        return {
            // 当前选中的标签
            activeTab: 'all',
            
            // 行程列表
            trips: [],
            
            // 是否正在加载
            loading: true,
            
            // 标签列表
            tabs: [
                { id: 'all', name: '全部行程' },
                { id: 'upcoming', name: '即将开始' },
                { id: 'ongoing', name: '进行中' },
                { id: 'completed', name: '已结束' }
            ]
        }
    },
    computed: {
        // 根据当前选中的标签过滤行程
        filteredTrips() {
            const today = new Date();
            let result = [];
            
            // 根据选择的标签过滤行程并更新状态
            this.trips.forEach(trip => {
                const tripDate = new Date(trip.date);
                const endDate = new Date(tripDate);
                
                // 根据行程时长计算结束日期
                if (typeof trip.duration === 'string' && trip.duration.includes('天')) {
                    const days = parseInt(trip.duration);
                    endDate.setDate(endDate.getDate() + days - 1);
                }
                
                // 创建行程副本，以便修改状态
                const tripCopy = { ...trip };
                
                // 根据时间确定行程状态类型
                if (tripDate > today) {
                    // 即将开始的行程
                    tripCopy.timeStatus = 'upcoming';
                    
                    // 根据报名情况设置状态显示
                    const ratio = tripCopy.currentParticipants / tripCopy.maxParticipants;
                    if (ratio === 1) {
                        tripCopy.status = { type: 'hot', text: '名额已满' };
                    } else if (ratio >= 0.8) {
                        tripCopy.status = { type: 'hot', text: '即将满员' };
                    } else if (tripCopy.currentParticipants < 3) {
                        tripCopy.status = { type: 'new', text: '新上线' };
                    } else {
                        tripCopy.status = { type: 'recruiting', text: '报名中' };
                    }
                } else if (endDate >= today) {
                    // 进行中的行程
                    tripCopy.timeStatus = 'ongoing';
                    tripCopy.status = { type: 'ongoing', text: '进行中' };
                } else {
                    // 已结束的行程
                    tripCopy.timeStatus = 'completed';
                    tripCopy.status = { type: 'completed', text: '已结束' };
                }
                
                // 根据当前选择的标签过滤行程
                if (this.activeTab === 'all' || tripCopy.timeStatus === this.activeTab) {
                    result.push(tripCopy);
                }
            });
            
            return result;
        },
        
        // 是否有行程
        hasTrips() {
            return this.filteredTrips.length > 0;
        }
    },
    methods: {
        // 返回上一页
        goBack() {
            window.history.back();
        },
        
        // 切换标签
        switchTab(tabId) {
            this.activeTab = tabId;
        },
        
        // 查看行程详情
        viewTripDetail(tripId) {
            window.location.href = `trip-detail.html?id=${tripId}`;
        },
        
        // 编辑行程
        editTrip(tripId) {
            // 实际项目中应该跳转到行程编辑页面
            this.showToast('行程编辑功能即将上线');
        },
        
        // 创建新行程
        createNewTrip() {
            // 实际项目中应该跳转到行程创建页面
            this.showToast('行程创建功能即将上线');
        },
        
        // 查看报名情况
        viewParticipants(tripId) {
            window.location.href = `trip-participants.html?id=${tripId}`;
        },
        
        // 获取报名状态文本
        getEnrollmentStatusText(trip) {
            const ratio = trip.currentParticipants / trip.maxParticipants;
            
            if (ratio === 1) {
                return '已满员';
            } else if (ratio >= 0.8) {
                return '即将满员';
            } else if (ratio >= 0.5) {
                return '报名中';
            } else {
                return '招募中';
            }
        },
        
        // 获取报名状态类名
        getEnrollmentStatusClass(trip) {
            const ratio = trip.currentParticipants / trip.maxParticipants;
            
            if (ratio === 1) {
                return 'success';
            } else if (ratio >= 0.8) {
                return 'warning';
            } else {
                return 'danger';
            }
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
        
        // 加载行程数据
        loadTrips() {
            this.loading = true;
            
            // 从本地存储获取行程数据或使用模拟数据
            // 实际项目中应该从API获取数据
            setTimeout(() => {
                // 模拟数据
                this.trips = [
                    {
                        id: 101,
                        title: '珠海长隆海洋王国亲子2日游',
                        description: '跟随网红达人小丽一起探索珠海长隆海洋王国的奇妙世界，近距离接触海洋生物，观看精彩表演，体验刺激游乐设施。适合亲子家庭，将为您的孩子带来难忘的海洋探索之旅。',
                        destination: '珠海长隆海洋王国',
                        date: '2024-06-15',
                        duration: '2天1晚',
                        images: ['../img/test.png', '../img/test.png', '../img/test.png'],
                        baseCommission: '1,000',
                        bonusCommission: '280',
                        totalCommission: '1,280',
                        currentParticipants: 27,
                        maxParticipants: 30,
                        enrollmentDeadline: '2024-06-10',
                        status: {
                            type: 'hot',
                            text: '即将满员'
                        },
                        isFull: false
                    },
                    {
                        id: 102,
                        title: '珠海外伶仃岛探险之旅',
                        description: '跟随探险家小美一起探索珠海最美海岛——外伶仃岛。体验海岛风光，参与各种户外活动，拍摄精彩内容。适合户外探险爱好者和自然风光摄影师。',
                        destination: '珠海外伶仃岛',
                        date: '2024-06-22',
                        duration: '3天2晚',
                        images: ['../img/test.png', '../img/test.png', '../img/test.png'],
                        baseCommission: '1,200',
                        bonusCommission: '300',
                        totalCommission: '1,500',
                        currentParticipants: 18,
                        maxParticipants: 25,
                        enrollmentDeadline: '2024-06-15',
                        status: {
                            type: 'new',
                            text: '新上线'
                        },
                        isFull: false
                    },
                    {
                        id: 103,
                        title: '珠海情侣路摄影之旅',
                        description: '跟随摄影师阿杰探索珠海最浪漫的情侣路，捕捉日落、海景和城市风光。适合摄影爱好者和风光类内容创作者，将为您提供专业的摄影指导和创作建议。',
                        destination: '珠海情侣路',
                        date: '2024-06-19',
                        duration: '1天',
                        images: ['../img/test.png', '../img/test.png', '../img/test.png'],
                        baseCommission: '800',
                        bonusCommission: '180',
                        totalCommission: '980',
                        currentParticipants: 12,
                        maxParticipants: 15,
                        enrollmentDeadline: '2024-06-15',
                        status: {
                            type: 'limited',
                            text: '即将满员'
                        },
                        isFull: false
                    },
                    {
                        id: 105,
                        title: '珠海海泉湾温泉度假体验',
                        description: '跟随生活方式博主小雨一起探索珠海海泉湾度假区，体验世界级温泉SPA，享受高端度假服务，拍摄精美内容。适合生活方式、旅行和度假类内容创作者。',
                        destination: '珠海海泉湾',
                        date: '2024-07-12',
                        duration: '3天2晚',
                        images: ['../img/test.png', '../img/test.png', '../img/test.png'],
                        baseCommission: '1,500',
                        bonusCommission: '300',
                        totalCommission: '1,800',
                        currentParticipants: 8,
                        maxParticipants: 20,
                        enrollmentDeadline: '2024-07-05',
                        status: {
                            type: 'new',
                            text: '新上线'
                        },
                        isFull: false
                    }
                ];
                
                this.loading = false;
            }, 500);
        },
        
        /**
         * 检查用户登录状态
         * 未登录则重定向到登录页面
         */
        checkLoginStatus() {
            // 检查是否已登录
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            if (!isLoggedIn) {
                // 保存当前页面URL作为重定向目标
                const currentUrl = window.location.href;
                
                // 跳转到登录页面，并带上重定向参数
                window.location.href = `login.html?redirect=${encodeURIComponent(currentUrl)}`;
            }
        }
    },
    mounted() {
        // 检查用户登录状态
        this.checkLoginStatus();
        
        // 加载行程数据
        this.loadTrips();
    }
}).mount('#app'); 