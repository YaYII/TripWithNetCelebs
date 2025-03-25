// 登录页面 JavaScript
const { createApp } = Vue

createApp({
    data() {
        return {
            // 手机号登录相关数据
            showPhoneLoginModal: false,
            phoneNumber: '',
            verificationCode: '',
            cooldownTime: 0,
            cooldownTimer: null,
            
            // 加载状态
            isLoading: false,
            loadingText: '加载中...',
            
            // 存储重定向目标
            redirectUrl: 'index.html'
        }
    },
    
    computed: {
        // 检查是否可以提交登录表单
        canSubmit() {
            return this.phoneNumber.length === 11 && this.verificationCode.length === 6
        }
    },
    
    methods: {
        /**
         * 处理微信登录
         */
        handleWechatLogin() {
            this.isLoading = true;
            this.loadingText = '微信授权中...';
            
            // 模拟微信授权过程
            setTimeout(() => {
                // 模拟获取用户信息
                const userInfo = {
                    id: 1,
                    name: '旅行达人小王',
                    avatar: '../img/potato.png',
                    phone: '13812345678'
                };
                
                // 保存用户信息到本地存储
                this.saveUserInfo(userInfo);
                
                // 显示成功消息
                this.showToast('登录成功');
                
                // 重定向到首页
                setTimeout(() => {
                    window.location.href = this.redirectUrl;
                }, 1000);
            }, 1500);
        },
        
        /**
         * 打开手机号登录弹窗
         */
        handlePhoneLogin() {
            this.showPhoneLoginModal = true;
        },
        
        /**
         * 关闭手机号登录弹窗
         */
        closePhoneLoginModal() {
            this.showPhoneLoginModal = false;
            this.phoneNumber = '';
            this.verificationCode = '';
            this.stopCooldown();
        },
        
        /**
         * 发送验证码
         */
        sendVerificationCode() {
            // 手机号验证
            if (!/^1[3-9]\d{9}$/.test(this.phoneNumber)) {
                this.showToast('请输入正确的手机号');
                return;
            }
            
            // 开始倒计时
            this.startCooldown();
            
            // 模拟发送验证码
            this.showToast('验证码已发送');
        },
        
        /**
         * 开始倒计时
         */
        startCooldown() {
            this.cooldownTime = 60;
            this.cooldownTimer = setInterval(() => {
                this.cooldownTime--;
                if (this.cooldownTime <= 0) {
                    this.stopCooldown();
                }
            }, 1000);
        },
        
        /**
         * 停止倒计时
         */
        stopCooldown() {
            if (this.cooldownTimer) {
                clearInterval(this.cooldownTimer);
                this.cooldownTimer = null;
            }
            this.cooldownTime = 0;
        },
        
        /**
         * 提交手机号登录
         */
        submitPhoneLogin() {
            if (!this.canSubmit) {
                return;
            }
            
            this.isLoading = true;
            this.loadingText = '登录中...';
            
            // 模拟登录过程
            setTimeout(() => {
                // 模拟验证
                if (this.verificationCode === '123456') {
                    // 模拟获取用户信息
                    const userInfo = {
                        id: 2,
                        name: '手机用户' + this.phoneNumber.substring(7),
                        avatar: '../img/potato.png',
                        phone: this.phoneNumber
                    };
                    
                    // 保存用户信息到本地存储
                    this.saveUserInfo(userInfo);
                    
                    // 显示成功消息
                    this.showToast('登录成功');
                    
                    // 重定向到首页
                    setTimeout(() => {
                        window.location.href = this.redirectUrl;
                    }, 1000);
                } else {
                    this.isLoading = false;
                    this.showToast('验证码错误');
                }
            }, 1500);
        },
        
        /**
         * 游客模式登录
         */
        handleVisitorLogin() {
            this.isLoading = true;
            this.loadingText = '正在进入游客模式...';
            
            // 模拟游客登录过程
            setTimeout(() => {
                // 保存游客信息到本地存储
                const visitorInfo = {
                    id: 0,
                    name: '游客',
                    avatar: '../img/default-avatar.png',
                    isVisitor: true
                };
                
                // 保存游客信息到本地存储
                this.saveUserInfo(visitorInfo);
                
                // 重定向到首页
                window.location.href = this.redirectUrl;
            }, 1000);
        },
        
        /**
         * 保存用户信息到本地存储
         * @param {Object} userInfo - 用户信息对象
         */
        saveUserInfo(userInfo) {
            // 添加登录时间戳
            userInfo.loginTime = new Date().getTime();
            
            // 序列化并保存
            localStorage.setItem('userInfo', JSON.stringify(userInfo));
            
            // 设置登录状态
            localStorage.setItem('isLoggedIn', 'true');
        },
        
        /**
         * 显示提示消息
         * @param {string} message - 提示消息
         */
        showToast(message) {
            // 创建 toast 元素
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            
            // 添加到文档中
            document.body.appendChild(toast);
            
            // 显示 toast
            setTimeout(() => {
                toast.classList.add('show');
            }, 10);
            
            // 3秒后移除 toast
            setTimeout(() => {
                toast.classList.remove('show');
                setTimeout(() => {
                    document.body.removeChild(toast);
                }, 300);
            }, 3000);
        },
        
        /**
         * 检查登录状态
         * 如果已经登录，直接跳转到首页
         */
        checkLoginStatus() {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
            
            // 如果已登录而且不是游客，直接跳转
            if (isLoggedIn && !userInfo.isVisitor) {
                window.location.href = this.redirectUrl;
            }
        },
        
        /**
         * 从URL获取重定向地址
         */
        getRedirectUrlFromQuery() {
            const urlParams = new URLSearchParams(window.location.search);
            const redirect = urlParams.get('redirect');
            if (redirect) {
                this.redirectUrl = redirect;
            }
        }
    },
    
    mounted() {
        // 添加全局样式
        const style = document.createElement('style');
        style.textContent = `
            .toast {
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%) translateY(-20px);
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px 20px;
                border-radius: 4px;
                font-size: 14px;
                opacity: 0;
                transition: opacity 0.3s, transform 0.3s;
                z-index: 9999;
            }
            
            .toast.show {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        `;
        document.head.appendChild(style);
        
        // 获取重定向地址
        this.getRedirectUrlFromQuery();
        
        // 检查登录状态
        this.checkLoginStatus();
    },
    
    beforeUnmount() {
        // 清理计时器
        this.stopCooldown();
    }
}).mount('#app') 