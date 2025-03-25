/**
 * 行程表单基础组件
 * @file 提供行程表单的基础功能，被trip-create.js和trip-edit.js引用
 * @author 约旅网红平台开发团队
 */

// 创建行程表单基础Vue应用
const tripFormApp = Vue.createApp({
    data() {
        return {
            // 当前所在的步骤
            currentStep: 1,
            // 预览面板是否显示
            showPreview: false,
            // 富文本编辑器实例
            quillEditor: null,
            // 行程数据对象
            tripData: {
                title: '',
                type: '',
                theme: '',
                destination: '',
                date: '',
                duration: 1,
                description: '',
                // 行程状态标签
                statusLabels: {
                    isHot: false,
                    isLimited: false,
                    isPromotion: false,
                    isNew: true  // 默认为新品
                },
                // 图片数组
                images: [],
                // 行程详细规划
                schedule: [],
                // 行程亮点
                highlights: [],
                // 创作者要求
                requirements: [],
                // 费用包含
                inclusions: [],
                // 费用不包含
                exclusions: [],
                // 佣金信息
                baseCommission: 0,
                bonusCommission: 0,
                commissionRules: [],
                // 报名信息
                enrollmentDeadline: '',
                minParticipants: 1,
                maxParticipants: 10,
                // 所有者类型（平台或旅行社）
                ownerType: 'platform',
                // 平台所有者信息
                platformOwner: {
                    name: '',
                    contact: '',
                    department: ''
                },
                // 旅行社所有者信息
                agencyOwner: {
                    id: '',
                    name: '',
                    contact: ''
                },
                // 状态
                isActive: true
            },
            // 表单验证状态
            formValidation: {
                step1Valid: false,
                step2Valid: false,
                step3Valid: false,
                step4Valid: false,
                step5Valid: false
            }
        };
    },
    computed: {
        /**
         * 计算是否可以发布行程
         * @returns {boolean} 如果所有步骤都有效则返回true
         */
        canPublish() {
            // 对于trip-edit.html需要考虑第5步
            if (document.querySelector('.step-tab:nth-child(5)')) {
                return this.formValidation.step1Valid && 
                       this.formValidation.step2Valid && 
                       this.formValidation.step3Valid && 
                       this.formValidation.step4Valid &&
                       this.formValidation.step5Valid;
            }
            // 对于trip-create.html只需要考虑到第4步
            return this.formValidation.step1Valid && 
                   this.formValidation.step2Valid && 
                   this.formValidation.step3Valid && 
                   this.formValidation.step4Valid;
        },
        /**
         * 获取预览图片URL
         * @returns {string} 预览图片的URL
         */
        previewImage() {
            if (this.tripData.images && this.tripData.images.length > 0) {
                return this.tripData.images[0].url;
            }
            return 'images/default-trip.jpg';
        }
    },
    methods: {
        /**
         * 导航到上一步
         */
        prevStep() {
            if (this.currentStep > 1) {
                this.currentStep--;
            }
        },
        /**
         * 导航到下一步
         */
        nextStep() {
            // 验证当前步骤
            if (this.validateCurrentStep()) {
                const maxSteps = document.querySelector('.step-tab:nth-child(5)') ? 5 : 4;
                if (this.currentStep < maxSteps) {
                    this.currentStep++;
                }
            } else {
                // 显示验证错误提示
                this.showValidationErrors();
            }
        },
        /**
         * 验证当前步骤的表单输入
         * @returns {boolean} 验证结果
         */
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
                    // 检查合作条件是否有效
                    this.formValidation.step3Valid = this.tripData.baseCommission > 0;
                    return this.formValidation.step3Valid;
                case 4:
                    // 检查资料上传是否有效
                    this.formValidation.step4Valid = true;
                    return this.formValidation.step4Valid;
                case 5:
                    // 检查第5步表单（如果存在）
                    if (document.querySelector('.step-tab:nth-child(5)')) {
                        // 默认验证逻辑，子类应该覆盖这个方法以提供具体实现
                        this.formValidation.step5Valid = true;
                        return this.formValidation.step5Valid;
                    }
                    return true;
                default:
                    return false;
            }
        },
        /**
         * 显示表单验证错误提示
         */
        showValidationErrors() {
            // 实际应用中，这里应该显示具体的错误信息
            alert('请填写所有必填字段！');
        },
        /**
         * 触发图片上传
         */
        triggerImageUpload() {
            this.$refs.imageUpload.click();
        },
        /**
         * 处理图片上传
         * @param {Event} event - 文件上传事件
         */
        handleImageUpload(event) {
            const files = event.target.files;
            if (!files || files.length === 0) return;
            
            // 限制上传数量
            if (this.tripData.images.length + files.length > 8) {
                alert('最多只能上传8张图片');
                return;
            }
            
            // 处理每个文件
            for (let i = 0; i < files.length; i++) {
                const file = files[i];
                const reader = new FileReader();
                
                reader.onload = (e) => {
                    this.tripData.images.push({
                        url: e.target.result,
                        file: file
                    });
                };
                
                reader.readAsDataURL(file);
            }
        },
        /**
         * 移除已上传的图片
         * @param {number} index - 要移除的图片索引
         */
        removeImage(index) {
            this.tripData.images.splice(index, 1);
        },
        /**
         * 预览行程
         */
        previewTrip() {
            this.showPreview = true;
        },
        /**
         * 切换预览面板的显示状态
         */
        togglePreview() {
            this.showPreview = !this.showPreview;
        },
        /**
         * 保存行程为草稿
         */
        saveAsDraft() {
            // 获取富文本编辑器的内容
            if (this.quillEditor) {
                this.tripData.description = this.quillEditor.root.innerHTML;
            }
            
            // 这里应该有实际的保存逻辑，例如API调用
            console.log('保存行程草稿', this.tripData);
            alert('行程草稿已保存');
        },
        /**
         * 发布行程
         */
        publishTrip() {
            if (this.canPublish) {
                // 获取富文本编辑器的内容
                if (this.quillEditor) {
                    this.tripData.description = this.quillEditor.root.innerHTML;
                }
                
                // 这里应该有实际的保存逻辑，例如API调用
                console.log('发布行程', this.tripData);
                alert('行程已成功发布');
                // 发布成功后跳转到行程列表页面
                // window.location.href = 'trip-list.html';
            } else {
                alert('请完成所有必填信息后再发布行程');
            }
        },
        /**
         * 格式化日期显示
         * @param {string} dateString - 日期字符串
         * @returns {string} 格式化后的日期字符串
         */
        formatDate(dateString) {
            if (!dateString) return '';
            const date = new Date(dateString);
            return `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
        },
        /**
         * 计算总佣金
         * @returns {number} 总佣金金额
         */
        calculateTotalCommission() {
            return (this.tripData.baseCommission || 0) + (this.tripData.bonusCommission || 0);
        },
        /**
         * 添加行程日程
         */
        addScheduleDay() {
            this.tripData.schedule.push({ activities: [] });
        },
        /**
         * 添加行程活动
         * @param {number} dayIndex - 行程日索引
         */
        addActivity(dayIndex) {
            this.tripData.schedule[dayIndex].activities.push({
                time: '',
                name: '',
                description: ''
            });
        },
        /**
         * 删除行程活动
         * @param {number} dayIndex - 行程日索引
         * @param {number} activityIndex - 活动索引
         */
        removeActivity(dayIndex, activityIndex) {
            this.tripData.schedule[dayIndex].activities.splice(activityIndex, 1);
        },
        /**
         * 删除行程日程
         * @param {number} dayIndex - 行程日索引
         */
        removeScheduleDay(dayIndex) {
            this.tripData.schedule.splice(dayIndex, 1);
        }
    },
    mounted() {
        // 初始化富文本编辑器
        this.quillEditor = new Quill('#description-editor', {
            theme: 'snow',
            placeholder: '请详细描述行程特点、适合人群、预期体验等',
            modules: {
                toolbar: [
                    ['bold', 'italic', 'underline', 'strike'],
                    ['blockquote', 'code-block'],
                    [{ 'header': 1 }, { 'header': 2 }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'script': 'sub' }, { 'script': 'super' }],
                    [{ 'indent': '-1' }, { 'indent': '+1' }],
                    [{ 'direction': 'rtl' }],
                    [{ 'size': ['small', false, 'large', 'huge'] }],
                    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'font': [] }],
                    [{ 'align': [] }],
                    ['clean'],
                    ['link', 'image', 'video']
                ]
            }
        });
        
        // 监听富文本编辑器内容变化
        this.quillEditor.on('text-change', () => {
            this.tripData.description = this.quillEditor.root.innerHTML;
        });
    }
});

// 移除这里的挂载，让子文件负责挂载
// tripFormApp.mount('#app'); 