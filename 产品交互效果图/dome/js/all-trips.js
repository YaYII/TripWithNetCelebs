const { createApp } = Vue;

createApp({
    data() {
        return {
            searchQuery: '',
            selectedTag: '全部',
            tags: ['全部', '亲子', '摄影', '美食'],
            trips: [],
            filteredTrips: [],
            isLoading: false,
            hasMore: true,
            page: 1,
            pageSize: 10,
            lastScrollTop: 0,
            isSearchVisible: true
        };
    },
    methods: {
        // 返回上一页
        goBack() {
            window.history.back();
        },
        
        // 选择标签
        selectTag(tag) {
            this.selectedTag = tag;
            this.filterTrips();
        },
        
        // 过滤行程
        filterTrips() {
            let filtered = [...this.trips];
            
            // 根据搜索关键词过滤
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                filtered = filtered.filter(trip => 
                    trip.title.toLowerCase().includes(query) ||
                    trip.location.toLowerCase().includes(query)
                );
            }
            
            // 根据标签过滤
            if (this.selectedTag !== '全部') {
                filtered = filtered.filter(trip => trip.tags.includes(this.selectedTag));
            }
            
            this.filteredTrips = filtered;
        },
        
        // 处理滚动事件
        handleScroll() {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 判断滚动方向
            if (currentScrollTop > this.lastScrollTop && currentScrollTop > 70) {
                // 向下滚动，隐藏搜索框，保留筛选标签栏
                if (this.isSearchVisible) {
                    this.isSearchVisible = false;
                    const searchContainer = document.querySelector('.search-container');
                    const filterBar = document.querySelector('.filter-bar');
                    const tripList = document.querySelector('.trip-list');
                    
                    searchContainer.classList.add('hidden');
                    filterBar.classList.add('search-hidden');
                    tripList.classList.add('search-hidden');
                }
            } else if (currentScrollTop < this.lastScrollTop) {
                // 向上滚动，显示搜索框和筛选标签栏
                if (!this.isSearchVisible) {
                    this.isSearchVisible = true;
                    const searchContainer = document.querySelector('.search-container');
                    const filterBar = document.querySelector('.filter-bar');
                    const tripList = document.querySelector('.trip-list');
                    
                    searchContainer.classList.remove('hidden');
                    filterBar.classList.remove('search-hidden');
                    tripList.classList.remove('search-hidden');
                }
            }
            
            // 保存当前滚动位置
            this.lastScrollTop = currentScrollTop;
        },
        
        // 查看行程详情
        viewTripDetail(tripId) {
            window.location.href = `destination-detail.html?id=${tripId}`;
        },
        
        // 加载更多数据
        async loadMore() {
            if (this.isLoading || !this.hasMore) return;
            
            this.isLoading = true;
            
            try {
                // 模拟API请求
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // 珠海景点数据
                const zhuHaiSpots = [
                    {
                        id: this.trips.length + 1,
                        title: '珠海长隆海洋王国',
                        description: '体验世界级海洋主题乐园，与海豚、白鲸亲密接触',
                        image: '../img/test.png',
                        location: '珠海市横琴新区环岛东路',
                        dates: '2024-05-15 至 2024-05-17',
                        price: '1299',
                        duration: '3天2晚',
                        tags: ['亲子', '摄影'],
                        viewCount: 28760
                    },
                    {
                        id: this.trips.length + 2,
                        title: '情侣路海滨风光',
                        description: '漫步珠海标志性海滨大道，欣赏迷人海景和城市风光',
                        image: '../img/test.png',
                        location: '珠海市香洲区情侣南路',
                        dates: '2024-05-20 至 2024-05-21',
                        price: '699',
                        duration: '2天1晚',
                        tags: ['摄影', '美食'],
                        viewCount: 19850
                    },
                    {
                        id: this.trips.length + 3,
                        title: '外伶仃岛探秘',
                        description: '探索珠海最美海岛，体验渔村风情和原始海滩',
                        image: '../img/test.png',
                        location: '珠海市万山区外伶仃岛',
                        dates: '2024-06-01 至 2024-06-03',
                        price: '1599',
                        duration: '3天2晚',
                        tags: ['摄影'],
                        viewCount: 12345
                    },
                    {
                        id: this.trips.length + 4,
                        title: '圆明新园文化之旅',
                        description: '参观中国古代宫廷园林复制品，感受历史文化魅力',
                        image: '../img/test.png',
                        location: '珠海市香洲区九洲大道',
                        dates: '2024-05-25 至 2024-05-26',
                        price: '899',
                        duration: '2天1晚',
                        tags: ['亲子'],
                        viewCount: 10234
                    },
                    {
                        id: this.trips.length + 5,
                        title: '珠海渔女像打卡',
                        description: '探访珠海城市标志，欣赏壮丽的海湾风光',
                        image: '../img/test.png',
                        location: '珠海市香洲区香炉湾',
                        dates: '2024-06-10 至 2024-06-11',
                        price: '599',
                        duration: '2天1晚',
                        tags: ['摄影'],
                        viewCount: 8765
                    }
                ];
                
                this.trips = [...this.trips, ...zhuHaiSpots];
                this.filterTrips();
                
                // 模拟分页
                this.page++;
                this.hasMore = this.page < 3; // 最多2页
                
            } catch (error) {
                console.error('加载数据失败:', error);
            } finally {
                this.isLoading = false;
            }
        },
        
        // 初始化数据
        async initData() {
            this.isLoading = true;
            
            try {
                // 模拟API请求
                await new Promise(resolve => setTimeout(resolve, 1000));
                
                // 珠海景点初始数据
                this.trips = [
                    {
                        id: 1,
                        title: '珠海长隆海洋王国',
                        description: '体验世界级海洋主题乐园，与海豚、白鲸亲密接触',
                        image: '../img/test.png',
                        location: '珠海市横琴新区环岛东路',
                        dates: '2024-04-20 至 2024-04-22',
                        price: '1299',
                        duration: '3天2晚',
                        tags: ['亲子', '摄影'],
                        viewCount: 25680
                    },
                    {
                        id: 2,
                        title: '横琴澳门大学之旅',
                        description: '参观澳门大学横琴校区，感受中西文化交融的学术氛围',
                        image: '../img/test.png',
                        location: '珠海市横琴新区澳门大学横琴校区',
                        dates: '2024-04-25 至 2024-04-26',
                        price: '799',
                        duration: '2天1晚',
                        tags: ['亲子'],
                        viewCount: 18920
                    },
                    {
                        id: 3,
                        title: '珠海海泉湾温泉度假',
                        description: '享受海边温泉度假村，放松身心的完美选择',
                        image: '../img/test.png',
                        location: '珠海市金湾区平沙镇海泉湾度假区',
                        dates: '2024-05-01 至 2024-05-03',
                        price: '1599',
                        duration: '3天2晚',
                        tags: ['亲子', '美食'],
                        viewCount: 21450
                    },
                    {
                        id: 4,
                        title: '珠海御温泉美食之旅',
                        description: '体验高端温泉度假村，品尝珠海特色海鲜美食',
                        image: '../img/test.png',
                        location: '珠海市斗门区白蕉镇',
                        dates: '2024-05-05 至 2024-05-07',
                        price: '1899',
                        duration: '3天2晚',
                        tags: ['美食'],
                        viewCount: 15678
                    },
                    {
                        id: 5,
                        title: '东澳岛海岛度假',
                        description: '探索珠海最美海岛之一，体验原始海滩和渔村风情',
                        image: '../img/test.png',
                        location: '珠海市万山区东澳岛',
                        dates: '2024-05-10 至 2024-05-12',
                        price: '1499',
                        duration: '3天2晚',
                        tags: ['摄影'],
                        viewCount: 12345
                    },
                    {
                        id: 6,
                        title: '珠海香山寺文化之旅',
                        description: '探访历史悠久的佛教寺庙，感受禅宗文化',
                        image: '../img/test.png',
                        location: '珠海市香洲区九洲大道西',
                        dates: '2024-04-28 至 2024-04-29',
                        price: '699',
                        duration: '2天1晚',
                        tags: ['摄影'],
                        viewCount: 10234
                    },
                    {
                        id: 7,
                        title: '珠海渔女像与野狸岛',
                        description: '参观珠海标志性景点，探索野狸岛自然风光',
                        image: '../img/test.png',
                        location: '珠海市香洲区香炉湾',
                        dates: '2024-05-08 至 2024-05-09',
                        price: '799',
                        duration: '2天1晚',
                        tags: ['摄影', '亲子'],
                        viewCount: 12345
                    },
                    {
                        id: 8,
                        title: '珠海美食探索之旅',
                        description: '品尝珠海特色海鲜和粤式美食，探索当地美食文化',
                        image: '../img/test.png',
                        location: '珠海市香洲区拱北口岸附近',
                        dates: '2024-05-15 至 2024-05-16',
                        price: '999',
                        duration: '2天1晚',
                        tags: ['美食'],
                        viewCount: 15678
                    },
                    {
                        id: 9,
                        title: '珠海航展主题游',
                        description: '参观中国国际航空航天博览会场地，了解航空科技',
                        image: '../img/test.png',
                        location: '珠海市金湾区三灶镇',
                        dates: '2024-06-01 至 2024-06-02',
                        price: '899',
                        duration: '2天1晚',
                        tags: ['亲子'],
                        viewCount: 10234
                    },
                    {
                        id: 10,
                        title: '横琴长隆国际海洋度假区',
                        description: '体验长隆海洋王国和长隆横琴湾酒店的完美假期',
                        image: '../img/test.png',
                        location: '珠海市横琴新区环岛东路',
                        dates: '2024-06-05 至 2024-06-08',
                        price: '2999',
                        duration: '4天3晚',
                        tags: ['亲子', '美食'],
                        viewCount: 21450
                    }
                ];
                
                this.filteredTrips = [...this.trips];
                
            } catch (error) {
                console.error('初始化数据失败:', error);
            } finally {
                this.isLoading = false;
            }
        },
        
        // 格式化数字，超过1万显示为x.x万
        formatNumber(num) {
            if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万';
            }
            return num.toString();
        }
    },
    watch: {
        // 监听搜索关键词变化
        searchQuery() {
            this.filterTrips();
        }
    },
    mounted() {
        this.initData();
        
        // 添加滚动事件监听
        window.addEventListener('scroll', this.handleScroll);
    },
    beforeUnmount() {
        // 移除滚动事件监听
        window.removeEventListener('scroll', this.handleScroll);
    }
}).mount('#app'); 