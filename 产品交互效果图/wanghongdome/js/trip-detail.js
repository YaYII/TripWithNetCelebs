// 行程详情 JavaScript
const { createApp } = Vue

createApp({
    data() {
        return {
            // 行程ID
            tripId: null,
            
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
            
            // 是否已报名
            isApplied: false,
            
            // 轮播图实例
            swiper: null
        }
    },
    methods: {
        // 返回上一页
        goBack() {
            window.history.back();
        },
        
        // 分享行程
        shareTrip() {
            this.showToast('分享功能即将上线');
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
            
            // 显示成功提示
            this.showToast('报名成功，请等待确认');
            
            // 延迟跳转到订单页面
            setTimeout(() => {
                window.location.href = 'orders.html';
            }, 1500);
        },
        
        // 取消报名
        cancelTrip() {
            // 显示确认对话框
            if (confirm('确定要取消报名吗？取消后需要重新报名。')) {
                // 从本地存储获取订单
                let orders = JSON.parse(localStorage.getItem('orders') || '[]');
                
                // 找到当前行程的订单
                const orderIndex = orders.findIndex(order => order.tripId === this.tripId);
                
                if (orderIndex !== -1) {
                    // 删除订单
                    orders.splice(orderIndex, 1);
                    localStorage.setItem('orders', JSON.stringify(orders));
                    
                    // 更新报名状态
                    this.isApplied = false;
                    
                    // 显示成功提示
                    this.showToast('已取消报名');
                } else {
                    this.showToast('未找到相关订单');
                }
            }
        },
        
        // 查看订单
        viewOrder() {
            window.location.href = 'orders.html';
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
            // 确保DOM已经渲染完成
            this.$nextTick(() => {
                // 初始化Swiper
                this.swiper = new Swiper('.swiper', {
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
            // 实际项目中应该从API获取数据
            // 这里使用模拟数据
            const tripData = {
                101: {
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
                            time: '第一天 16:00',
                            activity: '游乐设施体验',
                            description: '体验园区内的刺激游乐设施'
                        },
                        {
                            time: '第一天 18:00',
                            activity: '晚餐&入住酒店',
                            description: '享用晚餐，入住长隆海洋王国酒店'
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
                        },
                        {
                            time: '第二天 12:00',
                            activity: '午餐&内容创作',
                            description: '享用午餐，进行内容拍摄和创作'
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
                    duration: '3天2晚',
                    images: ['../img/test.png', '../img/test.png', '../img/test.png'],
                    baseCommission: '1,200',
                    bonusCommission: '300',
                    totalCommission: '1,500',
                    commissionRules: [
                        '基础佣金：完成行程并发布内容后获得',
                        '额外奖励：根据内容质量和传播效果评定',
                        '长期合作：连续参与3次活动可获得额外奖励'
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
                            description: '办理入住手续，稍作休息'
                        },
                        {
                            time: '第一天 11:30',
                            activity: '午餐',
                            description: '品尝当地海鲜美食'
                        },
                        {
                            time: '第一天 13:00',
                            activity: '海岛徒步',
                            description: '徒步探索岛上风光，拍摄内容'
                        },
                        {
                            time: '第一天 18:00',
                            activity: '晚餐&篝火晚会',
                            description: '享用晚餐，参加篝火晚会'
                        },
                        {
                            time: '第二天 08:00',
                            activity: '早餐',
                            description: '酒店享用早餐'
                        },
                        {
                            time: '第二天 09:00',
                            activity: '海上活动',
                            description: '参加浮潜、帆船等海上活动'
                        },
                        {
                            time: '第二天 12:00',
                            activity: '午餐',
                            description: '享用午餐'
                        },
                        {
                            time: '第二天 14:00',
                            activity: '灯塔探访',
                            description: '参观岛上著名的灯塔，拍摄内容'
                        },
                        {
                            time: '第二天 18:00',
                            activity: '晚餐',
                            description: '享用晚餐'
                        },
                        {
                            time: '第三天 08:00',
                            activity: '早餐',
                            description: '酒店享用早餐'
                        },
                        {
                            time: '第三天 09:00',
                            activity: '自由活动',
                            description: '自由探索岛上风光，补充拍摄内容'
                        },
                        {
                            time: '第三天 12:00',
                            activity: '午餐&返程',
                            description: '享用午餐，乘船返回珠海'
                        }
                    ],
                    requirements: [
                        '粉丝数8万+',
                        '擅长户外探险内容创作',
                        '需在行程结束后5天内发布相关内容',
                        '内容中需包含指定标签和关键词',
                        '需具备基本的户外活动能力'
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
                    duration: '1天',
                    images: ['../img/test.png', '../img/test.png', '../img/test.png'],
                    baseCommission: '800',
                    bonusCommission: '180',
                    totalCommission: '980',
                    commissionRules: [
                        '基础佣金：完成行程并发布内容后获得',
                        '额外奖励：根据内容质量和传播效果评定',
                        '优质作品：特别优秀的作品将获得额外展示机会'
                    ],
                    schedule: [
                        {
                            time: '14:00',
                            activity: '集合',
                            description: '珠海渔女像集合，开始摄影之旅'
                        },
                        {
                            time: '14:30',
                            activity: '摄影技巧分享',
                            description: '专业摄影师分享风光摄影技巧'
                        },
                        {
                            time: '15:00',
                            activity: '情侣路漫步拍摄',
                            description: '沿情侣路漫步，拍摄海景和城市风光'
                        },
                        {
                            time: '17:30',
                            activity: '晚餐',
                            description: '享用当地特色美食'
                        },
                        {
                            time: '18:30',
                            activity: '日落拍摄',
                            description: '捕捉情侣路日落美景'
                        },
                        {
                            time: '20:00',
                            activity: '夜景拍摄',
                            description: '拍摄珠海夜景和灯光'
                        },
                        {
                            time: '21:30',
                            activity: '作品分享与点评',
                            description: '分享当天拍摄作品，专业点评'
                        },
                        {
                            time: '22:00',
                            activity: '结束行程',
                            description: '行程结束，自由离开'
                        }
                    ],
                    requirements: [
                        '粉丝数5万+',
                        '摄影类内容创作者优先',
                        '需在行程结束后3天内发布相关内容',
                        '内容中需包含指定标签和关键词',
                        '需自备摄影器材'
                    ],
                    currentParticipants: 12,
                    maxParticipants: 15,
                    enrollmentDeadline: '2024-06-15',
                    status: {
                        type: 'limited',
                        text: '即将满员'
                    },
                    isFull: false
                },
                105: {
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
                    commissionRules: [
                        '基础佣金：完成行程并发布内容后获得',
                        '额外奖励：根据内容质量和传播效果评定',
                        '高端定制：根据个人影响力可获得定制佣金方案'
                    ],
                    schedule: [
                        {
                            time: '第一天 14:00',
                            activity: '抵达入住',
                            description: '抵达海泉湾度假区，办理入住手续'
                        },
                        {
                            time: '第一天 15:30',
                            activity: '度假区导览',
                            description: '专业导游带领参观度假区各项设施'
                        },
                        {
                            time: '第一天 17:00',
                            activity: '温泉体验',
                            description: '体验海泉湾特色温泉，拍摄内容'
                        },
                        {
                            time: '第一天 19:00',
                            activity: '欢迎晚宴',
                            description: '享用特色海鲜晚宴，与其他创作者交流'
                        },
                        {
                            time: '第二天 09:00',
                            activity: '早餐',
                            description: '酒店享用自助早餐'
                        },
                        {
                            time: '第二天 10:30',
                            activity: 'SPA护理',
                            description: '体验高端SPA护理服务，拍摄内容'
                        },
                        {
                            time: '第二天 14:00',
                            activity: '沙滩活动',
                            description: '参与沙滩活动，拍摄海景内容'
                        },
                        {
                            time: '第二天 16:30',
                            activity: '下午茶',
                            description: '享用精致下午茶，拍摄美食内容'
                        },
                        {
                            time: '第二天 19:00',
                            activity: '烧烤晚宴',
                            description: '参加沙滩烧烤晚宴'
                        },
                        {
                            time: '第三天 09:00',
                            activity: '早餐',
                            description: '酒店享用自助早餐'
                        },
                        {
                            time: '第三天 10:30',
                            activity: '内容创作',
                            description: '自由时间，完成内容创作和拍摄'
                        },
                        {
                            time: '第三天 14:00',
                            activity: '返程',
                            description: '办理退房手续，结束行程'
                        }
                    ],
                    requirements: [
                        '粉丝数12万+',
                        '生活方式类内容创作者优先',
                        '需在行程结束后5天内发布相关内容',
                        '内容中需包含指定标签和关键词',
                        '需有高质量酒店/度假内容创作经验'
                    ],
                    currentParticipants: 8,
                    maxParticipants: 20,
                    minParticipants: 10, // 最小成团人数
                    enrollmentDeadline: '2024-07-05',
                    status: {
                        type: 'new',
                        text: '新上线'
                    },
                    isFull: false,
                    isConfirmed: false // 未确认成团
                }
            };
            
            // 获取行程数据
            const trip = tripData[tripId];
            
            if (trip) {
                this.trip = trip;
                
                // 初始化轮播图
                this.initSwiper();
                
                // 检查是否需要自动取消
                this.checkAutoCancellation();
            } else {
                this.showToast('未找到行程信息');
                setTimeout(() => {
                    window.location.href = 'trip-list.html';
                }, 1500);
            }
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
            this.isApplied = orders.some(order => order.tripId === this.tripId);
        },
        
        // 初始化页面
        initPage() {
            // 从URL获取行程ID
            const urlParams = new URLSearchParams(window.location.search);
            this.tripId = parseInt(urlParams.get('id'));
            
            if (this.tripId) {
                // 加载行程详情
                this.loadTripDetail(this.tripId);
                
                // 检查是否已报名
                this.checkIfApplied();
            } else {
                this.showToast('行程ID无效');
                setTimeout(() => {
                    window.location.href = 'trip-list.html';
                }, 1500);
            }
        }
    },
    mounted() {
        // 初始化页面
        this.initPage();
    }
}).mount('#app'); 