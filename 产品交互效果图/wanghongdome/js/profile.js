// 个人中心 JavaScript
const { createApp } = Vue

createApp({
    data() {
        return {
            // 用户信息
            user: {
                id: 1001,
                name: '旅行达人小丽',
                avatar: '../img/potato.png',
                level: '金牌网红',
                followers: 125800,
                trips: 15,
                completedTrips: 12
            },
            
            // 收益信息
            earnings: {
                total: '2,6880.00',
                available: '5,280.00',
                pending: '3,400.00',
                thisMonth: '4,580.00',
                lastMonth: '6,200.00'
            },
            
            // 菜单项
            menuItems: [
                // {
                //     id: 'orders',
                //     icon: 'bi-receipt',
                //     title: '我的订单',
                //     badge: 2,
                //     link: 'orders.html'
                // },
                {
                    id: 'trip-management',
                    icon: 'bi-calendar-check',
                    title: '行程管理',
                    badge: 0,
                    link: 'trip-management.html'
                },
                {
                    id: 'earnings',
                    icon: 'bi-wallet2',
                    title: '收益明细',
                    badge: 0,
                    link: '#'
                },
                {
                    id: 'fans',
                    icon: 'bi-people',
                    title: '我的粉丝',
                    badge: 0,
                    link: 'fans-served.html'
                },
                {
                    id: 'settings',
                    icon: 'bi-gear',
                    title: '账号设置',
                    badge: 0,
                    link: '#'
                },
                {
                    id: 'feedback',
                    icon: 'bi-chat-dots',
                    title: '意见反馈',
                    badge: 0,
                    link: '#'
                },
                {
                    id: 'about',
                    icon: 'bi-info-circle',
                    title: '关于我们',
                    badge: 0,
                    link: '#'
                }
            ]
        }
    },
    methods: {
        // 格式化数字
        formatNumber(num) {
            if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万';
            }
            return num.toString();
        },
        
        // 跳转到菜单项对应页面
        goToMenuItem(item) {
            if (item.link === '#') {
                this.showToast(`${item.title}功能即将上线`);
                return;
            }
            window.location.href = item.link;
        },
        
        // 提现
        withdraw() {
            this.showToast('提现功能即将上线');
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
        
        // 跳转到首页
        goToHome() {
            window.location.href = 'index.html';
        },
        
        // 查看我的行程
        viewMyTrips() {
            window.location.href = 'trip-list.html?source=profile';
        },
        
        // 跳转到订单中心
        goToOrders() {
            window.location.href = 'orders.html';
        },
        
        /**
         * 退出登录
         * 清除本地存储的用户信息并跳转到登录页面
         */
        logout() {
            // 清除本地存储中的用户信息
            localStorage.removeItem('userInfo');
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('loginTimestamp');
            
            // 显示退出成功提示
            this.showToast('退出登录成功');
            
            // 延迟跳转到登录页面
            setTimeout(() => {
                window.location.href = 'login.html';
            }, 1500);
        },
        
        // 加载用户数据
        loadUserData() {
            // 实际项目中应该从API获取数据
            // 这里使用模拟数据
            
            // 从本地存储获取订单数据，计算待处理订单数量
            const orders = JSON.parse(localStorage.getItem('orders') || '[]');
            const pendingOrders = orders.filter(order => order.status === 'pending' || order.status === 'confirmed').length;
            
            // 更新订单菜单项的徽章数
            const orderMenuItem = this.menuItems.find(item => item.id === 'orders');
            if (orderMenuItem) {
                orderMenuItem.badge = pendingOrders;
            }
            
            // 检查用户登录状态
            const userInfo = JSON.parse(localStorage.getItem('userInfo'));
            if (userInfo) {
                // 更新用户信息
                this.user.name = userInfo.name || this.user.name;
                this.user.avatar = userInfo.avatar || this.user.avatar;
            }
        }
    },
    mounted() {
        // 加载用户数据
        this.loadUserData();
    }
}).mount('#app'); 