/**
 * 行程编辑页面特定逻辑
 * @file 扩展行程表单基础功能，实现行程编辑特有的功能
 * @author 约旅网红平台开发团队
 */

// 扩展行程表单应用
const app = tripFormApp.mount('#app');

// 扩展Vue实例方法
Object.assign(app, {
    // 添加编辑页面特有的数据属性
    tripId: null,
    loading: true,
    error: null,
    originalData: null,
    historyVisible: false,
    
    // 获取URL参数
    getUrlParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },

    // 加载行程数据
    async loadTripData() {
        this.loading = true;
        this.error = null;

        try {
            // 获取行程ID
            this.tripId = this.getUrlParam('id');
            
            if (!this.tripId) {
                throw new Error('未找到行程ID');
            }

            // 在实际应用中，这里应该调用后端API获取数据
            // 这里使用模拟数据
            const mockData = {
                id: this.tripId,
                title: '珠海长隆海洋王国亲子2日游',
                type: 'domestic',
                theme: 'family',
                destination: '珠海',
                date: '2024-05-20',
                duration: 2,
                description: '<p>这是一个精彩的亲子游行程，您将在这里获得难忘的家庭度假体验。长隆海洋王国拥有丰富的海洋生物展示和精彩的表演活动，非常适合带孩子前来游玩。</p><p>行程中包含专业导游讲解服务，帮助您了解海洋知识，感受海洋魅力。晚间还有精彩的烟花表演，为您的旅行留下美好回忆。</p>',
                statusLabels: {
                    isHot: true,
                    isLimited: false,
                    isPromotion: true,
                    isNew: false
                },
                images: [
                    { url: 'images/trip-sample-1.jpg' },
                    { url: 'images/trip-sample-2.jpg' }
                ],
                schedule: [
                    {
                        activities: [
                            {
                                time: '09:00',
                                name: '集合出发',
                                description: '在指定地点集合，准时出发'
                            },
                            {
                                time: '10:30',
                                name: '游览海洋王国',
                                description: '参观各大展区，观看精彩表演'
                            },
                            {
                                time: '12:30',
                                name: '午餐时间',
                                description: '在园区内用餐'
                            },
                            {
                                time: '14:00',
                                name: '继续游览',
                                description: '观看白鲸表演和企鹅馆'
                            },
                            {
                                time: '18:00',
                                name: '晚餐与烟花表演',
                                description: '享用晚餐并观看绚丽的烟花表演'
                            }
                        ]
                    },
                    {
                        activities: [
                            {
                                time: '09:30',
                                name: '继续游览',
                                description: '深度体验海洋王国的精彩项目'
                            },
                            {
                                time: '12:00',
                                name: '午餐',
                                description: '在园区餐厅用餐'
                            },
                            {
                                time: '14:00',
                                name: '欢乐时光',
                                description: '体验园区内的游乐设施'
                            },
                            {
                                time: '16:30',
                                name: '返程',
                                description: '结束行程返回'
                            }
                        ]
                    }
                ],
                highlights: [
                    { content: '亲子互动项目丰富' },
                    { content: '专业导游全程陪同' },
                    { content: '观看珍稀海洋生物' },
                    { content: '体验夜间烟花表演' }
                ],
                requirements: [
                    { content: '粉丝数不少于10万' },
                    { content: '亲子类创作者优先' },
                    { content: '需要发布至少3条短视频和5张图片' }
                ],
                inclusions: [
                    { content: '景点门票' },
                    { content: '专业导游服务' },
                    { content: '行程中餐食（2正2早）' },
                    { content: '旅游意外险' }
                ],
                exclusions: [
                    { content: '个人消费' },
                    { content: '往返交通费' },
                    { content: '酒店住宿费用' }
                ],
                baseCommission: 1000,
                bonusCommission: 500,
                commissionRules: [
                    { content: '完成3条短视频可获得额外奖励' },
                    { content: '微博发布额外奖励200元/条' }
                ],
                maxParticipants: 10,
                minParticipants: 5,
                enrollmentDeadline: '2024-05-15',
                ownerType: 'platform',
                platformOwner: {
                    name: '张三',
                    contact: '13800138000',
                    department: '产品部'
                },
                agencyOwner: {
                    id: '',
                    name: '',
                    contact: ''
                },
                isActive: true,
                history: [
                    {
                        timestamp: '2024-03-21 10:00:00',
                        operator: '张三',
                        description: '创建行程'
                    },
                    {
                        timestamp: '2024-03-21 14:30:00',
                        operator: '李四',
                        description: '修改行程描述'
                    },
                    {
                        timestamp: '2024-03-22 09:15:00',
                        operator: '王五',
                        description: '更新行程图片'
                    }
                ]
            };

            // 更新表单数据
            Object.keys(mockData).forEach(key => {
                if (key in this.tripData) {
                    this.tripData[key] = mockData[key];
                }
            });
            
            // 保存原始数据副本，用于检测变更
            this.originalData = JSON.parse(JSON.stringify(mockData));

            // 更新富文本编辑器内容
            if (this.quillEditor) {
                this.quillEditor.root.innerHTML = this.tripData.description;
            }

            // 自动验证表单各部分
            this.validateAllSteps();
            
            this.loading = false;
        } catch (error) {
            console.error('加载行程数据失败:', error);
            this.error = '加载行程数据失败，请重试' + (error.message ? ': ' + error.message : '');
            this.loading = false;
        }
    },

    // 覆盖nextStep方法，以适应5个步骤
    nextStep() {
        // 验证当前步骤
        if (this.validateCurrentStep()) {
            if (this.currentStep < 5) {  // 改为5个步骤
                this.currentStep++;
            }
        } else {
            // 显示验证错误提示
            this.showValidationErrors();
        }
    },

    // 扩展validateCurrentStep方法，增加第5步验证
    validateCurrentStep() {
        // 这里简化处理，实际应用中应该有更详细的验证逻辑
        switch (this.currentStep) {
            case 1:
                this.formValidation.step1Valid = !!this.tripData.title && 
                                                !!this.tripData.destination && 
                                                !!this.tripData.date && 
                                                this.tripData.duration > 0;
                return this.formValidation.step1Valid;
            case 2:
                // 检查行程规划是否有效
                this.formValidation.step2Valid = this.tripData.schedule.length > 0;
                return this.formValidation.step2Valid;
            case 3:
                // 检查佣金设置是否有效
                this.formValidation.step3Valid = this.tripData.baseCommission > 0;
                return this.formValidation.step3Valid;
            case 4:
                // 检查参与者设置是否有效
                this.formValidation.step4Valid = !!this.tripData.enrollmentDeadline && 
                                               this.tripData.maxParticipants >= this.tripData.minParticipants;
                return this.formValidation.step4Valid;
            case 5:
                // 检查归属设置是否有效
                return this.validateOwnershipSettings();
            default:
                return false;
        }
    },

    // 添加归属设置验证方法
    validateOwnershipSettings() {
        if (this.tripData.ownerType === 'platform') {
            return !!this.tripData.platformOwner.name && !!this.tripData.platformOwner.contact;
        } else if (this.tripData.ownerType === 'agency') {
            return !!this.tripData.agencyOwner.name && !!this.tripData.agencyOwner.contact;
        }
        return false;
    },

    // 覆盖validateAllSteps方法，增加第5步验证
    validateAllSteps() {
        // 验证第一步
        this.formValidation.step1Valid = !!this.tripData.title && 
                                        !!this.tripData.destination && 
                                        !!this.tripData.date && 
                                        this.tripData.duration > 0;
        
        // 验证第二步
        this.formValidation.step2Valid = this.tripData.schedule.length > 0;
        
        // 验证第三步
        this.formValidation.step3Valid = this.tripData.baseCommission > 0;
        
        // 验证第四步
        this.formValidation.step4Valid = !!this.tripData.enrollmentDeadline && 
                                       this.tripData.maxParticipants >= this.tripData.minParticipants;
        
        // 验证第五步
        this.formValidation.step5Valid = this.validateOwnershipSettings();
    },

    // 重试加载
    retryLoading() {
        this.loadTripData();
    },

    // 取消编辑
    cancelEdit() {
        if (this.hasUnsavedChanges()) {
            if (confirm('有未保存的修改，确定要放弃吗？')) {
                window.location.href = 'trip-list.html';
            }
        } else {
            window.location.href = 'trip-list.html';
        }
    },

    // 检查是否有未保存的更改
    hasUnsavedChanges() {
        if (!this.originalData) return false;
        
        // 简化处理，仅比较基本信息
        return this.tripData.title !== this.originalData.title ||
               this.tripData.destination !== this.originalData.destination ||
               this.tripData.date !== this.originalData.date ||
               this.tripData.duration !== this.originalData.duration ||
               this.tripData.baseCommission !== this.originalData.baseCommission;
    },

    // 停用行程
    async deactivateTrip() {
        if (confirm('确定要停用此行程吗？停用后将不会显示在网红可申请的行程列表中。')) {
            try {
                // 在实际应用中，这里应该调用后端API停用行程
                this.tripData.isActive = false;
                alert('行程已成功停用');
                
                // 记录历史操作
                this.tripData.history.push({
                    timestamp: new Date().toLocaleString('zh-CN'),
                    operator: '当前管理员',
                    description: '停用行程'
                });
                
                // 保存更改
                this.saveAsDraft();
            } catch (error) {
                console.error('停用行程失败:', error);
                alert('停用行程失败，请重试');
            }
        }
    },

    // 启用行程
    async activateTrip() {
        if (confirm('确定要启用此行程吗？启用后将会显示在网红可申请的行程列表中。')) {
            try {
                // 在实际应用中，这里应该调用后端API启用行程
                this.tripData.isActive = true;
                alert('行程已成功启用');
                
                // 记录历史操作
                this.tripData.history.push({
                    timestamp: new Date().toLocaleString('zh-CN'),
                    operator: '当前管理员',
                    description: '启用行程'
                });
                
                // 保存更改
                this.saveAsDraft();
            } catch (error) {
                console.error('启用行程失败:', error);
                alert('启用行程失败，请重试');
            }
        }
    },

    // 切换历史记录显示状态
    toggleHistory() {
        this.historyVisible = !this.historyVisible;
    },
    
    // 格式化日期时间
    formatDateTime(timestamp) {
        if (!timestamp) return '';
        return timestamp;  // 简化处理，实际应用中可能需要格式化
    }
});

// 页面加载后获取行程数据
document.addEventListener('DOMContentLoaded', () => {
    app.loadTripData();
    
    // 监听离开页面事件
    window.addEventListener('beforeunload', event => {
        if (app.hasUnsavedChanges()) {
            const message = '有未保存的修改，确定要离开吗？';
            event.returnValue = message;
            return message;
        }
    });
}); 