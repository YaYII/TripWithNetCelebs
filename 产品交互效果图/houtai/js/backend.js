/**
 * 约旅网红平台 - 后台管理系统公共函数
 * @module backend
 */

// 全局配置
const BackendConfig = {
    // API接口基础URL，实际项目中应根据环境配置
    apiBaseUrl: 'https://api.example.com/v1',
    // 分页配置
    pagination: {
        defaultPageSize: 10,
        pageSizeOptions: [5, 10, 20, 50]
    },
    // 日期格式
    dateFormat: 'YYYY-MM-DD',
    // 状态常量
    status: {
        ACTIVE: 'active',
        INACTIVE: 'inactive',
        ONGOING: 'ongoing',
        COMPLETED: 'completed'
    }
};

/**
 * 全局通用工具函数对象
 */
const BackendUtils = {
    /**
     * 格式化日期
     * @param {Date|string} date - 要格式化的日期对象或字符串
     * @param {string} [format=BackendConfig.dateFormat] - 格式化模式
     * @returns {string} 格式化后的日期字符串
     */
    formatDate(date, format = BackendConfig.dateFormat) {
        if (!date) return '';
        
        date = typeof date === 'string' ? new Date(date) : date;
        
        if (!(date instanceof Date) || isNaN(date)) {
            console.error('无效的日期:', date);
            return '';
        }
        
        // 简单日期格式化，实际项目中可以使用日期库如dayjs
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        
        format = format.replace('YYYY', year);
        format = format.replace('MM', month);
        format = format.replace('DD', day);
        
        return format;
    },
    
    /**
     * 计算日期差（天数）
     * @param {Date|string} startDate - 开始日期
     * @param {Date|string} endDate - 结束日期
     * @returns {number} 两个日期之间的天数
     */
    dateDiff(startDate, endDate) {
        if (!startDate || !endDate) return 0;
        
        startDate = typeof startDate === 'string' ? new Date(startDate) : startDate;
        endDate = typeof endDate === 'string' ? new Date(endDate) : endDate;
        
        // 重置时间部分以确保准确计算天数
        startDate.setHours(0, 0, 0, 0);
        endDate.setHours(0, 0, 0, 0);
        
        const diffTime = Math.abs(endDate - startDate);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        return diffDays;
    },
    
    /**
     * 获取状态标签的显示文本
     * @param {string} status - 状态代码
     * @returns {string} 状态的显示文本
     */
    getStatusText(status) {
        const statusMap = {
            [BackendConfig.status.ACTIVE]: '已生效',
            [BackendConfig.status.INACTIVE]: '未生效',
            [BackendConfig.status.ONGOING]: '进行中',
            [BackendConfig.status.COMPLETED]: '已结束',
            'default': '未知状态'
        };
        
        return statusMap[status] || statusMap.default;
    },
    
    /**
     * 是否为空值（null, undefined, 空字符串, 空数组）
     * @param {*} value - 要检查的值
     * @returns {boolean} 是否为空
     */
    isEmpty(value) {
        if (value === null || value === undefined) return true;
        if (typeof value === 'string' && value.trim() === '') return true;
        if (Array.isArray(value) && value.length === 0) return true;
        return false;
    },
    
    /**
     * 生成唯一ID
     * @returns {string} 生成的唯一ID
     */
    generateUniqueId() {
        return Date.now().toString(36) + Math.random().toString(36).substring(2);
    },
    
    /**
     * 防抖函数，用于限制函数的执行频率
     * @param {Function} func - 要执行的函数
     * @param {number} wait - 等待时间（毫秒）
     * @returns {Function} 防抖后的函数
     */
    debounce(func, wait = 300) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    },
    
    /**
     * 将查询参数对象转换为URL查询字符串
     * @param {Object} params - 查询参数对象
     * @returns {string} 格式化后的查询字符串
     */
    formatQueryParams(params) {
        if (!params || typeof params !== 'object') return '';
        
        return Object.entries(params)
            .filter(([_, value]) => !this.isEmpty(value))
            .map(([key, value]) => `${encodeURIComponent(key)}=${encodeURIComponent(value)}`)
            .join('&');
    },
    
    /**
     * 从URL获取查询参数
     * @param {string} name - 参数名
     * @returns {string|null} 参数值或null
     */
    getQueryParam(name) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(name);
    },
    
    /**
     * 截断文本并添加省略号
     * @param {string} text - 要截断的文本
     * @param {number} maxLength - 最大长度
     * @returns {string} 截断后的文本
     */
    truncateText(text, maxLength = 50) {
        if (!text || text.length <= maxLength) return text;
        return text.substring(0, maxLength) + '...';
    }
};

/**
 * API请求封装
 */
const BackendApi = {
    /**
     * 发送HTTP请求
     * @param {string} url - 请求URL
     * @param {Object} options - 请求选项
     * @returns {Promise<any>} Promise对象
     */
    async request(url, options = {}) {
        const defaultOptions = {
            headers: {
                'Content-Type': 'application/json',
                // 实际项目中应添加认证头
                // 'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
            credentials: 'include'
        };
        
        const mergedOptions = { ...defaultOptions, ...options };
        
        if (mergedOptions.body && typeof mergedOptions.body === 'object') {
            mergedOptions.body = JSON.stringify(mergedOptions.body);
        }
        
        try {
            // 实际项目中应添加加载指示器
            const response = await fetch(`${BackendConfig.apiBaseUrl}${url}`, mergedOptions);
            
            // 检查状态码
            if (!response.ok) {
                const errorData = await response.json().catch(() => ({}));
                throw new Error(errorData.message || `请求失败: ${response.status} ${response.statusText}`);
            }
            
            // 尝试以JSON形式解析响应
            return await response.json();
        } catch (error) {
            console.error('API请求错误:', error);
            throw error;
        }
    },
    
    /**
     * 发送GET请求
     * @param {string} url - 请求URL
     * @param {Object} params - 查询参数
     * @returns {Promise<any>} Promise对象
     */
    get(url, params = {}) {
        const queryString = BackendUtils.formatQueryParams(params);
        const fullUrl = queryString ? `${url}?${queryString}` : url;
        return this.request(fullUrl, { method: 'GET' });
    },
    
    /**
     * 发送POST请求
     * @param {string} url - 请求URL
     * @param {Object} data - 请求数据
     * @returns {Promise<any>} Promise对象
     */
    post(url, data = {}) {
        return this.request(url, {
            method: 'POST',
            body: data
        });
    },
    
    /**
     * 发送PUT请求
     * @param {string} url - 请求URL
     * @param {Object} data - 请求数据
     * @returns {Promise<any>} Promise对象
     */
    put(url, data = {}) {
        return this.request(url, {
            method: 'PUT',
            body: data
        });
    },
    
    /**
     * 发送DELETE请求
     * @param {string} url - 请求URL
     * @returns {Promise<any>} Promise对象
     */
    delete(url) {
        return this.request(url, {
            method: 'DELETE'
        });
    }
};

/**
 * 通知提示工具
 */
const BackendNotification = {
    /**
     * 显示成功提示
     * @param {string} message - 提示消息
     */
    success(message) {
        // 实际项目中应改为使用UI组件库的通知组件
        alert(`✅ ${message}`);
    },
    
    /**
     * 显示错误提示
     * @param {string} message - 提示消息
     */
    error(message) {
        alert(`❌ ${message}`);
    },
    
    /**
     * 显示警告提示
     * @param {string} message - 提示消息
     */
    warning(message) {
        alert(`⚠️ ${message}`);
    },
    
    /**
     * 显示信息提示
     * @param {string} message - 提示消息
     */
    info(message) {
        alert(`ℹ️ ${message}`);
    },
    
    /**
     * 显示确认对话框
     * @param {string} message - 提示消息
     * @param {string} title - 标题
     * @returns {Promise<boolean>} 用户选择结果
     */
    confirm(message, title = '确认') {
        return new Promise((resolve) => {
            const confirmed = window.confirm(`${title}\n${message}`);
            resolve(confirmed);
        });
    }
};

/**
 * 行程管理相关功能
 */
const TripManager = {
    /**
     * 获取所有行程列表
     * @param {Object} params - 查询参数
     * @returns {Promise<Array>} 行程列表
     */
    async getTrips(params = {}) {
        return BackendApi.get('/trips', params);
    },
    
    /**
     * 获取行程详情
     * @param {number|string} tripId - 行程ID
     * @returns {Promise<Object>} 行程详情
     */
    async getTripById(tripId) {
        return BackendApi.get(`/trips/${tripId}`);
    },
    
    /**
     * 创建新行程
     * @param {Object} tripData - 行程数据
     * @returns {Promise<Object>} 创建结果
     */
    async createTrip(tripData) {
        return BackendApi.post('/trips', tripData);
    },
    
    /**
     * 更新行程
     * @param {number|string} tripId - 行程ID
     * @param {Object} tripData - 行程数据
     * @returns {Promise<Object>} 更新结果
     */
    async updateTrip(tripId, tripData) {
        return BackendApi.put(`/trips/${tripId}`, tripData);
    },
    
    /**
     * 删除行程
     * @param {number|string} tripId - 行程ID
     * @returns {Promise<Object>} 删除结果
     */
    async deleteTrip(tripId) {
        return BackendApi.delete(`/trips/${tripId}`);
    },
    
    /**
     * 激活行程（设为生效状态）
     * @param {number|string} tripId - 行程ID
     * @returns {Promise<Object>} 操作结果
     */
    async activateTrip(tripId) {
        return BackendApi.put(`/trips/${tripId}/activate`);
    },
    
    /**
     * 取消行程生效状态
     * @param {number|string} tripId - 行程ID
     * @returns {Promise<Object>} 操作结果
     */
    async deactivateTrip(tripId) {
        return BackendApi.put(`/trips/${tripId}/deactivate`);
    },
    
    /**
     * 复制行程
     * @param {number|string} tripId - 要复制的行程ID
     * @returns {Promise<Object>} 新行程数据
     */
    async copyTrip(tripId) {
        return BackendApi.post(`/trips/${tripId}/copy`);
    },
    
    /**
     * 获取行程参与者列表
     * @param {number|string} tripId - 行程ID
     * @returns {Promise<Array>} 参与者列表
     */
    async getTripParticipants(tripId) {
        return BackendApi.get(`/trips/${tripId}/participants`);
    }
};

// 导出对象，供其他模块使用
window.BackendConfig = BackendConfig;
window.BackendUtils = BackendUtils;
window.BackendApi = BackendApi;
window.BackendNotification = BackendNotification;
window.TripManager = TripManager; 