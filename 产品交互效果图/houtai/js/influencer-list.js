/**
 * 网红管理列表页JavaScript
 * @description 处理网红列表数据加载、筛选、搜索和操作
 */

new Vue({
    el: '#app',
    data: {
        // 筛选条件
        filters: {
            status: 'all',
            fansCount: 'all',
            platform: 'all',
            contentType: 'all'
        },
        searchTerm: '',
        
        // 数据状态
        influencers: [],
        loading: true,
        error: null,
        
        // 分页
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        pageSize: 10
    },
    
    computed: {
        /**
         * 计算当前页面显示的开始和结束项
         * @returns {Object} 包含开始和结束项的对象
         */
        pageInfo() {
            const start = (this.currentPage - 1) * this.pageSize + 1;
            const end = Math.min(start + this.pageSize - 1, this.totalItems);
            return { start, end };
        },
        
        /**
         * 判断是否可以点击上一页按钮
         * @returns {Boolean} 是否可以点击上一页
         */
        hasPrevPage() {
            return this.currentPage > 1;
        },
        
        /**
         * 判断是否可以点击下一页按钮
         * @returns {Boolean} 是否可以点击下一页
         */
        hasNextPage() {
            return this.currentPage < this.totalPages;
        },
        
        /**
         * 根据筛选条件过滤网红列表
         * @returns {Array} 过滤后的网红列表
         */
        filteredInfluencers() {
            return this.influencers;
        }
    },
    
    methods: {
        /**
         * 获取网红状态对应的文本
         * @param {String} status 状态值
         * @returns {String} 状态文本
         */
        getStatusText(status) {
            const statusMap = {
                'active': '已认证',
                'pending': '待认证',
                'rejected': '已拒绝',
                'blocked': '已封禁'
            };
            return statusMap[status] || status;
        },
        
        /**
         * 格式化粉丝数量，超过10000显示为"x万"
         * @param {Number} count 粉丝数量
         * @returns {String} 格式化后的粉丝数量
         */
        formatFansCount(count) {
            if (count >= 10000) {
                return (count / 10000).toFixed(1) + '万';
            }
            return count.toString();
        },
        
        /**
         * 获取平台图标类名
         * @param {String} platform 平台名称
         * @returns {String} 平台图标类名
         */
        getPlatformIcon(platform) {
            const iconMap = {
                'douyin': 'ri-tiktok-line',
                'kuaishou': 'ri-video-line',
                'xiaohongshu': 'ri-book-open-line',
                'bilibili': 'ri-bilibili-line',
                'weibo': 'ri-weibo-line'
            };
            return iconMap[platform] || 'ri-link';
        },
        
        /**
         * 获取平台名称
         * @param {String} platform 平台代码
         * @returns {String} 平台中文名称
         */
        getPlatformName(platform) {
            const nameMap = {
                'douyin': '抖音',
                'kuaishou': '快手',
                'xiaohongshu': '小红书',
                'bilibili': '哔哩哔哩',
                'weibo': '微博'
            };
            return nameMap[platform] || platform;
        },
        
        /**
         * 加载网红列表数据
         * @returns {Promise} 加载完成的Promise
         */
        async loadInfluencers() {
            this.loading = true;
            this.error = null;
            
            try {
                // 模拟API请求
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // 构建请求参数
                const params = {
                    page: this.currentPage,
                    pageSize: this.pageSize,
                    ...this.filters
                };
                
                if (this.searchTerm) {
                    params.search = this.searchTerm;
                }
                
                // 模拟响应数据
                const response = this.mockAPIResponse(params);
                
                this.influencers = response.items;
                this.totalPages = response.totalPages;
                this.totalItems = response.totalItems;
                
                // 确保当前页不超过总页数
                if (this.currentPage > this.totalPages && this.totalPages > 0) {
                    this.currentPage = this.totalPages;
                    await this.loadInfluencers();
                }
            } catch (err) {
                console.error('加载网红列表失败', err);
                this.error = '加载数据失败，请稍后重试';
            } finally {
                this.loading = false;
            }
        },
        
        /**
         * 模拟API响应数据
         * @param {Object} params 请求参数
         * @returns {Object} 模拟的响应数据
         */
        mockAPIResponse(params) {
            // 生成模拟数据
            const mockData = [];
            const platforms = ['douyin', 'kuaishou', 'xiaohongshu', 'bilibili', 'weibo'];
            const contentTypes = ['旅游', '美食', '时尚', '生活', '户外'];
            const statuses = ['active', 'pending', 'rejected', 'blocked'];
            
            // 生成50个网红数据
            for (let i = 1; i <= 50; i++) {
                const platform = platforms[Math.floor(Math.random() * platforms.length)];
                const status = statuses[Math.floor(Math.random() * statuses.length)];
                const contentType = contentTypes[Math.floor(Math.random() * contentTypes.length)];
                const fansCount = Math.floor(Math.random() * 5000000) + 5000;
                
                mockData.push({
                    id: i,
                    nickname: `网红${i}`,
                    realName: `真实姓名${i}`,
                    avatar: `../images/avatar${(i % 5) + 1}.jpg`,
                    platform: platform,
                    fansCount: fansCount,
                    tripsCount: Math.floor(Math.random() * 10),
                    status: status,
                    contentTypes: [
                        contentType,
                        contentTypes[Math.floor(Math.random() * contentTypes.length)]
                    ],
                    phone: `1381234${i.toString().padStart(4, '0')}`,
                    email: `influencer${i}@example.com`
                });
            }
            
            // 应用筛选
            let filteredData = [...mockData];
            
            if (params.status !== 'all') {
                filteredData = filteredData.filter(item => item.status === params.status);
            }
            
            if (params.platform !== 'all') {
                filteredData = filteredData.filter(item => item.platform === params.platform);
            }
            
            if (params.contentType !== 'all') {
                filteredData = filteredData.filter(item => 
                    item.contentTypes.includes(params.contentType)
                );
            }
            
            if (params.fansCount !== 'all') {
                if (params.fansCount === 'less10k') {
                    filteredData = filteredData.filter(item => item.fansCount < 10000);
                } else if (params.fansCount === '10k-100k') {
                    filteredData = filteredData.filter(item => 
                        item.fansCount >= 10000 && item.fansCount < 100000
                    );
                } else if (params.fansCount === '100k-500k') {
                    filteredData = filteredData.filter(item => 
                        item.fansCount >= 100000 && item.fansCount < 500000
                    );
                } else if (params.fansCount === '500k-1m') {
                    filteredData = filteredData.filter(item => 
                        item.fansCount >= 500000 && item.fansCount < 1000000
                    );
                } else if (params.fansCount === 'more1m') {
                    filteredData = filteredData.filter(item => item.fansCount >= 1000000);
                }
            }
            
            // 应用搜索
            if (params.search) {
                const searchLower = params.search.toLowerCase();
                filteredData = filteredData.filter(item => 
                    item.nickname.toLowerCase().includes(searchLower) ||
                    item.realName.toLowerCase().includes(searchLower) ||
                    item.id.toString() === params.search ||
                    item.phone.includes(params.search)
                );
            }
            
            // 分页
            const totalItems = filteredData.length;
            const totalPages = Math.ceil(totalItems / params.pageSize);
            const startIndex = (params.page - 1) * params.pageSize;
            const items = filteredData.slice(startIndex, startIndex + params.pageSize);
            
            return {
                items,
                totalItems,
                totalPages
            };
        },
        
        /**
         * 应用筛选条件并重新加载数据
         */
        applyFilters() {
            this.currentPage = 1;
            this.loadInfluencers();
        },
        
        /**
         * 搜索网红
         */
        searchInfluencers() {
            this.currentPage = 1;
            this.loadInfluencers();
        },
        
        /**
         * 转到上一页
         */
        prevPage() {
            if (this.currentPage > 1) {
                this.currentPage--;
                this.loadInfluencers();
            }
        },
        
        /**
         * 转到下一页
         */
        nextPage() {
            if (this.currentPage < this.totalPages) {
                this.currentPage++;
                this.loadInfluencers();
            }
        },
        
        /**
         * 认证网红
         * @param {Number} id 网红ID
         */
        verifyInfluencer(id) {
            // 模拟API请求
            setTimeout(() => {
                // 更新本地状态
                const index = this.influencers.findIndex(item => item.id === id);
                if (index !== -1) {
                    this.influencers[index].status = 'active';
                    this.showMessage('网红已认证', 'success');
                }
            }, 500);
        },
        
        /**
         * 拒绝网红认证
         * @param {Number} id 网红ID
         */
        rejectInfluencer(id) {
            // 模拟API请求
            setTimeout(() => {
                // 更新本地状态
                const index = this.influencers.findIndex(item => item.id === id);
                if (index !== -1) {
                    this.influencers[index].status = 'rejected';
                    this.showMessage('已拒绝网红认证申请', 'warning');
                }
            }, 500);
        },
        
        /**
         * 封禁网红
         * @param {Number} id 网红ID
         */
        blockInfluencer(id) {
            if (!confirm('确定要封禁该网红账号吗？封禁后该网红将无法接单。')) {
                return;
            }
            
            // 模拟API请求
            setTimeout(() => {
                // 更新本地状态
                const index = this.influencers.findIndex(item => item.id === id);
                if (index !== -1) {
                    this.influencers[index].status = 'blocked';
                    this.showMessage('网红已被封禁', 'warning');
                }
            }, 500);
        },
        
        /**
         * 删除网红
         * @param {Number} id 网红ID
         */
        deleteInfluencer(id) {
            if (!confirm('确定要删除该网红信息吗？此操作不可恢复。')) {
                return;
            }
            
            // 模拟API请求
            setTimeout(() => {
                // 更新本地状态
                const index = this.influencers.findIndex(item => item.id === id);
                if (index !== -1) {
                    this.influencers.splice(index, 1);
                    this.totalItems--;
                    
                    if (this.influencers.length === 0 && this.currentPage > 1) {
                        this.currentPage--;
                        this.loadInfluencers();
                    }
                    
                    this.showMessage('网红信息已删除', 'success');
                }
            }, 500);
        },
        
        /**
         * 显示消息提示
         * @param {String} message 消息内容
         * @param {String} type 消息类型
         */
        showMessage(message, type = 'info') {
            // 实际项目中应集成UI组件库的消息提示
            alert(`${type.toUpperCase()}: ${message}`);
        },
        
        /**
         * 调整布局以适应iframe环境
         */
        adjustLayout() {
            // 调整主内容区域高度
            const mainContent = document.querySelector('.main-content');
            if (mainContent) {
                const viewportHeight = window.innerHeight;
                const topNavHeight = 70; // 顶部导航栏高度
                mainContent.style.minHeight = (viewportHeight - topNavHeight) + 'px';
            }
        },
        
        /**
         * 处理来自iframe的消息
         * @param {Event} event 消息事件
         */
        handleIframeMessage(event) {
            // 确保消息来源是可信的
            if (!event.origin.includes(window.location.hostname)) return;
            
            const { type, data } = event.data;
            
            switch (type) {
                case 'showNotifications':
                    alert(`您有 ${data.count} 条未读通知`);
                    break;
                case 'showUserMenu':
                    const action = prompt(
                        '请选择操作：\n1. 个人资料设置\n2. 修改密码\n3. 通知设置\n4. 退出登录',
                        '4'
                    );
                    
                    if (action === '4') {
                        if (confirm('确定要退出登录吗？')) {
                            // 重定向到登录页
                            window.location.href = 'login.html';
                        }
                    }
                    break;
            }
        }
    },
    
    mounted() {
        // 加载数据
        this.loadInfluencers();
        
        // 监听窗口大小变化以调整布局
        window.addEventListener('resize', this.adjustLayout);
        this.adjustLayout();
        
        // 监听来自iframe的消息
        window.addEventListener('message', this.handleIframeMessage);
        
        // 为筛选器添加事件监听
        Object.keys(this.filters).forEach(key => {
            this.$watch(`filters.${key}`, this.applyFilters);
        });
    },
    
    beforeDestroy() {
        // 移除事件监听
        window.removeEventListener('resize', this.adjustLayout);
        window.removeEventListener('message', this.handleIframeMessage);
    }
}); 