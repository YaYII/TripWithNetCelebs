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
                    image: '../img/placeholder-logo.png'
                },
                {
                    id: 2,
                    name: '澳门威尼斯人',
                    description: '体验东方威尼斯',
                    image: '../img/placeholder-logo.png'
                },
                {
                    id: 3,
                    name: '迪士尼乐园',
                    description: '重拾童年欢乐时光',
                    image: '../img/placeholder-logo.png'
                }
            ],
            influencers: [
                {
                    id: 1,
                    name: '旅行达人小王',
                    description: '专注港澳旅游攻略',
                    followers: '100万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['美食', '购物', '打卡']
                },
                {
                    id: 2,
                    name: '美食家大李',
                    description: '寻找巷弄美食',
                    followers: '50万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['美食', '探店', '攻略']
                },
                {
                    id: 3,
                    name: '摄影师阿杰',
                    description: '记录旅途精彩瞬间',
                    followers: '80万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['摄影', '风景', '人文']
                }
            ],
            trips: [
                {
                    id: 1,
                    title: '香港经典三日游',
                    description: '打卡维多利亚港、太平山、尖沙咀',
                    price: 2999,
                    duration: '3天2晚',
                    image: '../img/placeholder-logo.png'
                },
                {
                    id: 2,
                    title: '港澳联游五日',
                    description: '一次玩转香港迪士尼和澳门威尼斯人',
                    price: 4999,
                    duration: '5天4晚',
                    image: '../img/placeholder-logo.png'
                },
                {
                    id: 3,
                    title: '澳门美食三日游',
                    description: '品尝地道葡式蛋挞和澳门手信',
                    price: 3599,
                    duration: '3天2晚',
                    image: '../img/placeholder-logo.png'
                }
            ]
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
        })
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
        viewTripDetail(id) {
            window.location.href = `trip-detail.html?id=${id}`;
        },
        viewAllTrips() {
            // TODO: 实现查看全部行程的逻辑
            console.log('查看全部行程');
        },
        navigate(page) {
            if (page === 'home') {
                window.location.href = 'home.html';
            } else if (page === 'explore') {
                window.location.href = 'explore.html';
            } else if (page === 'vr') {
                window.location.href = 'vr.html';
            } else if (page === 'profile') {
                window.location.href = 'profile.html';
            }
        }
    }
}).mount('#app');