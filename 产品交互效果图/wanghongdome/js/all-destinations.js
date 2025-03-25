/**
 * 全部目的地页面的JavaScript逻辑
 * 负责展示所有景点和分类信息
 */

const { createApp } = Vue;

createApp({
    data() {
        return {
            // 页面标题
            pageTitle: '珠海景点',
            
            // 是否加载中
            isLoading: true,
            
            // 搜索关键词
            searchQuery: '',
            
            // 过滤标签
            filterTags: ['全部', '海洋', '海岛', '文化', '城市'],
            
            // 当前活跃标签，默认为'全部'
            activeTag: '全部',
            
            // 目的地数据
            destinations: [
                {
                    id: 'dest1',
                    name: '珠海长隆海洋王国',
                    image: '../img/test.png',
                    tripCount: 8,
                    minCommission: 980,
                    maxCommission: 2200,
                    description: '世界超大型海洋主题公园，拥有多项世界之最',
                    tags: ['热门', '海洋']
                },
                {
                    id: 'dest2',
                    name: '珠海外伶仃岛',
                    image: '../img/test.png',
                    tripCount: 5,
                    minCommission: 1000,
                    maxCommission: 1800,
                    description: '素有"南海明珠"之称，是珠海著名的旅游景点',
                    tags: ['热门', '海岛']
                },
                {
                    id: 'dest3',
                    name: '珠海情侣路',
                    image: '../img/test.png',
                    tripCount: 6,
                    minCommission: 800,
                    maxCommission: 1500,
                    description: '世界最长的海滨观光带，沿途风景秀丽',
                    tags: ['热门', '城市']
                },
                {
                    id: 'dest4',
                    name: '珠海圆明新园',
                    image: '../img/test.png',
                    tripCount: 4,
                    minCommission: 900,
                    maxCommission: 1700,
                    description: '根据北京圆明园为蓝本建造的大型皇家园林',
                    tags: ['文化']
                },
                {
                    id: 'dest5',
                    name: '珠海横琴',
                    image: '../img/test.png',
                    tripCount: 7,
                    minCommission: 1200,
                    maxCommission: 2500,
                    description: '粤港澳大湾区的重要区域，拥有众多文创园区',
                    tags: ['文化', '城市']
                },
                {
                    id: 'dest6',
                    name: '珠海海泉湾',
                    image: '../img/test.png',
                    tripCount: 3,
                    minCommission: 1100,
                    maxCommission: 2000,
                    description: '以温泉为特色的海滨度假胜地',
                    tags: ['海洋']
                },
                {
                    id: 'dest7',
                    name: '珠海渔女',
                    image: '../img/test.png',
                    tripCount: 5,
                    minCommission: 800,
                    maxCommission: 1600,
                    description: '珠海市的城市象征和著名景点',
                    tags: ['城市']
                },
                {
                    id: 'dest8',
                    name: '珠海斗门黄杨山',
                    image: '../img/test.png',
                    tripCount: 2,
                    minCommission: 700,
                    maxCommission: 1400,
                    description: '以峰林地貌为主的自然风景区',
                    tags: []
                }
            ]
        };
    },
    computed: {
        /**
         * 根据搜索关键词和标签筛选目的地
         * @returns {Array} 筛选后的目的地数组
         */
        filteredDestinations() {
            return this.destinations.filter(dest => {
                // 搜索关键词过滤
                const matchesSearch = !this.searchQuery || 
                    dest.name.toLowerCase().includes(this.searchQuery.toLowerCase());
                
                // 标签过滤
                const matchesTag = this.activeTag === '全部' || 
                    dest.tags.includes(this.activeTag);
                
                return matchesSearch && matchesTag;
            });
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
         */
        switchTag(tag) {
            if (this.activeTag === tag) return;
            this.activeTag = tag;
            
            // 在DOM更新后滚动到选中的标签
            this.$nextTick(() => {
                const tagElement = document.querySelector(`.filter-tag[data-tag="${tag}"]`);
                if (tagElement) {
                    const filterBar = document.querySelector('.filter-bar');
                    const filterBarWidth = filterBar.offsetWidth;
                    const tagOffset = tagElement.offsetLeft;
                    const tagWidth = tagElement.offsetWidth;
                    
                    // 计算滚动位置，使标签居中显示
                    const scrollPosition = tagOffset - (filterBarWidth / 2) + (tagWidth / 2);
                    
                    // 使用平滑滚动效果
                    filterBar.scrollTo({
                        left: Math.max(0, scrollPosition),
                        behavior: 'smooth'
                    });
                    
                    // 添加动画效果
                    tagElement.style.transform = 'scale(1.1)';
                    setTimeout(() => {
                        tagElement.style.transform = 'scale(1)';
                    }, 200);
                }
            });
        },
        
        /**
         * 重置搜索
         */
        resetSearch() {
            this.searchQuery = '';
        },
        
        /**
         * 查看景点行程
         */
        viewDestinationTrips(destId) {
            const destination = this.destinations.find(d => d.id === destId);
            if (destination) {
                window.location.href = `destination-trips.html?id=${destId}`;
            }
        },
        
        /**
         * 前往目的地详情页
         * @param {string} destId 目的地ID
         */
        goToDestination(destId) {
            // 优先使用AppRouter进行导航
            if (window.AppRouter && window.AppRouter.goToDestination) {
                const destination = this.destinations.find(d => d.id === destId);
                if (destination) {
                    window.AppRouter.goToDestination(destId, destination.name);
                    return;
                }
            }
            
            // 兼容旧版：直接导航到目的地详情页
            window.location.href = `destination-detail.html?id=${destId}`;
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
         * 初始化页面
         */
        initPage() {
            // 获取URL参数
            const urlParams = new URLSearchParams(window.location.search);
            const source = urlParams.get('source') || '';
            
            // 设置隐藏底部导航栏的条件
            this.hideBottomNav = source !== 'tab';
            
            // 获取并存储目的地数据
            this.destinations = [
                {
                    id: 'dest1',
                    name: '珠海长隆海洋王国',
                    image: '../img/test.png',
                    tripCount: 8,
                    minCommission: 980,
                    maxCommission: 2200,
                    description: '世界超大型海洋主题公园，拥有多项世界之最',
                    tags: ['热门', '海洋']
                },
                {
                    id: 'dest2',
                    name: '珠海外伶仃岛',
                    image: '../img/test.png',
                    tripCount: 5,
                    minCommission: 1000,
                    maxCommission: 1800,
                    description: '素有"南海明珠"之称，是珠海著名的旅游景点',
                    tags: ['热门', '海岛']
                },
                {
                    id: 'dest3',
                    name: '珠海情侣路',
                    image: '../img/test.png',
                    tripCount: 6,
                    minCommission: 800,
                    maxCommission: 1500,
                    description: '世界最长的海滨观光带，沿途风景秀丽',
                    tags: ['热门', '城市']
                },
                {
                    id: 'dest4',
                    name: '珠海圆明新园',
                    image: '../img/test.png',
                    tripCount: 4,
                    minCommission: 900,
                    maxCommission: 1700,
                    description: '根据北京圆明园为蓝本建造的大型皇家园林',
                    tags: ['文化']
                },
                {
                    id: 'dest5',
                    name: '珠海横琴',
                    image: '../img/test.png',
                    tripCount: 7,
                    minCommission: 1200,
                    maxCommission: 2500,
                    description: '粤港澳大湾区的重要区域，拥有众多文创园区',
                    tags: ['文化', '城市']
                },
                {
                    id: 'dest6',
                    name: '珠海海泉湾',
                    image: '../img/test.png',
                    tripCount: 3,
                    minCommission: 1100,
                    maxCommission: 2000,
                    description: '以温泉为特色的海滨度假胜地',
                    tags: ['海洋']
                },
                {
                    id: 'dest7',
                    name: '珠海渔女',
                    image: '../img/test.png',
                    tripCount: 5,
                    minCommission: 800,
                    maxCommission: 1600,
                    description: '珠海市的城市象征和著名景点',
                    tags: ['城市']
                },
                {
                    id: 'dest8',
                    name: '珠海斗门黄杨山',
                    image: '../img/test.png',
                    tripCount: 2,
                    minCommission: 700,
                    maxCommission: 1400,
                    description: '以峰林地貌为主的自然风景区',
                    tags: []
                }
            ];
            
            // 将数据存储到本地存储，用于其他页面访问
            localStorage.setItem('zhuhaiDestinations', JSON.stringify(this.destinations));
            
            // 模拟加载延迟
            setTimeout(() => {
                this.isLoading = false;
                
                // 在加载完成后，确保默认标签可见
                this.$nextTick(() => {
                    const defaultTag = document.querySelector(`.filter-tag[data-tag="${this.activeTag}"]`);
                    if (defaultTag) {
                        const filterBar = document.querySelector('.filter-bar');
                        // 如果默认标签不是第一个，则滚动到适当位置
                        if (this.activeTag !== this.filterTags[0]) {
                            const filterBarWidth = filterBar.offsetWidth;
                            const tagOffset = defaultTag.offsetLeft;
                            const tagWidth = defaultTag.offsetWidth;
                            
                            // 计算滚动位置，使标签居中显示
                            const scrollPosition = tagOffset - (filterBarWidth / 2) + (tagWidth / 2);
                            
                            filterBar.scrollTo({
                                left: Math.max(0, scrollPosition),
                                behavior: 'smooth'
                            });
                        }
                        
                        // 添加轻微动画以突出显示当前标签
                        defaultTag.style.transform = 'scale(1.05)';
                        setTimeout(() => {
                            defaultTag.style.transform = 'scale(1)';
                        }, 300);
                    }
                });
            }, 500);
        }
    },
    mounted() {
        // 初始化页面
        this.initPage();
    }
}).mount('#app');
