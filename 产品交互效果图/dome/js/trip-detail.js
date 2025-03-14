const { createApp } = Vue

const app = createApp({
    data() {
        return {
            trip: {
                title: '香港经典三日游',
                images: [
                    '../img/placeholder-logo.png',
                    '../img/placeholder-logo.png',
                    '../img/placeholder-logo.png',
                ],
                duration: '3天2晚',
                location: '香港',
                groupSize: '4-8',
                price: 2999,
                ratingCount: 128,
                schedule: [
                    {
                        duration: '全天行程',
                        activities: [
                            {
                                time: '上午',
                                description: '抵达香港国际机场，专车接送至酒店'
                            },
                            {
                                time: '下午',
                                description: '维多利亚港游览，太平山夜景'
                            },
                            {
                                time: '晚上',
                                description: '尖沙咀美食之旅'
                            }
                        ]
                    },
                    {
                        duration: '全天行程',
                        activities: [
                            {
                                time: '上午',
                                description: '迪士尼乐园欢乐时光'
                            },
                            {
                                time: '下午',
                                description: '继续游玩迪士尼乐园'
                            },
                            {
                                time: '晚上',
                                description: '返回酒店休息'
                            }
                        ]
                    },
                    {
                        duration: '全天行程',
                        activities: [
                            {
                                time: '上午',
                                description: '黄大仙祠祈福'
                            },
                            {
                                time: '下午',
                                description: '旺角购物天堂'
                            },
                            {
                                time: '晚上',
                                description: '送机返程'
                            }
                        ]
                    }
                ]
            }
        }
    },
    mounted() {
        // 确保DOM渲染完成后再初始化Swiper
        this.$nextTick(() => {
            // 初始化 Swiper 轮播图实例
            new Swiper('.swiper-container', {
                // 开启循环模式
                loop: true,
                
                // 配置分页器
                pagination: {
                    el: '.swiper-pagination',
                    clickable: true
                },
                
                // 自动播放配置
                autoplay: {
                    delay: 5000,
                    disableOnInteraction: false
                },

                // 触摸滑动配置
                touchRatio: 1,
                touchAngle: 45,

                // 切换效果
                effect: 'slide',
                speed: 800,
                grabCursor: true,

                // 响应式配置
                breakpoints: {
                    320: {
                        slidesPerView: 1,
                    },
                    768: {
                        slidesPerView: 1,
                    }
                }
            });
        });

        // 监听页面滚动
        window.addEventListener('scroll', this.handleScroll);
    },
    methods: {
        goToBooking() {
            window.location.href = 'booking.html';
        },
        goBack() {
            window.history.back();
        },
        handleScroll() {
            const navBar = document.querySelector('.nav-bar');
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            if (scrollTop > 50) {
                navBar.style.backgroundColor = 'rgba(255, 255, 255, 0.25)';
                navBar.style.backdropFilter = 'blur(15px)';
            } else {
                navBar.style.backgroundColor = 'rgba(255, 255, 255, 0.15)';
                navBar.style.backdropFilter = 'blur(10px)';
            }
        }
    },
    unmounted() {
        // 清理事件监听
        window.removeEventListener('scroll', this.handleScroll);
    }
});

app.mount('#app');