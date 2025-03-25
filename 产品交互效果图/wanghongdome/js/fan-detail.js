/**
 * 粉丝详情页面的JavaScript逻辑
 * 负责加载粉丝数据、服务记录历史和页面交互
 */

const { createApp } = Vue

createApp({
    data() {
        return {
            // 粉丝ID
            fanId: null,
            
            // 粉丝信息
            fan: {
                id: 0,
                name: '',
                avatar: '',
                serviceCount: 0,
                firstServiceDate: '',
                lastServiceDate: '',
                rating: 0
            },
            
            // 服务记录列表
            serviceRecords: [],
            
            // 加载状态
            isLoading: true
        }
    },
    
    methods: {
        /**
         * 返回上一页
         */
        goBack() {
            window.history.back();
        },
        
        /**
         * 从URL获取粉丝ID
         */
        getFanIdFromUrl() {
            const urlParams = new URLSearchParams(window.location.search);
            this.fanId = parseInt(urlParams.get('id') || '0');
            
            if (!this.fanId) {
                this.showToast('无效的粉丝ID');
                setTimeout(() => {
                    window.history.back();
                }, 1500);
            }
        },
        
        /**
         * 加载粉丝详情数据
         */
        loadFanData() {
            this.isLoading = true;
            
            // 模拟API请求延迟
            setTimeout(() => {
                // 从本地存储获取粉丝列表数据
                const servedFans = JSON.parse(localStorage.getItem('servedFans') || '[]');
                
                // 查找指定ID的粉丝
                const fan = servedFans.find(f => f.id === this.fanId);
                
                if (fan) {
                    // 如果找到了粉丝数据，填充基本信息
                    this.fan = {
                        id: fan.id,
                        name: fan.name,
                        avatar: fan.avatar,
                        serviceCount: fan.serviceCount,
                        rating: fan.rating
                    };
                    
                    // 加载服务记录
                    this.loadServiceRecords();
                } else {
                    this.showToast('未找到粉丝数据');
                    this.isLoading = false;
                    
                    setTimeout(() => {
                        window.history.back();
                    }, 1500);
                }
            }, 500);
        },
        
        /**
         * 加载服务记录历史
         */
        loadServiceRecords() {
            // 模拟API请求延迟
            setTimeout(() => {
                // 在实际应用中，应该从API获取服务记录
                // 这里使用模拟数据
                
                // 根据粉丝ID生成对应的服务记录
                if (this.fanId === 1) { // 王小美
                    this.serviceRecords = [
                        {
                            id: 101,
                            date: '2023-12-15',
                            tripId: 101,
                            tripName: '三亚椰风沙滩五日游',
                            tripImage: '../img/test.png',
                            location: '海南三亚',
                            duration: '5天4晚',
                            status: 'completed',
                            rating: 4.8,
                            feedback: '导游小丽很热情，为我们提供了很多便利，行程安排合理，非常满意！'
                        },
                        {
                            id: 102,
                            date: '2023-06-20',
                            tripId: 103,
                            tripName: '珠海情侣路摄影之旅',
                            tripImage: '../img/test.png',
                            location: '广东珠海',
                            duration: '1天',
                            status: 'completed',
                            rating: 5.0,
                            feedback: '摄影指导很专业，拍出了很多好看的照片，旅行体验很棒！'
                        },
                        {
                            id: 103,
                            date: '2022-10-05',
                            tripId: 105,
                            tripName: '北京故宫颐和园深度游',
                            tripImage: '../img/test.png',
                            location: '北京',
                            duration: '3天2晚',
                            status: 'completed',
                            rating: 4.5,
                            feedback: '行程安排紧凑，讲解很到位，了解了很多历史文化知识。'
                        }
                    ];
                } else if (this.fanId === 3) { // 张伟
                    this.serviceRecords = [
                        {
                            id: 201,
                            date: '2024-02-10',
                            tripId: 104,
                            tripName: '云南丽江古城休闲游',
                            tripImage: '../img/test.png',
                            location: '云南丽江',
                            duration: '6天5晚',
                            status: 'completed',
                            rating: 5.0,
                            feedback: '这是我第五次参加小丽的团了，一如既往的专业和贴心，强烈推荐！'
                        },
                        {
                            id: 202,
                            date: '2023-08-15',
                            tripId: 101,
                            tripName: '三亚椰风沙滩五日游',
                            tripImage: '../img/test.png',
                            location: '海南三亚',
                            duration: '5天4晚',
                            status: 'completed',
                            rating: 4.9,
                            feedback: '第四次跟小丽出行，服务一如既往地好，很信任她的专业能力。'
                        },
                        {
                            id: 203,
                            date: '2023-04-20',
                            tripId: 102,
                            tripName: '张家界玻璃桥三日游',
                            tripImage: '../img/test.png',
                            location: '湖南张家界',
                            duration: '3天2晚',
                            status: 'completed',
                            rating: 5.0,
                            feedback: '这已经是第三次参加小丽组织的旅行了，每次都有惊喜！'
                        },
                        {
                            id: 204,
                            date: '2022-11-10',
                            tripId: 106,
                            tripName: '西藏布达拉宫朝圣之旅',
                            tripImage: '../img/test.png',
                            location: '西藏拉萨',
                            duration: '7天6晚',
                            status: 'completed',
                            rating: 5.0,
                            feedback: '非常专业的高原旅行指导，让我们的西藏之行既安全又难忘。'
                        },
                        {
                            id: 205,
                            date: '2022-07-05',
                            tripId: 103,
                            tripName: '珠海情侣路摄影之旅',
                            tripImage: '../img/test.png',
                            location: '广东珠海',
                            duration: '1天',
                            status: 'completed',
                            rating: 4.8,
                            feedback: '第一次参加就被小丽的专业所折服，拍了很多美照，值得推荐！'
                        }
                    ];
                } else {
                    // 为其他粉丝生成随机服务记录
                    const trips = [
                        { id: 101, name: '三亚椰风沙滩五日游', image: '../img/test.png', location: '海南三亚', duration: '5天4晚' },
                        { id: 102, name: '张家界玻璃桥三日游', image: '../img/test.png', location: '湖南张家界', duration: '3天2晚' },
                        { id: 103, name: '珠海情侣路摄影之旅', image: '../img/test.png', location: '广东珠海', duration: '1天' },
                        { id: 104, name: '云南丽江古城休闲游', image: '../img/test.png', location: '云南丽江', duration: '6天5晚' },
                        { id: 105, name: '北京故宫颐和园深度游', image: '../img/test.png', location: '北京', duration: '3天2晚' },
                        { id: 106, name: '西藏布达拉宫朝圣之旅', image: '../img/test.png', location: '西藏拉萨', duration: '7天6晚' }
                    ];
                    
                    const feedbacks = [
                        '行程安排很合理，服务很贴心！',
                        '导游解说很专业，学到了很多知识。',
                        '拍了很多美照，留下了美好回忆。',
                        '体验非常好，下次还会参加。',
                        '强烈推荐给朋友们！'
                    ];
                    
                    // 生成粉丝的服务记录
                    this.serviceRecords = [];
                    const recordCount = this.fan.serviceCount || 1;
                    
                    let firstDate = null;
                    let lastDate = null;
                    
                    for (let i = 0; i < recordCount; i++) {
                        // 随机生成服务日期
                        const date = new Date();
                        date.setMonth(date.getMonth() - Math.floor(Math.random() * 12));
                        date.setDate(Math.floor(Math.random() * 28) + 1);
                        
                        const dateStr = this.formatDate(date);
                        
                        // 更新首次和最近服务日期
                        if (!firstDate || date < new Date(firstDate)) {
                            firstDate = dateStr;
                        }
                        
                        if (!lastDate || date > new Date(lastDate)) {
                            lastDate = dateStr;
                        }
                        
                        // 随机选择一个行程
                        const trip = trips[Math.floor(Math.random() * trips.length)];
                        
                        // 生成一条服务记录
                        this.serviceRecords.push({
                            id: 1000 + i,
                            date: dateStr,
                            tripId: trip.id,
                            tripName: trip.name,
                            tripImage: trip.image,
                            location: trip.location,
                            duration: trip.duration,
                            status: 'completed',
                            rating: 4 + Math.random(),
                            feedback: feedbacks[Math.floor(Math.random() * feedbacks.length)]
                        });
                    }
                    
                    // 更新粉丝的首次和最近服务日期
                    this.fan.firstServiceDate = firstDate;
                    this.fan.lastServiceDate = lastDate;
                    
                    // 按日期降序排序
                    this.serviceRecords.sort((a, b) => new Date(b.date) - new Date(a.date));
                }
                
                this.isLoading = false;
            }, 800);
        },
        
        /**
         * 格式化日期
         * @param {Date|string} date - 日期对象或日期字符串
         * @returns {string} - 格式化后的日期字符串
         */
        formatDate(date) {
            const d = typeof date === 'string' ? new Date(date) : date;
            const year = d.getFullYear();
            const month = String(d.getMonth() + 1).padStart(2, '0');
            const day = String(d.getDate()).padStart(2, '0');
            
            return `${year}-${month}-${day}`;
        },
        
        /**
         * 获取行程状态文本
         * @param {string} status - 行程状态
         * @returns {string} - 状态文本
         */
        getStatusText(status) {
            const statusMap = {
                'completed': '已完成',
                'ongoing': '进行中',
                'upcoming': '即将开始',
                'cancelled': '已取消'
            };
            
            return statusMap[status] || '未知状态';
        },
        
        /**
         * 查看行程详情
         * @param {number} tripId - 行程ID
         */
        viewTripDetail(tripId) {
            window.location.href = `trip-detail.html?id=${tripId}`;
        },
        
        /**
         * 显示提示信息
         * @param {string} message - 提示消息
         */
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
        
        /**
         * 检查登录状态
         */
        checkLoginStatus() {
            // 从localStorage获取登录状态
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            
            // 如果未登录，重定向到登录页面
            if (!isLoggedIn) {
                window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
                return false;
            }
            
            return true;
        }
    },
    
    mounted() {
        // 检查登录状态
        if (this.checkLoginStatus()) {
            // 获取粉丝ID
            this.getFanIdFromUrl();
            
            // 加载粉丝数据
            if (this.fanId) {
                this.loadFanData();
            }
        }
    }
}).mount('#app'); 