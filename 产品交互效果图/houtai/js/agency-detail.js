/**
 * 旅行社详情页JavaScript功能
 * @description 处理旅行社详情页的数据加载和交互功能
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
            // 旅行社ID (从URL获取)
            agencyId: null,
            // 旅行社详细信息
            agency: {
                id: '',
                name: '',
                fullName: '',
                logoUrl: '',
                contactPerson: '',
                contactPhone: '',
                businessLicense: '',
                region: '',
                address: '',
                email: '',
                website: '',
                establishDate: '',
                description: '',
                status: 'active',
                licenseImageUrl: '',
                permitImageUrl: '',
                verificationHistory: [],
                trips: [],
                influencers: [],
                accountHistory: []
            },
            // 图片查看模态框
            showImageModal: false,
            currentImage: '',
            // 确认对话框
            showConfirmDialog: false,
            confirmTitle: '',
            confirmMessage: '',
            confirmWarning: '',
            confirmButtonClass: 'btn-primary',
            confirmAction: null
        },
        // 在组件创建时执行
        created() {
            // 从URL获取旅行社ID
            const urlParams = new URLSearchParams(window.location.search);
            this.agencyId = urlParams.get('id');
            
            if (!this.agencyId) {
                this.error = true;
                this.errorMessage = '未找到旅行社ID，请检查URL参数';
                this.loading = false;
                return;
            }
            
            // 获取旅行社数据
            this.fetchAgencyData();
        },
        methods: {
            /**
             * 获取旅行社数据
             * @description 模拟API调用获取旅行社详细信息
             */
            fetchAgencyData() {
                this.loading = true;
                this.error = false;
                
                // 模拟API请求延迟
                setTimeout(() => {
                    // 这里是模拟数据，实际应用中应该从API获取
                    if (this.agencyId === '1001') {
                        this.agency = {
                            id: '1001',
                            name: '星途旅行',
                            fullName: '北京星途国际旅行社有限公司',
                            logoUrl: '/产品交互效果图/houtai/img/agency-logo1.jpg',
                            contactPerson: '张经理',
                            contactPhone: '010-88889999',
                            businessLicense: '91110108MA01CXP28X',
                            region: '北京市朝阳区',
                            address: '北京市朝阳区建国路88号现代城7层701室',
                            email: 'contact@startour.com',
                            website: 'https://www.startour.com',
                            establishDate: '2015-06-18',
                            description: '星途旅行是一家专注于高品质定制旅行的旅行社，拥有丰富的国内外旅游资源和专业的旅行顾问团队。致力于为客户提供个性化、深度的旅行体验，业务范围覆盖国内外各大旅游目的地。\n\n公司核心服务包括：\n1. 网红打卡地定制行程\n2. 摄影主题旅行\n3. 文化体验之旅\n4. 户外探险活动',
                            status: 'active',
                            licenseImageUrl: '/产品交互效果图/houtai/img/license-sample.jpg',
                            permitImageUrl: '/产品交互效果图/houtai/img/permit-sample.jpg',
                            verificationHistory: [
                                {
                                    date: '2023-04-10 10:15:22',
                                    status: 'pending',
                                    description: '提交认证申请，上传营业执照和旅行社业务经营许可证'
                                },
                                {
                                    date: '2023-04-12 14:20:36',
                                    status: 'active',
                                    description: '认证审核通过',
                                    operator: '系统管理员'
                                }
                            ],
                            trips: [
                                {
                                    id: '2001',
                                    title: '云南大理洱海网红民宿3日摄影行程',
                                    coverImageUrl: '/产品交互效果图/houtai/img/trip-cover1.jpg',
                                    destination: '云南大理',
                                    duration: '3天2晚',
                                    participantsCount: 5,
                                    status: 'active'
                                },
                                {
                                    id: '2002',
                                    title: '厦门鼓浪屿文艺小清新一日游',
                                    coverImageUrl: '/产品交互效果图/houtai/img/trip-cover2.jpg',
                                    destination: '福建厦门',
                                    duration: '1天',
                                    participantsCount: 3,
                                    status: 'completed'
                                },
                                {
                                    id: '2003',
                                    title: '青海湖星空露营摄影2日游',
                                    coverImageUrl: '/产品交互效果图/houtai/img/trip-cover3.jpg',
                                    destination: '青海湖',
                                    duration: '2天1晚',
                                    participantsCount: 2,
                                    status: 'pending'
                                }
                            ],
                            influencers: [
                                {
                                    id: '12345',
                                    nickname: '旅行小妹',
                                    avatarUrl: '/产品交互效果图/houtai/img/avatar1.jpg',
                                    platforms: ['douyin', 'xiaohongshu'],
                                    tripsCount: 3,
                                    followerCount: '125万'
                                },
                                {
                                    id: '12346',
                                    nickname: '摄影师阿文',
                                    avatarUrl: '/产品交互效果图/houtai/img/avatar2.jpg',
                                    platforms: ['xiaohongshu', 'weibo'],
                                    tripsCount: 2,
                                    followerCount: '89万'
                                },
                                {
                                    id: '12347',
                                    nickname: '户外探险家',
                                    avatarUrl: '/产品交互效果图/houtai/img/avatar3.jpg',
                                    platforms: ['bilibili', 'douyin'],
                                    tripsCount: 1,
                                    followerCount: '76万'
                                }
                            ],
                            accountHistory: [
                                {
                                    date: '2023-04-10 09:30:15',
                                    type: 'create',
                                    description: '创建账户'
                                },
                                {
                                    date: '2023-04-12 14:20:36',
                                    type: 'edit',
                                    description: '完善公司信息'
                                },
                                {
                                    date: '2023-04-15 10:05:45',
                                    type: 'login',
                                    description: '账户登录'
                                },
                                {
                                    date: '2023-04-18 16:18:22',
                                    type: 'edit',
                                    description: '更新公司简介'
                                }
                            ]
                        };
                        this.loading = false;
                    } else {
                        // 处理找不到旅行社的情况
                        this.error = true;
                        this.errorMessage = '未找到ID为 ' + this.agencyId + ' 的旅行社信息';
                        this.loading = false;
                    }
                }, 1000);
            },
            
            /**
             * 查看大图
             * @param {string} imageUrl - 图片URL
             */
            viewImage(imageUrl) {
                this.currentImage = imageUrl;
                this.showImageModal = true;
            },
            
            /**
             * 关闭图片查看模态框
             */
            closeImageModal() {
                this.showImageModal = false;
                this.currentImage = '';
            },
            
            /**
             * 批准旅行社认证
             */
            approveAgency() {
                this.confirmTitle = '确认批准认证';
                this.confirmMessage = '您确定要批准该旅行社的认证申请吗？';
                this.confirmButtonClass = 'btn-success';
                this.confirmAction = this.doApproveAgency;
                this.showConfirmDialog = true;
            },
            
            /**
             * 执行批准旅行社认证操作
             */
            doApproveAgency() {
                // 更新状态
                this.agency.status = 'active';
                
                // 添加认证历史记录
                this.agency.verificationHistory.unshift({
                    date: this.getCurrentDateTime(),
                    status: 'active',
                    description: '认证审核通过',
                    operator: '系统管理员'
                });
                
                // 关闭对话框
                this.showConfirmDialog = false;
                
                // 显示成功消息
                alert('已成功批准旅行社认证');
            },
            
            /**
             * 拒绝旅行社认证
             */
            rejectAgency() {
                this.confirmTitle = '确认拒绝认证';
                this.confirmMessage = '您确定要拒绝该旅行社的认证申请吗？';
                this.confirmWarning = '请在备注中说明拒绝原因，以便旅行社了解问题并进行修正。';
                this.confirmButtonClass = 'btn-danger';
                this.confirmAction = this.doRejectAgency;
                this.showConfirmDialog = true;
            },
            
            /**
             * 执行拒绝旅行社认证操作
             */
            doRejectAgency() {
                // 弹出提示框获取拒绝原因
                const reason = prompt('请输入拒绝原因：');
                if (!reason) return;
                
                // 更新状态
                this.agency.status = 'rejected';
                
                // 添加认证历史记录
                this.agency.verificationHistory.unshift({
                    date: this.getCurrentDateTime(),
                    status: 'rejected',
                    description: '认证被拒绝，原因：' + reason,
                    operator: '系统管理员'
                });
                
                // 关闭对话框
                this.showConfirmDialog = false;
                
                // 显示成功消息
                alert('已拒绝旅行社认证申请');
            },
            
            /**
             * 重新审核旅行社认证
             */
            reopenVerification() {
                this.confirmTitle = '确认重新审核';
                this.confirmMessage = '您确定要重新审核该旅行社的认证申请吗？';
                this.confirmButtonClass = 'btn-primary';
                this.confirmAction = this.doReopenVerification;
                this.showConfirmDialog = true;
            },
            
            /**
             * 执行重新审核旅行社认证操作
             */
            doReopenVerification() {
                // 更新状态
                this.agency.status = 'pending';
                
                // 添加认证历史记录
                this.agency.verificationHistory.unshift({
                    date: this.getCurrentDateTime(),
                    status: 'pending',
                    description: '重新开启认证审核流程',
                    operator: '系统管理员'
                });
                
                // 关闭对话框
                this.showConfirmDialog = false;
                
                // 显示成功消息
                alert('已重新开启认证审核流程');
            },
            
            /**
             * 封禁旅行社
             */
            blockAgency() {
                this.confirmTitle = '确认封禁旅行社';
                this.confirmMessage = '您确定要封禁该旅行社吗？封禁后，该旅行社将无法登录平台或发布新行程。';
                this.confirmWarning = '此操作会影响该旅行社的所有活动，请谨慎操作。';
                this.confirmButtonClass = 'btn-warning';
                this.confirmAction = this.doBlockAgency;
                this.showConfirmDialog = true;
            },
            
            /**
             * 执行封禁旅行社操作
             */
            doBlockAgency() {
                // 弹出提示框获取封禁原因
                const reason = prompt('请输入封禁原因：');
                if (!reason) return;
                
                // 更新状态
                this.agency.status = 'blocked';
                
                // 添加认证历史记录
                this.agency.verificationHistory.unshift({
                    date: this.getCurrentDateTime(),
                    status: 'blocked',
                    description: '账户被封禁，原因：' + reason,
                    operator: '系统管理员'
                });
                
                // 添加账户历史记录
                this.agency.accountHistory.unshift({
                    date: this.getCurrentDateTime(),
                    type: 'edit',
                    description: '账户被封禁，原因：' + reason
                });
                
                // 关闭对话框
                this.showConfirmDialog = false;
                
                // 显示成功消息
                alert('已成功封禁旅行社账户');
            },
            
            /**
             * 解除封禁旅行社
             */
            unblockAgency() {
                this.confirmTitle = '确认解除封禁';
                this.confirmMessage = '您确定要解除该旅行社的封禁状态吗？';
                this.confirmButtonClass = 'btn-success';
                this.confirmAction = this.doUnblockAgency;
                this.showConfirmDialog = true;
            },
            
            /**
             * 执行解除封禁旅行社操作
             */
            doUnblockAgency() {
                // 更新状态
                this.agency.status = 'active';
                
                // 添加认证历史记录
                this.agency.verificationHistory.unshift({
                    date: this.getCurrentDateTime(),
                    status: 'active',
                    description: '账户封禁状态被解除',
                    operator: '系统管理员'
                });
                
                // 添加账户历史记录
                this.agency.accountHistory.unshift({
                    date: this.getCurrentDateTime(),
                    type: 'edit',
                    description: '账户封禁状态被解除'
                });
                
                // 关闭对话框
                this.showConfirmDialog = false;
                
                // 显示成功消息
                alert('已成功解除旅行社账户封禁');
            },
            
            /**
             * 删除旅行社账户
             */
            deleteAgency() {
                this.confirmTitle = '确认删除旅行社账户';
                this.confirmMessage = '您确定要删除该旅行社账户吗？此操作不可撤销。';
                this.confirmWarning = '删除后，该旅行社的所有数据将被永久移除，包括行程信息和合作记录。';
                this.confirmButtonClass = 'btn-danger';
                this.confirmAction = this.doDeleteAgency;
                this.showConfirmDialog = true;
            },
            
            /**
             * 执行删除旅行社账户操作
             */
            doDeleteAgency() {
                // 弹出提示框获取删除确认
                const confirmation = prompt('请输入"DELETE"确认删除操作：');
                if (confirmation !== 'DELETE') {
                    alert('确认文本不匹配，操作已取消');
                    return;
                }
                
                // 关闭对话框
                this.showConfirmDialog = false;
                
                // 显示成功消息并跳转
                alert('旅行社账户已成功删除，即将返回列表页');
                window.location.href = 'agency-list.html';
            },
            
            /**
             * 取消确认对话框
             */
            cancelConfirm() {
                this.showConfirmDialog = false;
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
             * 获取状态文本
             * @param {string} status - 状态值
             * @returns {string} - 状态的中文文本
             */
            getStatusText(status) {
                const statusMap = {
                    'active': '已认证',
                    'pending': '审核中',
                    'rejected': '已拒绝',
                    'blocked': '已封禁'
                };
                return statusMap[status] || status;
            },
            
            /**
             * 获取行程状态文本
             * @param {string} status - 行程状态值
             * @returns {string} - 行程状态的中文文本
             */
            getTripStatusText(status) {
                const statusMap = {
                    'active': '进行中',
                    'pending': '待审核',
                    'completed': '已完成',
                    'cancelled': '已取消'
                };
                return statusMap[status] || status;
            },
            
            /**
             * 获取平台图标类名
             * @param {string} platform - 平台名称
             * @returns {string} - 平台图标的Font Awesome类名
             */
            getPlatformIcon(platform) {
                const iconMap = {
                    'douyin': 'fab fa-tiktok',
                    'xiaohongshu': 'fas fa-book',
                    'weibo': 'fab fa-weibo',
                    'kuaishou': 'fas fa-video',
                    'bilibili': 'fas fa-play-circle'
                };
                return iconMap[platform] || 'fas fa-globe';
            },
            
            /**
             * 获取事件图标类名
             * @param {string} type - 事件类型
             * @returns {string} - 事件图标的Font Awesome类名
             */
            getEventIcon(type) {
                const iconMap = {
                    'login': 'fas fa-sign-in-alt',
                    'create': 'fas fa-plus',
                    'edit': 'fas fa-edit',
                    'delete': 'fas fa-trash-alt'
                };
                return iconMap[type] || 'fas fa-info-circle';
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
            }
        }
    });
}); 