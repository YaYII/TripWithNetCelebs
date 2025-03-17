const { createApp } = Vue

const app = createApp({
    data() {
        return {
            trip: {
                id: null,
                title: '',
                description: '',
                duration: '',
                location: '',
                groupSize: '',
                price: '',
                rating: 0,
                ratingCount: 0,
                images: [],
                schedule: [],
                currentParticipants: 0,
                maxParticipants: 0,
                viewCount: 0,
                departureDate: '',
                daysLeft: 0,
                influencer: {
                    name: '',
                    avatar: '',
                    followers: '',
                    totalTrips: 0
                }
            },
            bannerSwiper: null,
            activitySwiper: null,
            isFavorite: false // 是否已收藏
        }
    },
    mounted() {
        // 获取URL参数中的行程ID
        const urlParams = new URLSearchParams(window.location.search);
        const tripId = urlParams.get('id');
        
        if (tripId) {
            this.loadTripDetails(tripId).then(() => {
                // 加载完行程详情后检查收藏状态
                this.checkFavoriteStatus();
            });
        }

        // 初始化轮播
        this.initSwipers();

        // 添加滚动监听
        let lastScrollTop = 0;
        let isAtTop = true;
        window.addEventListener('scroll', () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const navBar = document.querySelector('.nav-bar');
            const bannerSwiper = document.querySelector('.banner-swiper');
            
            // 检查是否在顶部
            if (currentScrollTop <= 0) {
                isAtTop = true;
            } else {
                isAtTop = false;
            }
            
            if (currentScrollTop > lastScrollTop) {
                // 向下滚动
                navBar.style.transform = 'translateY(-100%)';
                if (bannerSwiper) {
                    bannerSwiper.style.transform = 'scale(1)';
                    bannerSwiper.classList.remove('enlarged');
                }
            } else {
                // 向上滚动
                navBar.style.transform = 'translateY(0)';
                if (bannerSwiper && isAtTop && currentScrollTop <= 0) {
                    bannerSwiper.style.transform = 'scale(1.1)';
                    bannerSwiper.classList.add('enlarged');
                }
            }
            
            lastScrollTop = currentScrollTop;
        });
    },
    methods: {
        loadTripDetails(tripId) {
            // 返回Promise以便在加载完成后检查收藏状态
            return new Promise((resolve) => {
                // 模拟API请求
                setTimeout(() => {
                    // 模拟行程数据
                    this.trip = {
                        id: tripId,
                        title: '珠海长隆海洋王国一日游',
                        description: '跟随网红达人小王一起探索珠海长隆海洋王国的奇妙世界，近距离接触海洋生物，观看精彩表演，体验刺激游乐设施。',
                        duration: '1天',
                        location: '珠海市横琴新区环岛东路',
                        groupSize: '10-15人',
                        price: '¥599',
                        rating: 4.8,
                        ratingCount: 256,
                        images: [
                            '../img/test.png',
                            '../img/test.png',
                            '../img/test.png',
                            '../img/test.png'
                        ],
                        schedule: [
                            {
                                time: '08:30',
                                activity: '集合出发',
                                description: '珠海市区指定地点集合，乘车前往长隆海洋王国'
                            },
                            {
                                time: '10:00',
                                activity: '抵达海洋王国',
                                description: '办理入园手续，开始一天的海洋探索之旅'
                            },
                            {
                                time: '11:30',
                                activity: '海豚表演',
                                description: '观看精彩的海豚表演，了解海豚的生活习性'
                            },
                            {
                                time: '13:00',
                                activity: '午餐时间',
                                description: '在园区内享用特色美食，补充能量'
                            },
                            {
                                time: '14:30',
                                activity: '鲸鲨馆参观',
                                description: '参观世界最大的鲸鲨馆，近距离观察海洋生物'
                            },
                            {
                                time: '16:00',
                                activity: '游乐设施体验',
                                description: '体验园区内的刺激游乐设施，如激流勇进等'
                            },
                            {
                                time: '18:00',
                                activity: '返程',
                                description: '结束一天的行程，乘车返回市区'
                            }
                        ],
                        currentParticipants: 8,
                        maxParticipants: 15,
                        viewCount: 1256,
                        departureDate: '2024-05-15',
                        daysLeft: 30,
                        influencer: {
                            id: 1, // 添加网红ID
                            name: '旅行达人小王',
                            avatar: '../img/potato.png',
                            followers: '10万+',
                            totalTrips: 28
                        }
                    };
                    
                    resolve();
                }, 500);
            });
        },
        initSwipers() {
            // 初始化 Banner 轮播
            this.bannerSwiper = new Swiper('.banner-swiper', {
                loop: true,
                pagination: {
                    el: '.banner-swiper .swiper-pagination',
                    clickable: true
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                }
            });

            // 初始化活动图片轮播
            this.activitySwiper = new Swiper('.swiper-container:not(.banner-swiper)', {
                loop: true,
                pagination: {
                    el: '.swiper-container:not(.banner-swiper) .swiper-pagination',
                    clickable: true
                },
                autoplay: {
                    delay: 3000,
                    disableOnInteraction: false
                }
            });
        },
        goBack() {
            window.history.back();
        },
        goToBooking() {
            // 跳转到预订页面
            window.location.href = `booking.html?id=${this.trip.id}`;
        },
        // 切换收藏状态
        toggleFavorite() {
            // 获取当前收藏列表
            let favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
            
            if (this.isFavorite) {
                // 如果已收藏，则取消收藏
                favorites = favorites.filter(item => 
                    !(item.id === this.trip.id && item.type === 'trip')
                );
                this.showToast('已取消收藏');
            } else {
                // 如果未收藏，则添加到收藏
                favorites.push({
                    id: this.trip.id,
                    type: 'trip',
                    title: this.trip.title,
                    description: this.trip.description.substring(0, 60) + '...',
                    image: this.trip.images[0],
                    viewCount: this.trip.viewCount || 1000,
                    currentParticipants: this.trip.currentParticipants || 0,
                    maxParticipants: this.trip.maxParticipants || 0,
                    price: this.trip.price.replace('¥', '') || '0',
                    daysLeft: this.trip.daysLeft || 0,
                    departureDate: this.trip.departureDate || '',
                    location: this.trip.location || '',
                    duration: this.trip.duration || '',
                    influencer: {
                        id: this.trip.influencer.id,
                        name: this.trip.influencer.name,
                        avatar: this.trip.influencer.avatar
                    },
                    tripStatus: {
                        type: 'hot',
                        text: '热门'
                    }
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
                item.id === this.trip.id && item.type === 'trip'
            );
        },
        
        // 显示提示信息
        showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(toast);
                    }, 300);
                }, 2000);
            }, 100);
        }
    },
    unmounted() {
        // 销毁轮播实例
        if (this.bannerSwiper) {
            this.bannerSwiper.destroy();
        }
        if (this.activitySwiper) {
            this.activitySwiper.destroy();
        }
    }
});

app.mount('#app');