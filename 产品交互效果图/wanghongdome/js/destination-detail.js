/**
 * 目的地详情页面脚本
 * 负责显示目的地详细信息、相关行程和相关景点
 */
new Vue({
    el: '#app',
    data: {
        isLoading: true,
        destinationId: '',
        destination: {
            id: '',
            name: '',
            image: '',
            description: '',
            tripCount: 0,
            minCommission: 0,
            maxCommission: 0,
            tags: []
        },
        trips: [],
        relatedDestinations: []
    },
    created() {
        this.initPage();
    },
    methods: {
        /**
         * 初始化页面
         * 解析URL参数，加载目的地详情
         */
        initPage() {
            // 从URL获取目的地ID
            const urlParams = new URLSearchParams(window.location.search);
            this.destinationId = urlParams.get('id') || '';
            
            if (!this.destinationId) {
                this.showErrorToast('无效的目的地ID');
                setTimeout(() => {
                    this.goBack();
                }, 1500);
                return;
            }
            
            // 从本地存储获取目的地数据
            this.loadDestinationData();
            
            // 模拟加载延迟
            setTimeout(() => {
                this.isLoading = false;
            }, 500);
        },
        
        /**
         * 加载目的地数据
         * 从本地存储获取目的地数据，并加载关联的行程和相关景点
         */
        loadDestinationData() {
            // 从本地存储获取目的地数据
            const allDestinations = JSON.parse(localStorage.getItem('zhuhaiDestinations') || '[]');
            const destination = allDestinations.find(d => d.id === this.destinationId);
            
            if (!destination) {
                this.showErrorToast('找不到目的地信息');
                setTimeout(() => {
                    this.goBack();
                }, 1500);
                return;
            }
            
            // 设置目的地信息
            this.destination = destination;
            
            // 设置页面标题
            document.title = destination.name;
            
            // 加载相关行程
            this.loadTrips();
            
            // 加载相关景点
            this.loadRelatedDestinations(allDestinations);
        },
        
        /**
         * 加载相关行程
         * 根据目的地ID查找相关行程
         */
        loadTrips() {
            // 模拟从服务器获取的行程数据
            this.trips = [
                {
                    id: 'trip001',
                    title: `探索${this.destination.name}一日游`,
                    date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
                    price: 299,
                    commission: 50,
                    coverImage: '../img/test.png',
                    status: 'upcoming'
                },
                {
                    id: 'trip002',
                    title: `${this.destination.name}深度体验之旅`,
                    date: new Date(Date.now() + 14 * 24 * 60 * 60 * 1000),
                    price: 399,
                    commission: 70,
                    coverImage: '../img/test.png',
                    status: 'upcoming'
                },
                {
                    id: 'trip003',
                    title: `${this.destination.name}特色体验`,
                    date: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
                    price: 349,
                    commission: 60,
                    coverImage: '../img/test.png',
                    status: 'completed'
                }
            ];
        },
        
        /**
         * 加载相关景点
         * 根据标签匹配找出相关景点
         * @param {Array} allDestinations 所有目的地数据
         */
        loadRelatedDestinations(allDestinations) {
            // 根据当前目的地的标签找出相关景点
            const currentTags = this.destination.tags || [];
            
            this.relatedDestinations = allDestinations
                .filter(d => {
                    // 不包含当前景点
                    if (d.id === this.destinationId) return false;
                    
                    // 匹配标签，如果有共同标签则为相关景点
                    const destTags = d.tags || [];
                    return destTags.some(tag => currentTags.includes(tag));
                })
                .slice(0, 5); // 最多显示5个相关景点
        },
        
        /**
         * 查看行程详情
         * @param {string} tripId 行程ID
         */
        viewTripDetail(tripId) {
            // 使用AppRouter导航到景点相关的行程详情页
            if (window.AppRouter) {
                window.AppRouter.goToTripFromDestination(
                    tripId, 
                    this.destinationId, 
                    this.destination.name
                );
                return;
            }
            
            // 兼容旧版: 直接导航到行程详情页
            // 完成的行程去往行程记录页
            const completedTrip = this.trips.find(t => t.id === tripId && t.status === 'completed');
            if (completedTrip) {
                window.location.href = `trip-record.html?id=${tripId}`;
                return;
            }
            
            // 其他行程去往行程详情页
            window.location.href = `trip-detail-success.html?id=${tripId}`;
        },
        
        /**
         * 前往目的地详情页
         * @param {string} destId 目的地ID
         */
        goToDestination(destId) {
            window.location.href = `destination-detail.html?id=${destId}`;
        },
        
        /**
         * 返回上一页
         */
        goBack() {
            if (window.history.length > 1) {
                window.history.back();
            } else {
                window.location.href = 'all-destinations.html';
            }
        },
        
        /**
         * 显示错误提示
         * @param {string} message 错误信息
         */
        showErrorToast(message) {
            // 简单的实现，实际项目中可能会使用更复杂的Toast组件
            alert(message);
        },
        
        /**
         * 格式化佣金显示
         * @param {number} amount 佣金金额
         * @returns {string} 格式化后的金额
         */
        formatCommission(amount) {
            return amount >= 1000 ? `${(amount / 1000).toFixed(1)}k` : amount;
        },
        
        /**
         * 格式化日期显示
         * @param {Date} date 日期
         * @returns {string} 格式化后的日期字符串
         */
        formatDate(date) {
            if (!date) return '';
            const options = { month: 'short', day: 'numeric' };
            return new Date(date).toLocaleDateString('zh-CN', options);
        },
        
        /**
         * 获取行程状态文本
         * @param {string} status 行程状态
         * @returns {string} 状态文本
         */
        getStatusText(status) {
            const statusMap = {
                'upcoming': '即将开始',
                'ongoing': '进行中',
                'completed': '已结束'
            };
            return statusMap[status] || '未知状态';
        }
    }
}); 