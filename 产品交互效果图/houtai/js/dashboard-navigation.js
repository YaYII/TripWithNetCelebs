/**
 * 控制面板导航组件交互逻辑
 * 
 * 功能：
 * 1. 设置当前活跃菜单项
 * 2. 设置页面标题
 * 3. 处理导航交互
 * 4. 加载导航组件HTML
 */

// 加载控制面板导航组件
async function loadDashboardNavigation(containerId) {
    try {
        // 获取导航容器元素
        const container = document.getElementById(containerId);
        if (!container) {
            console.error('导航容器不存在：', containerId);
            return;
        }
        
        // 异步获取导航组件HTML (修正路径)
        const response = await fetch('./components/dashboard-navigation.html');
        if (!response.ok) {
            throw new Error(`控制面板导航组件加载失败: ${response.status}`);
        }
        
        // 设置导航组件HTML
        const html = await response.text();
        container.innerHTML = html;
        
        // 初始化导航事件监听
        initDashboardNavigationEvents();
    } catch (error) {
        console.error('加载控制面板导航组件失败:', error);
        // 降级处理：在出错时显示简单导航
        document.getElementById(containerId).innerHTML = `
            <div class="basic-navigation">
                <h1>约旅网红平台</h1>
                <ul>
                    <li><a href="index.html">控制面板</a></li>
                    <li><a href="trip-list.html">行程管理</a></li>
                </ul>
            </div>
        `;
    }
}

// 初始化导航事件监听
function initDashboardNavigationEvents() {
    // 通知图标点击事件
    const notificationIcon = document.querySelector('.notifications');
    if (notificationIcon) {
        notificationIcon.addEventListener('click', function() {
            alert('通知功能暂未实现');
        });
    }
    
    // 用户信息点击事件
    const userInfo = document.querySelector('.user-info');
    if (userInfo) {
        userInfo.addEventListener('click', function() {
            alert('用户信息设置功能暂未实现');
        });
    }
    
    // 处理响应式菜单
    const menuItems = document.querySelectorAll('.menu-item');
    if (menuItems.length > 0) {
        menuItems.forEach(item => {
            item.addEventListener('click', function(e) {
                if (window.innerWidth <= 992) {
                    // 在小屏幕上点击菜单项后自动关闭菜单
                    if (!e.target.closest('a')) {
                        e.preventDefault();
                    }
                }
            });
        });
    }
}

// 文档加载完成后初始化导航
document.addEventListener('DOMContentLoaded', function() {
    loadDashboardNavigation('navigation-container');
}); 