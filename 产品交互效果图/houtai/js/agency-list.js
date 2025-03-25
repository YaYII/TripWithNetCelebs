/**
 * 旅行社管理列表页JavaScript
 * @description 处理旅行社列表数据加载、筛选、搜索和操作
 */

new Vue({
    el: '#app',
    data: {
        // 筛选条件
        filters: {
            status: 'all',
            type: 'all',
            level: 'all'
        },
        searchQuery: '',
        
        // 数据状态
        agencies: [],
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
        }
    },
    
    methods: {
        /**
         * 获取旅行社状态对应的中文名称
         * @param {String} status 状态值
         * @returns {String} 状态中文名称
         */
        getStatusName(status) {
            const statusMap = {
                'active': '已认证',
                'pending': '待审核',
                'rejected': '已拒绝',
                'blocked': '已封禁'
            };
            return statusMap[status] || status;
        },
        
        /**
         * 获取旅行社状态对应的CSS类名
         * @param {String} status 状态值
         * @returns {String} 状态CSS类名
         */
        getStatusClass(status) {
            const classMap = {
                'active': 'active',
                'pending': 'pending',
                'rejected': 'rejected',
                'blocked': 'rejected'
            };
            return classMap[status] || '';
        },
        
        /**
         * 获取旅行社类型对应的中文名称
         * @param {String} type 类型值
         * @returns {String} 类型中文名称
         */
        getTypeName(type) {
            const typeMap = {
                'local': '地接社',
                'outbound': '出境社',
                'inbound': '入境社',
                'online': '在线旅行社'
            };
            return typeMap[type] || type;
        },
        
        /**
         * 获取旅行社等级对应的中文名称
         * @param {String} level 等级值
         * @returns {String} 等级中文名称
         */
        getLevelName(level) {
            if (!level || level === 'none') {
                return '无等级';
            }
            return level.toUpperCase() + '级';
        },
        
        /**
         * 加载旅行社列表数据
         * @returns {Promise} 加载完成的Promise
         */
        async loadAgencies() {
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
                
                if (this.searchQuery) {
                    params.search = this.searchQuery;
                }
                
                // 模拟响应数据
                const response = this.mockAPIResponse(params);
                
                this.agencies = response.items;
                this.totalPages = response.totalPages;
                this.totalItems = response.totalItems;
                
                // 确保当前页不超过总页数
                if (this.currentPage > this.totalPages && this.totalPages > 0) {
                    this.currentPage = this.totalPages;
                    await this.loadAgencies();
                }
            } catch (err) {
                console.error('加载旅行社列表失败', err);
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
            const types = ['local', 'outbound', 'inbound', 'online'];
            const levels = ['5a', '4a', '3a', '2a', '1a', 'none'];
            const statuses = ['active', 'pending', 'rejected', 'blocked'];
            
            // 生成40个旅行社数据
            for (let i = 1; i <= 40; i++) {
                const type = types[Math.floor(Math.random() * types.length)];
                const level = levels[Math.floor(Math.random() * levels.length)];
                const status = statuses[Math.floor(Math.random() * statuses.length)];
                
                mockData.push({
                    id: i,
                    name: `旅行社${i}`,
                    logo: `../images/agency-logo${(i % 5) + 1}.jpg`,
                    contactPerson: `联系人${i}`,
                    phone: `1391234${i.toString().padStart(4, '0')}`,
                    license: `TA${Math.floor(Math.random() * 10000).toString().padStart(4, '0')}`,
                    type: type,
                    level: level,
                    tripsCount: Math.floor(Math.random() * 20),
                    status: status,
                    address: `城市${i}区街道${i}号`,
                    email: `agency${i}@example.com`
                });
            }
            
            // 应用筛选
            let filteredData = [...mockData];
            
            if (params.status !== 'all') {
                filteredData = filteredData.filter(item => item.status === params.status);
            }
            
            if (params.type !== 'all') {
                filteredData = filteredData.filter(item => item.type === params.type);
            }
            
            if (params.level !== 'all') {
                filteredData = filteredData.filter(item => item.level === params.level);
            }
            
            // 应用搜索
            if (params.search) {
                const searchLower = params.search.toLowerCase();
                filteredData = filteredData.filter(item => 
                    item.name.toLowerCase().includes(searchLower) ||
                    item.contactPerson.toLowerCase().includes(searchLower) ||
                    item.id.toString() === params.search ||
                    item.license.toLowerCase().includes(searchLower)
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
         * 应用筛选并重新加载数据
         */
        applyFilters() {
            this.currentPage = 1;
            this.loadAgencies();
        },
        
        /**
         * 处理搜索操作
         */
        handleSearch() {
            this.currentPage = 1;
            this.loadAgencies();
        },
        
        /**
         * 前往上一页
         */
        prevPage() {
            if (this.hasPrevPage) {
                this.currentPage--;
                this.loadAgencies();
            }
        },
        
        /**
         * 前往下一页
         */
        nextPage() {
            if (this.hasNextPage) {
                this.currentPage++;
                this.loadAgencies();
            }
        },
        
        /**
         * 查看旅行社详情
         * @param {Number} id 旅行社ID
         */
        viewAgency(id) {
            alert(`查看旅行社详情，ID: ${id}`);
            // 实际项目中跳转到详情页
            // window.location.href = `agency-detail.html?id=${id}`;
        },
        
        /**
         * 编辑旅行社信息
         * @param {Number} id 旅行社ID
         */
        editAgency(id) {
            alert(`编辑旅行社信息，ID: ${id}`);
            // 实际项目中跳转到编辑页
            // window.location.href = `agency-edit.html?id=${id}`;
        },
        
        /**
         * 审核通过旅行社
         * @param {Object} agency 旅行社对象
         */
        verifyAgency(agency) {
            if (confirm(`确定要审核通过旅行社"${agency.name}"吗？`)) {
                // 模拟API请求
                setTimeout(() => {
                    agency.status = 'active';
                    this.$forceUpdate(); // 强制更新视图
                    this.showMessage('旅行社审核通过成功', 'success');
                }, 500);
            }
        },
        
        /**
         * 拒绝旅行社申请
         * @param {Object} agency 旅行社对象
         */
        rejectAgency(agency) {
            if (confirm(`确定要拒绝旅行社"${agency.name}"的申请吗？`)) {
                // 模拟API请求
                setTimeout(() => {
                    agency.status = 'rejected';
                    this.$forceUpdate(); // 强制更新视图
                    this.showMessage('已拒绝旅行社申请', 'warning');
                }, 500);
            }
        },
        
        /**
         * 封禁/解封旅行社
         * @param {Object} agency 旅行社对象
         */
        toggleAgencyBlock(agency) {
            const action = agency.status === 'blocked' ? '解封' : '封禁';
            if (confirm(`确定要${action}旅行社"${agency.name}"吗？`)) {
                // 模拟API请求
                setTimeout(() => {
                    agency.status = agency.status === 'blocked' ? 'active' : 'blocked';
                    this.$forceUpdate(); // 强制更新视图
                    this.showMessage(`旅行社已${action}`, 'info');
                }, 500);
            }
        },
        
        /**
         * 删除旅行社
         * @param {Object} agency 旅行社对象
         */
        deleteAgency(agency) {
            if (confirm(`确定要删除旅行社"${agency.name}"吗？此操作不可撤销！`)) {
                // 模拟API请求
                setTimeout(() => {
                    const index = this.agencies.findIndex(item => item.id === agency.id);
                    if (index !== -1) {
                        this.agencies.splice(index, 1);
                    }
                    this.showMessage('旅行社已删除', 'error');
                    
                    // 如果当前页没有数据了，且不是第一页，则返回上一页
                    if (this.agencies.length === 0 && this.currentPage > 1) {
                        this.currentPage--;
                        this.loadAgencies();
                    }
                }, 500);
            }
        },
        
        /**
         * 显示消息提示
         * @param {String} message 消息内容
         * @param {String} type 消息类型（success, info, warning, error）
         */
        showMessage(message, type = 'info') {
            alert(`${type.toUpperCase()}: ${message}`);
            // 实际项目中使用消息提示组件
            // this.$message({
            //     message: message,
            //     type: type
            // });
        },
        
        /**
         * 添加新旅行社
         */
        addAgency() {
            alert('添加新旅行社');
            // 实际项目中跳转到创建页
            // window.location.href = 'agency-create.html';
        }
    },
    
    mounted() {
        // 加载旅行社列表数据
        this.loadAgencies();
    }
}); 