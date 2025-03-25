/**
 * 行程创建页面的Vue应用
 * @file 实现行程创建页面的所有交互功能，包括表单验证、多步骤导航、图片上传和预览等功能
 * @author 约旅网红平台开发团队
 */

// 创建Vue应用实例
const app = tripFormApp.mount('#app');

// 扩展实例方法
Object.assign(app, {
    // 这里可以添加创建页面特有的功能
    
    /**
     * 保存行程为草稿（覆盖基类方法）
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
     * 发布行程（覆盖基类方法）
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
            window.location.href = 'trip-list.html';
        } else {
            alert('请完成所有必填信息后再发布行程');
        }
    },
    
    /**
     * 验证当前步骤的表单输入（覆盖基类方法）
     * @returns {boolean} 验证结果
     */
    validateCurrentStep() {
        // 修复验证逻辑，确保使用schedule而非itinerary
        switch (this.currentStep) {
            case 1:
                this.formValidation.step1Valid = !!this.tripData.title && 
                                               !!this.tripData.type && 
                                               !!this.tripData.destination && 
                                               !!this.tripData.date && 
                                               this.tripData.duration > 0;
                return this.formValidation.step1Valid;
            case 2:
                // 检查行程规划是否有效（使用schedule而非itinerary）
                this.formValidation.step2Valid = this.tripData.schedule && this.tripData.schedule.length > 0;
                return this.formValidation.step2Valid;
            case 3:
                // 检查合作条件是否有效
                this.formValidation.step3Valid = this.tripData.baseCommission > 0;
                return this.formValidation.step3Valid;
            case 4:
                // 检查资料上传是否有效
                this.formValidation.step4Valid = true;
                return this.formValidation.step4Valid;
            default:
                return false;
        }
    }
});

// 初始化行程数据
document.addEventListener('DOMContentLoaded', () => {
    // 初始化默认数据或其他初始化操作
}); 