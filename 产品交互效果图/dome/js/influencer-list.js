const { createApp } = Vue

createApp({
    data() {
        return {
            currentPage: 'influencers',
            selectedTag: '全部',
            searchQuery: '',
            tags: ['全部', '美食', '购物', '打卡', '摄影', '探店', '攻略', '人文'],
            influencers: [
                {
                    id: 1,
                    name: '旅行达人小王',
                    description: '专注港澳旅游攻略，带你玩转香港澳门各大景点，分享最新美食探店和购物攻略',
                    followers: '100万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['美食', '购物', '打卡']
                },
                {
                    id: 2,
                    name: '美食家大李',
                    description: '寻找巷弄美食，带你品尝最地道的香港澳门美食，分享独家美食地图',
                    followers: '50万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['美食', '探店', '攻略']
                },
                {
                    id: 3,
                    name: '摄影师阿杰',
                    description: '记录旅途精彩瞬间，分享香港澳门最美拍摄地点和摄影技巧',
                    followers: '80万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['摄影', '风景', '人文']
                },
                {
                    id: 4,
                    name: '购物达人小美',
                    description: '香港澳门购物专家，分享最新折扣信息和购物攻略',
                    followers: '120万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['购物', '攻略', '打卡']
                },
                {
                    id: 5,
                    name: '文化探索者阿明',
                    description: '深入探索香港澳门文化，带你了解当地历史文化和特色体验',
                    followers: '60万+',
                    avatar: '../img/placeholder-logo.png',
                    tags: ['人文', '文化', '体验']
                }
            ]
        }
    },
    computed: {
        filteredInfluencers() {
            let result = this.influencers;

            // 标签筛选
            if (this.selectedTag !== '全部') {
                result = result.filter(influencer => 
                    influencer.tags.includes(this.selectedTag)
                );
            }

            // 搜索筛选
            if (this.searchQuery) {
                const query = this.searchQuery.toLowerCase();
                result = result.filter(influencer => 
                    influencer.name.toLowerCase().includes(query) ||
                    influencer.description.toLowerCase().includes(query) ||
                    influencer.tags.some(tag => tag.toLowerCase().includes(query))
                );
            }

            return result;
        }
    },
    methods: {
        goBack() {
            window.history.back();
        },
        selectTag(tag) {
            this.selectedTag = tag;
        },
        viewInfluencerDetail(id) {
            // TODO: 实现查看网红详情的逻辑
            console.log('查看网红详情:', id);
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