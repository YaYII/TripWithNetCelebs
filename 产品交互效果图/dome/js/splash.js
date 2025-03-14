const { createApp } = Vue

createApp({
    data() {
        return {
            redirectTimeout: null
        }
    },
    mounted() {
        // 设置3秒后自动跳转到登录页面
        this.redirectTimeout = setTimeout(() => {
            window.location.href = 'login.html'
        }, 3000)
    },
    beforeUnmount() {
        // 清除定时器
        if (this.redirectTimeout) {
            clearTimeout(this.redirectTimeout)
        }
    }
}).mount('#app')