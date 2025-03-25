// 从行程列表进入的行程详情 JavaScript
const { createApp } = Vue

createApp({
    data() {
        return {
            // 行程ID
            tripId: null,
            
            // 列表信息
            fromList: true,
            currentTripIndex: 0,
            totalTrips: 0,
            filters: [], // 筛选条件
            
            // 行程详情
            trip: {
                id: null,
                title: '',
                description: '',
                destination: '',
                date: '',
                duration: '',
                images: [],
                baseCommission: '',
                bonusCommission: '',
                totalCommission: '',
                commissionRules: [],
                schedule: [],
                requirements: [],
                currentParticipants: 0,
                maxParticipants: 0,
                enrollmentDeadline: '',
                status: {
                    type: '',
                    text: ''
                },
                isFull: false,
                minParticipants: 0, // 最小成团人数
                isConfirmed: false  // 是否已确认成团
            },
            
            // 列表中的所有行程ID
            listTripIds: [],
            
            // 是否已报名
            isApplied: false,
            
            // 轮播图实例
            swiper: null,
            
            // 用户信息
            influencerId: 'inf123456',
            enrolledTripIds: ['trip002', 'trip005'],
            
            // 已完成行程IDs
            completedTripIds: ['trip101', 'trip102', 'trip103', 'trip104'],
            
            // UI状态
            isModalVisible: false,
            selectedModal: '',
            selectedImage: '',
            
            // 加载状态
            isLoading: true
        }
    },
    computed: {
        // 是否已经报名
        isEnrolled() {
            return this.enrolledTripIds.includes(this.tripId);
        },
        
        // 是否已结束
        isCompleted() {
            return this.completedTripIds.includes(this.tripId);
        },
        
        // 开始日期格式化
        startDate() {
            if (!this.trip) return '';
            return this.formatDate(this.trip.date);
        },
        
        // 结束日期格式化
        endDate() {
            if (!this.trip || !this.trip.duration) return '';
            const start = new Date(this.trip.date);
            const end = new Date(start);
            end.setDate(start.getDate() + this.trip.duration - 1);
            return this.formatDate(end);
        },
        
        // 整个行程持续天数
        totalDays() {
            return this.trip ? this.trip.duration : 0;
        },
        
        // 佣金提成百分比
        commissionPercent() {
            // 这是一个固定值或从某处计算得出
            return 15; // 假设佣金提成为15%
        },
        
        // 预计佣金
        expectedCommission() {
            if (!this.trip) return 0;
            return this.trip.totalCommission;
        },
        
        // 剩余名额
        remainingSpots() {
            if (!this.trip) return 0;
            return this.trip.maxParticipants - this.trip.currentParticipants;
        },
        
        // 报名截止日期
        deadline() {
            if (!this.trip || !this.trip.enrollmentDeadline) return '';
            return this.formatDate(this.trip.enrollmentDeadline);
        }
    },
    methods: {
        // 返回行程列表页
        goBackToList() {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'trip-list.html?source=main';
            }
        },
        
        // 分享行程
        shareTrip() {
            this.selectedModal = 'share';
            this.isModalVisible = true;
        },
        
        /**
         * 查看上一个行程
         */
        viewPrevTrip() {
            if (this.currentTripIndex > 0) {
                const prevTripId = this.listTripIds[this.currentTripIndex - 1];
                this.navigateToTripDetail(prevTripId, this.currentTripIndex - 1);
            }
        },
        
        /**
         * 查看下一个行程
         */
        viewNextTrip() {
            if (this.currentTripIndex < this.totalTrips - 1) {
                const nextTripId = this.listTripIds[this.currentTripIndex + 1];
                this.navigateToTripDetail(nextTripId, this.currentTripIndex + 1);
            }
        },
        
        /**
         * 导航到行程详情页
         * @param {string} tripId 行程ID
         * @param {number} index 行程在列表中的索引
         */
        navigateToTripDetail(tripId, index) {
            // 使用AppRouter导航到行程详情页
            if (window.AppRouter) {
                window.AppRouter.goToTripFromList(
                    tripId,
                    index,
                    this.totalTrips,
                    this.filters
                );
                return;
            }
            
            // 兼容旧版：直接导航到行程详情页，添加列表参数
            const params = new URLSearchParams();
            params.append('id', tripId);
            params.append('index', index);
            params.append('total', this.totalTrips);
            
            if (this.filters && this.filters.length > 0) {
                params.append('filters', JSON.stringify(this.filters));
            }
            
            window.location.href = `trip-detail-list.html?${params.toString()}`;
        },
        
        /**
         * 清除筛选条件
         */
        clearFilters() {
            // 跳转到没有筛选条件的行程列表页
            window.location.href = 'trip-list.html?source=main';
        },
        
        /**
         * 编辑筛选条件
         */
        editFilters() {
            // 跳转到行程列表页，保留当前筛选条件
            const params = new URLSearchParams();
            params.append('source', 'main');
            
            if (this.filters && this.filters.length > 0) {
                // 提取筛选条件
                this.filters.forEach(filter => {
                    if (filter.name === '搜索') {
                        params.append('search', filter.value);
                    } else if (filter.name === '标签') {
                        params.append('tag', filter.value);
                    }
                });
            }
            
            window.location.href = `trip-list.html?${params.toString()}`;
        },
        
        // 报名参加行程
        applyForTrip() {
            if (this.isApplied) {
                this.showToast('您已报名此行程');
                return;
            }
            
            if (this.trip.isFull) {
                this.showToast('该行程名额已满');
                return;
            }
            
            // 创建订单
            const order = {
                id: Date.now(), // 使用时间戳作为临时ID
                orderNumber: 'ORD' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
                tripId: this.trip.id,
                tripTitle: this.trip.title,
                tripImage: this.trip.images[0],
                tripDate: this.trip.date,
                destination: this.trip.destination,
                commission: this.trip.totalCommission,
                status: 'pending', // 待确认
                orderTime: new Date().toLocaleString('zh-CN', {
                    year: 'numeric',
                    month: '2-digit',
                    day: '2-digit',
                    hour: '2-digit',
                    minute: '2-digit',
                    second: '2-digit'
                }),
                isPaid: Math.random() > 0.3 // 模拟70%的概率已支付
            };
            
            // 保存订单到本地存储
            let orders = JSON.parse(localStorage.getItem('orders') || '[]');
            orders.push(order);
            localStorage.setItem('orders', JSON.stringify(orders));
            
            // 更新报名状态
            this.isApplied = true;
            
            // 显示成功模态框
            this.selectedModal = 'success';
            this.isModalVisible = true;
        },
        
        // 取消报名
        cancelTrip() {
            this.selectedModal = 'cancel';
            this.isModalVisible = true;
        },
        
        // 确认取消行程
        confirmCancel() {
            // 模拟取消过程
            this.isApplied = false;
            
            setTimeout(() => {
                // 模拟后端响应
                const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                const updatedOrders = orders.filter(order => order.tripId !== this.tripId);
                localStorage.setItem('orders', JSON.stringify(updatedOrders));
                
                // 隐藏模态框并显示提示
                this.isModalVisible = false;
                this.showToast('已取消报名');
            }, 1500);
        },
        
        // 查看订单
        viewOrders() {
            window.location.href = `trip-participants.html?id=${this.tripId}`;
        },
        
        // 查看我的行程
        viewMyTrips() {
            window.location.href = `trip-list.html?source=profile`;
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
        
        // 初始化轮播图
        initSwiper() {
            this.$nextTick(() => {
                this.swiper = new Swiper('.trip-images-swiper', {
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                });
            });
        },
        
        // 加载行程详情
        loadTripDetail(tripId) {
            // 检查是否是已结束的行程
            if (this.completedTripIds.includes(tripId)) {
                // 如果是已结束的行程，重定向到行程记录页面
                window.location.href = `trip-record.html?id=${tripId}`;
                return;
            }
            
            // 实际项目中应该从API获取数据
            // 模拟加载延迟
            setTimeout(() => {
                // 假设tripData是从API获取的模拟数据
                const tripData = {
                    101: {
                        id: 101,
                        title: '珠海长隆海洋王国亲子2日游',
                        description: '跟随网红达人小丽一起探索珠海长隆海洋王国的奇妙世界，近距离接触海洋生物，观看精彩表演，体验刺激游乐设施。适合亲子家庭，将为您的孩子带来难忘的海洋探索之旅。',
                        destination: '珠海长隆海洋王国',
                        date: '2024-06-15',
                        duration: 2,
                        images: ['../img/test.png', '../img/test.png', '../img/test.png'],
                        baseCommission: '1,000',
                        bonusCommission: '280',
                        totalCommission: '1,280',
                        commissionRules: [
                            '基础佣金：完成行程并发布内容后获得',
                            '额外奖励：根据内容质量和传播效果评定',
                            '粉丝互动奖励：根据粉丝参与度额外奖励'
                        ],
                        schedule: [
                            {
                                time: '第一天 09:00',
                                activity: '集合出发',
                                description: '珠海市区指定地点集合，乘车前往长隆海洋王国'
                            },
                            {
                                time: '第一天 10:30',
                                activity: '抵达海洋王国',
                                description: '办理入园手续，开始一天的海洋探索之旅'
                            },
                            {
                                time: '第二天 15:00',
                                activity: '返程',
                                description: '结束行程，乘车返回市区'
                            }
                        ],
                        requirements: [
                            '粉丝数10万+',
                            '亲子类内容创作者优先',
                            '需在行程结束后3天内发布相关内容',
                            '内容中需包含指定标签和关键词'
                        ],
                        inclusions: [
                            '往返交通',
                            '景点门票',
                            '行程中标明的住宿',
                            '行程中标明的餐食'
                        ],
                        exclusions: [
                            '个人消费',
                            '行程外的活动费用',
                            '旅游保险'
                        ],
                        currentParticipants: 27,
                        maxParticipants: 30,
                        minParticipants: 20, // 最小成团人数
                        enrollmentDeadline: '2024-06-10',
                        status: {
                            type: 'hot',
                            text: '热门'
                        },
                        isFull: false,
                        isConfirmed: true // 已确认成团
                    },
                    102: {
                        id: 102,
                        title: '珠海外伶仃岛探险之旅',
                        description: '跟随探险家小美一起探索珠海最美海岛——外伶仃岛。体验海岛风光，参与各种户外活动，拍摄精彩内容。适合户外探险爱好者和自然风光摄影师。',
                        destination: '珠海外伶仃岛',
                        date: '2024-06-22',
                        duration: 3,
                        images: ['../img/test.png', '../img/test.png', '../img/test.png'],
                        baseCommission: '1,200',
                        bonusCommission: '300',
                        totalCommission: '1,500',
                        schedule: [
                            {
                                time: '第一天 08:00',
                                activity: '集合出发',
                                description: '珠海九洲港集合，乘船前往外伶仃岛'
                            },
                            {
                                time: '第三天 12:00',
                                activity: '午餐&返程',
                                description: '享用午餐，乘船返回珠海'
                            }
                        ],
                        requirements: [
                            '粉丝数8万+',
                            '擅长户外探险内容创作'
                        ],
                        inclusions: [
                            '往返船票',
                            '住宿',
                            '行程中标明的餐食'
                        ],
                        exclusions: [
                            '个人消费',
                            '行程外的活动费用'
                        ],
                        currentParticipants: 18,
                        maxParticipants: 25,
                        enrollmentDeadline: '2024-06-15',
                        status: {
                            type: 'new',
                            text: '新上线'
                        },
                        isFull: false
                    },
                    103: {
                        id: 103,
                        title: '珠海情侣路摄影之旅',
                        description: '跟随摄影师阿杰探索珠海最浪漫的情侣路，捕捉日落、海景和城市风光。适合摄影爱好者和风光类内容创作者，将为您提供专业的摄影指导和创作建议。',
                        destination: '珠海情侣路',
                        date: '2024-06-19',
                        duration: 1,
                        images: ['../img/test.png', '../img/test.png', '../img/test.png'],
                        baseCommission: '800',
                        bonusCommission: '180',
                        totalCommission: '980',
                        schedule: [
                            {
                                time: '14:00',
                                activity: '集合',
                                description: '珠海渔女像集合，开始摄影之旅'
                            },
                            {
                                time: '22:00',
                                activity: '结束行程',
                                description: '行程结束，自由离开'
                            }
                        ],
                        requirements: [
                            '粉丝数5万+',
                            '摄影类内容创作者优先'
                        ],
                        inclusions: [
                            '专业摄影指导',
                            '晚餐'
                        ],
                        exclusions: [
                            '交通费',
                            '摄影器材'
                        ],
                        currentParticipants: 12,
                        maxParticipants: 15,
                        enrollmentDeadline: '2024-06-15',
                        status: {
                            type: 'limited',
                            text: '限量'
                        },
                        isFull: false
                    }
                    // 可以添加更多行程数据...
                };
                
                // 模拟所有行程ID
                if (!this.listTripIds.length) {
                    this.listTripIds = Object.keys(tripData).map(id => parseInt(id));
                }
                
                // 获取行程数据
                const tripDetailData = tripData[tripId];
                
                if (tripDetailData) {
                    this.trip = tripDetailData;
                    
                    // 初始化轮播图
                    this.initSwiper();
                } else {
                    this.showToast('找不到行程信息');
                    setTimeout(() => {
                        this.goBackToList();
                    }, 1500);
                }
                
                this.isLoading = false;
            }, 1000);
        },
        
        // 查看行程记录
        viewTripRecord(tripId) {
            // 使用AppRouter导航到行程记录页面
            if (window.AppRouter && window.AppRouter.navigateToTripRecord) {
                window.AppRouter.navigateToTripRecord(tripId || this.tripId);
                return;
            }
            
            // 兼容旧版：直接导航到行程记录页面
            window.location.href = `trip-record.html?id=${tripId || this.tripId}`;
        },
        
        // 初始化页面
        initPage() {
            // 从URL获取行程ID和列表信息
            const urlParams = new URLSearchParams(window.location.search);
            this.tripId = parseInt(urlParams.get('id'));
            
            // 获取当前索引和总数
            const index = urlParams.get('index');
            const total = urlParams.get('total');
            
            if (index !== null && total !== null) {
                this.currentTripIndex = parseInt(index);
                this.totalTrips = parseInt(total);
            } else {
                this.fromList = false;
            }
            
            // 获取筛选条件
            const filtersStr = urlParams.get('filters');
            if (filtersStr) {
                try {
                    this.filters = JSON.parse(filtersStr);
                } catch (e) {
                    console.error('解析筛选条件失败:', e);
                    this.filters = [];
                }
            }
            
            if (this.tripId) {
                // 加载行程详情
                this.loadTripDetail(this.tripId);
                
                // 检查是否已报名
                this.checkIfApplied();
            } else {
                this.showToast('行程ID无效');
                setTimeout(() => {
                    this.goBackToList();
                }, 1500);
            }
        },
        
        // 检查是否已报名
        checkIfApplied() {
            // 从本地存储获取订单
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            this.isApplied = orders.some(order => order.tripId === this.tripId);
        },
        
        // 查看参与者
        viewParticipants() {
            // 导航到参与者页面
            window.location.href = `trip-participants.html?id=${this.tripId}`;
        },
        
        // 关闭模态框
        closeModal() {
            this.isModalVisible = false;
            this.selectedModal = '';
            this.selectedImage = '';
        },
        
        // 查看图片
        viewImage(image) {
            this.selectedImage = image;
            this.selectedModal = 'image';
            this.isModalVisible = true;
        },
        
        // 日期格式化
        formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            return `${year}-${month}-${day}`;
        }
    },
    mounted() {
        // 初始化页面
        this.initPage();
    }
}).mount('#app'); 