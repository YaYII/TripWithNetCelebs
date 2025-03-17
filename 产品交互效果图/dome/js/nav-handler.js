// 导航栏iframe通信处理

// 初始化导航栏
function initNavBar(currentPage) {
    // 监听来自iframe的消息
    window.addEventListener('message', function(event) {
        // 处理导航请求
        if (event.data && event.data.action === 'navigate') {
            const target = event.data.target;
            
            // 如果目标页面不是当前页面，则进行导航
            if (!window.location.href.includes(target)) {
                window.location.href = target;
            }
        }
        
        // 处理iframe高度调整请求
        if (event.data && event.data.action === 'adjustHeight') {
            const navFrame = document.getElementById('navFrame');
            if (navFrame) {
                navFrame.style.height = event.data.height + 'px';
            }
        }
    });
    
    // 向iframe发送当前页面信息
    const navFrame = document.getElementById('navFrame');
    if (navFrame && navFrame.contentWindow) {
        // 等待iframe加载完成
        navFrame.onload = function() {
            // 发送当前页面信息
            navFrame.contentWindow.postMessage({
                action: 'setCurrentPage',
                page: currentPage || getCurrentPageFromUrl()
            }, '*');
        };
    }
    
    // 检测是否为iPhone 16并应用特定样式
    detectIPhone16();
}

// 从URL获取当前页面
function getCurrentPageFromUrl() {
    const url = window.location.href;
    if (url.includes('home.html')) {
        return 'home';
    } else if (url.includes('trips.html')) {
        return 'trips';
    } else if (url.includes('profile.html') || url.includes('my-trips.html') || url.includes('my-favorites.html')) {
        return 'profile';
    }
    return 'home'; // 默认为首页
}

// 调整导航栏iframe高度
function adjustNavFrameHeight() {
    const navFrameContainer = document.querySelector('.nav-frame-container');
    const navFrame = document.getElementById('navFrame');
    
    if (navFrameContainer && navFrame) {
        // 获取底部安全区域高度
        const safeAreaBottom = getSafeAreaInsetBottom();
        
        // 设置容器高度
        navFrameContainer.style.height = `${60 + safeAreaBottom}px`;
        
        try {
            // 使用简单的数据结构
            const message = JSON.stringify({
                action: 'adjustHeight',
                safeAreaBottom: safeAreaBottom
            });
            
            // 确保iframe已经准备好
            if (navFrame.contentWindow) {
                navFrame.contentWindow.postMessage(message, window.location.origin);
            }
        } catch (e) {
            console.error('导航栏高度调整失败:', e);
        }
    }
}

// 获取底部安全区域高度
function getSafeAreaInsetBottom() {
    // 尝试获取CSS变量值
    let safeAreaInsetBottom = 0;
    
    // 首先尝试从CSS变量获取
    safeAreaInsetBottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-bottom')) || 0;
    
    // 如果CSS变量不可用，尝试使用环境变量
    if (safeAreaInsetBottom === 0) {
        try {
            // 创建一个临时元素来获取env()值
            const tempEl = document.createElement('div');
            tempEl.style.paddingBottom = 'env(safe-area-inset-bottom)';
            document.body.appendChild(tempEl);
            
            // 获取计算后的样式
            const computedStyle = window.getComputedStyle(tempEl);
            const paddingBottom = computedStyle.paddingBottom;
            
            // 移除临时元素
            document.body.removeChild(tempEl);
            
            // 解析像素值
            if (paddingBottom && paddingBottom !== '0px') {
                safeAreaInsetBottom = parseInt(paddingBottom) || 0;
            }
        } catch (e) {
            console.log('获取安全区域高度失败:', e);
            // 如果失败，使用默认值
            safeAreaInsetBottom = isIPhone16() ? 34 : 0;
        }
    }
    
    return safeAreaInsetBottom;
}

// 检测是否为iPhone 16
function isIPhone16() {
    // iPhone 16 Pro 的尺寸是 393 x 852
    const isIPhone16Size = window.screen.width === 393 && window.screen.height === 852;
    // 或者反过来（横屏情况）
    const isIPhone16SizeLandscape = window.screen.width === 852 && window.screen.height === 393;
    
    return isIPhone16Size || isIPhone16SizeLandscape;
}

// 为iPhone 16添加特定样式
function detectIPhone16() {
    if (isIPhone16()) {
        document.documentElement.classList.add('iphone16');
        
        // 设置CSS变量
        document.documentElement.style.setProperty('--iphone16-width', '393px');
        document.documentElement.style.setProperty('--iphone16-height', '852px');
    }
}

// 页面加载完成后初始化导航栏
document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化以确保iframe已经加载
    setTimeout(initNavBar, 100);
}); 