/**
 * 行程列表页面的Vue应用
 * @description 负责行程列表的展示、筛选、搜索和操作
 */
const { createApp } = Vue;

const tripListApp = createApp({
    data() {
        return {
            // 筛选条件
            filters: {
                status: '',
                ownerType: '',
                timeStatus: '',
                destination: ''
            },
            // 搜索关键词
            searchTerm: '',
            // 分页信息
            currentPage: 1,
            pageSize: 10,
            totalPages: 1,
            // 目的地列表
            destinations: ['珠海', '广州', '深圳', '北京', '上海', '杭州', '三亚'],
            // 行程数据
            trips: [],
            // 加载状态
            loading: true,
            // 操作状态
            operationInProgress: false
        }
    },
    computed: {
        /**
         * 根据筛选条件过滤行程数据
         * @returns {Array} 过滤后的行程数据
         */
        filteredTrips() {
            let result = this.trips;
            
            // 状态筛选
            if (this.filters.status) {
                result = result.filter(trip => {
                    if (this.filters.status === 'active') return trip.isActive;
                    if (this.filters.status === 'inactive') return !trip.isActive;
                    return true;
                });
            }
            
            // 归属筛选
            if (this.filters.ownerType) {
                result = result.filter(trip => trip.ownerType === this.filters.ownerType);
            }
            
            // 时间状态筛选
            if (this.filters.timeStatus) {
                const now = new Date();
                result = result.filter(trip => {
                    const startDate = new Date(trip.date);
                    const endDate = new Date(trip.date);
                    endDate.setDate(endDate.getDate() + trip.duration);
                    
                    switch (this.filters.timeStatus) {
                        case 'upcoming':
                            return startDate > now;
                        case 'ongoing':
                            return startDate <= now && endDate >= now;
                        case 'ended':
                            return endDate < now;
                        default:
                            return true;
                    }
                });
            }
            
            // 目的地筛选
            if (this.filters.destination) {
                result = result.filter(trip => trip.destination === this.filters.destination);
            }
            
            // 关键词搜索
            if (this.searchTerm) {
                const query = this.searchTerm.toLowerCase();
                result = result.filter(trip => 
                    trip.id.toString().includes(query) || 
                    trip.title.toLowerCase().includes(query)
                );
            }
            
            // 更新总页数
            this.totalPages = Math.ceil(result.length / this.pageSize);
            
            // 分页处理
            const start = (this.currentPage - 1) * this.pageSize;
            const end = start + this.pageSize;
            
            return result.slice(start, end);
        },
        
        /**
         * 计算分页显示的页码
         * @returns {Array} 分页页码数组
         */
        paginationNumbers() {
            const pages = [];
            const ellipsis = '...';
            
            if (this.totalPages <= 7) {
                // 少于7页，全部显示
                for (let i = 1; i <= this.totalPages; i++) {
                    pages.push(i);
                }
            } else {
                // 始终显示第一页
                pages.push(1);
                
                if (this.currentPage > 3) {
                    pages.push(ellipsis);
                }
                
                // 计算中间显示的页码
                let start = Math.max(2, this.currentPage - 1);
                let end = Math.min(this.totalPages - 1, this.currentPage + 1);
                
                // 调整显示更多的页码
                if (this.currentPage <= 3) {
                    end = Math.min(this.totalPages - 1, 5);
                }
                
                if (this.currentPage >= this.totalPages - 2) {
                    start = Math.max(2, this.totalPages - 4);
                }
                
                // 添加中间页码
                for (let i = start; i <= end; i++) {
                    pages.push(i);
                }
                
                // 添加尾部省略号和最后一页
                if (this.currentPage < this.totalPages - 2) {
                    pages.push(ellipsis);
                }
                
                // 始终显示最后一页
                pages.push(this.totalPages);
            }
            
            return pages;
        }
    },
    methods: {
        /**
         * 格式化日期显示
         * @param {string} date - 日期字符串
         * @returns {string} 格式化后的日期字符串
         */
        formatDate(date) {
            if (!date) return '';
            const d = new Date(date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        },
        
        /**
         * 搜索行程
         */
        searchTrips() {
            this.currentPage = 1;
            // 实际应用中这里可能需要调用API
        },
        
        /**
         * 切换行程状态（生效/未生效）
         * @param {Object} trip - 行程对象
         */
        async toggleTripStatus(trip) {
            if (this.operationInProgress) return;
            
            const message = trip.isActive 
                ? '确定要取消生效此行程吗？取消后网红端将无法看到此行程。' 
                : '确定要生效此行程吗？生效后网红端将可以看到此行程。';
            
            if (confirm(message)) {
                try {
                    this.operationInProgress = true;
                    
                    // 模拟API调用
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    trip.isActive = !trip.isActive;
                    const statusMessage = trip.isActive 
                        ? '行程已成功生效' 
                        : '行程已取消生效';
                    
                    this.showMessage(statusMessage, 'success');
                } catch (error) {
                    this.showMessage('操作失败', 'error');
                    console.error('切换行程状态出错:', error);
                } finally {
                    this.operationInProgress = false;
                }
            }
        },
        
        /**
         * 复制行程
         * @param {Object} trip - 行程对象
         */
        async duplicateTrip(trip) {
            if (this.operationInProgress) return;
            
            try {
                this.operationInProgress = true;
                
                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 500));
                
                const newTrip = JSON.parse(JSON.stringify(trip));
                newTrip.id = this.generateNewId();
                newTrip.title = `${trip.title} (复制)`;
                newTrip.isActive = false;
                
                this.trips.unshift(newTrip);
                this.showMessage(`行程已复制成功！新行程ID: ${newTrip.id}`, 'success');
            } catch (error) {
                this.showMessage('复制行程失败', 'error');
                console.error('复制行程出错:', error);
            } finally {
                this.operationInProgress = false;
            }
        },
        
        /**
         * 生成新ID
         * @returns {number} 新生成的ID
         */
        generateNewId() {
            return Math.max(...this.trips.map(t => t.id), 0) + 1;
        },
        
        /**
         * 删除行程
         * @param {Object} trip - 行程对象
         */
        async deleteTrip(trip) {
            if (this.operationInProgress) return;
            
            if (confirm('确定要删除此行程吗？删除后将无法恢复。')) {
                try {
                    this.operationInProgress = true;
                    
                    // 模拟API调用
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    this.trips = this.trips.filter(t => t.id !== trip.id);
                    this.showMessage('行程删除成功', 'success');
                    
                    // 重新计算总页数，可能需要调整当前页
                    const totalPages = Math.ceil(this.trips.length / this.pageSize);
                    if (this.currentPage > totalPages && totalPages > 0) {
                        this.currentPage = totalPages;
                    }
                } catch (error) {
                    this.showMessage('删除行程失败', 'error');
                    console.error('删除行程出错:', error);
                } finally {
                    this.operationInProgress = false;
                }
            }
        },
        
        /**
         * 显示消息提示
         * @param {string} message - 消息内容
         * @param {string} type - 消息类型，可选值: 'success', 'error', 'warning', 'info'
         */
        showMessage(message, type = 'info') {
            // 实际项目中可能使用消息通知组件
            // 这里使用简单的alert替代
            alert(message);
        },
        
        /**
         * 跳转到指定页
         * @param {number} page - 页码
         */
        goToPage(page) {
            if (page >= 1 && page <= this.totalPages) {
                this.currentPage = page;
            }
        },
        
        /**
         * 加载行程数据
         */
        async loadTrips() {
            try {
                this.loading = true;
                
                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // 模拟数据
                this.trips = [
                    {
                        id: 1001,
                        title: '珠海长隆海洋王国亲子2日游',
                        destination: '珠海',
                        date: '2024-06-20',
                        duration: 2,
                        currentParticipants: 5,
                        maxParticipants: 20,
                        enrollmentDeadline: '2024-06-15',
                        isActive: true,
                        ownerType: 'platform',
                        statusLabels: {
                            isHot: true,
                            isLimited: false,
                            isNew: true,
                            isPromotion: false
                        }
                    },
                    {
                        id: 1002,
                        title: '广州长隆野生动物园1日游',
                        destination: '广州',
                        date: '2024-07-01',
                        duration: 1,
                        currentParticipants: 8,
                        maxParticipants: 30,
                        enrollmentDeadline: '2024-06-25',
                        isActive: true,
                        ownerType: 'agency',
                        statusLabels: {
                            isHot: false,
                            isLimited: true,
                            isNew: false,
                            isPromotion: true
                        }
                    },
                    {
                        id: 1003,
                        title: '深圳欢乐谷一日游',
                        destination: '深圳',
                        date: '2024-06-15',
                        duration: 1,
                        currentParticipants: 0,
                        maxParticipants: 25,
                        enrollmentDeadline: '2024-06-10',
                        isActive: false,
                        ownerType: 'platform',
                        statusLabels: {
                            isHot: false,
                            isLimited: false,
                            isNew: true,
                            isPromotion: false
                        }
                    },
                    {
                        id: 1004,
                        title: '北京故宫长城5日游',
                        destination: '北京',
                        date: '2024-08-05',
                        duration: 5,
                        currentParticipants: 12,
                        maxParticipants: 20,
                        enrollmentDeadline: '2024-07-25',
                        isActive: true,
                        ownerType: 'agency',
                        statusLabels: {
                            isHot: true,
                            isLimited: false,
                            isNew: false,
                            isPromotion: false
                        }
                    },
                    {
                        id: 1005,
                        title: '上海迪士尼2日亲子游',
                        destination: '上海',
                        date: '2024-07-15',
                        duration: 2,
                        currentParticipants: 15,
                        maxParticipants: 30,
                        enrollmentDeadline: '2024-07-10',
                        isActive: true,
                        ownerType: 'platform',
                        statusLabels: {
                            isHot: true,
                            isLimited: false,
                            isNew: false,
                            isPromotion: true
                        }
                    },
                    {
                        id: 1006,
                        title: '杭州西湖休闲3日游',
                        destination: '杭州',
                        date: '2024-08-20',
                        duration: 3,
                        currentParticipants: 5,
                        maxParticipants: 20,
                        enrollmentDeadline: '2024-08-15',
                        isActive: false,
                        ownerType: 'platform',
                        statusLabels: {
                            isHot: false,
                            isLimited: false,
                            isNew: true,
                            isPromotion: false
                        }
                    },
                    {
                        id: 1007,
                        title: '三亚海滨度假5日游',
                        destination: '三亚',
                        date: '2024-09-10',
                        duration: 5,
                        currentParticipants: 20,
                        maxParticipants: 25,
                        enrollmentDeadline: '2024-09-01',
                        isActive: true,
                        ownerType: 'agency',
                        statusLabels: {
                            isHot: true,
                            isLimited: true,
                            isNew: false,
                            isPromotion: true
                        }
                    }
                ];
                
                // 设置总页数
                this.totalPages = Math.ceil(this.trips.length / this.pageSize);
            } catch (error) {
                this.showMessage('加载行程数据失败', 'error');
                console.error('加载行程数据出错:', error);
            } finally {
                this.loading = false;
            }
        },
        
        /**
         * 调整iframe布局和主内容大小
         */
        adjustLayout() {
            // 确保在iframe环境中工作
            try {
                const mainContent = document.querySelector('.main-content');
                if (mainContent) {
                    // 调整间距，适应iframe导航
                    const viewportHeight = window.innerHeight;
                    const topNavHeight = document.getElementById('top-nav-frame')?.offsetHeight || 70;
                    mainContent.style.minHeight = (viewportHeight - topNavHeight - 40) + 'px';
                }
            } catch (error) {
                console.error('调整布局出错:', error);
            }
        }
    },
    mounted() {
        this.loadTrips();
        
        // 从URL参数中获取可能的筛选条件
        const urlParams = new URLSearchParams(window.location.search);
        const statusParam = urlParams.get('status');
        if (statusParam) {
            this.filters.status = statusParam;
        }
        
        // 调整布局
        this.adjustLayout();
        window.addEventListener('resize', this.adjustLayout);
    },
    beforeUnmount() {
        // 移除事件监听器
        window.removeEventListener('resize', this.adjustLayout);
    }
});

// 等待DOM加载完成后挂载Vue应用
document.addEventListener('DOMContentLoaded', function() {
    tripListApp.mount('#app');
    
    // 监听来自iframe的消息
    window.addEventListener('message', function(event) {
        // 处理通知消息
        if (event.data && event.data.type === 'showNotifications') {
            alert('您有5条未读通知');
        }
        
        // 处理用户菜单消息
        if (event.data && event.data.type === 'showUserMenu') {
            const userActions = [
                '个人资料', 
                '修改密码', 
                '通知设置', 
                '退出登录'
            ];
            
            const action = prompt('请选择操作：\n1. 个人资料\n2. 修改密码\n3. 通知设置\n4. 退出登录', '4');
            
            if (action && !isNaN(action)) {
                const index = parseInt(action) - 1;
                if (index >= 0 && index < userActions.length) {
                    if (index === 3) { // 退出登录
                        if (confirm('确定要退出登录吗？')) {
                            window.location.href = 'login.html';
                        }
                    } else {
                        alert(`您选择了：${userActions[index]}，此功能正在开发中...`);
                    }
                }
            }
        }
    });
}); 