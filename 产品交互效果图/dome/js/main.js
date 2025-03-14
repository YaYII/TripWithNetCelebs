const { createApp } = Vue

const app = createApp({
    data() {
        return {
            currentPage: 'html/home.html',
            menuItems: [
                { name: '启动页', path: 'html/splash.html' },
                { name: '登录', path: 'html/login.html' },
                { name: '首页', path: 'html/home.html' },
                { name: '网红推荐', path: 'html/influencer-list.html' },
                { name: '行程详情', path: 'html/trip-detail.html?id=11' },
                { name: '预订行程', path: 'html/booking.html' },
                { name: '订单管理', path: 'html/orders.html' },
                { name: '行程', path: 'html/trips.html' },
                { name: '个人中心', path: 'html/profile.html' },
               
            ]
        }
    },
    methods: {
        setCurrentPage(path) {
            this.currentPage = path
        }
    },
    mounted() {
        // 设置iframe高度自适应
        const iframe = document.querySelector('iframe')
        const adjustIframeHeight = () => {
            // 获取iPhone 16边框容器
            const frameContainer = document.querySelector('.iphone16-frame-container')
            
            if (frameContainer) {
                // 如果存在iPhone 16边框容器，则设置iframe高度为容器内部高度
                iframe.style.height = '100%'
                
                // 调整容器高度
                const mainContent = document.querySelector('.main-content')
                if (mainContent) {
                    const containerHeight = window.innerHeight - 40
                    frameContainer.style.height = `${containerHeight}px`
                }
            } else {
                // 如果不存在iPhone 16边框容器，则直接设置iframe高度
                iframe.style.height = `${window.innerHeight - 40}px`
            }
        }
        
        // 初始调整和窗口大小改变时调整
        adjustIframeHeight()
        window.addEventListener('resize', adjustIframeHeight)
        
        // 监听iframe加载完成事件
        iframe.addEventListener('load', () => {
            // 尝试向iframe内部传递iPhone 16的信息
            try {
                const targetWindow = iframe.contentWindow
                if (targetWindow) {
                    targetWindow.postMessage({
                        action: 'setIPhone16Frame',
                        isInFrame: true
                    }, '*')
                }
            } catch (e) {
                console.error('无法向iframe发送消息:', e)
            }
        })
    }
})

app.mount('#app')