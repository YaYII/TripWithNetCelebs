/**
 * 约旅网红端通用 JavaScript 函数
 */

/**
 * 检查用户是否已登录，未登录则重定向到登录页面
 * @param {boolean} allowVisitor - 是否允许游客模式访问，默认为false
 * @returns {Object|null} - 返回用户信息对象，未登录则返回null
 */
function checkLogin(allowVisitor = false) {
    // 从localStorage获取登录状态
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    
    // 如果未登录，重定向到登录页面
    if (!isLoggedIn) {
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
        return null;
    }
    
    // 获取用户信息
    const userInfo = JSON.parse(localStorage.getItem('userInfo') || '{}');
    
    // 如果是游客模式但不允许游客访问，则重定向到登录页面
    if (userInfo.isVisitor && !allowVisitor) {
        window.location.href = 'login.html?redirect=' + encodeURIComponent(window.location.href);
        return null;
    }
    
    return userInfo;
}

/**
 * 用户登出
 * @param {boolean} redirect - 是否重定向到登录页面，默认为true
 */
function logout(redirect = true) {
    // 清除本地存储中的用户信息
    localStorage.removeItem('userInfo');
    localStorage.removeItem('isLoggedIn');
    
    // 重定向到登录页面
    if (redirect) {
        window.location.href = 'login.html';
    }
}

/**
 * 显示Toast提示消息
 * @param {string} message - 要显示的消息
 * @param {number} duration - 显示时长(ms)，默认3000ms
 */
function showToast(message, duration = 3000) {
    // 添加全局样式
    if (!document.getElementById('toast-style')) {
        const style = document.createElement('style');
        style.id = 'toast-style';
        style.textContent = `
            .toast {
                position: fixed;
                top: 80px;
                left: 50%;
                transform: translateX(-50%) translateY(-20px);
                background-color: rgba(0, 0, 0, 0.7);
                color: white;
                padding: 10px 20px;
                border-radius: 4px;
                font-size: 14px;
                opacity: 0;
                transition: opacity 0.3s, transform 0.3s;
                z-index: 9999;
            }
            
            .toast.show {
                opacity: 1;
                transform: translateX(-50%) translateY(0);
            }
        `;
        document.head.appendChild(style);
    }
    
    // 创建toast元素
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.textContent = message;
    
    // 添加到文档
    document.body.appendChild(toast);
    
    // 显示toast
    setTimeout(() => {
        toast.classList.add('show');
    }, 10);
    
    // duration毫秒后移除toast
    setTimeout(() => {
        toast.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(toast);
        }, 300);
    }, duration);
}

/**
 * 从URL获取查询参数
 * @param {string} name - 参数名
 * @returns {string|null} - 参数值，如果不存在则返回null
 */
function getQueryParam(name) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name);
}

/**
 * 格式化数字，加千位分隔符
 * @param {number} num - 要格式化的数字
 * @returns {string} - 格式化后的字符串
 */
function formatNumber(num) {
    if (typeof num !== 'number') {
        return num;
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/**
 * 格式化日期
 * @param {Date|string} date - 日期对象或日期字符串
 * @param {string} format - 格式化模板，默认为 'YYYY-MM-DD'
 * @returns {string} - 格式化后的日期字符串
 */
function formatDate(date, format = 'YYYY-MM-DD') {
    if (!date) return '';
    
    const d = typeof date === 'string' ? new Date(date) : date;
    
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, '0');
    const day = String(d.getDate()).padStart(2, '0');
    const hours = String(d.getHours()).padStart(2, '0');
    const minutes = String(d.getMinutes()).padStart(2, '0');
    const seconds = String(d.getSeconds()).padStart(2, '0');
    
    return format
        .replace('YYYY', year)
        .replace('MM', month)
        .replace('DD', day)
        .replace('HH', hours)
        .replace('mm', minutes)
        .replace('ss', seconds);
} 