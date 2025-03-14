// 导航栏iframe通信处理

// 初始化导航栏
function initNavBar(currentPage) {
    // 获取导航栏iframe
    const navFrame = document.getElementById('navFrame');
    
    // 调整iframe高度以适应底部安全区域
    adjustNavFrameHeight();
    
    // 监听窗口大小变化，重新调整高度
    window.addEventListener('resize', adjustNavFrameHeight);
    
    // 监听来自导航栏iframe的消息
    window.addEventListener('message', function(event) {
        // 检查消息来源
        if (event.origin !== window.location.origin) {
            return;
        }
        
        // 处理导航消息
        if (typeof event.data === 'object' && event.data && event.data.action === 'navigate') {
            // 导航到指定URL
            if (event.data.target) {
                window.location.href = event.data.target;
            }
        }
    });
    
    // 如果提供了当前页面参数，通知导航栏高亮对应项
    if (currentPage && navFrame) {
        // 确保iframe已经加载完成
        const sendMessage = () => {
            try {
                // 使用简单的数据结构
                const message = JSON.stringify({
                    action: 'setActivePage',
                    page: currentPage
                });
                
                // 确保iframe已经准备好
                if (navFrame.contentWindow) {
                    navFrame.contentWindow.postMessage(message, window.location.origin);
                }
            } catch (e) {
                console.error('导航栏通信失败:', e);
            }
        };

        if (navFrame.contentDocument && navFrame.contentDocument.readyState === 'complete') {
            sendMessage();
        } else {
            navFrame.onload = sendMessage;
        }
    }
    
    // 检测是否为iPhone 16并应用特定样式
    detectIPhone16();
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