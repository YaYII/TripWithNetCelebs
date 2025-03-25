// 行程参与者 JavaScript
const { createApp } = Vue

createApp({
    data() {
        return {
            // 行程ID
            tripId: null,
            
            // 行程详情
            trip: null,
            
            // 行程是否有网红报名
            hasInfluencer: false,
            
            // 参与者列表
            participants: [],
            
            // 加载状态
            isLoading: true,
            
            // 剩余天数
            remainingDays: 0,
            
            // 筛选状态
            activeFilter: 'all',
            
            // 是否显示筛选标签
            hasFilters: true,
            
            // 用户是否已报名
            isEnrolled: false,
            
            // 已报名行程ID列表
            enrolledTripIds: []
        }
    },
    computed: {
        // 根据筛选条件过滤参与者列表
        filteredParticipants() {
            if (this.activeFilter === 'all') {
                return this.participants;
            } else {
                return this.participants.filter(p => p.status === this.activeFilter);
            }
        }
    },
    methods: {
        // 返回上一页
        goBack() {
            window.history.back();
        },
        
        // 查看行程详情
        viewTripDetail() {
            window.location.href = `trip-detail.html?id=${this.tripId}&source=list`;
        },
        
        // 筛选参与者
        filterParticipants(filter) {
            this.activeFilter = filter;
        },
        
        // 格式化手机号码，隐藏中间四位
        formatPhone(phone) {
            if (!phone || phone.length !== 11) {
                return phone;
            }
            return phone.substr(0, 3) + '****' + phone.substr(7);
        },
        
        // 初始化页面
        initPage() {
            // 从URL获取行程ID
            const urlParams = new URLSearchParams(window.location.search);
            // 支持两种参数名：tripId 和 id
            this.tripId = urlParams.get('tripId') || urlParams.get('id');
            
            if (this.tripId) {
                // 加载行程详情和参与者信息
                this.loadTripData();
            } else {
                this.showToast('无效的行程ID');
                setTimeout(() => {
                    window.location.href = 'trip-list.html';
                }, 1500);
            }
        },
        
        // 加载行程数据
        loadTripData() {
            // 模拟数据加载
            setTimeout(() => {
                this.trip = {
                    id: this.tripId,
                    title: '珠海长隆海洋王国亲子2日游',
                    date: '2024-06-15',
                    image: '../img/test.png',
                    currentParticipants: 8,
                    maxParticipants: 20,
                    enrolledPercentage: 40,
                    status: {
                        type: 'hot',
                        text: '热门'
                    }
                };
                
                // 首先检查用户是否已报名
                this.checkEnrollmentStatus();
                
                // 根据行程ID设置是否有网红报名
                if (this.tripId === '101' || this.tripId === '103') {
                    this.hasInfluencer = true;
                    
                    // 只有在用户已报名且有网红报名的情况下才加载参与者数据
                    if (this.isEnrolled) {
                        this.loadParticipantsData();
                    } else {
                        // 未报名时不显示参与者数据
                        this.participants = [];
                    }
                } else {
                    // 没有网红报名的情况
                    this.hasInfluencer = false;
                    this.participants = [];
                }
                
                // 计算剩余天数
                const tripDate = new Date(this.trip.date);
                const currentDate = new Date();
                const timeDiff = tripDate.getTime() - currentDate.getTime();
                this.remainingDays = Math.ceil(timeDiff / (1000 * 3600 * 24));
                
                // 检查是否需要显示筛选标签
                this.checkFilters();
                
                this.isLoading = false;
            }, 1000);
        },
        
        // 加载参与者数据
        loadParticipantsData() {
            // 模拟参与者数据
            this.participants = [
                {
                    id: 'p001',
                    name: '张小红',
                    avatar: '../img/test.png',
                    phone: '13812345678',
                    status: 'confirmed',
                    statusText: '已确认'
                },
                {
                    id: 'p002',
                    name: '李明',
                    avatar: '../img/test.png',
                    phone: '13987654321',
                    status: 'confirmed',
                    statusText: '已确认'
                },
                {
                    id: 'p003',
                    name: '王强',
                    avatar: '../img/test.png',
                    phone: '15912345678',
                    status: 'pending',
                    statusText: '待确认'
                },
                {
                    id: 'p004',
                    name: '赵晓',
                    avatar: '../img/test.png',
                    phone: '13512345678',
                    status: 'confirmed',
                    statusText: '已确认'
                },
                {
                    id: 'p005',
                    name: '刘芳',
                    avatar: '../img/test.png',
                    phone: '18687654321',
                    status: 'confirmed',
                    statusText: '已确认'
                },
                {
                    id: 'p006',
                    name: '陈小明',
                    avatar: '../img/test.png',
                    phone: '13798765432',
                    status: 'cancelled',
                    statusText: '已取消'
                },
                {
                    id: 'p007',
                    name: '杨光',
                    avatar: '../img/test.png',
                    phone: '15887654321',
                    status: 'confirmed',
                    statusText: '已确认'
                },
                {
                    id: 'p008',
                    name: '林小华',
                    avatar: '../img/test.png',
                    phone: '13612345678',
                    status: 'confirmed',
                    statusText: '已确认'
                }
            ];
        },
        
        // 检查用户是否已报名
        checkEnrollmentStatus() {
            // 模拟从本地存储获取已报名行程ID列表
            this.enrolledTripIds = JSON.parse(localStorage.getItem('enrolledTripIds') || '[]');
            
            // 也可以使用以下固定列表进行测试
            const testEnrolledTripIds = ['101', 'trip002'];
            
            // 检查当前行程是否在已报名列表中
            this.isEnrolled = testEnrolledTripIds.includes(this.tripId);
            
            // 从URL获取source参数，如果是从行程列表页进入，则视为已报名
            const urlParams = new URLSearchParams(window.location.search);
            const source = urlParams.get('source');
            if (source === 'list') {
                this.isEnrolled = true;
            }
        },
        
        // 检查是否需要显示筛选标签
        checkFilters() {
            // 如果有不同状态的参与者，才显示筛选标签
            const statuses = new Set(this.participants.map(p => p.status));
            this.hasFilters = statuses.size > 1;
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
        }
    },
    mounted() {
        // 初始化页面
        this.initPage();
    }
}).mount('#app'); 