const app = Vue.createApp({
    data() {
        return {
            isLoading: false
        }
    },
    methods: {
        handleWechatLogin() {
            this.isLoading = true;
            // 模拟微信登录授权过程
            setTimeout(() => {
                this.isLoading = false;
                // 登录成功后跳转到首页
                window.location.href = 'home.html';
            }, 1500);
        }
    }
}).mount('#app');