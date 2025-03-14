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
            activitySwiper: null
        }
    },
    mounted() {
        // 获取URL参数中的行程ID
        const urlParams = new URLSearchParams(window.location.search);
        const tripId = urlParams.get('id');
        
        if (tripId) {
            this.loadTripDetails(tripId);
        }

        // 初始化轮播
        this.initSwipers();

        // 添加滚动监听
        let lastScrollTop = 0;
        window.addEventListener('scroll', () => {
            const currentScrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const navBar = document.querySelector('.nav-bar');
            
            if (currentScrollTop > lastScrollTop) {
                // 向上滚动，隐藏导航栏
                navBar.style.transform = 'translateY(-100%)';
            } else {
                // 向下滚动，显示导航栏
                navBar.style.transform = 'translateY(0)';
            }
            
            lastScrollTop = currentScrollTop;
        });
    },
    methods: {
        loadTripDetails(tripId) {
            // 这里应该从后端API获取数据，现在用模拟数据
            const mockData = {
                id: tripId,
                title: '珠海长隆海洋王国深度游',
                description: '专业导游带你玩转珠海长隆海洋王国，体验最刺激的游乐项目，观赏最精彩的表演。',
                duration: '2天1晚',
                location: '珠海长隆海洋王国',
                groupSize: '30人',
                price: '599',
                rating: 4.8,
                ratingCount: 128,
                images: [
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png',
                    '../img/test.png'
                ],
                schedule: [
                    {
                        title: '第一天',
                        activities: [
                            { time: '09:00', description: '集合出发' },
                            { time: '10:30', description: '到达长隆海洋王国' },
                            { time: '11:00', description: '观看海豚表演' }
                        ]
                    },
                    {
                        title: '第二天',
                        activities: [
                            { time: '09:30', description: '体验过山车' },
                            { time: '11:00', description: '观看白鲸表演' },
                            { time: '14:00', description: '自由活动' }
                        ]
                    }
                ],
                currentParticipants: 28,
                maxParticipants: 30,
                viewCount: 1256,
                departureDate: '2024-06-15',
                daysLeft: 3,
                influencer: {
                    name: '旅行达人小王',
                    avatar: '../img/potato.png',
                    followers: '100万+',
                    totalTrips: 12
                }
            };

            this.trip = mockData;
            
            // 在数据加载完成后初始化轮播
            this.$nextTick(() => {
                this.initSwipers();
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