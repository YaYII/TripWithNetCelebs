const { createApp } = Vue

const app = createApp({
    data() {
        return {
            currentTab: 'info',
            currentLocation: 0,
            isFullscreen: false,
            locations: [
                {
                    id: 1,
                    name: '香港维多利亚港',
                    description: '感受不夜城的魅力，欣赏世界著名的海港夜景',
                    image: '../img/placeholder-logo.png',
                    vrUrl: 'vr-scene.html?id=1',
                    rating: 4.8,
                    reviewCount: 256
                },
                {
                    id: 2,
                    name: '澳门威尼斯人',
                    description: '体验东方威尼斯，感受独特的购物和娱乐体验',
                    image: '../img/placeholder-logo.png',
                    vrUrl: 'vr-scene.html?id=2',
                    rating: 4.9,
                    reviewCount: 189
                }
            ]
        }
    },
    computed: {
        currentLocationData() {
            return this.locations[this.currentLocation]
        }
    },
    methods: {
        switchLocation(index) {
            this.currentLocation = index
            // 在实际应用中，这里会加载相应位置的360°全景图
            console.log('切换到位置：', this.locations[index].name)
        },
        toggleFullscreen() {
            this.isFullscreen = !this.isFullscreen
            // 在实际应用中，这里会处理全屏模式的切换
            console.log('切换全屏模式：', this.isFullscreen)
        },
        handleRotate(direction) {
            // 在实际应用中，这里会处理全景图的旋转
            console.log('旋转方向：', direction)
        },
        handleZoom(type) {
            // 在实际应用中，这里会处理全景图的缩放
            console.log('缩放类型：', type)
        }
    }
})

app.mount('#app')