const { createApp } = Vue

const app = createApp({
    data() {
        return {
            searchQuery: '',
            featuredTrips: [
                {
                    id: 1,
                    name: '香港经典三日游',
                    price: 2999,
                    image: 'path/to/image1.jpg'
                },
                {
                    id: 2,
                    name: '港澳联游五日',
                    price: 4999,
                    image: 'path/to/image2.jpg'
                }
            ],
            popularCelebs: [
                {
                    id: 1,
                    name: '旅行达人小王',
                    followers: '100万+',
                    avatar: 'path/to/avatar1.jpg'
                },
                {
                    id: 2,
                    name: '美食家大李',
                    followers: '50万+',
                    avatar: 'path/to/avatar2.jpg'
                }
            ]
        }
    },
    methods: {
        search() {
            // 处理搜索逻辑
            console.log('搜索:', this.searchQuery)
        },
        viewTrip(tripId) {
            window.location.href = `trip-detail.html?id=${tripId}`
        },
        viewCeleb(celebId) {
            window.location.href = `celeb-detail.html?id=${celebId}`
        }
    }
})

app.mount('#app')