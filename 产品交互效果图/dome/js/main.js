const { createApp } = Vue

const app = createApp({
    data() {
        return {
            currentPage: 'html/home.html',
            menuItems: [
                { name: '首页', path: 'html/home.html' },
                { name: '行程详情', path: 'html/trip-detail.html' },
                { name: '预订行程', path: 'html/booking.html' },
                { name: '订单管理', path: 'html/orders.html' },
                { name: 'VR导览', path: 'html/vr-tour.html' },
                { name: '直播互动', path: 'html/live.html' },
                { name: '个人中心', path: 'html/profile.html' }
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
            iframe.style.height = `${window.innerHeight - 40}px`
        }
        
        // 初始调整和窗口大小改变时调整
        adjustIframeHeight()
        window.addEventListener('resize', adjustIframeHeight)
    }
})

app.mount('#app')