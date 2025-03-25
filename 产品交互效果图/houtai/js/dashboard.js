/**
 * 仪表盘页面的Vue应用
 * @description 负责仪表盘页面的数据展示和交互
 */
const { createApp } = Vue;

const dashboardApp = createApp({
    data() {
        return {
            // 数据统计
            stats: {
                activeTrips: 0,
                currentParticipants: 0,
                influencers: 0,
                agencies: 0
            },
            // 通知列表
            notifications: [],
            // 最近行程
            recentTrips: [],
            // 图表实例
            charts: {
                enrollment: null,
                tripType: null
            },
            // 加载状态
            loading: true,
            // Chart.js库是否可用
            chartJsAvailable: typeof Chart !== 'undefined'
        }
    },
    methods: {
        /**
         * 获取仪表盘数据
         */
        async fetchDashboardData() {
            try {
                this.loading = true;
                
                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // 模拟数据统计
                this.stats = {
                    activeTrips: 45,
                    currentParticipants: 312,
                    influencers: 186,
                    agencies: 27
                };
                
                // 模拟通知数据
                this.notifications = [
                    {
                        type: 'info',
                        message: '系统更新：新增行程导出功能',
                        time: '今天 14:30'
                    },
                    {
                        type: 'success',
                        message: '新行程 "广州长隆欢乐世界2日游" 已生效',
                        time: '今天 11:05'
                    },
                    {
                        type: 'warning',
                        message: '行程 "珠海长隆海洋王国亲子2日游" 报名人数已达80%',
                        time: '昨天 16:42'
                    },
                    {
                        type: 'error',
                        message: '行程 "深圳欢乐谷一日游" 已取消生效',
                        time: '2天前'
                    },
                    {
                        type: 'info',
                        message: '新增网红用户：旅行小达人',
                        time: '3天前'
                    }
                ];
                
                // 模拟最近行程数据
                this.recentTrips = [
                    {
                        id: 101,
                        title: '珠海长隆海洋王国亲子2日游',
                        destination: '珠海',
                        date: '2024-06-20',
                        isActive: true
                    },
                    {
                        id: 102,
                        title: '广州长隆欢乐世界2日游',
                        destination: '广州',
                        date: '2024-07-05',
                        isActive: true
                    },
                    {
                        id: 103,
                        title: '珠海外伶仃岛海滨3日游',
                        destination: '珠海',
                        date: '2024-07-15',
                        isActive: false
                    },
                    {
                        id: 104,
                        title: '深圳欢乐谷一日游',
                        destination: '深圳',
                        date: '2024-06-30',
                        isActive: false
                    },
                    {
                        id: 105,
                        title: '广州塔夜游+珠江夜游1日游',
                        destination: '广州',
                        date: '2024-06-25',
                        isActive: true
                    }
                ];
                
                // 初始化图表（如果Chart.js可用）
                if (this.chartJsAvailable) {
                    this.$nextTick(() => {
                        this.initCharts();
                    });
                } else {
                    console.warn('Chart.js库不可用，将显示替代内容');
                    this.renderChartAlternatives();
                }
            } catch (error) {
                console.error('获取仪表盘数据出错:', error);
                alert('获取仪表盘数据失败，请刷新页面重试或联系管理员。');
            } finally {
                this.loading = false;
            }
        },
        
        /**
         * 获取通知图标
         * @param {string} type - 通知类型
         * @returns {string} 图标类名
         */
        getNotificationIcon(type) {
            switch(type) {
                case 'info':
                    return 'ri-information-line';
                case 'success':
                    return 'ri-checkbox-circle-line';
                case 'warning':
                    return 'ri-error-warning-line';
                case 'error':
                    return 'ri-close-circle-line';
                default:
                    return 'ri-notification-line';
            }
        },
        
        /**
         * 渲染图表替代内容
         */
        renderChartAlternatives() {
            // 行程报名趋势图表的替代内容
            const enrollmentChartEl = document.getElementById('enrollmentChart');
            if (enrollmentChartEl) {
                const container = enrollmentChartEl.parentNode;
                enrollmentChartEl.remove();
                
                const alternativeEl = document.createElement('div');
                alternativeEl.className = 'chart-alternative';
                alternativeEl.innerHTML = `
                    <div class="chart-message">
                        <i class="ri-line-chart-line"></i>
                        <p>行程报名趋势数据</p>
                        <ul>
                            <li>最近30天共有152人报名</li>
                            <li>平均每日报名人数: 5.1人</li>
                            <li>报名高峰期: 6月10日-6月15日</li>
                            <li>趋势: 持续上升</li>
                        </ul>
                    </div>
                `;
                container.appendChild(alternativeEl);
            }
            
            // 行程类型分布图表的替代内容
            const tripTypeChartEl = document.getElementById('tripTypeChart');
            if (tripTypeChartEl) {
                const container = tripTypeChartEl.parentNode;
                tripTypeChartEl.remove();
                
                const alternativeEl = document.createElement('div');
                alternativeEl.className = 'chart-alternative';
                alternativeEl.innerHTML = `
                    <div class="chart-message">
                        <i class="ri-pie-chart-line"></i>
                        <p>行程类型分布</p>
                        <ul>
                            <li>自然风光: 35%</li>
                            <li>主题公园: 25%</li>
                            <li>文化遗产: 15%</li>
                            <li>美食体验: 10%</li>
                            <li>城市观光: 15%</li>
                        </ul>
                    </div>
                `;
                container.appendChild(alternativeEl);
            }
        },
        
        /**
         * 初始化图表
         */
        initCharts() {
            if (!this.chartJsAvailable) {
                this.renderChartAlternatives();
                return;
            }
            
            // 销毁已存在的图表实例
            if (this.charts.enrollment) {
                this.charts.enrollment.destroy();
            }
            if (this.charts.tripType) {
                this.charts.tripType.destroy();
            }
            
            try {
                // 初始化行程报名趋势图表
                const enrollmentCtx = document.getElementById('enrollmentChart').getContext('2d');
                this.charts.enrollment = new Chart(enrollmentCtx, {
                    type: 'line',
                    data: {
                        labels: this.getLast30Days(),
                        datasets: [{
                            label: '每日报名人数',
                            data: this.generateRandomData(30, 0, 15),
                            backgroundColor: 'rgba(33, 150, 243, 0.1)',
                            borderColor: 'rgba(33, 150, 243, 1)',
                            borderWidth: 2,
                            pointRadius: 3,
                            pointBackgroundColor: '#fff',
                            pointBorderColor: 'rgba(33, 150, 243, 1)',
                            pointBorderWidth: 2,
                            tension: 0.4,
                            fill: true
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'top'
                            },
                            tooltip: {
                                mode: 'index',
                                intersect: false,
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                titleColor: '#fff',
                                bodyColor: '#fff',
                                borderColor: 'rgba(255, 255, 255, 0.2)',
                                borderWidth: 1
                            }
                        },
                        scales: {
                            y: {
                                beginAtZero: true,
                                ticks: {
                                    stepSize: 5
                                },
                                grid: {
                                    color: 'rgba(0, 0, 0, 0.05)'
                                }
                            },
                            x: {
                                grid: {
                                    display: false
                                }
                            }
                        }
                    }
                });
                
                // 初始化行程类型分布图表
                const tripTypeCtx = document.getElementById('tripTypeChart').getContext('2d');
                this.charts.tripType = new Chart(tripTypeCtx, {
                    type: 'doughnut',
                    data: {
                        labels: ['自然风光', '主题公园', '文化遗产', '美食体验', '城市观光'],
                        datasets: [{
                            data: [35, 25, 15, 10, 15],
                            backgroundColor: [
                                'rgba(76, 175, 80, 0.8)',
                                'rgba(33, 150, 243, 0.8)',
                                'rgba(255, 152, 0, 0.8)',
                                'rgba(233, 30, 99, 0.8)',
                                'rgba(156, 39, 176, 0.8)'
                            ],
                            borderColor: 'white',
                            borderWidth: 2
                        }]
                    },
                    options: {
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            legend: {
                                display: true,
                                position: 'right'
                            },
                            tooltip: {
                                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                                titleColor: '#fff',
                                bodyColor: '#fff',
                                usePointStyle: true
                            }
                        },
                        cutout: '65%'
                    }
                });
            } catch (error) {
                console.error('初始化图表出错:', error);
                this.renderChartAlternatives();
            }
        },
        
        /**
         * 刷新图表数据
         */
        refreshCharts() {
            if (!this.chartJsAvailable) {
                this.renderChartAlternatives();
                return;
            }
            
            try {
                // 更新行程报名趋势图表的数据
                if (this.charts.enrollment) {
                    this.charts.enrollment.data.datasets[0].data = this.generateRandomData(30, 0, 15);
                    this.charts.enrollment.update();
                }
                
                // 更新行程类型分布图表的数据
                if (this.charts.tripType) {
                    this.charts.tripType.data.datasets[0].data = [
                        Math.floor(Math.random() * 30) + 20,
                        Math.floor(Math.random() * 20) + 15,
                        Math.floor(Math.random() * 15) + 10,
                        Math.floor(Math.random() * 10) + 5,
                        Math.floor(Math.random() * 15) + 10
                    ];
                    this.charts.tripType.update();
                }
            } catch (error) {
                console.error('刷新图表出错:', error);
            }
        },
        
        /**
         * 获取过去30天的日期标签
         * @returns {Array} 日期标签数组
         */
        getLast30Days() {
            const dates = [];
            const today = new Date();
            
            for (let i = 29; i >= 0; i--) {
                const date = new Date(today);
                date.setDate(today.getDate() - i);
                const month = date.getMonth() + 1;
                const day = date.getDate();
                dates.push(`${month}/${day}`);
            }
            
            return dates;
        },
        
        /**
         * 生成随机数据
         * @param {number} count - 数据点数量
         * @param {number} min - 最小值
         * @param {number} max - 最大值
         * @returns {Array} 随机数据数组
         */
        generateRandomData(count, min, max) {
            const data = [];
            for (let i = 0; i < count; i++) {
                data.push(Math.floor(Math.random() * (max - min + 1)) + min);
            }
            return data;
        },
        
        /**
         * 确保主内容适配iframe导航结构
         */
        adjustMainContentSize() {
            // 检查iframe是否加载完成并调整主内容区域
            const checkIframesLoaded = () => {
                const navFrame = document.getElementById('nav-frame');
                const topNavFrame = document.getElementById('top-nav-frame');
                
                if (navFrame && topNavFrame) {
                    const mainContent = document.querySelector('.main-content');
                    if (mainContent) {
                        // 适配主内容区高度，确保不被遮挡
                        mainContent.style.minHeight = `calc(100vh - ${topNavFrame.offsetHeight}px)`;
                    }
                }
            };
            
            // 监听iframe加载事件
            const navFrame = document.getElementById('nav-frame');
            const topNavFrame = document.getElementById('top-nav-frame');
            
            if (navFrame) {
                navFrame.addEventListener('load', checkIframesLoaded);
            }
            
            if (topNavFrame) {
                topNavFrame.addEventListener('load', checkIframesLoaded);
            }
            
            // 初始检查
            checkIframesLoaded();
        }
    },
    mounted() {
        // 获取仪表盘数据
        this.fetchDashboardData();
        
        // 监听窗口大小变化，调整图表大小
        if (this.chartJsAvailable) {
            window.addEventListener('resize', this.handleResize = () => {
                if (this.charts.enrollment) {
                    this.charts.enrollment.resize();
                }
                if (this.charts.tripType) {
                    this.charts.tripType.resize();
                }
            });
        }

        // 适配iframe结构
        this.adjustMainContentSize();
    },
    beforeUnmount() {
        // 销毁图表实例
        if (this.chartJsAvailable) {
            if (this.charts.enrollment) {
                this.charts.enrollment.destroy();
            }
            if (this.charts.tripType) {
                this.charts.tripType.destroy();
            }
            
            // 移除事件监听
            if (this.handleResize) {
                window.removeEventListener('resize', this.handleResize);
            }
        }
    }
});

// 等待DOM加载完成后挂载Vue应用
document.addEventListener('DOMContentLoaded', function() {
    // 确保iframe结构已就绪
    setTimeout(() => {
        dashboardApp.mount('#app');
    }, 100);
}); 