const { createApp } = Vue;

const app = createApp({
    data() {
        return {
            searchQuery: '',
            searchPlaceholder: '搜索网红、目的地或行程',
            isSearchVisible: true,
            selectedTag: '全部',
            filterTags: ['全部', '亲子游', '美食游', '摄影游'],
            searchResults: [],
            destinations: [] // 热门旅行地数据
        }
    },
    computed: {
        filteredResults() {
            let results = this.searchResults;
            if (this.selectedTag !== '全部') {
                results = results.filter(item => item.tags && item.tags.includes(this.selectedTag));
            }
            return results;
        },
        filteredDestinations() {
            let destinations = this.destinations;
            if (this.selectedTag !== '全部') {
                destinations = destinations.filter(item => item.tags && item.tags.includes(this.selectedTag));
            }
            return destinations;
        }
    },
    methods: {
        goBack() {
            window.history.back();
        },
        search() {
            // 实现搜索逻辑
            console.log(`Searching for: ${this.searchQuery}`);
        },
        selectTag(tag) {
            this.selectedTag = tag;
        },
        viewDetail(id) {
            // 跳转到行程详情页面，而不是网红详情页面
            window.location.href = `trip-detail.html?id=${id}`;
        },
        viewDestinationDetail(id) {
            // 跳转到目的地详情页面
            window.location.href = `destination-detail.html?id=${id}`;
        },
        // 格式化日期
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return `${date.getMonth() + 1}月${date.getDate()}日`;
        },
        // 模拟获取搜索结果数据
        fetchSearchResults() {
            // 这里应该是从API获取数据，现在使用模拟数据
            this.searchResults = [
                {
                    id: 1,
                    name: '旅行达人小王',
                    avatar: '../img/potato.png',
                    tripDestination: '珠海长隆海洋王国深度游',
                    followers: '100K',
                    trips: 15,
                    rating: 4.8,
                    tags: ['出境游', '美食游'],
                    currentParticipants: 28,
                    maxParticipants: 30,
                    price: '599',
                    daysLeft: 3,
                    departureDate: '2024-06-15',
                    viewCount: 1256,
                    tripStatus: {
                        type: 'hot',
                        text: '热门'
                    }
                },
                {
                    id: 2,
                    name: '美食家大李',
                    avatar: '../img/potato.png',
                    tripDestination: '珠海斗门古镇美食之旅',
                    followers: '50K',
                    trips: 8,
                    rating: 4.5,
                    tags: ['国内游', '美食游'],
                    currentParticipants: 15,
                    maxParticipants: 20,
                    price: '399',
                    daysLeft: 5,
                    departureDate: '2024-06-17',
                    viewCount: 876,
                    tripStatus: {
                        type: 'limited',
                        text: '即将满员'
                    }
                },
                {
                    id: 3,
                    name: '摄影师阿杰',
                    avatar: '../img/potato.png',
                    tripDestination: '珠海情侣路摄影之旅',
                    followers: '80K',
                    trips: 12,
                    rating: 4.7,
                    tags: ['国内游', '摄影游'],
                    currentParticipants: 12,
                    maxParticipants: 15,
                    price: '459',
                    daysLeft: 7,
                    departureDate: '2024-06-19',
                    viewCount: 932,
                    tripStatus: {
                        type: 'limited',
                        text: '即将满员'
                    }
                },
                {
                    id: 4,
                    name: '亲子游专家',
                    avatar: '../img/potato.png',
                    tripDestination: '珠海长隆海洋王国亲子游',
                    followers: '120K',
                    trips: 20,
                    rating: 4.9,
                    tags: ['国内游', '亲子游'],
                    currentParticipants: 25,
                    maxParticipants: 30,
                    price: '699',
                    daysLeft: 9,
                    departureDate: '2024-06-21',
                    viewCount: 1345,
                    tripStatus: {
                        type: 'hot',
                        text: '热门'
                    }
                }
            ];
            
            // 格式化日期
            this.searchResults.forEach(item => {
                if (item.departureDate) {
                    item.departureDate = this.formatDate(item.departureDate);
                }
            });
            
            // 添加热门旅行地数据
            this.destinations = [
                {
                    id: 101,
                    name: '珠海长隆海洋王国',
                    description: '亚洲最大的海洋主题乐园，拥有多种珍稀海洋动物',
                    image: '../img/test.png',
                    viewCount: 25680,
                    rating: 4.9,
                    tripCount: 15,
                    priceRange: '¥399起',
                    tags: ['亲子游', '主题乐园']
                },
                {
                    id: 102,
                    name: '珠海渔女像',
                    description: '珠海市的城市象征，位于香炉湾畔的观音山南端',
                    image: '../img/test.png',
                    viewCount: 18920,
                    rating: 4.7,
                    tripCount: 8,
                    priceRange: '¥199起',
                    tags: ['摄影游', '文化游']
                },
                {
                    id: 103,
                    name: '珠海横琴长隆国际海洋度假区',
                    description: '集主题公园、酒店、商业、休闲为一体的大型度假区',
                    image: '../img/test.png',
                    viewCount: 22450,
                    rating: 4.8,
                    tripCount: 12,
                    priceRange: '¥599起',
                    tags: ['亲子游', '度假']
                },
                {
                    id: 104,
                    name: '珠海斗门古镇',
                    description: '有着两千多年历史的古镇，保存着众多明清古建筑',
                    image: '../img/test.png',
                    viewCount: 15680,
                    rating: 4.6,
                    tripCount: 6,
                    priceRange: '¥299起',
                    tags: ['美食游', '文化游']
                }
            ];
        }
    },
    mounted() {
        // 获取URL参数中的搜索关键词
        const urlParams = new URLSearchParams(window.location.search);
        const query = urlParams.get('q');
        if (query) {
            this.searchQuery = query;
            this.search();
        }
        this.fetchSearchResults();
        
        // 添加页面进入动画效果
        setTimeout(() => {
            const cards = document.querySelectorAll('.influencer-card, .destination-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }, 300);
    }
});

app.mount('#app'); 