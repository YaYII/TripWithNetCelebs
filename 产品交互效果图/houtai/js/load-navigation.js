/**
 * 加载导航组件的工具函数
 * 
 * 使用方法：
 * 1. 在HTML中引入此脚本
 * 2. 调用loadNavigation('导航容器ID', '活跃菜单ID', '页面标题')
 */

// 异步加载导航组件
async function loadNavigation(containerId, activeMenu, pageTitle) {
    try {
        // 获取导航容器元素
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('导航容器不存在：', containerId);
            return;
        }
        
        // 异步获取导航组件HTML
        const response = await fetch('../components/navigation.html');
        if (!response.ok) {
            throw new Error(`导航组件加载失败: ${response.status}`);
        }
        
        // 设置导航组件HTML
        const html = await response.text();
        container.innerHTML = html;
        
        // 初始化导航
        if (window.navigationComponent) {
            window.navigationComponent.init(activeMenu, pageTitle);
        } else {
            console.warn('导航组件JS未加载，请确保已引入navigation.js');
        }
    } catch (error) {
        console.error('加载导航组件失败:', error);
        // 降级处理：在出错时显示简单导航
        document.getElementById(containerId).innerHTML = `
            <div class="basic-navigation">
                <h1>${pageTitle || '约旅网红平台'}</h1>
                <p>导航加载失败，<a href="trip-list.html">返回列表</a></p>
            </div>
        `;
    }
} 