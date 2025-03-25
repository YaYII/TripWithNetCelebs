// 行程详情 JavaScript
const { createApp } = Vue

createApp({
    data() {
        return {
            // 行程ID
            tripId: null,
            
            // 来源信息
            fromTripList: false, // 是否从行程列表页面进入
            
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
                hasInfluencer: false, // 是否有网红报名
                status: {
                    type: '',
                    text: ''
                },
                isFull: false,
                minParticipants: 0, // 最小成团人数
                isConfirmed: false  // 是否已确认成团
            },
            
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
            isLoading: true,
            
            // 所有行程数据集合
            trips: {}
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
        // 返回上一页
        goBack() {
            window.history.back();
        },
        
        // 分享行程
        shareTrip() {
            // 检查是否已报名
            if (!this.isApplied) {
                this.showToast('请先报名，再分享');
                return;
            }
            
            // 打开分享模态框
            this.selectedModal = 'share';
            this.isModalVisible = true;
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
            
            if (!this.trip.hasInfluencer) {
                this.showToast('暂无网红报名，无法参加此行程');
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
            
            // 显示成功提示
            this.showToast('报名成功，即将查看行程');
            
            // 延迟跳转到行程人员页面
            setTimeout(() => {
                window.location.href = `trip-list.html?source=main`;
            }, 1500);
        },
        
        // 取消报名
        cancelTrip() {
            this.selectedModal = 'cancel';
            this.isModalVisible = true;
        },
        
        // 确认取消行程
        confirmCancel() {
            // 显示取消中的提示
            this.showToast('正在处理取消请求...');
            
            // 模拟取消过程并更新订单状态
            setTimeout(() => {
                // 从本地存储获取订单
                const orders = JSON.parse(localStorage.getItem('orders') || '[]');
                
                // 更新当前行程的订单状态，而不是删除
                const updatedOrders = orders.map(order => {
                    if (order.tripId === this.tripId) {
                        // 更新订单状态为已取消
                        return { 
                            ...order, 
                            status: 'cancelled', 
                            cancelTime: new Date().toLocaleString('zh-CN', {
                                year: 'numeric',
                                month: '2-digit',
                                day: '2-digit',
                                hour: '2-digit',
                                minute: '2-digit',
                                second: '2-digit'
                            }),
                            cancelReason: '用户主动取消',
                            refundStatus: this.trip.currentParticipants > 0 ? 'processing' : 'not_required'
                        };
                    }
                    return order;
                });
                
                // 保存更新后的订单
                localStorage.setItem('orders', JSON.stringify(updatedOrders));
                
                // 更新用户的报名状态
                this.isApplied = false;
                
                // 更新已报名行程ID列表
                const index = this.enrolledTripIds.indexOf(this.tripId);
                if (index > -1) {
                    this.enrolledTripIds.splice(index, 1);
                }
                
                // 隐藏模态框
                this.isModalVisible = false;
                
                // 显示取消成功的提示
                if (this.trip.currentParticipants > 0) {
                    this.showToast('已取消报名，粉丝退款将在1-3个工作日内到账');
                } else {
                    this.showToast('已取消报名');
                }
                
                // 延迟返回行程列表页面
                // setTimeout(() => {
                //     window.location.href = 'trip-list.html';
                // }, 2000);
            }, 1500);
        },
        
        // 查询行程
        viewOrders() {
            window.location.href = `trip-participants.html?id=${this.tripId}`;
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
            this.isLoading = true;
            
            // 模拟数据加载
            setTimeout(() => {
                // 初始化行程数据集合
                if (Object.keys(this.trips).length === 0) {
                    this.initTripsData();
                }
                
                // 根据ID获取对应的行程详情
                const tripDetail = this.trips[tripId] || this.trips['101']; // 默认使用101行程
                
                this.trip = tripDetail;
                
                // 初始化轮播图
                this.initSwiper();
                
                // 检查是否需要自动取消
                this.checkAutoCancellation();
                
                // 设置加载完成
                this.isLoading = false;
            }, 1000);
        },
        
        // 初始化所有行程数据
        initTripsData() {
            // 珠海长隆海洋王国行程
            this.trips['101'] = {
                id: '101',
                title: '珠海长隆海洋王国亲子2日游',
                destination: '珠海长隆海洋王国',
                date: '2024-05-20',
                duration: 2, // 2天
                images: [
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png'
                ],
                description: '这是一次精彩的珠海长隆海洋王国亲子旅行，适合家庭一起度过美好的周末时光。您将有机会近距离观赏各种海洋生物，体验刺激的水上游乐设施，参与互动表演，为孩子们创造难忘的回忆。',
                baseCommission: '1,000',
                bonusCommission: '280',
                totalCommission: '1,280',
                hasInfluencer: true, // 默认有网红报名
                commissionRules: [
                    '基础佣金：根据参与者人数计算',
                    '额外奖励：根据内容质量和互动效果发放',
                    '行程结束后7个工作日内结算'
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
                        time: '第一天 12:00',
                        activity: '午餐&海豚表演',
                        description: '享用午餐，观看精彩的海豚表演'
                    },
                    {
                        time: '第一天 14:00',
                        activity: '鲸鲨馆参观',
                        description: '参观世界最大的鲸鲨馆，近距离观察海洋生物'
                    },
                    {
                        time: '第二天 09:00',
                        activity: '早餐',
                        description: '酒店享用早餐'
                    },
                    {
                        time: '第二天 10:00',
                        activity: '企鹅馆参观',
                        description: '参观企鹅馆，了解极地生物'
                    }
                ],
                requirements: [
                    '粉丝数5万+',
                    '旅游、亲子类内容创作者优先',
                    '需在行程结束后3天内发布相关内容',
                    '内容中需包含指定标签和关键词'
                ],
                highlights: [
                    '近距离观赏各种海洋生物',
                    '体验刺激的水上游乐设施',
                    '参与精彩的互动表演',
                    '亲子互动活动',
                    '专业摄影指导'
                ],
                inclusions: [
                    '往返交通',
                    '海洋王国门票',
                    '一晚住宿',
                    '行程中餐食',
                    '专业导游服务'
                ],
                exclusions: [
                    '个人消费',
                    '旅游保险',
                    '额外活动费用',
                    '行程外餐食'
                ],
                currentParticipants: 18,
                maxParticipants: 30,
                minParticipants: 10, // 最小成团人数
                enrollmentDeadline: '2024-05-15',
                status: {
                    type: 'hot',
                    text: '热门'
                },
                isFull: false,
                isConfirmed: true // 已确认成团
            };
            
            // 珠海横琴澳门3日游
            this.trips['102'] = {
                id: '102',
                title: '珠海横琴澳门文化探索3日游',
                destination: '珠海横琴、澳门',
                date: '2024-06-10',
                duration: 3, // 3天
                images: [
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png'
                ],
                description: '这是一次融合中西文化的珠澳之旅，您将领略横琴的现代风貌与澳门的历史遗迹。游览澳门标志性景点，品尝地道美食，感受两地文化的碰撞与融合，为您的社交媒体带来独特视角的内容创作机会。',
                baseCommission: '1,500',
                bonusCommission: '350',
                totalCommission: '1,850',
                hasInfluencer: true,
                commissionRules: [
                    '基础佣金：根据参与者人数计算',
                    '额外奖励：根据内容质量和互动效果发放',
                    '行程结束后7个工作日内结算'
                ],
                schedule: [
                    {
                        time: '第一天 09:00',
                        activity: '集合出发',
                        description: '珠海市区指定地点集合，前往横琴新区'
                    },
                    {
                        time: '第一天 10:30',
                        activity: '横琴国际休闲旅游岛',
                        description: '参观横琴新区规划展示厅，了解横琴发展历程'
                    },
                    {
                        time: '第一天 12:00',
                        activity: '午餐',
                        description: '品尝横琴特色海鲜午餐'
                    },
                    {
                        time: '第一天 14:00',
                        activity: '长隆国际马戏城',
                        description: '观看世界级马戏表演，体验异国风情'
                    },
                    {
                        time: '第二天 09:00',
                        activity: '前往澳门',
                        description: '经横琴口岸前往澳门，开始澳门一日游'
                    },
                    {
                        time: '第二天 10:30',
                        activity: '澳门历史城区',
                        description: '参观大三巴牌坊、澳门历史博物馆等世界文化遗产'
                    },
                    {
                        time: '第二天 14:00',
                        activity: '威尼斯人度假村',
                        description: '探访澳门标志性的综合度假村，体验购物和娱乐'
                    },
                    {
                        time: '第三天 09:00',
                        activity: '渔女雕像',
                        description: '参观珠海地标性建筑，拍摄精美照片'
                    },
                    {
                        time: '第三天 11:00',
                        activity: '情侣路漫步',
                        description: '沿着美丽的海滨大道散步，欣赏珠海海岸线风光'
                    }
                ],
                requirements: [
                    '粉丝数8万+',
                    '旅游、文化类内容创作者优先',
                    '需在行程结束后5天内发布相关内容',
                    '内容中需包含指定标签和关键词'
                ],
                highlights: [
                    '横琴新区现代化建设',
                    '澳门世界文化遗产探访',
                    '中西文化交融体验',
                    '地道澳门美食品鉴',
                    '海岸线风光拍摄'
                ],
                inclusions: [
                    '往返交通',
                    '两晚住宿',
                    '行程中指定餐食',
                    '专业导游服务',
                    '景点门票'
                ],
                exclusions: [
                    '个人消费',
                    '旅游保险',
                    '额外活动费用',
                    '行程外餐食'
                ],
                currentParticipants: 15,
                maxParticipants: 25,
                minParticipants: 8,
                enrollmentDeadline: '2024-06-01',
                status: {
                    type: 'new',
                    text: '新品'
                },
                isFull: false,
                isConfirmed: true
            };
            
            // 外伶仃岛海岛度假
            this.trips['103'] = {
                id: '103',
                title: '珠海外伶仃岛海岛度假3日游',
                destination: '珠海外伶仃岛',
                date: '2024-07-15',
                duration: 3,
                images: [
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png'
                ],
                description: '探访珠海最美海岛——外伶仃岛，享受阳光沙滩、清新海风和纯净海水。在这个远离喧嚣的海岛上，您可以进行各种水上活动，拍摄绝美海景，享受惬意的慢生活，为您的社交媒体积累精彩内容。',
                baseCommission: '1,800',
                bonusCommission: '400',
                totalCommission: '2,200',
                hasInfluencer: true,
                commissionRules: [
                    '基础佣金：根据参与者人数计算',
                    '额外奖励：根据内容质量和互动效果发放',
                    '行程结束后7个工作日内结算'
                ],
                schedule: [
                    {
                        time: '第一天 08:00',
                        activity: '集合出发',
                        description: '珠海九洲港集合，乘船前往外伶仃岛'
                    },
                    {
                        time: '第一天 10:00',
                        activity: '抵达外伶仃岛',
                        description: '办理入住手续，熟悉岛上环境'
                    },
                    {
                        time: '第一天 13:00',
                        activity: '情人桥',
                        description: '参观岛上地标景点情人桥，拍摄海景照片'
                    },
                    {
                        time: '第一天 15:00',
                        activity: '沙滩活动',
                        description: '参与沙滩排球、沙滩足球等互动活动'
                    },
                    {
                        time: '第二天 08:00',
                        activity: '日出观赏',
                        description: '早起观赏东海岸绝美日出（自选）'
                    },
                    {
                        time: '第二天 10:00',
                        activity: '帆船体验',
                        description: '体验帆船出海，拍摄海上风光'
                    },
                    {
                        time: '第二天 14:00',
                        activity: '环岛徒步',
                        description: '环岛徒步，探索岛上秘境，拍摄特色景点'
                    },
                    {
                        time: '第三天 09:00',
                        activity: '海钓体验',
                        description: '体验海钓乐趣，感受渔家文化'
                    },
                    {
                        time: '第三天 13:00',
                        activity: '返程',
                        description: '乘船返回珠海市区'
                    }
                ],
                requirements: [
                    '粉丝数10万+',
                    '旅游、户外、生活类内容创作者优先',
                    '需在行程结束后7天内发布相关内容',
                    '内容中需包含指定标签和关键词'
                ],
                highlights: [
                    '外伶仃岛绝美海景',
                    '多种海上活动体验',
                    '原生态海岛环境',
                    '精致海鲜美食',
                    '海岛日出日落拍摄'
                ],
                inclusions: [
                    '往返船票',
                    '岛上两晚住宿',
                    '行程中指定餐食',
                    '专业导游服务',
                    '水上活动体验'
                ],
                exclusions: [
                    '个人消费',
                    '旅游保险',
                    '额外活动费用',
                    '行程外餐食'
                ],
                currentParticipants: 12,
                maxParticipants: 20,
                minParticipants: 6,
                enrollmentDeadline: '2024-07-01',
                status: {
                    type: 'limited',
                    text: '限量'
                },
                isFull: false,
                isConfirmed: false
            };
            
            // 珠海斗门乡村休闲游
            this.trips['104'] = {
                id: '104',
                title: '珠海斗门乡村休闲美食2日游',
                destination: '珠海斗门区',
                date: '2024-05-25',
                duration: 2,
                images: [
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png'
                ],
                description: '逃离城市喧嚣，探访珠海斗门区的乡村风光和特色美食。体验农家乐趣，采摘新鲜水果，参观黄杨村、莲洲村等传统村落，品尝地道的斗门美食，为您的粉丝带来不一样的珠海体验。',
                baseCommission: '1,200',
                bonusCommission: '300',
                totalCommission: '1,500',
                hasInfluencer: true,
                commissionRules: [
                    '基础佣金：根据参与者人数计算',
                    '额外奖励：根据内容质量和互动效果发放',
                    '行程结束后7个工作日内结算'
                ],
                schedule: [
                    {
                        time: '第一天 09:00',
                        activity: '集合出发',
                        description: '珠海市区指定地点集合，前往斗门区'
                    },
                    {
                        time: '第一天 10:30',
                        activity: '黄杨古村',
                        description: '参观具有500多年历史的古村落，了解岭南传统建筑'
                    },
                    {
                        time: '第一天 12:00',
                        activity: '农家午餐',
                        description: '在古村内品尝地道农家菜'
                    },
                    {
                        time: '第一天 14:00',
                        activity: '莲洲水乡',
                        description: '游览有"珠海小周庄"之称的莲洲水乡，拍摄水乡风光'
                    },
                    {
                        time: '第一天 16:00',
                        activity: '农家DIY',
                        description: '参与客家擂茶、斗门薄饼制作等传统美食DIY体验'
                    },
                    {
                        time: '第二天 09:00',
                        activity: '水果采摘',
                        description: '前往斗门果园，根据季节采摘新鲜水果'
                    },
                    {
                        time: '第二天 11:30',
                        activity: '白蕉海鲜',
                        description: '品尝著名的白蕉海鲜，体验珠海本地饮食文化'
                    },
                    {
                        time: '第二天 14:00',
                        activity: '十里莲江',
                        description: '游览十里莲江风景区，欣赏乡村田园风光'
                    }
                ],
                requirements: [
                    '粉丝数3万+',
                    '美食、生活、乡村旅游类内容创作者优先',
                    '需在行程结束后5天内发布相关内容',
                    '内容中需包含指定标签和关键词'
                ],
                highlights: [
                    '传统古村落探访',
                    '地道斗门美食品鉴',
                    '农家生活DIY体验',
                    '水果采摘活动',
                    '田园风光拍摄'
                ],
                inclusions: [
                    '往返交通',
                    '一晚农家住宿',
                    '行程中指定餐食',
                    '专业导游服务',
                    'DIY活动材料费'
                ],
                exclusions: [
                    '个人消费',
                    '旅游保险',
                    '额外活动费用',
                    '行程外餐食'
                ],
                currentParticipants: 8,
                maxParticipants: 15,
                minParticipants: 5,
                enrollmentDeadline: '2024-05-20',
                status: {
                    type: 'promotion',
                    text: '特惠'
                },
                isFull: false,
                isConfirmed: true
            };
            
            // 珠海香洲渔女文化游
            this.trips['105'] = {
                id: '105',
                title: '珠海香洲渔女文化1日游',
                destination: '珠海香洲区',
                date: '2024-06-05',
                duration: 1,
                images: [
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png'
                ],
                description: '探索珠海城市魅力与文化底蕴，游览标志性的渔女雕像、情侣路和香炉湾。漫步沿海栈道，感受浪漫海滨城市风情，拍摄珠海城市美景，打卡网红景点，为您的社交平台积累独特内容。',
                baseCommission: '800',
                bonusCommission: '200',
                totalCommission: '1,000',
                hasInfluencer: true,
                commissionRules: [
                    '基础佣金：根据参与者人数计算',
                    '额外奖励：根据内容质量和互动效果发放',
                    '行程结束后5个工作日内结算'
                ],
                schedule: [
                    {
                        time: '09:00',
                        activity: '集合出发',
                        description: '珠海市区指定地点集合，前往渔女雕像'
                    },
                    {
                        time: '09:30',
                        activity: '渔女雕像',
                        description: '参观珠海地标性建筑，了解渔女文化背景，拍摄经典照片'
                    },
                    {
                        time: '10:30',
                        activity: '情侣路漫步',
                        description: '沿着浪漫的海滨长廊漫步，欣赏珠海海岸线风光'
                    },
                    {
                        time: '12:00',
                        activity: '海鲜午餐',
                        description: '品尝珠海特色海鲜，体验当地美食文化'
                    },
                    {
                        time: '14:00',
                        activity: '香炉湾沙滩',
                        description: '游览珠海最美市区沙滩，参与沙滩互动活动'
                    },
                    {
                        time: '16:00',
                        activity: '圆明新园',
                        description: '参观中西合璧的园林建筑，了解历史文化'
                    },
                    {
                        time: '18:00',
                        activity: '日月贝观景',
                        description: '远观珠海大剧院，欣赏日落时分的绝美景色'
                    }
                ],
                requirements: [
                    '粉丝数3万+',
                    '城市旅游、摄影类内容创作者优先',
                    '需在行程结束后3天内发布相关内容',
                    '内容中需包含指定标签和关键词'
                ],
                highlights: [
                    '珠海城市地标打卡',
                    '海岸线风光拍摄',
                    '特色海鲜美食品鉴',
                    '浪漫海滨城市体验',
                    '日落黄金时段摄影'
                ],
                inclusions: [
                    '当日交通',
                    '专业导游服务',
                    '午餐',
                    '景点门票'
                ],
                exclusions: [
                    '个人消费',
                    '旅游保险',
                    '额外活动费用',
                    '行程外餐食'
                ],
                currentParticipants: 20,
                maxParticipants: 30,
                minParticipants: 10,
                enrollmentDeadline: '2024-06-01',
                status: {
                    type: 'popular',
                    text: '抢手'
                },
                isFull: false,
                isConfirmed: true
            };
        },
        
        // 检查是否需要自动取消
        checkAutoCancellation() {
            // 如果已经确认成团，则不需要检查
            if (this.trip.isConfirmed) {
                return;
            }
            
            // 检查是否已过截止日期
            const today = new Date();
            const deadline = new Date(this.trip.enrollmentDeadline);
            
            if (today > deadline) {
                // 检查是否达到最小成团人数
                if (this.trip.currentParticipants < this.trip.minParticipants) {
                    // 未达到最小成团人数，需要自动取消所有订单
                    this.autoCancelOrders();
                } else {
                    // 达到最小成团人数，确认成团
                    this.confirmTrip();
                }
            }
        },
        
        // 自动取消所有订单
        autoCancelOrders() {
            // 从本地存储获取订单
            let orders = JSON.parse(localStorage.getItem('orders') || '[]');
            
            // 找到当前行程的所有订单
            const updatedOrders = orders.map(order => {
                if (order.tripId === this.tripId && order.status === 'pending') {
                    // 更新订单状态为已取消
                    return { ...order, status: 'cancelled', cancelReason: '未达到最小成团人数，系统自动取消' };
                }
                return order;
            });
            
            // 保存更新后的订单
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            
            // 如果当前用户已报名，则更新状态
            if (this.isApplied) {
                this.isApplied = false;
                this.showToast('该行程未达到最小成团人数，已自动取消');
            }
        },
        
        // 确认成团
        confirmTrip() {
            // 从本地存储获取订单
            let orders = JSON.parse(localStorage.getItem('orders') || '[]');
            
            // 找到当前行程的所有订单
            const updatedOrders = orders.map(order => {
                if (order.tripId === this.tripId && order.status === 'pending') {
                    // 更新订单状态为已确认
                    return { ...order, status: 'confirmed' };
                }
                return order;
            });
            
            // 保存更新后的订单
            localStorage.setItem('orders', JSON.stringify(updatedOrders));
            
            // 更新行程状态
            this.trip.isConfirmed = true;
        },
        
        // 检查是否已报名
        checkIfApplied() {
            // 从本地存储获取订单
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            // 查找当前行程ID的有效订单（已确认且未取消的订单）
            const hasOrder = orders.some(order => 
                order.tripId === this.tripId && 
                (order.status === 'confirmed' || order.status === 'pending')
            );
            
            // 如果找到有效订单，设置为已报名状态
            if (hasOrder) {
                this.isApplied = true;
                
                // 确保该行程ID在已报名列表中
                if (!this.enrolledTripIds.includes(this.tripId)) {
                    this.enrolledTripIds.push(this.tripId);
                }
            }
        },
        
        // 初始化页面
        initPage() {
            // 从URL获取行程ID和来源信息
            const urlParams = new URLSearchParams(window.location.search);
            this.tripId = urlParams.get('id') || '101'; // 如果没有提供ID，默认使用101
            
            // 判断是否从行程列表页面进入
            const source = urlParams.get('source');
            if (source === 'list') {
                this.fromTripList = true;
            }
            
            // 判断用户是否已经报名（根据enrolledTripIds或本地存储的订单）
            this.isApplied = this.enrolledTripIds.includes(this.tripId);
            
            // 检查本地存储中是否有该行程的订单
            this.checkIfApplied();
            
            // 加载行程详情
            this.loadTripDetail(this.tripId);
        },
        
        // 查看参与者
        viewParticipants() {
            // 直接导航到参与者页面
            window.location.href = `trip-participants.html?id=${this.tripId}`;
        },
        
        // 查看行程记录
        viewTripRecord(tripId) {
            // 导航到行程记录页面
            window.location.href = `trip-record.html?id=${tripId || this.tripId}`;
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
        
        // 如果是从URL参数指定需要自动创建订单，则创建一个演示订单
        // 这里通过URL参数auto_create_order=true来控制，而不是默认自动创建
        const urlParams = new URLSearchParams(window.location.search);
        const shouldCreateOrder = urlParams.get('auto_create_order') === 'true';
        
        if (shouldCreateOrder && this.tripId && !this.isApplied) {
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            // 检查是否已经存在该行程的订单
            const hasOrder = orders.some(order => order.tripId === this.tripId);
            
            if (!hasOrder) {
                // 初始化行程数据集合
                if (Object.keys(this.trips).length === 0) {
                    this.initTripsData();
                }
                
                // 获取当前行程信息
                const currentTrip = this.trips[this.tripId] || this.trips['101'];
                
                // 创建一个新的订单并添加到localStorage
                const newOrder = {
                    id: Date.now(),
                    orderNumber: 'ORD' + Math.floor(Math.random() * 1000000).toString().padStart(6, '0'),
                    tripId: this.tripId,
                    tripTitle: currentTrip.title,
                    tripImage: '../img/test.png',
                    tripDate: currentTrip.date,
                    destination: currentTrip.destination,
                    commission: currentTrip.totalCommission,
                    status: 'confirmed', // 已确认
                    orderTime: new Date().toLocaleString('zh-CN', {
                        year: 'numeric',
                        month: '2-digit',
                        day: '2-digit',
                        hour: '2-digit',
                        minute: '2-digit',
                        second: '2-digit'
                    }),
                    isPaid: true
                };
                
                orders.push(newOrder);
                localStorage.setItem('orders', JSON.stringify(orders));
                
                // 设置已报名状态
                this.isApplied = true;
                
                // 添加到已报名列表
                if (!this.enrolledTripIds.includes(this.tripId)) {
                    this.enrolledTripIds.push(this.tripId);
                }
                
                // 刷新页面或显示相应提示
                this.showToast('已成功为您创建示例订单');
            }
        }
    }
}).mount('#app'); 