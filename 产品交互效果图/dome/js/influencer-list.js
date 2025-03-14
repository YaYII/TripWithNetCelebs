const { createApp } = Vue

createApp({
    data() {
        return {
            currentPage: 'explore',
            selectedTag: '全部',
            searchQuery: '',
            tags: ['全部',  '亲子', '摄影', '美食'],
            influencers: [
                {
                    id: 1,
                    name: '旅行达人小王',
                    description: '专注珠海旅游攻略，带你玩转珠海各大景点',
                    followers: '100万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['珠海', '美食', '打卡'],
                    tripDestination: '珠海长隆海洋王国深度游',
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
                    description: '寻找珠海巷弄美食，带你品尝最地道的珠海美食',
                    followers: '50万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['珠海', '美食', '探店'],
                    tripDestination: '珠海斗门古镇美食之旅',
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
                    description: '记录旅途精彩瞬间，分享珠海最美拍摄地点',
                    followers: '80万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['珠海', '摄影', '人文'],
                    tripDestination: '珠海情侣路摄影之旅',
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
                    name: '探险家小美',
                    description: '珠海海岛探险专家，带你探索珠海最美海岛',
                    followers: '120万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['珠海', '探险', '海岛'],
                    tripDestination: '珠海外伶仃岛探险之旅',
                    currentParticipants: 18,
                    maxParticipants: 25,
                    price: '799',
                    daysLeft: 10,
                    departureDate: '2024-06-22',
                    viewCount: 1432,
                    tripStatus: {
                        type: 'new',
                        text: '新团'
                    }
                },
                {
                    id: 5,
                    name: '文化探索者阿明',
                    description: '深入探索珠海文化，带你了解珠海历史文化',
                    followers: '60万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['珠海', '文化', '历史'],
                    tripDestination: '珠海横琴粤澳合作区文化之旅',
                    currentParticipants: 20,
                    maxParticipants: 30,
                    price: '599',
                    daysLeft: 8,
                    departureDate: '2024-06-20',
                    viewCount: 865,
                    tripStatus: {
                        type: 'hot',
                        text: '热门'
                    }
                },
                {
                    id: 6,
                    name: '珠海探店王',
                    description: '专业探店达人，为你寻找珠海特色店铺',
                    followers: '95万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['珠海', '探店', '购物'],
                    tripDestination: '珠海特色商店探索之旅',
                    currentParticipants: 16,
                    maxParticipants: 20,
                    price: '399',
                    daysLeft: 6,
                    departureDate: '2024-06-18',
                    viewCount: 1024,
                    tripStatus: {
                        type: 'limited',
                        text: '即将满员'
                    }
                },
                {
                    id: 7,
                    name: '度假达人小林',
                    description: '珠海度假专家，带你体验珠海高端度假生活',
                    followers: '75万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['珠海', '度假', '酒店'],
                    tripDestination: '珠海御温泉度假之旅',
                    currentParticipants: 22,
                    maxParticipants: 25,
                    price: '899',
                    daysLeft: 12,
                    departureDate: '2024-06-24',
                    viewCount: 1156,
                    tripStatus: {
                        type: 'limited',
                        text: '即将满员'
                    }
                },
                {
                    id: 8,
                    name: '海上运动教练阿强',
                    description: '专业帆船教练，带你体验珠海海上运动',
                    followers: '85万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['珠海', '运动', '帆船'],
                    tripDestination: '珠海海岛帆船体验',
                    currentParticipants: 10,
                    maxParticipants: 15,
                    price: '1299',
                    daysLeft: 15,
                    departureDate: '2024-06-27',
                    viewCount: 892,
                    tripStatus: {
                        type: 'new',
                        text: '新团'
                    }
                },
                {
                    id: 9,
                    name: '亲子游达人小张',
                    description: '专注珠海亲子游，带你和孩子一起探索珠海',
                    followers: '92万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['珠海', '亲子', '家庭'],
                    tripDestination: '珠海亲子欢乐之旅',
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
                },
                {
                    id: 10,
                    name: '珠海本地向导老陈',
                    description: '土生土长的珠海人，带你探索珠海的秘密角落',
                    followers: '68万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['珠海', '本地', '深度'],
                    tripDestination: '珠海本地人带路深度游',
                    currentParticipants: 8,
                    maxParticipants: 10,
                    price: '499',
                    daysLeft: 4,
                    departureDate: '2024-06-16',
                    viewCount: 756,
                    tripStatus: {
                        type: 'limited',
                        text: '即将满员'
                    }
                },
                {
                    id: 11,
                    name: '珠海夜景摄影师小黄',
                    description: '专注珠海夜景摄影，带你捕捉珠海最美夜色',
                    followers: '73万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['珠海', '摄影', '夜景'],
                    tripDestination: '珠海夜景摄影专题团',
                    currentParticipants: 14,
                    maxParticipants: 20,
                    price: '599',
                    daysLeft: 11,
                    departureDate: '2024-06-23',
                    viewCount: 987,
                    tripStatus: {
                        type: 'new',
                        text: '新团'
                    }
                },
                {
                    id: 12,
                    name: '珠海美食博主小丽',
                    description: '专注珠海海鲜美食，带你品尝最新鲜的海鲜',
                    followers: '88万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['珠海', '美食', '海鲜'],
                    tripDestination: '珠海海鲜美食之旅',
                    currentParticipants: 19,
                    maxParticipants: 25,
                    price: '799',
                    daysLeft: 6,
                    departureDate: '2024-06-18',
                    viewCount: 1123,
                    tripStatus: {
                        type: 'hot',
                        text: '热门'
                    }
                }
            ]
        }
    },
    mounted() {
        // 使用默认logo作为头像
        this.influencers.forEach(influencer => {
            influencer.avatar = '../img/potato.png';
            // 格式化日期
            influencer.departureDate = this.formatDate(influencer.departureDate);
        });
        
        // 添加页面进入动画
        this.animateCards();
        
        // 添加滚动事件监听
        let lastScrollTop = 0;
        const searchContainer = document.querySelector('.search-container');
        const filterBar = document.querySelector('.filter-bar');
        
        window.addEventListener('scroll', () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (currentScrollTop > lastScrollTop) {
                // 向下滚动
                searchContainer.classList.add('hidden');
                filterBar.classList.add('search-hidden');
            } else {
                // 向上滚动
                searchContainer.classList.remove('hidden');
                filterBar.classList.remove('search-hidden');
            }
            
            lastScrollTop = currentScrollTop;
        });
    },
    computed: {
        filteredInfluencers() {
            return this.influencers.filter(influencer => {
                const matchesSearch = influencer.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
                                    influencer.tripDestination.toLowerCase().includes(this.searchQuery.toLowerCase());
                const matchesTag = this.selectedTag === '全部' || influencer.tags.includes(this.selectedTag);
                return matchesSearch && matchesTag;
            });
        }
    },
    methods: {
        formatDate(dateString) {
            const date = new Date(dateString);
            const year = date.getFullYear();
            const month = String(date.getMonth() + 1).padStart(2, '0');
            const day = String(date.getDate()).padStart(2, '0');
            return `${year}-${month}-${day}`;
        },
        goBack() {
            window.history.back();
        },
        selectTag(tag) {
            this.selectedTag = tag;
        },
        viewInfluencerDetail(id) {
            // 跳转到行程详情页
            window.location.href = `trip-detail.html?id=${id}`;
        },
        animateCards() {
            const cards = document.querySelectorAll('.influencer-card');
            cards.forEach((card, index) => {
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0)';
                }, index * 100);
            });
        }
    }
}).mount('#app'); 