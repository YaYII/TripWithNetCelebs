// 全部行程 JavaScript
const { createApp } = Vue

createApp({
    data() {
        return {
            // 当前选中的标签
            selectedTag: '全部',
            
            // 搜索关键词
            searchQuery: '',
            
            // 搜索区域是否可见
            isSearchVisible: false,
            
            // 上次滚动位置
            lastScrollTop: 0,
            
            // 行程列表
            trips: [
                {
                    id: 101,
                    title: '珠海长隆海洋王国亲子2日游',
                    location: '珠海长隆海洋王国',
                    date: '2024-06-15',
                    image: '../img/test.png',
                    commission: '1,280',
                    currentParticipants: 27,
                    maxParticipants: 30,
                    requirements: ['粉丝数10万+', '亲子类内容创作者优先'],
                    tags: ['热门', '亲子'],
                    status: {
                        type: 'hot',
                        text: '热门'
                    },
                    daysLeft: 5 // 距离行程开始还有几天
                },
                {
                    id: 102,
                    title: '珠海外伶仃岛探险之旅',
                    location: '珠海外伶仃岛',
                    date: '2024-06-22',
                    image: '../img/test.png',
                    commission: '1,500',
                    currentParticipants: 18,
                    maxParticipants: 25,
                    requirements: ['粉丝数8万+', '擅长户外探险内容创作'],
                    tags: ['高佣金', '探险'],
                    status: {
                        type: 'new',
                        text: '新上线'
                    }
                },
                {
                    id: 103,
                    title: '珠海情侣路摄影之旅',
                    location: '珠海情侣路',
                    date: '2024-06-19',
                    image: '../img/test.png',
                    commission: '980',
                    currentParticipants: 12,
                    maxParticipants: 15,
                    requirements: ['粉丝数5万+', '摄影类内容创作者优先'],
                    tags: ['限量', '摄影'],
                    status: {
                        type: 'limited',
                        text: '限量'
                    }
                },
                {
                    id: 104,
                    title: '珠海横琴粤澳合作区文化之旅',
                    location: '珠海横琴',
                    date: '2024-07-05',
                    image: '../img/test.png',
                    commission: '1,200',
                    currentParticipants: 15,
                    maxParticipants: 30,
                    requirements: ['粉丝数6万+', '文化类内容创作者优先'],
                    tags: ['高佣金', '文化'],
                    status: {
                        type: 'hot',
                        text: '热门'
                    }
                },
                {
                    id: 105,
                    title: '珠海海泉湾温泉度假体验',
                    location: '珠海海泉湾',
                    date: '2024-07-12',
                    image: '../img/test.png',
                    commission: '1,800',
                    currentParticipants: 8,
                    maxParticipants: 20,
                    requirements: ['粉丝数12万+', '生活方式类内容创作者优先'],
                    tags: ['高佣金', '度假'],
                    status: {
                        type: 'new',
                        text: '新上线'
                    },
                    daysLeft: 12 // 距离行程开始还有几天
                },
                {
                    id: 106,
                    title: '珠海斗门古镇美食之旅',
                    location: '珠海斗门古镇',
                    date: '2024-06-28',
                    image: '../img/test.png',
                    commission: '950',
                    currentParticipants: 22,
                    maxParticipants: 25,
                    requirements: ['粉丝数5万+', '美食类内容创作者优先'],
                    tags: ['限量', '美食'],
                    status: {
                        type: 'limited',
                        text: '限量'
                    }
                },
                {
                    id: 107,
                    title: '珠海圆明新园历史文化探索',
                    location: '珠海圆明新园',
                    date: '2024-07-20',
                    image: '../img/test.png',
                    commission: '1,100',
                    currentParticipants: 10,
                    maxParticipants: 20,
                    requirements: ['粉丝数7万+', '历史文化类内容创作者优先'],
                    tags: ['热门', '文化'],
                    status: {
                        type: 'hot',
                        text: '热门'
                    }
                },
                {
                    id: 108,
                    title: '珠海香洲渔女像打卡之旅',
                    location: '珠海香洲',
                    date: '2024-06-30',
                    image: '../img/test.png',
                    commission: '850',
                    currentParticipants: 15,
                    maxParticipants: 20,
                    requirements: ['粉丝数3万+', '旅游类内容创作者'],
                    tags: ['限量', '打卡'],
                    status: {
                        type: 'limited',
                        text: '限量'
                    }
                }
            ]
        }
    },
    computed: {
        // 根据筛选条件过滤行程
        filteredTrips() {
            return this.trips.filter(trip => {
                // 搜索关键词过滤
                const matchesSearch = this.searchQuery === '' || 
                    trip.title.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                    trip.location.toLowerCase().includes(this.searchQuery.toLowerCase());
                
                // 标签过滤
                const matchesTag = this.selectedTag === '全部' || 
                    (this.selectedTag === '热门' && trip.status.type === 'hot') ||
                    (this.selectedTag === '新上线' && trip.status.type === 'new') ||
                    (this.selectedTag === '限量' && trip.status.type === 'limited') ||
                    (this.selectedTag === '高佣金' && trip.commission >= '1,200');
                
                return matchesSearch && matchesTag;
            });
        }
    },
    methods: {
        // 返回上一页
        goBack() {
            window.history.back();
        },
        
        // 切换搜索区域显示/隐藏
        toggleSearchBar() {
            this.isSearchVisible = !this.isSearchVisible;
            if (this.isSearchVisible) {
                // 当搜索框显示时，聚焦输入框
                this.$nextTick(() => {
                    this.$refs.searchInput.focus();
                });
            }
        },
        
        // 处理页面滚动
        handleScroll() {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // 向下滚动超过20px时隐藏搜索区域
            if (currentScrollTop > this.lastScrollTop && currentScrollTop > 20) {
                this.isSearchVisible = false;
            }
            
            this.lastScrollTop = currentScrollTop;
        },
        
        // 选择标签
        selectTag(tag) {
            this.selectedTag = tag;
        },
        
        // 查看行程详情
        viewTripDetail(tripId) {
            window.location.href = `trip-detail-success.html?id=${tripId}`;
        },
        
        // 重置筛选条件
        resetFilters() {
            this.selectedTag = '全部';
            this.searchQuery = '';
        },
        
        // 计算距离行程开始还有几天
        calculateDaysLeft(dateString) {
            const tripDate = new Date(dateString);
            const today = new Date();
            
            // 设置时间为0点，只比较日期
            tripDate.setHours(0, 0, 0, 0);
            today.setHours(0, 0, 0, 0);
            
            const diffTime = tripDate - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
            
            return diffDays > 0 ? diffDays : 0;
        }
    },
    mounted() {
        // 添加滚动事件监听
        window.addEventListener('scroll', this.handleScroll);
        
        // 计算每个行程距离开始还有几天
        this.trips.forEach(trip => {
            if (!trip.daysLeft) {
                trip.daysLeft = this.calculateDaysLeft(trip.date);
            }
        });
    },
    beforeUnmount() {
        // 移除滚动事件监听
        window.removeEventListener('scroll', this.handleScroll);
    }
}).mount('#app'); 