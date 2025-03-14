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
                    name: '维多利亚港',
                    image: '../img/location1.jpg',
                    description: '香港最著名的景点之一，可以欣赏到壮丽的海港景色和城市天际线。',
                    details: {
                        description: '维多利亚港是香港的标志性景点，也是世界三大夜景之一。这里不仅有壮观的海港景色，还有著名的幻彩咏香江灯光秀。',
                        bestTime: '傍晚和夜晚',
                        duration: '建议游览1-2小时',
                        tips: '建议在尖沙咀海滨长廊观赏夜景，每晚8点有灯光表演。'
                    }
                },
                {
                    id: 2,
                    name: '太平山顶',
                    image: '../img/location2.jpg',
                    description: '香港最高点，可以360度俯瞰整个香港岛和九龙半岛的壮丽景色。',
                    details: {
                        description: '太平山顶是香港最受欢迎的观光胜地之一，搭乘历史悠久的山顶缆车上山，在凉爽的山顶欣赏香港全景。',
                        bestTime: '下午至傍晚',
                        duration: '建议游览2-3小时',
                        tips: '建议提前在线预订山顶缆车票，避免排队。'
                    }
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