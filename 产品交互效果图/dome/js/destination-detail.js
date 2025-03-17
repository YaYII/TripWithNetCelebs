// 目的地详情页面 JavaScript
const { createApp } = Vue

createApp({
    data() {
        return {
            // 目的地信息
            destination: {
                id: 1,
                name: '珠海长隆海洋王国',
                rating: 4.9,
                reviewCount: 2568,
                location: '广东省珠海市横琴新区环岛东路',
                bestTime: '3月-11月',
                avgCost: '¥600/人',
                description: '珠海长隆海洋王国是亚洲最大的海洋主题乐园，拥有多种珍稀海洋动物和刺激的游乐设施。这里有世界最大的鲸鲨馆、精彩的白鲸和海豚表演、壮观的企鹅冰山以及各种惊险刺激的游乐设施，是家庭出游和亲子活动的理想目的地。',
                tags: ['主题乐园', '海洋动物', '亲子游', '游乐设施', '表演', '度假'],
                images: [
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png',
                ],
                viewCount: 35680,
                tripCount: 25,
                features: [
                    {
                        id: 301,
                        icon: '../img/image1.png',
                        title: '海洋动物展示',
                        description: '观赏世界最大的鲸鲨馆，近距离接触北极熊、白鲸、海豚等珍稀海洋动物。'
                    },
                    {
                        id: 302,
                        icon: '../img/image1.png',
                        title: '精彩表演',
                        description: '欣赏白鲸、海豚、海狮等海洋动物的精彩表演，感受海洋生物的魅力。'
                    },
                    {
                        id: 303,
                        icon: '../img/image1.png',
                        title: '刺激游乐设施',
                        description: '体验飞越加勒比、激流勇进等刺激的游乐设施，感受惊险与刺激。'
                    },
                    {
                        id: 304,
                        icon: '../img/image1.png',
                        title: '特色餐饮',
                        description: '品尝海洋王国内的特色美食，包括海鲜、中西式自助餐和特色小吃。'
                    }
                ],
                reviews: [
                    {
                        id: 401,
                        name: '张小明',
                        avatar: '../img/potato.png',
                        rating: 5,
                        date: '2023-10-15',
                        content: '带孩子去长隆海洋王国玩了两天，真的太棒了！孩子特别喜欢海豚表演和企鹅馆，我们还参加了与白鲸的亲密互动，留下了美好的回忆。'
                    },
                    {
                        id: 402,
                        name: '李华',
                        avatar: '../img/potato.png',
                        rating: 4,
                        date: '2023-09-20',
                        content: '海洋王国的规模确实很大，动物种类也很丰富，特别是鲸鲨馆真的震撼。唯一不足的是人太多了，建议避开节假日前往。'
                    },
                    {
                        id: 403,
                        name: '王芳',
                        avatar: '../img/potato.png',
                        rating: 5,
                        date: '2023-08-05',
                        content: '跟着网红导游的行程去的海洋王国，体验非常好！导游带我们避开了人流高峰，还介绍了很多海洋知识，孩子们学到了很多东西。'
                    }
                ],
                nearby: [
                    {
                        id: 501,
                        name: '横琴长隆国际海洋度假区',
                        image: '../img/image1.png',
                        distance: '约1公里'
                    },
                    {
                        id: 502,
                        name: '珠海渔女像',
                        image: '../img/image1.png',
                        distance: '约15公里'
                    },
                    {
                        id: 503,
                        name: '情侣路',
                        image: '../img/image1.png',
                        distance: '约12公里'
                    },
                    {
                        id: 504,
                        name: '圆明新园',
                        image: '../img/image1.png',
                        distance: '约20公里'
                    }
                ]
            },
            
            // 网红导游行程
            influencerTrips: [
                {
                    id: 101,
                    title: '珠海长隆海洋王国亲子2日游',
                    status: {
                        type: 'hot',
                        text: '热门'
                    },
                    image: '../img/image1.png',
                    influencer: {
                        id: 201,
                        name: '亲子游达人小丽',
                        avatar: '../img/potato.png',
                        followers: 156000
                    },
                    price: '1,280',
                    duration: '2天1晚',
                    departureDate: '2024-05-15',
                    currentParticipants: 27,
                    maxParticipants: 30,
                    remainingSpots: 3
                },
                {
                    id: 102,
                    title: '珠海长隆+横琴度假区3日游',
                    status: {
                        type: 'limited',
                        text: '即将满员'
                    },
                    image: '../img/image1.png',
                    influencer: {
                        id: 202,
                        name: '摄影师阿杰',
                        avatar: '../img/potato.png',
                        followers: 92000
                    },
                    price: '2,500',
                    duration: '3天2晚',
                    departureDate: '2024-05-20',
                    currentParticipants: 18,
                    maxParticipants: 20,
                    remainingSpots: 2
                },
                {
                    id: 103,
                    title: '珠海海洋王国+情侣路深度游',
                    status: {
                        type: 'new',
                        text: '新上线'
                    },
                    image: '../img/image1.png',
                    influencer: {
                        id: 203,
                        name: '旅行博主小王',
                        avatar: '../img/potato.png',
                        followers: 185000
                    },
                    price: '1,680',
                    duration: '2天2晚',
                    departureDate: '2024-06-01',
                    currentParticipants: 12,
                    maxParticipants: 25,
                    remainingSpots: 13
                }
            ],
            
            // 收藏状态
            isFavorite: false,
            
            // 轮播图当前索引
            currentBannerIndex: 0
        }
    },
    computed: {
        // 格式化评分
        formattedRating() {
            return this.destination.rating.toFixed(1);
        }
    },
    methods: {
        // 初始化轮播图
        initBannerSwiper() {
            new Swiper('.banner-swiper', {
                loop: true,
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false,
                },
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true,
                }
            });
        },
        
        // 切换收藏状态
        toggleFavorite() {
            // 获取当前收藏列表
            let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            
            if (this.isFavorite) {
                // 如果已收藏，则取消收藏
                favorites = favorites.filter(item => 
                    !(item.id === this.destination.id && item.type === 'destination')
                );
                this.showToast('已取消收藏');
            } else {
                // 如果未收藏，则添加到收藏
                favorites.push({
                    id: this.destination.id,
                    type: 'destination',
                    name: this.destination.name,
                    description: this.destination.description.substring(0, 60) + '...',
                    image: this.destination.images[0],
                    viewCount: this.destination.viewCount,
                    location: this.destination.location,
                    rating: this.destination.rating,
                    reviewCount: this.destination.reviewCount
                });
                this.showToast('收藏成功');
            }
            
            // 更新本地存储
            localStorage.setItem('favorites', JSON.stringify(favorites));
            
            // 更新收藏状态
            this.isFavorite = !this.isFavorite;
            
            // 跳转到收藏列表页面
            setTimeout(() => {
                window.location.href = 'my-favorites.html';
            }, 1000); // 延迟1秒后跳转，让用户看到提示信息
        },
        
        // 检查是否已收藏
        checkFavoriteStatus() {
            const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            this.isFavorite = favorites.some(item => 
                item.id === this.destination.id && item.type === 'destination'
            );
        },
        
        // 显示提示信息
        showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);
            
            // 2秒后自动消失
            setTimeout(() => {
                toast.classList.add('fade-out');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 2000);
        },
        
        // 前往行程详情页
        viewTripDetail(tripId) {
            window.location.href = `trip-detail.html?id=${tripId}`;
        },
        
        // 前往网红详情页
        goToInfluencerDetail(influencerId) {
            window.location.href = `influencer-detail.html?id=${influencerId}`;
        },
        
        // 前往周边目的地详情页
        viewDestinationDetail(destinationId) {
            window.location.href = `destination-detail.html?id=${destinationId}`;
        },
        
        // 查看更多评价
        viewMoreReviews() {
            // 这里可以实现加载更多评价的逻辑
            this.showToast('加载更多评价...');
        },
        
        // 查看全部行程
        viewAllTrips() {
            // 跳转到网红行程列表页面
            window.location.href = `influencer-list.html?destination=${this.destination.id}`;
        },
        
        // 分享目的地
        shareDestination() {
            // 这里可以实现分享功能
            this.showToast('分享功能即将上线...');
        },
        
        // 返回上一页
        goBack() {
            window.history.back();
        }
    },
    mounted() {
        // 页面加载完成后初始化轮播图
        this.$nextTick(() => {
            this.initBannerSwiper();
        });
        
        // 从URL获取目的地ID或行程ID并加载数据
        const urlParams = new URLSearchParams(window.location.search);
        const destinationId = urlParams.get('id');
        
        if (destinationId) {
            // 这里可以根据ID从API加载目的地数据
            console.log(`加载目的地ID: ${destinationId}的数据`);
            
            // 判断ID是否为行程ID（从全部行程页面跳转过来）
            // 实际项目中应该从API获取数据
            // 这里简单判断ID的范围来区分是目的地ID还是行程ID
            if (destinationId >= 1 && destinationId <= 10) {
                // 如果是行程ID，需要获取对应的目的地数据
                console.log(`这是一个行程ID，需要获取对应的目的地数据`);
                // 实际项目中应该从API获取数据
                // this.loadDestinationDataByTripId(destinationId);
            } else {
                // 如果是目的地ID，直接加载目的地数据
                // this.loadDestinationData(destinationId);
            }
        }
        
        // 检查收藏状态
        this.checkFavoriteStatus();
    }
}).mount('#app');

// 添加CSS样式
const style = document.createElement('style');
style.textContent = `
    .toast {
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.7);
        color: white;
        padding: 12px 20px;
        border-radius: 24px;
        z-index: 1000;
        transition: opacity 0.3s;
    }
    
    .fade-out {
        opacity: 0;
    }
`;
document.head.appendChild(style); 