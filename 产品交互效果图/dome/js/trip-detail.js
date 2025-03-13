const { createApp } = Vue

const app = createApp({
    data() {
        return {
            trip: {
                title: '香港经典三日游',
                image: '#',
                duration: '3天2晚',
                price: 2999,
                meetingPoint: '香港国际机场',
                schedule: [
                    [
                        '上午：抵达香港国际机场，专车接送至酒店',
                        '下午：维多利亚港游览，太平山夜景',
                        '晚上：尖沙咀美食之旅'
                    ],
                    [
                        '上午：迪士尼乐园欢乐时光',
                        '下午：继续游玩迪士尼乐园',
                        '晚上：返回酒店休息'
                    ],
                    [
                        '上午：黄大仙祠祈福',
                        '下午：旺角购物天堂',
                        '晚上：送机返程'
                    ]
                ]
            }
        }
    },
    methods: {
        goToBooking() {
            window.location.href = 'booking.html'
        }
    }
})

app.mount('#app')