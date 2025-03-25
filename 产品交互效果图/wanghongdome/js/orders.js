// 订单中心 JavaScript
const { createApp } = Vue

createApp({
    data() {
        return {
            // 当前选中的标签
            activeTab: 'all',
            
            // 订单列表
            orders: [],
            
            // 是否正在加载
            loading: true,
            
            // 标签列表
            tabs: [
                { id: 'all', name: '全部' },
                { id: 'pending', name: '待确认' },
                { id: 'confirmed', name: '已确认' },
                { id: 'completed', name: '已完成' },
                { id: 'cancelled', name: '已取消' }
            ]
        }
    },
    computed: {
        // 根据当前选中的标签过滤订单
        filteredOrders() {
            if (this.activeTab === 'all') {
                return this.orders;
            }
            return this.orders.filter(order => order.status === this.activeTab);
        },
        
        // 是否有订单
        hasOrders() {
            return this.filteredOrders.length > 0;
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
        
        // 查看订单详情
        viewOrderDetail(orderId) {
            // 实际项目中应该跳转到订单详情页
            this.showToast('订单详情功能即将上线');
        },
        
        // 取消订单
        cancelOrder(orderId) {
            if (confirm('确定要取消该订单吗？')) {
                // 查找订单
                const orderIndex = this.orders.findIndex(order => order.id === orderId);
                if (orderIndex !== -1) {
                    // 更新订单状态
                    this.orders[orderIndex].status = 'cancelled';
                    
                    // 保存到本地存储
                    localStorage.setItem('orders', JSON.stringify(this.orders));
                    
                    // 显示提示
                    this.showToast('订单已取消');
                }
            }
        },
        
        // 确认完成
        confirmCompletion(orderId) {
            if (confirm('确认已完成该行程？')) {
                // 查找订单
                const orderIndex = this.orders.findIndex(order => order.id === orderId);
                if (orderIndex !== -1) {
                    // 更新订单状态
                    this.orders[orderIndex].status = 'completed';
                    
                    // 保存到本地存储
                    localStorage.setItem('orders', JSON.stringify(this.orders));
                    
                    // 显示提示
                    this.showToast('已确认完成');
                }
            }
        },
        
        // 获取订单状态文本
        getStatusText(status) {
            const statusMap = {
                'pending': '待确认',
                'confirmed': '已确认',
                'completed': '已完成',
                'cancelled': '已取消'
            };
            return statusMap[status] || '未知状态';
        },
        
        // 获取订单状态类名
        getStatusClass(status) {
            const classMap = {
                'pending': 'status-pending',
                'confirmed': 'status-confirmed',
                'completed': 'status-completed',
                'cancelled': 'status-cancelled'
            };
            return classMap[status] || '';
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
        
        // 加载订单数据
        loadOrders() {
            this.loading = true;
            
            // 从本地存储获取订单数据
            let orders = JSON.parse(localStorage.getItem('orders') || '[]');
            
            // 如果没有订单数据，创建一些模拟数据
            if (orders.length === 0) {
                orders = [
                    {
                        id: 1001,
                        orderNumber: 'ORD123456',
                        tripId: 101,
                        tripTitle: '珠海长隆海洋王国亲子2日游',
                        tripImage: '../img/test.png',
                        tripDate: '2024-06-15',
                        destination: '珠海长隆海洋王国',
                        commission: '1,280',
                        status: 'confirmed',
                        orderTime: '2024-05-20 14:30:25'
                    },
                    {
                        id: 1002,
                        orderNumber: 'ORD234567',
                        tripId: 102,
                        tripTitle: '珠海外伶仃岛探险之旅',
                        tripImage: '../img/test.png',
                        tripDate: '2024-06-22',
                        destination: '珠海外伶仃岛',
                        commission: '1,500',
                        status: 'pending',
                        orderTime: '2024-05-25 09:15:42'
                    },
                    {
                        id: 1003,
                        orderNumber: 'ORD345678',
                        tripId: 103,
                        tripTitle: '珠海情侣路摄影之旅',
                        tripImage: '../img/test.png',
                        tripDate: '2024-05-10',
                        destination: '珠海情侣路',
                        commission: '980',
                        status: 'completed',
                        orderTime: '2024-04-28 16:20:18'
                    },
                    {
                        id: 1004,
                        orderNumber: 'ORD456789',
                        tripId: 104,
                        tripTitle: '珠海横琴度假区休闲游',
                        tripImage: '../img/test.png',
                        tripDate: '2024-05-05',
                        destination: '珠海横琴度假区',
                        commission: '1,100',
                        status: 'cancelled',
                        orderTime: '2024-04-15 10:45:33'
                    }
                ];
                
                // 保存到本地存储
                localStorage.setItem('orders', JSON.stringify(orders));
            }
            
            // 按下单时间倒序排序
            this.orders = orders.sort((a, b) => {
                return new Date(b.orderTime) - new Date(a.orderTime);
            });
            
            // 模拟加载延迟
            setTimeout(() => {
                this.loading = false;
            }, 500);
        },
        
        // 跳转到首页
        goToHome() {
            window.location.href = 'index.html';
        },
        
        // 跳转到行程列表
        goToTrips() {
            window.location.href = 'trip-list.html?source=main';
        },
        
        // 跳转到个人中心
        goToProfile() {
            window.location.href = 'profile.html';
        },
        
        // 继续探索
        continueExplore() {
            window.location.href = 'trip-list.html?source=main';
        }
    },
    mounted() {
        // 加载订单数据
        this.loadOrders();
    }
}).mount('#app'); 