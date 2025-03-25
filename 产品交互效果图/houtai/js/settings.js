/**
 * 系统设置页JavaScript
 * @description 处理系统设置数据的加载、编辑和保存功能
 */

new Vue({
    el: '#app',
    data: {
        activeTab: 'basic',
        // 系统设置数据
        settings: {
            basic: {
                platformName: '约旅网红平台',
                platformDesc: '连接网红与旅行社的旅游合作平台，提供优质旅游资源和网红推广服务。',
                contactPhone: '400-123-4567',
                contactEmail: 'support@tripwithcelebs.com',
                serviceHours: '9:00-18:00 (周一至周五)',
                icp: '沪ICP备12345678号-1'
            },
            commission: {
                defaultRate: 15,
                minRate: 5,
                maxRate: 30,
                settlementDays: 30,
                paymentMethods: ['bank', 'alipay', 'wechat']
            },
            notification: {
                adminEmail: true,
                adminSms: true,
                influencerInvitation: true,
                influencerTripChange: true,
                influencerCommission: true,
                agencyNewOrder: true,
                agencyInfluencerConfirm: true
            },
            security: {
                twoFactorAuth: false,
                ipRestriction: false,
                strongPassword: true,
                passwordExpiry: false,
                passwordExpiryDays: 90,
                loginAttempts: 5,
                lockoutMinutes: 30
            }
        },
        // 原始设置数据备份（用于重置功能）
        originalSettings: null,
        // 管理员账号信息
        adminAccount: {
            currentPassword: '',
            newPassword: '',
            confirmPassword: '',
            email: 'admin@tripwithcelebs.com',
            phone: '13912345678'
        },
        // 原始管理员账号信息备份
        originalAdminAccount: null,
        // 状态信息
        saveStatus: {
            saving: false,
            message: '',
            type: ''
        }
    },
    
    created() {
        // 备份原始数据，用于重置功能
        this.originalSettings = JSON.parse(JSON.stringify(this.settings));
        this.originalAdminAccount = JSON.parse(JSON.stringify(this.adminAccount));
    },
    
    methods: {
        /**
         * 保存指定分类的设置
         * @param {String} category 设置分类
         */
        saveSettings(category) {
            this.saveStatus.saving = true;
            this.saveStatus.message = '';
            
            // 模拟API保存请求
            setTimeout(() => {
                // 在实际项目中，这里会发送API请求保存设置
                console.log(`保存${category}设置`, this.settings[category]);
                
                // 更新备份
                this.originalSettings[category] = JSON.parse(JSON.stringify(this.settings[category]));
                
                // 显示成功消息
                this.saveStatus.saving = false;
                this.saveStatus.type = 'success';
                this.saveStatus.message = '设置保存成功！';
                this.showMessage('设置保存成功！', 'success');
            }, 800);
        },
        
        /**
         * 重置指定分类的设置为上次保存的值
         * @param {String} category 设置分类
         */
        resetSettings(category) {
            // 重置为上一次保存的数据
            this.settings[category] = JSON.parse(JSON.stringify(this.originalSettings[category]));
            this.showMessage('设置已重置', 'info');
        },
        
        /**
         * 更新管理员账号信息
         */
        updateAdminAccount() {
            // 验证密码
            if (this.adminAccount.newPassword) {
                if (!this.adminAccount.currentPassword) {
                    this.showMessage('请输入当前密码', 'error');
                    return;
                }
                
                if (this.adminAccount.newPassword !== this.adminAccount.confirmPassword) {
                    this.showMessage('两次输入的新密码不一致', 'error');
                    return;
                }
                
                if (this.adminAccount.newPassword.length < 6) {
                    this.showMessage('新密码长度不能少于6位', 'error');
                    return;
                }
            }
            
            this.saveStatus.saving = true;
            
            // 模拟API请求
            setTimeout(() => {
                console.log('更新管理员账号信息', this.adminAccount);
                
                // 清空密码字段
                this.adminAccount.currentPassword = '';
                this.adminAccount.newPassword = '';
                this.adminAccount.confirmPassword = '';
                
                // 更新备份
                this.originalAdminAccount.email = this.adminAccount.email;
                this.originalAdminAccount.phone = this.adminAccount.phone;
                
                this.saveStatus.saving = false;
                this.showMessage('账号信息更新成功', 'success');
            }, 800);
        },
        
        /**
         * 重置管理员账号信息表单
         */
        resetAdminAccount() {
            this.adminAccount.currentPassword = '';
            this.adminAccount.newPassword = '';
            this.adminAccount.confirmPassword = '';
            this.adminAccount.email = this.originalAdminAccount.email;
            this.adminAccount.phone = this.originalAdminAccount.phone;
            this.showMessage('表单已重置', 'info');
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
        }
    }
}); 