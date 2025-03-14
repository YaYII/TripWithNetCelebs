const { createApp } = Vue

const app = createApp({
    data() {
        return {}
    },
    methods: {
        goBack() {
            window.history.back()
        },
        handleQuickLogin() {
            // 模拟获取手机号并登录
            console.log('执行快捷登录')
            window.location.href = 'home.html'
        },
        skipLogin() {
            // 跳转到首页
            window.location.href = 'home.html'
        }
    }
})

app.mount('#app')