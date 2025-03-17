const { createApp } = Vue;

createApp({
    data() {
        return {
            activeTab: 'all', // 当前激活的标签：all, destinations, influencers
            favorites: [], // 所有收藏项
            isLoading: false
        };
    },
    computed: {
        // 根据当前标签过滤收藏项
        filteredFavorites() {
            if (this.activeTab === 'all') {
                return this.favorites;
            } else if (this.activeTab === 'destinations') {
                return this.favorites.filter(item => item.type === 'destination');
            } else if (this.activeTab === 'influencers') {
                return this.favorites.filter(item => item.type === 'trip');
            }
            return [];
        },
        // 空状态文本
        emptyStateText() {
            if (this.activeTab === 'all') {
                return '您还没有收藏任何内容';
            } else if (this.activeTab === 'destinations') {
                return '您还没有收藏任何景点';
            } else if (this.activeTab === 'influencers') {
                return '您还没有收藏任何行程';
            }
            return '';
        }
    },
    methods: {
        // 返回上一页
        goBack() {
            // 如果是从其他页面跳转过来的，则返回上一页
            if (document.referrer && document.referrer.includes('destination-detail.html') || document.referrer.includes('trip-detail.html')) {
                window.history.back();
            } else {
                // 否则返回首页
                window.location.href = 'home.html';
            }
        },
        
        // 设置当前标签
        setActiveTab(tab) {
            this.activeTab = tab;
        },
        
        // 查看详情
        viewDetail(item) {
            if (item.type === 'destination') {
                window.location.href = `destination-detail.html?id=${item.id}`;
            } else if (item.type === 'trip') {
                window.location.href = `trip-detail.html?id=${item.id}`;
            }
        },
        
        // 切换收藏状态
        toggleFavorite(item) {
            // 从收藏列表中移除
            this.favorites = this.favorites.filter(fav => 
                !(fav.id === item.id && fav.type === item.type)
            );
            
            // 更新本地存储
            this.saveFavorites();
        },
        
        // 保存收藏到本地存储
        saveFavorites() {
            localStorage.setItem('favorites', JSON.stringify(this.favorites));
        },
        
        // 从本地存储加载收藏
        loadFavorites() {
            const savedFavorites = localStorage.getItem('favorites');
            if (savedFavorites) {
                this.favorites = JSON.parse(savedFavorites);
            } else {
                // 如果没有保存的收藏，加载模拟数据
                this.loadMockFavorites();
            }
        },
        
        // 加载模拟数据
        loadMockFavorites() {
            this.isLoading = true;
            
            // 模拟API请求延迟
            setTimeout(() => {
                // 模拟收藏的景点数据
                const destinations = [
                    {
                        id: 1,
                        type: 'destination',
                        name: '珠海长隆海洋王国',
                        description: '体验世界级海洋主题乐园，与海豚、白鲸亲密接触',
                        image: '../img/test.png',
                        viewCount: 25680,
                        location: '广东省珠海市横琴新区环岛东路',
                        rating: 4.9,
                        reviewCount: 2568
                    },
                    {
                        id: 3,
                        type: 'destination',
                        name: '珠海海泉湾温泉度假',
                        description: '享受海边温泉度假村，放松身心的完美选择',
                        image: '../img/test.png',
                        viewCount: 21450,
                        location: '广东省珠海市金湾区',
                        rating: 4.7,
                        reviewCount: 1856
                    }
                ];
                
                // 模拟收藏的网红行程数据
                const trips = [
                    {
                        id: 101,
                        type: 'trip',
                        title: '珠海长隆海洋王国亲子2日游',
                        description: '跟随网红达人小丽一起探索珠海长隆海洋王国的奇妙世界',
                        image: '../img/test.png',
                        viewCount: 15680,
                        currentParticipants: 28,
                        maxParticipants: 30,
                        price: '1280',
                        daysLeft: 3,
                        departureDate: '2024-06-15',
                        location: '广东省珠海市横琴新区环岛东路',
                        duration: '2天1晚',
                        influencer: {
                            id: 201,
                            name: '亲子游达人小丽',
                            avatar: '../img/potato.png'
                        },
                        tripStatus: {
                            type: 'hot',
                            text: '热门'
                        }
                    },
                    {
                        id: 102,
                        type: 'trip',
                        title: '珠海长隆+横琴度假区3日游',
                        description: '跟随摄影师阿杰探索珠海长隆和横琴度假区的美景',
                        image: '../img/test.png',
                        viewCount: 12450,
                        currentParticipants: 18,
                        maxParticipants: 20,
                        price: '2500',
                        daysLeft: 7,
                        departureDate: '2024-06-19',
                        location: '广东省珠海市横琴新区环岛东路',
                        duration: '3天2晚',
                        influencer: {
                            id: 202,
                            name: '摄影师阿杰',
                            avatar: '../img/potato.png'
                        },
                        tripStatus: {
                            type: 'limited',
                            text: '即将满员'
                        }
                    }
                ];
                
                // 合并数据
                this.favorites = [...destinations, ...trips];
                
                // 保存到本地存储
                this.saveFavorites();
                
                this.isLoading = false;
            }, 1000);
        },
        
        // 前往探索页面
        goToExplore() {
            window.location.href = 'home.html';
        },
        
        // 格式化数字，超过1万显示为x.x万
        formatNumber(num) {
            if (!num) return '0';
            if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万';
            }
            return num.toString();
        }
    },
    mounted() {
        // 初始化导航栏
        if (typeof initNavBar === 'function') {
            initNavBar('favorites');
        }
        
        // 加载收藏数据
        this.loadFavorites();
    }
}).mount('#app'); 