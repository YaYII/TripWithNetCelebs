/**
 * 网红编辑页面JavaScript功能
 * @description 处理网红信息的加载、编辑和保存功能
 */

// 当DOM加载完成后初始化Vue应用
document.addEventListener('DOMContentLoaded', function() {
    new Vue({
        el: '#app',
        data: {
            // 是否处于加载状态
            loading: true,
            // 是否发生错误
            error: false,
            errorMessage: '',
            // 当前活动的表单选项卡
            activeTab: 'basic',
            // 网红ID (从URL获取)
            influencerId: null,
            // 网红详细信息
            influencer: {
                basicInfo: {
                    nickname: '',
                    realName: '',
                    gender: '女',
                    birthdate: '',
                    phone: '',
                    email: '',
                    country: '中国',
                    city: '',
                    bio: '',
                    avatarUrl: '/产品交互效果图/houtai/img/avatar-placeholder.jpg',
                    tags: []
                },
                platforms: [
                    {
                        id: 1,
                        type: '抖音',
                        accountName: '',
                        accountId: '',
                        followerCount: 0,
                        contentType: ['旅游', '美食'],
                        link: '',
                        verified: false
                    }
                ],
                verification: {
                    status: 'pending',
                    idCardNumber: '',
                    idCardFront: '',
                    idCardBack: '',
                    rejectionReason: '',
                    lastUpdated: ''
                },
                account: {
                    username: '',
                    password: '',
                    newPassword: '',
                    confirmPassword: '',
                    lastLogin: '',
                    registerDate: '',
                    accountStatus: 'active'
                }
            },
            // 表单提交状态
            submitting: false,
            submitSuccess: false,
            submitError: false,
            submitMessage: '',
            // 标签输入
            newTag: '',
            // 确认对话框
            showConfirmDialog: false,
            confirmAction: null,
            confirmMessage: '',
            confirmTitle: '',
            // 可用的内容类型选项
            contentTypes: ['旅游', '美食', '时尚', '生活方式', '户外', '摄影', '文化', '冒险'],
            // 可用的平台类型
            platformTypes: ['抖音', '小红书', '微博', '快手', 'B站', '微信公众号', '知乎', '其他']
        },
        // 在组件创建时执行
        created() {
            // 从URL获取网红ID
            const urlParams = new URLSearchParams(window.location.search);
            this.influencerId = urlParams.get('id');
            
            if (!this.influencerId) {
                this.error = true;
                this.errorMessage = '未找到网红ID，请检查URL参数';
                this.loading = false;
                return;
            }
            
            // 获取网红数据
            this.fetchInfluencerData();
        },
        methods: {
            /**
             * 获取网红数据
             * @description 模拟API调用获取网红详细信息
             */
            fetchInfluencerData() {
                this.loading = true;
                
                // 模拟API请求延迟
                setTimeout(() => {
                    // 这里是模拟数据，实际应用中应该从API获取
                    if (this.influencerId === '12345') {
                        this.influencer = {
                            basicInfo: {
                                nickname: '旅行小妹',
                                realName: '王小美',
                                gender: '女',
                                birthdate: '1995-08-15',
                                phone: '13812345678',
                                email: 'travel@example.com',
                                country: '中国',
                                city: '上海',
                                bio: '热爱旅行，分享城市探索和自然风光的美好。擅长拍摄城市建筑和自然风光，希望带领大家看见世界的美好。',
                                avatarUrl: '/产品交互效果图/houtai/img/avatar1.jpg',
                                tags: ['旅行达人', '美食推荐', '城市探索']
                            },
                            platforms: [
                                {
                                    id: 1,
                                    type: '抖音',
                                    accountName: '旅行小妹',
                                    accountId: 'travel123',
                                    followerCount: 1250000,
                                    contentType: ['旅游', '美食'],
                                    link: 'https://douyin.com/user/travel123',
                                    verified: true
                                },
                                {
                                    id: 2,
                                    type: '小红书',
                                    accountName: '旅行小妹',
                                    accountId: 'xiaomei_travel',
                                    followerCount: 850000,
                                    contentType: ['旅游', '生活方式'],
                                    link: 'https://xiaohongshu.com/user/xiaomei_travel',
                                    verified: true
                                }
                            ],
                            verification: {
                                status: 'active',
                                idCardNumber: '310********1234',
                                idCardFront: '/产品交互效果图/houtai/img/id-front-placeholder.jpg',
                                idCardBack: '/产品交互效果图/houtai/img/id-back-placeholder.jpg',
                                rejectionReason: '',
                                lastUpdated: '2023-05-10 14:30:22'
                            },
                            account: {
                                username: 'travel_xiaomei',
                                password: '********',
                                lastLogin: '2023-08-20 09:15:33',
                                registerDate: '2023-05-10 14:30:22',
                                accountStatus: 'active'
                            }
                        };
                        this.loading = false;
                    } else {
                        // 处理找不到网红的情况
                        this.error = true;
                        this.errorMessage = '未找到ID为 ' + this.influencerId + ' 的网红信息';
                        this.loading = false;
                    }
                }, 1000);
            },
            
            /**
             * 切换活动选项卡
             * @param {string} tab - 要激活的选项卡ID
             */
            setActiveTab(tab) {
                this.activeTab = tab;
            },
            
            /**
             * 添加新标签
             * @description 将新标签添加到网红的标签列表中
             */
            addTag() {
                if (this.newTag && this.newTag.trim() !== '') {
                    // 检查标签是否已存在
                    if (!this.influencer.basicInfo.tags.includes(this.newTag.trim())) {
                        this.influencer.basicInfo.tags.push(this.newTag.trim());
                    }
                    this.newTag = '';
                }
            },
            
            /**
             * 删除标签
             * @param {number} index - 要删除的标签索引
             */
            removeTag(index) {
                this.influencer.basicInfo.tags.splice(index, 1);
            },
            
            /**
             * 添加新平台账号
             * @description 添加一个新的平台账号到网红的平台列表中
             */
            addPlatform() {
                const newId = this.influencer.platforms.length > 0 
                    ? Math.max(...this.influencer.platforms.map(p => p.id)) + 1 
                    : 1;
                
                this.influencer.platforms.push({
                    id: newId,
                    type: '抖音',
                    accountName: '',
                    accountId: '',
                    followerCount: 0,
                    contentType: [],
                    link: '',
                    verified: false
                });
            },
            
            /**
             * 删除平台账号
             * @param {number} index - 要删除的平台索引
             */
            removePlatform(index) {
                this.confirmAction = () => {
                    this.influencer.platforms.splice(index, 1);
                    this.showConfirmDialog = false;
                };
                this.confirmTitle = '确认删除平台';
                this.confirmMessage = '您确定要删除这个平台账号吗？此操作无法撤销。';
                this.showConfirmDialog = true;
            },
            
            /**
             * 切换内容类型选择
             * @param {string} type - 内容类型
             * @param {number} platformIndex - 平台索引
             */
            toggleContentType(type, platformIndex) {
                const platform = this.influencer.platforms[platformIndex];
                const index = platform.contentType.indexOf(type);
                
                if (index === -1) {
                    platform.contentType.push(type);
                } else {
                    platform.contentType.splice(index, 1);
                }
            },
            
            /**
             * 检查内容类型是否已选择
             * @param {string} type - 内容类型
             * @param {number} platformIndex - 平台索引
             * @returns {boolean} - 是否已选择
             */
            isContentTypeSelected(type, platformIndex) {
                return this.influencer.platforms[platformIndex].contentType.includes(type);
            },
            
            /**
             * 上传头像
             * @description 处理头像上传逻辑
             */
            uploadAvatar() {
                // 这里应该是实际的文件上传逻辑
                // 模拟上传成功
                alert('头像上传功能需要接入后端API');
            },
            
            /**
             * 上传身份证照片
             * @param {string} side - 'front'或'back'，表示身份证正面或反面
             */
            uploadIdCard(side) {
                // 这里应该是实际的文件上传逻辑
                // 模拟上传成功
                alert('身份证照片上传功能需要接入后端API');
            },
            
            /**
             * 保存网红信息
             * @description 将编辑后的网红信息保存到服务器
             */
            saveInfluencer() {
                // 基本验证
                if (!this.influencer.basicInfo.nickname) {
                    alert('请输入网红昵称');
                    this.activeTab = 'basic';
                    return;
                }
                
                if (!this.influencer.basicInfo.phone && !this.influencer.basicInfo.email) {
                    alert('请至少提供手机号或电子邮箱中的一项');
                    this.activeTab = 'basic';
                    return;
                }
                
                // 密码验证
                if (this.influencer.account.newPassword) {
                    if (this.influencer.account.newPassword !== this.influencer.account.confirmPassword) {
                        alert('两次输入的新密码不一致');
                        this.activeTab = 'account';
                        return;
                    }
                }
                
                this.submitting = true;
                this.submitSuccess = false;
                this.submitError = false;
                
                // 模拟API请求
                setTimeout(() => {
                    // 模拟成功保存
                    this.submitting = false;
                    this.submitSuccess = true;
                    this.submitMessage = '网红信息已成功保存';
                    
                    // 5秒后自动清除成功消息
                    setTimeout(() => {
                        this.submitSuccess = false;
                    }, 5000);
                }, 1500);
            },
            
            /**
             * 批准网红认证
             */
            approveVerification() {
                this.confirmAction = () => {
                    this.influencer.verification.status = 'active';
                    this.influencer.verification.lastUpdated = this.getCurrentDateTime();
                    this.showConfirmDialog = false;
                    
                    // 显示成功消息
                    this.submitSuccess = true;
                    this.submitMessage = '已成功批准网红认证';
                    
                    // 5秒后自动清除成功消息
                    setTimeout(() => {
                        this.submitSuccess = false;
                    }, 5000);
                };
                this.confirmTitle = '确认批准认证';
                this.confirmMessage = '您确定要批准此网红的认证申请吗？';
                this.showConfirmDialog = true;
            },
            
            /**
             * 拒绝网红认证
             */
            rejectVerification() {
                // 这里应该有一个表单让管理员输入拒绝原因
                const reason = prompt('请输入拒绝原因：');
                if (reason) {
                    this.influencer.verification.status = 'rejected';
                    this.influencer.verification.rejectionReason = reason;
                    this.influencer.verification.lastUpdated = this.getCurrentDateTime();
                    
                    // 显示成功消息
                    this.submitSuccess = true;
                    this.submitMessage = '已拒绝网红认证申请';
                    
                    // 5秒后自动清除成功消息
                    setTimeout(() => {
                        this.submitSuccess = false;
                    }, 5000);
                }
            },
            
            /**
             * 封禁账号
             */
            blockAccount() {
                this.confirmAction = () => {
                    this.influencer.account.accountStatus = 'blocked';
                    this.showConfirmDialog = false;
                    
                    // 显示成功消息
                    this.submitSuccess = true;
                    this.submitMessage = '账号已被封禁';
                    
                    // 5秒后自动清除成功消息
                    setTimeout(() => {
                        this.submitSuccess = false;
                    }, 5000);
                };
                this.confirmTitle = '确认封禁账号';
                this.confirmMessage = '您确定要封禁此网红账号吗？封禁后用户将无法登录系统。';
                this.showConfirmDialog = true;
            },
            
            /**
             * 解封账号
             */
            unblockAccount() {
                this.influencer.account.accountStatus = 'active';
                
                // 显示成功消息
                this.submitSuccess = true;
                this.submitMessage = '账号已被解封';
                
                // 5秒后自动清除成功消息
                setTimeout(() => {
                    this.submitSuccess = false;
                }, 5000);
            },
            
            /**
             * 删除账号
             */
            deleteAccount() {
                this.confirmAction = () => {
                    // 这里应该是实际的删除逻辑
                    // 模拟删除成功后返回列表页
                    this.showConfirmDialog = false;
                    alert('账号已删除，即将返回列表页');
                    window.location.href = 'influencer-list.html';
                };
                this.confirmTitle = '确认删除账号';
                this.confirmMessage = '您确定要永久删除此网红账号吗？此操作无法撤销，所有相关数据将被永久删除。';
                this.showConfirmDialog = true;
            },
            
            /**
             * 取消确认对话框
             */
            cancelConfirm() {
                this.showConfirmDialog = false;
                this.confirmAction = null;
            },
            
            /**
             * 执行确认的操作
             */
            confirmOk() {
                if (typeof this.confirmAction === 'function') {
                    this.confirmAction();
                }
            },
            
            /**
             * 获取当前日期时间字符串
             * @returns {string} - 格式化的日期时间字符串
             */
            getCurrentDateTime() {
                const now = new Date();
                return now.getFullYear() + '-' + 
                       String(now.getMonth() + 1).padStart(2, '0') + '-' + 
                       String(now.getDate()).padStart(2, '0') + ' ' + 
                       String(now.getHours()).padStart(2, '0') + ':' + 
                       String(now.getMinutes()).padStart(2, '0') + ':' + 
                       String(now.getSeconds()).padStart(2, '0');
            },
            
            /**
             * 返回列表页
             */
            goBackToList() {
                window.location.href = 'influencer-list.html';
            }
        }
    });
}); 