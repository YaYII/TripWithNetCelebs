/**
 * 网红详情页JavaScript
 * @description 处理网红详情页的数据加载和展示
 */

const { createApp } = Vue;

createApp({
    data() {
        return {
            influencerId: null,
            influencer: null,
            loading: true,
            error: null
        }
    },
    
    methods: {
        /**
         * 获取URL参数
         * @returns {Object} URL参数对象
         */
        getUrlParams() {
            const params = {};
            const queryString = window.location.search.slice(1);
            
            if (queryString) {
                const pairs = queryString.split('&');
                pairs.forEach(pair => {
                    const [key, value] = pair.split('=');
                    params[key] = decodeURIComponent(value || '');
                });
            }
            
            return params;
        },
        
        /**
         * 加载网红数据
         */
        async loadInfluencer() {
            this.loading = true;
            this.error = null;
            
            try {
                // 获取URL中的ID参数
                const params = this.getUrlParams();
                this.influencerId = params.id;
                
                if (!this.influencerId) {
                    throw new Error('未指定网红ID');
                }
                
                // 模拟API请求
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // 模拟网红详情数据
                this.influencer = {
                    id: this.influencerId,
                    nickname: '旅行小达人',
                    realName: '张小红',
                    avatar: '../images/avatar1.jpg',
                    phone: '13912345678',
                    email: 'xiaohong@example.com',
                    birthdate: '1995-05-15',
                    gender: 'female',
                    location: '广东省广州市',
                    status: 'active',
                    tags: ['旅游', '美食', '自然风光', '酒店测评', '亲子游'],
                    
                    // 平台信息
                    platforms: [
                        {
                            type: 'tiktok',
                            account: '旅行小达人',
                            fansCount: 850000,
                            postsCount: 342,
                            contentType: '旅游视频、酒店评测',
                            link: 'https://www.douyin.com/user/travel123'
                        },
                        {
                            type: 'xiaohongshu',
                            account: '张小红的旅行日记',
                            fansCount: 320000,
                            postsCount: 215,
                            contentType: '旅游笔记、美食推荐',
                            link: 'https://www.xiaohongshu.com/user/travel123'
                        }
                    ],
                    
                    // 行程记录
                    trips: [
                        {
                            id: '101',
                            title: '珠海长隆海洋王国亲子2日游',
                            destination: '珠海',
                            startDate: '2024-05-10',
                            status: 'completed'
                        },
                        {
                            id: '102',
                            title: '广州长隆欢乐世界2日游',
                            destination: '广州',
                            startDate: '2024-06-15',
                            status: 'active'
                        },
                        {
                            id: '103',
                            title: '深圳欢乐谷一日游',
                            destination: '深圳',
                            startDate: '2024-07-20',
                            status: 'pending'
                        }
                    ],
                    
                    // 内容表现
                    performance: {
                        totalPosts: 557,
                        avgLikes: 12500,
                        avgComments: 350,
                        engagementRate: 3.5,
                        topContents: [
                            {
                                title: '珠海长隆探秘攻略，带娃必看！',
                                platform: 'tiktok',
                                thumbnail: '../images/content1.jpg',
                                likes: 85600,
                                comments: 1230,
                                shares: 5670,
                                link: 'https://www.douyin.com/video/7178293912'
                            },
                            {
                                title: '探秘广州长隆熊猫馆，超近距离接触！',
                                platform: 'xiaohongshu',
                                thumbnail: '../images/content2.jpg',
                                likes: 32100,
                                comments: 870,
                                shares: 1400,
                                link: 'https://www.xiaohongshu.com/notes/7178293913'
                            }
                        ]
                    },
                    
                    // 审核记录
                    verificationRecords: [
                        {
                            date: '2024-01-15 10:23',
                            action: 'register',
                            remark: '用户注册并提交审核',
                            operator: '系统'
                        },
                        {
                            date: '2024-01-16 14:35',
                            action: 'verified',
                            remark: '资料审核通过，证件信息符合要求',
                            operator: '李管理'
                        },
                        {
                            date: '2024-03-22 09:45',
                            action: 'update',
                            remark: '用户更新了个人信息和平台账号',
                            operator: '系统'
                        }
                    ]
                };
                
            } catch (error) {
                console.error('加载网红数据出错:', error);
                this.error = error.message || '加载网红数据失败，请刷新页面重试';
            } finally {
                this.loading = false;
            }
        },
        
        /**
         * 获取状态文本
         * @param {string} status - 状态代码
         * @returns {string} 状态文本
         */
        getStatusText(status) {
            switch(status) {
                case 'active':
                    return '已认证';
                case 'pending':
                    return '待审核';
                case 'rejected':
                    return '未通过';
                case 'blocked':
                    return '已封禁';
                default:
                    return '未知状态';
            }
        },
        
        /**
         * 获取行程状态文本
         * @param {string} status - 状态代码
         * @returns {string} 状态文本
         */
        getTripStatusText(status) {
            switch(status) {
                case 'active':
                    return '进行中';
                case 'pending':
                    return '未开始';
                case 'completed':
                    return '已结束';
                case 'canceled':
                    return '已取消';
                default:
                    return '未知状态';
            }
        },
        
        /**
         * 获取平台图标
         * @param {string} platform - 平台类型
         * @returns {string} 图标类名
         */
        getPlatformIcon(platform) {
            switch(platform) {
                case 'tiktok':
                    return 'fab fa-tiktok';
                case 'kuaishou':
                    return 'fas fa-play-circle';
                case 'xiaohongshu':
                    return 'fas fa-book';
                case 'bilibili':
                    return 'fas fa-tv';
                case 'weibo':
                    return 'fab fa-weibo';
                default:
                    return 'fas fa-link';
            }
        },
        
        /**
         * 获取平台名称
         * @param {string} platform - 平台类型
         * @returns {string} 平台名称
         */
        getPlatformName(platform) {
            switch(platform) {
                case 'tiktok':
                    return '抖音';
                case 'kuaishou':
                    return '快手';
                case 'xiaohongshu':
                    return '小红书';
                case 'bilibili':
                    return 'B站';
                case 'weibo':
                    return '微博';
                default:
                    return '其他平台';
            }
        },
        
        /**
         * 获取操作文本
         * @param {string} action - 操作类型
         * @returns {string} 操作文本
         */
        getActionText(action) {
            switch(action) {
                case 'register':
                    return '注册申请';
                case 'verified':
                    return '审核通过';
                case 'rejected':
                    return '审核拒绝';
                case 'blocked':
                    return '账号封禁';
                case 'unblocked':
                    return '解除封禁';
                case 'update':
                    return '信息更新';
                default:
                    return '未知操作';
            }
        },
        
        /**
         * 格式化数字（大于1万的显示为x.x万）
         * @param {number} num - 要格式化的数字
         * @returns {string} 格式化后的字符串
         */
        formatNumber(num) {
            if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万';
            }
            return num.toString();
        }
    },
    
    mounted() {
        // 页面加载时获取网红数据
        this.loadInfluencer();
    }
}).mount('#app'); 