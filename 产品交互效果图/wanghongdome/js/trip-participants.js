// 行程参与者 JavaScript
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
                currentParticipants: 0,
                maxParticipants: 0,
                enrollmentDeadline: ''
            },
            
            // 参与者列表
            participants: [],
            
            // 是否正在加载
            loading: true,
            
            // 当前选中的标签
            activeTab: 'all',
            
            // 标签列表
            tabs: [
                { id: 'all', name: '全部' },
                { id: 'paid', name: '已支付' },
                { id: 'pending', name: '待支付' },
                { id: 'cancelled', name: '已取消' }
            ]
        }
    },
    computed: {
        // 已支付的参与者数量
        paidParticipants() {
            return this.participants.filter(p => p.status === 'paid').length;
        },
        
        // 距离报名截止还有多少天
        daysUntilDeadline() {
            const today = new Date();
            const deadline = new Date(this.trip.enrollmentDeadline);
            const diffTime = deadline - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            return diffDays > 0 ? diffDays : 0;
        },
        
        // 根据当前选中的标签过滤参与者
        filteredParticipants() {
            if (this.activeTab === 'all') {
                return this.participants;
            }
            return this.participants.filter(participant => participant.status === this.activeTab);
        },
        
        // 是否有参与者
        hasParticipants() {
            return this.filteredParticipants.length > 0;
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
        
        // 获取标签数量
        getTabCount(tabId) {
            if (tabId === 'all') {
                return this.participants.length;
            }
            return this.participants.filter(p => p.status === tabId).length;
        },
        
        // 获取标签空状态文本
        getTabEmptyText() {
            const textMap = {
                'all': '报名者',
                'paid': '已支付用户',
                'pending': '待支付用户',
                'cancelled': '已取消用户'
            };
            return textMap[this.activeTab] || '报名者';
        },
        
        // 获取状态文本
        getStatusText(status) {
            const statusMap = {
                'paid': '已支付',
                'pending': '待支付',
                'cancelled': '已取消'
            };
            return statusMap[status] || '未知状态';
        },
        
        // 获取状态类名
        getStatusClass(status) {
            return status;
        },
        
        // 掩码手机号
        maskPhone(phone) {
            if (!phone) return '';
            return phone.replace(/(\d{3})\d{4}(\d{4})/, '$1****$2');
        },
        
        // 联系参与者
        contactParticipant(participantId) {
            // 实际项目中应该跳转到聊天页面或显示联系方式
            this.showToast('聊天功能即将上线');
        },
        
        // 分享行程
        shareTrip() {
            this.showToast('分享功能即将上线');
        },
        
        // 通知所有参与者
        notifyParticipants() {
            this.showToast('通知功能即将上线');
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
                    currentParticipants: 27,
                    maxParticipants: 30,
                    enrollmentDeadline: '2024-06-10',
                    status: {
                        type: 'hot',
                        text: '热门'
                    },
                    isFull: false
                },
                102: {
                    id: 102,
                    title: '珠海外伶仃岛探险之旅',
                    description: '跟随探险家小美一起探索珠海最美海岛——外伶仃岛。体验海岛风光，参与各种户外活动，拍摄精彩内容。适合户外探险爱好者和自然风光摄影师。',
                    destination: '珠海外伶仃岛',
                    date: '2024-06-22',
                    duration: '3天2晚',
                    images: ['../img/test.png', '../img/test.png', '../img/test.png'],
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
                    currentParticipants: 8,
                    maxParticipants: 20,
                    enrollmentDeadline: '2024-07-05',
                    status: {
                        type: 'new',
                        text: '新上线'
                    },
                    isFull: false
                }
            };
            
            // 获取行程数据
            const trip = tripData[tripId];
            
            if (trip) {
                this.trip = trip;
                this.loadParticipants(tripId);
            } else {
                this.showToast('未找到行程信息');
                setTimeout(() => {
                    window.location.href = 'trip-management.html';
                }, 1500);
            }
        },
        
        // 加载参与者数据
        loadParticipants(tripId) {
            // 实际项目中应该从API获取数据
            // 这里使用模拟数据
            setTimeout(() => {
                // 生成模拟参与者数据
                const participantsData = [];
                
                // 根据行程的当前参与者数量生成模拟数据
                const totalParticipants = this.trip.currentParticipants;
                
                // 已支付的参与者（约70%）
                const paidCount = Math.floor(totalParticipants * 0.7);
                for (let i = 0; i < paidCount; i++) {
                    participantsData.push({
                        id: 10000 + i,
                        name: `用户${10000 + i}`,
                        avatar: '../img/avatar.png',
                        phone: `1${Math.floor(Math.random() * 9 + 1)}${Math.floor(Math.random() * 10000000 + 10000000)}`,
                        status: 'paid',
                        enrollTime: this.getRandomDate()
                    });
                }
                
                // 待支付的参与者（约20%）
                const pendingCount = Math.floor(totalParticipants * 0.2);
                for (let i = 0; i < pendingCount; i++) {
                    participantsData.push({
                        id: 20000 + i,
                        name: `用户${20000 + i}`,
                        avatar: '../img/avatar.png',
                        phone: `1${Math.floor(Math.random() * 9 + 1)}${Math.floor(Math.random() * 10000000 + 10000000)}`,
                        status: 'pending',
                        enrollTime: this.getRandomDate()
                    });
                }
                
                // 已取消的参与者（约10%）
                const cancelledCount = totalParticipants - paidCount - pendingCount;
                for (let i = 0; i < cancelledCount; i++) {
                    participantsData.push({
                        id: 30000 + i,
                        name: `用户${30000 + i}`,
                        avatar: '../img/avatar.png',
                        phone: `1${Math.floor(Math.random() * 9 + 1)}${Math.floor(Math.random() * 10000000 + 10000000)}`,
                        status: 'cancelled',
                        enrollTime: this.getRandomDate()
                    });
                }
                
                // 按报名时间排序
                this.participants = participantsData.sort((a, b) => {
                    return new Date(b.enrollTime) - new Date(a.enrollTime);
                });
                
                this.loading = false;
            }, 800);
        },
        
        // 生成随机日期（最近30天内）
        getRandomDate() {
            const now = new Date();
            const daysAgo = Math.floor(Math.random() * 30);
            const randomDate = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
            
            return randomDate.toLocaleString('zh-CN', {
                year: 'numeric',
                month: '2-digit',
                day: '2-digit',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit'
            });
        },
        
        // 初始化页面
        initPage() {
            // 从URL获取行程ID
            const urlParams = new URLSearchParams(window.location.search);
            this.tripId = parseInt(urlParams.get('id'));
            
            if (this.tripId) {
                // 加载行程详情
                this.loadTripDetail(this.tripId);
            } else {
                this.showToast('行程ID无效');
                setTimeout(() => {
                    window.location.href = 'trip-management.html';
                }, 1500);
            }
        }
    },
    mounted() {
        // 初始化页面
        this.initPage();
    }
}).mount('#app'); 