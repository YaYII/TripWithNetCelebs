/**
 * 服务粉丝列表页面的JavaScript逻辑
 * 负责加载粉丝数据、搜索过滤和页面交互
 */

const { createApp } = Vue

createApp({
    data() {
        return {
            // 粉丝列表
            fans: [],
            
            // 原始粉丝数据备份，用于搜索恢复
            originalFans: [],
            
            // 搜索文本
            searchText: '',
            
            // 当前激活的标签
            activeTab: 'all',
            
            // 空状态文本
            emptyStateText: '暂无服务过的粉丝',
            
            // 加载状态
            isLoading: true
        }
    },
    
    computed: {
        // 粉丝总数
        fansCount() {
            return this.originalFans.length;
        },
        
        // 总服务次数
        totalServiceCount() {
            return this.originalFans.reduce((total, fan) => total + fan.serviceCount, 0);
        },
        
        // 平均评分
        averageRating() {
            const fans = this.originalFans.filter(fan => fan.rating > 0);
            if (fans.length === 0) return 0;
            
            const totalRating = fans.reduce((sum, fan) => sum + fan.rating, 0);
            return totalRating / fans.length;
        },
        
        // 经过过滤的粉丝列表
        filteredFans() {
            let result = [...this.fans];
            
            // 根据当前标签过滤
            if (this.activeTab === 'multiple') {
                result = result.filter(fan => fan.serviceCount > 1);
            } else if (this.activeTab === 'recent') {
                // 按最后服务日期排序，只取最近三个月的
                const threeMonthsAgo = new Date();
                threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);
                
                result = result.filter(fan => {
                    const lastServiceDate = new Date(fan.lastServiceDate);
                    return lastServiceDate >= threeMonthsAgo;
                });
            }
            
            // 根据搜索文本过滤
            if (this.searchText) {
                const searchLower = this.searchText.toLowerCase();
                result = result.filter(fan => 
                    fan.name.toLowerCase().includes(searchLower)
                );
                
                // 更新空状态文本
                if (result.length === 0) {
                    this.emptyStateText = '没有找到匹配的粉丝';
                }
            } else {
                this.emptyStateText = '暂无服务过的粉丝';
            }
            
            return result;
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
         * 切换标签
         * @param {string} tabId - 标签ID
         */
        switchTab(tabId) {
            this.activeTab = tabId;
        },
        
        /**
         * 查看粉丝详情
         * @param {number} fanId - 粉丝ID
         */
        viewFanDetail(fanId) {
            window.location.href = `fan-detail.html?id=${fanId}`;
        },
        
        /**
         * 加载粉丝数据
         */
        loadFansData() {
            this.isLoading = true;
            
            // 模拟API请求延迟
            setTimeout(() => {
                // 从本地存储获取数据，如果没有则使用模拟数据
                const savedFans = localStorage.getItem('servedFans');
                
                if (savedFans) {
                    this.fans = JSON.parse(savedFans);
                } else {
                    // 使用模拟数据
                    this.fans = [
                        {
                            id: 1,
                            name: '王小美',
                            avatar: '../img/potato.png',
                            serviceCount: 3,
                            lastServiceDate: '2023-12-15',
                            lastTripName: '三亚椰风沙滩五日游',
                            rating: 4.8
                        },
                        {
                            id: 2,
                            name: '李强',
                            avatar: '../img/potato.png',
                            serviceCount: 1,
                            lastServiceDate: '2023-11-20',
                            lastTripName: '张家界玻璃桥三日游',
                            rating: 4.5
                        },
                        {
                            id: 3,
                            name: '张伟',
                            avatar: '../img/potato.png',
                            serviceCount: 5,
                            lastServiceDate: '2024-02-10',
                            lastTripName: '云南丽江古城休闲游',
                            rating: 5.0
                        },
                        {
                            id: 4,
                            name: '刘洋',
                            avatar: '../img/potato.png',
                            serviceCount: 2,
                            lastServiceDate: '2024-01-18',
                            lastTripName: '珠海长隆海洋王国亲子2日游',
                            rating: 4.3
                        },
                        {
                            id: 5,
                            name: '赵静',
                            avatar: '../img/potato.png',
                            serviceCount: 4,
                            lastServiceDate: '2023-08-05',
                            lastTripName: '北京故宫颐和园深度游',
                            rating: 4.7
                        },
                        {
                            id: 6,
                            name: '孙明',
                            avatar: '../img/potato.png',
                            serviceCount: 1,
                            lastServiceDate: '2023-10-12',
                            lastTripName: '西藏布达拉宫朝圣之旅',
                            rating: 4.9
                        },
                        {
                            id: 7,
                            name: '周婷',
                            avatar: '../img/potato.png',
                            serviceCount: 2,
                            lastServiceDate: '2024-03-01',
                            lastTripName: '珠海外伶仃岛探险之旅',
                            rating: 4.6
                        }
                    ];
                    
                    // 保存到本地存储
                    localStorage.setItem('servedFans', JSON.stringify(this.fans));
                }
                
                // 备份原始数据
                this.originalFans = [...this.fans];
                
                this.isLoading = false;
            }, 1000);
        },
        
        /**
         * 格式化日期
         * @param {string} dateString - 日期字符串
         * @returns {string} - 格式化后的日期字符串
         */
        formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            
            return `${year}-${month}-${day}`;
        },
        
        /**
         * 过滤粉丝列表
         */
        filterFans() {
            // 重置粉丝列表为原始数据
            this.fans = [...this.originalFans];
        },
        
        /**
         * 清除搜索内容
         */
        clearSearch() {
            this.searchText = '';
            this.filterFans();
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
            // 加载粉丝数据
            this.loadFansData();
        }
    }
}).mount('#app'); 