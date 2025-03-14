const { createApp } = Vue

createApp({
    data() {
        return {
            selectedCity: '深圳',
            searchQuery: '',
            searchPlaceholder: '搜索目的地、网红或行程',
            cities: ['肇庆', '珠海', '澳门', '广州', '上海', '北京'],
            showCitySelector: false,
            currentLang: 'zh',
            currentPage: 'home',
            categories: [
                { id: 'destinations', name: '热门目的地', icon: '🏝️' },
                { id: 'influencers', name: '网红推荐', icon: '🌟' },
                { id: 'trips', name: '特色行程', icon: '📅' },
                { id: 'live', name: '直播预告', icon: '🎬' },
                { id: 'hotels', name: '酒店住宿', icon: '🏨' },
                { id: 'food', name: '美食推荐', icon: '🍜' },
                { id: 'shopping', name: '购物攻略', icon: '🛍️' },
                { id: 'culture', name: '文化体验', icon: '🎭' }
            ],
            destinations: [
                {
                    id: 1,
                    name: '香港维多利亚港',
                    description: '感受不夜城的魅力',
                    image: '../img/test.png'
                },
                {
                    id: 2,
                    name: '澳门威尼斯人',
                    description: '体验东方威尼斯',
                    image: '../img/test.png'
                },
                {
                    id: 3,
                    name: '迪士尼乐园',
                    description: '重拾童年欢乐时光',
                    image: '../img/test.png'
                }
            ],
            influencers: [
                {
                    id: 1,
                    name: '旅行达人小王',
                    description: '专注港澳旅游攻略',
                    followers: '100万+',
                    avatar: '../img/potato.png',
                    tags: ['美食', '购物', '打卡']
                },
                {
                    id: 2,
                    name: '美食家大李',
                    description: '寻找巷弄美食',
                    followers: '50万+',
                    avatar: '../img/potato.png',
                    tags: ['美食', '探店', '攻略']
                },
                {
                    id: 3,
                    name: '摄影师阿杰',
                    description: '记录旅途精彩瞬间',
                    followers: '80万+',
                    avatar: '../img/potato.png',
                    tags: ['摄影', '风景', '人文']
                }
            ],
            popularTrips: [],
            page: 1,
            pageSize: 5,
            hasMore: true,
            isLoading: false,
            isRefreshing: false,
            lastScrollTop: 0,
            refreshThreshold: 100,
            startY: 0
        }
    },
    mounted() {
        // 初始化目的地轮播
        new Swiper('.destination-swiper', {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            }
        });
        
        // 初始化导航栏
        initNavBar(this.currentPage);
        
        // 初始化加载数据
        this.loadInitialTrips();
        
        // 添加下拉刷新监听
        this.initPullToRefresh();
        
        // 添加滚动监听
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        toggleCitySelector() {
            this.showCitySelector = !this.showCitySelector;
        },
        selectCity(city) {
            this.selectedCity = city;
            this.showCitySelector = false;
        },
        search() {
            // 实现搜索逻辑
            console.log(`Searching in ${this.selectedCity} for: ${this.searchQuery}`);
        },
        navigateToCategory(categoryId) {
            if (categoryId === 'influencers') {
                window.location.href = 'influencer-list.html';
            }
            // 其他分类的导航逻辑
            console.log('导航到分类:', categoryId);
        },
        viewAllInfluencers() {
            window.location.href = 'influencer-list.html';
        },
        viewInfluencerDetail(id) {
            // TODO: 实现查看网红详情的逻辑
            console.log('查看网红详情:', id);
        },
        goToTripDetail(id) {
            window.location.href = `trip-detail.html?id=${id}`;
        },
        viewAllTrips() {
            // TODO: 实现查看全部行程的逻辑
            console.log('查看全部行程');
        },
        // 初始化加载数据
        async loadInitialTrips() {
            this.isLoading = true;
            try {
                // 模拟API调用
                const trips = await this.fetchTrips(1);
                this.popularTrips = trips;
                this.hasMore = trips.length === this.pageSize;
            } catch (error) {
                console.error('加载数据失败:', error);
            } finally {
                this.isLoading = false;
            }
        },
        
        // 加载更多数据
        async loadMore() {
            if (this.isLoading || !this.hasMore) return;
            
            this.isLoading = true;
            try {
                const nextPage = this.page + 1;
                const newTrips = await this.fetchTrips(nextPage);
                
                if (newTrips.length > 0) {
                    this.popularTrips.push(...newTrips);
                    this.page = nextPage;
                    this.hasMore = newTrips.length === this.pageSize;
                } else {
                    this.hasMore = false;
                }
            } catch (error) {
                console.error('加载更多失败:', error);
            } finally {
                this.isLoading = false;
            }
        },
        
        // 下拉刷新
        async refresh() {
            if (this.isRefreshing) return;
            
            this.isRefreshing = true;
            try {
                const trips = await this.fetchTrips(1);
                this.popularTrips = trips;
                this.page = 1;
                this.hasMore = trips.length === this.pageSize;
            } catch (error) {
                console.error('刷新数据失败:', error);
            } finally {
                this.isRefreshing = false;
            }
        },
        
        // 初始化下拉刷新
        initPullToRefresh() {
            const content = document.querySelector('.trip-section');
            
            content.addEventListener('touchstart', (e) => {
                this.startY = e.touches[0].pageY;
                this.lastScrollTop = window.pageYOffset;
            });
            
            content.addEventListener('touchmove', (e) => {
                const currentY = e.touches[0].pageY;
                const scrollTop = window.pageYOffset;
                
                // 只有在顶部才能下拉刷新
                if (scrollTop <= 0 && currentY - this.startY > 0) {
                    const distance = currentY - this.startY;
                    if (distance > this.refreshThreshold && !this.isRefreshing) {
                        this.refresh();
                    }
                }
            });
        },
        
        // 处理滚动事件
        handleScroll() {
            if (this.isLoading || !this.hasMore) return;
            
            const scrollHeight = document.documentElement.scrollHeight;
            const scrollTop = window.pageYOffset;
            const clientHeight = document.documentElement.clientHeight;
            
            // 当距离底部100px时加载更多
            if (scrollHeight - scrollTop - clientHeight < 100) {
                this.loadMore();
            }
        },
        
        // 模拟API调用
        async fetchTrips(page) {
            // 这里模拟API调用，实际项目中替换为真实API
            return new Promise((resolve) => {
                setTimeout(() => {
                    const mockTrips = [
                        {
                            id: page * 100 + 1,
                            title: '珠海长隆海洋王国深度游',
                            description: '与白鲸亲密互动，观看精彩的海豚表演，探索海底世界的神秘',
                            image: '../img/test.png',
                            price: '599',
                            duration: '2天1晚',
                            highlights: ['海豚表演', '白鲸互动', '企鹅馆']
                        },
                        {
                            id: page * 100 + 2,
                            title: '横琴粤澳合作区文化之旅',
                            description: '探索横琴新区建设成果，感受粤澳文化交融的魅力',
                            image: '../img/test.png',
                            price: '899',
                            duration: '3天2晚',
                            highlights: ['横琴科学城', '澳门新街坊', '粤澳合作产业园']
                        },
                        {
                            id: page * 100 + 3,
                            title: '情侣路海滨休闲度假',
                            description: '漫步珠海标志性海滨长廊，欣赏渔女雕像，享受海风轻抚',
                            image: '../img/test.png',
                            price: '459',
                            duration: '2天1晚',
                            highlights: ['日月贝', '渔女雕像', '海滨烧烤']
                        },
                        {
                            id: page * 100 + 4,
                            title: '外伶仃岛海岛度假',
                            description: '乘船出海，登上珠海最美海岛，体验原始海岛风光',
                            image: '../img/test.png',
                            price: '799',
                            duration: '3天2晚',
                            highlights: ['海岛沙滩', '海鲜美食', '日落观景']
                        },
                        {
                            id: page * 100 + 5,
                            title: '斗门古镇文化探索',
                            description: '走进斗门古镇，探索岭南水乡文化，品尝地道美食',
                            image: '../img/test.png',
                            price: '299',
                            duration: '1天',
                            highlights: ['白蕉古镇', '斗门手信', '农家美食']
                        },
                        {
                            id: page * 100 + 6,
                            title: '港珠澳大桥+澳门一日游',
                            description: '乘车跨越港珠澳大桥，感受世纪工程，游览澳门精华景点',
                            image: '../img/test.png',
                            price: '688',
                            duration: '1天',
                            highlights: ['大桥观光', '澳门老城', '葡式蛋挞']
                        },
                        {
                            id: page * 100 + 7,
                            title: '珠海御温泉度假之旅',
                            description: '享受天然温泉SPA，放松身心，体验高端度假生活',
                            image: '../img/test.png',
                            price: '899',
                            duration: '2天1晚',
                            highlights: ['温泉SPA', '养生美食', '瑜伽课程']
                        },
                        {
                            id: page * 100 + 8,
                            title: '珠海海岛帆船体验',
                            description: '参与专业帆船培训，体验海上运动的刺激与乐趣',
                            image: '../img/test.png',
                            price: '1299',
                            duration: '2天1晚',
                            highlights: ['帆船课程', '海钓体验', '海上日落']
                        }
                    ].slice((page - 1) * this.pageSize, page * this.pageSize);
                    
                    resolve(mockTrips);
                }, 1000);
            });
        }
    },
    beforeUnmount() {
        // 清理事件监听
        window.removeEventListener('scroll', this.handleScroll);
    }
}).mount('#app');