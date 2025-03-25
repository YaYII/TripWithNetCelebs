/**
 * 行程详情页面的Vue应用
 * @description 负责行程详情页面的展示和操作
 */
const { createApp } = Vue;

createApp({
    data() {
        return {
            // 行程ID
            tripId: null,
            // 行程数据
            tripData: {},
            // 加载状态
            loading: true,
            // 错误信息
            error: null,
            // 轮播图实例
            swiper: null,
            // 操作状态
            operationInProgress: false
        }
    },
    methods: {
        /**
         * 格式化日期显示
         * @param {string} date - 日期字符串
         * @returns {string} 格式化后的日期字符串
         */
        formatDate(date) {
            if (!date) return '暂无';
            const d = new Date(date);
            return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
        },
        
        /**
         * 格式化日期时间显示
         * @param {string} datetime - 日期时间字符串
         * @returns {string} 格式化后的日期时间字符串
         */
        formatDateTime(datetime) {
            if (!datetime) return '暂无';
            const d = new Date(datetime);
            return `${this.formatDate(datetime)} ${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`;
        },
        
        /**
         * 计算总佣金
         * @returns {number} 总佣金金额
         */
        calculateTotalCommission() {
            const baseCommission = parseFloat(this.tripData.baseCommission) || 0;
            const bonusCommission = parseFloat(this.tripData.bonusCommission) || 0;
            return (baseCommission + bonusCommission).toFixed(2);
        },
        
        /**
         * 编辑行程
         */
        editTrip() {
            window.location.href = `trip-edit.html?id=${this.tripId}`;
        },
        
        /**
         * 生效行程
         */
        async activateTrip() {
            if (this.operationInProgress) return;
            
            if (confirm('确定要生效此行程吗？生效后网红端将可以看到此行程。')) {
                try {
                    this.operationInProgress = true;
                    
                    // 模拟API调用
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    this.tripData.isActive = true;
                    this.tripData.history = this.tripData.history || [];
                    this.tripData.history.unshift({
                        timestamp: new Date().toISOString(),
                        operator: '管理员',
                        description: '行程已生效'
                    });
                    
                    this.showMessage('行程已成功生效', 'success');
                } catch (error) {
                    this.showMessage('生效行程失败', 'error');
                    console.error('激活行程出错:', error);
                } finally {
                    this.operationInProgress = false;
                }
            }
        },
        
        /**
         * 取消生效行程
         */
        async deactivateTrip() {
            if (this.operationInProgress) return;
            
            if (confirm('确定要取消生效此行程吗？取消后网红端将无法看到此行程。')) {
                try {
                    this.operationInProgress = true;
                    
                    // 模拟API调用
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    this.tripData.isActive = false;
                    this.tripData.history = this.tripData.history || [];
                    this.tripData.history.unshift({
                        timestamp: new Date().toISOString(),
                        operator: '管理员',
                        description: '行程已取消生效'
                    });
                    
                    this.showMessage('行程已取消生效', 'success');
                } catch (error) {
                    this.showMessage('取消生效失败', 'error');
                    console.error('取消生效出错:', error);
                } finally {
                    this.operationInProgress = false;
                }
            }
        },
        
        /**
         * 复制行程
         */
        async copyTrip() {
            if (this.operationInProgress) return;
            
            if (confirm('确定要复制此行程吗？将创建一个新的行程副本。')) {
                try {
                    this.operationInProgress = true;
                    
                    // 模拟API调用
                    await new Promise(resolve => setTimeout(resolve, 500));
                    
                    // 实际应用中这里应该调用后端API
                    const newTripId = Math.floor(Math.random() * 1000) + 2000;
                    
                    this.showMessage(`行程复制成功！新行程ID: ${newTripId}`, 'success');
                    
                    // 跳转到新行程的编辑页面
                    setTimeout(() => {
                        window.location.href = `trip-edit.html?id=${newTripId}`;
                    }, 1500);
                } catch (error) {
                    this.showMessage('复制行程失败', 'error');
                    console.error('复制行程出错:', error);
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
         * 初始化图片轮播
         */
        initSwiper() {
            if (this.tripData.images && this.tripData.images.length > 0) {
                this.$nextTick(() => {
                    if (this.swiper) {
                        this.swiper.destroy();
                    }
                    
                    this.swiper = new Swiper('.swiper-container', {
                        loop: this.tripData.images.length > 1,
                        pagination: {
                            el: '.swiper-pagination',
                            clickable: true
                        },
                        navigation: {
                            nextEl: '.swiper-button-next',
                            prevEl: '.swiper-button-prev'
                        },
                        autoplay: {
                            delay: 5000,
                            disableOnInteraction: false
                        }
                    });
                });
            }
        },
        
        /**
         * 加载行程数据
         */
        async loadTripData() {
            try {
                this.loading = true;
                this.error = null;
                
                // 获取URL中的行程ID参数
                const urlParams = new URLSearchParams(window.location.search);
                this.tripId = urlParams.get('id');
                
                if (!this.tripId) {
                    this.error = '未指定行程ID，请返回行程列表选择一个行程。';
                    this.loading = false;
                    return;
                }
                
                // 模拟API调用
                await new Promise(resolve => setTimeout(resolve, 800));
                
                // 模拟行程数据
                this.tripData = {
                    id: this.tripId,
                    title: '珠海长隆海洋王国亲子2日游',
                    destination: '珠海',
                    date: '2024-06-20',
                    duration: 2,
                    currentParticipants: 5,
                    maxParticipants: 20,
                    enrollmentDeadline: '2024-06-15',
                    isActive: true,
                    ownerType: 'platform',
                    description: '<p>珠海长隆海洋王国是中国最大的海洋主题公园之一，拥有众多精彩的海洋动物表演和刺激的游乐设施。本次行程将带您和家人一起体验海洋世界的奇妙，欣赏精彩的动物表演，体验刺激的游乐设施，度过难忘的亲子时光。</p><p>行程包含专业导游全程陪同，优质酒店住宿，门票，交通等一系列服务，让您的旅行轻松无忧。适合带孩子的家庭，给孩子一个难忘的海洋世界探索之旅！</p>',
                    statusLabels: {
                        isHot: true,
                        isLimited: false,
                        isNew: true,
                        isPromotion: false
                    },
                    images: [
                        { url: 'https://picsum.photos/800/400?random=1' },
                        { url: 'https://picsum.photos/800/400?random=2' },
                        { url: 'https://picsum.photos/800/400?random=3' }
                    ],
                    schedule: [
                        {
                            activities: [
                                {
                                    time: '09:00',
                                    name: '集合出发',
                                    description: '珠海拱北口岸集合，乘车前往长隆海洋王国'
                                },
                                {
                                    time: '10:30',
                                    name: '抵达长隆海洋王国',
                                    description: '抵达后自由游览，可先观看海豚表演'
                                },
                                {
                                    time: '12:00',
                                    name: '午餐时间',
                                    description: '在园区内餐厅享用自助午餐'
                                },
                                {
                                    time: '13:30',
                                    name: '继续游览',
                                    description: '参观鲸鲨馆、北极熊馆等场馆'
                                },
                                {
                                    time: '16:00',
                                    name: '白鲸表演',
                                    description: '观看精彩的白鲸表演'
                                },
                                {
                                    time: '18:00',
                                    name: '前往酒店',
                                    description: '结束第一天行程，前往酒店入住休息'
                                }
                            ]
                        },
                        {
                            activities: [
                                {
                                    time: '09:00',
                                    name: '早餐',
                                    description: '在酒店享用早餐'
                                },
                                {
                                    time: '10:00',
                                    name: '返回海洋王国',
                                    description: '继续游览未玩的项目'
                                },
                                {
                                    time: '12:00',
                                    name: '午餐时间',
                                    description: '在园区内餐厅享用午餐'
                                },
                                {
                                    time: '13:30',
                                    name: '体验游乐设施',
                                    description: '体验飞翔过山车等刺激项目'
                                },
                                {
                                    time: '16:00',
                                    name: '海洋巡游表演',
                                    description: '观看盛大的海洋巡游表演'
                                },
                                {
                                    time: '17:30',
                                    name: '返程',
                                    description: '结束行程，乘车返回珠海市区'
                                }
                            ]
                        }
                    ],
                    highlights: [
                        { content: '近距离接触各种海洋生物，包括白鲸、海豚、北极熊等' },
                        { content: '观看精彩的海洋动物表演，体验海洋魅力' },
                        { content: '体验刺激的游乐设施，如飞翔过山车、激流勇进等' },
                        { content: '专业导游全程讲解海洋知识，寓教于乐' }
                    ],
                    requirements: [
                        { content: '粉丝数不低于50万' },
                        { content: '内容方向为亲子、旅游或生活类' },
                        { content: '近3个月内有持续更新内容' },
                        { content: '能够在旅行期间拍摄不少于3条相关内容' }
                    ],
                    inclusions: [
                        { content: '长隆海洋王国两日门票' },
                        { content: '一晚酒店住宿（含早餐）' },
                        { content: '往返交通（拱北口岸-长隆海洋王国）' },
                        { content: '专业导游服务' },
                        { content: '旅行意外险' }
                    ],
                    exclusions: [
                        { content: '个人消费及餐费' },
                        { content: '往返珠海的交通费用' },
                        { content: '园区内表演项目的VIP座位费用' },
                        { content: '导游服务费（建议30元/人/天）' }
                    ],
                    baseCommission: 2000,
                    bonusCommission: 500,
                    commissionRules: [
                        { content: '基础佣金2000元，行程结束后7个工作日内发放' },
                        { content: '发布内容获得50万以上点赞量，额外奖励500元' },
                        { content: '内容质量特别优秀可获得平台额外推荐' }
                    ],
                    platformOwner: {
                        name: '张三',
                        contact: '13800138000',
                        department: '内容合作部'
                    },
                    agency: null,
                    showAgencyInfo: false,
                    history: [
                        {
                            timestamp: '2024-05-10T15:30:00',
                            operator: '管理员',
                            description: '创建行程'
                        },
                        {
                            timestamp: '2024-05-12T09:45:00',
                            operator: '李四',
                            description: '修改行程描述'
                        },
                        {
                            timestamp: '2024-05-13T14:20:00',
                            operator: '管理员',
                            description: '行程已生效'
                        }
                    ]
                };
                
                // 初始化轮播图
                this.initSwiper();
            } catch (error) {
                this.error = '加载行程数据失败，请重试或联系管理员。';
                console.error('加载行程数据出错:', error);
            } finally {
                this.loading = false;
            }
        }
    },
    mounted() {
        // 页面加载时获取行程数据
        this.loadTripData();
    },
    beforeUnmount() {
        // 清理轮播图实例
        if (this.swiper) {
            this.swiper.destroy();
            this.swiper = null;
        }
    }
}).mount('#app'); 