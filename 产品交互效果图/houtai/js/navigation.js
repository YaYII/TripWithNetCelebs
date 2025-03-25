/**
 * 导航组件交互逻辑
 * 
 * 功能：
 * 1. 设置当前活跃菜单项
 * 2. 设置页面标题
 * 3. 处理导航交互
 */

// 初始化导航组件
function initNavigation(activeMenu, pageTitle) {
    document.addEventListener('DOMContentLoaded', function() {
        // 设置活跃菜单项
        setActiveMenuItem(activeMenu);
        
        // 设置页面标题
        setPageTitle(pageTitle);
        
        // 初始化导航事件监听
        initNavigationEvents();
    });
}

// 设置活跃菜单项
function setActiveMenuItem(menuId) {
    // 先移除所有菜单项的active类
    const menuItems = document.querySelectorAll('.menu-item');
    menuItems.forEach(item => item.classList.remove('active'));
    
    // 为当前活跃菜单项添加active类
    const activeItem = document.getElementById(menuId);
    if (activeItem) {
        activeItem.classList.add('active');
    }
}

// 设置页面标题
function setPageTitle(title) {
    const pageTitleElement = document.getElementById('page-title');
    if (pageTitleElement) {
        pageTitleElement.textContent = title;
    }
    
    // 同时设置文档标题
    document.title = title + ' - 约旅网红平台';
}

// 初始化导航事件监听
function initNavigationEvents() {
    // 通知图标点击事件
    const notificationIcon = document.querySelector('.notifications');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            alert('通知功能暂未实现');
        });
    }
    
    // 可以添加更多导航相关的事件处理
}

// 导出导航组件API
window.navigationComponent = {
    init: initNavigation,
    setActiveMenu: setActiveMenuItem,
    setPageTitle: setPageTitle
}; 