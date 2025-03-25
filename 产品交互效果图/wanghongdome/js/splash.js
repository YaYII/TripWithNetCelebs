/**
 * 启动页JavaScript逻辑
 * 负责应用初始化、资源预加载、检查登录状态，并在完成后自动跳转到相应页面
 */

/**
 * 预加载的资源列表
 */
const resourcesToPreload = [
    '../img/logo.png',
    '../img/potato.png',
    '../css/common.css',
    '../css/login.css',
    '../css/index.css'
];

/**
 * 启动页配置
 */
const splashConfig = {
    // 最小显示时间（毫秒）
    minDisplayTime: 2500,
    
    // 资源加载超时时间（毫秒）
    loadTimeout: 5000
};

/**
 * 执行启动页逻辑
 */
(function() {
    // 记录启动页开始时间
    const startTime = Date.now();
    
    // 跟踪已加载资源
    let loadedResources = 0;
    const totalResources = resourcesToPreload.length;
    
    // 设置加载超时
    const timeoutId = setTimeout(() => {
        console.log('资源加载超时，继续启动应用');
        proceedToNextPage();
    }, splashConfig.loadTimeout);
    
    /**
     * 预加载应用资源
     */
    function preloadResources() {
        // 如果没有需要预加载的资源，则直接跳过
        if (totalResources === 0) {
            checkRemainingTime();
            return;
        }
        
        // 预加载每个资源
        resourcesToPreload.forEach(url => {
            const fileExtension = url.split('.').pop().toLowerCase();
            
            if (fileExtension === 'png' || fileExtension === 'jpg' || fileExtension === 'jpeg' || fileExtension === 'gif' || fileExtension === 'svg') {
                // 预加载图片
                const img = new Image();
                img.onload = resourceLoaded;
                img.onerror = resourceError;
                img.src = url;
            } else if (fileExtension === 'css') {
                // 预加载CSS
                const link = document.createElement('link');
                link.rel = 'preload';
                link.as = 'style';
                link.href = url;
                link.onload = resourceLoaded;
                link.onerror = resourceError;
                document.head.appendChild(link);
            } else if (fileExtension === 'js') {
                // 预加载JavaScript
                const script = document.createElement('script');
                script.rel = 'preload';
                script.as = 'script';
                script.href = url;
                script.onload = resourceLoaded;
                script.onerror = resourceError;
                document.head.appendChild(script);
            }
        });
    }
    
    /**
     * 资源加载成功的回调
     */
    function resourceLoaded() {
        loadedResources++;
        updateLoadingProgress();
        
        // 如果所有资源都已加载完成
        if (loadedResources >= totalResources) {
            checkRemainingTime();
        }
    }
    
    /**
     * 资源加载失败的回调
     */
    function resourceError() {
        console.error('资源加载失败:', this.src || this.href);
        loadedResources++;
        updateLoadingProgress();
        
        // 即使某些资源加载失败，我们仍然继续
        if (loadedResources >= totalResources) {
            checkRemainingTime();
        }
    }
    
    /**
     * 更新加载进度显示
     */
    function updateLoadingProgress() {
        const progress = Math.floor((loadedResources / totalResources) * 100);
        const loadingText = document.querySelector('.loading-text');
        if (loadingText) {
            loadingText.textContent = `应用载入中... ${progress}%`;
        }
    }
    
    /**
     * 检查是否需要等待最小显示时间
     */
    function checkRemainingTime() {
        clearTimeout(timeoutId);
        
        const elapsedTime = Date.now() - startTime;
        const remainingTime = Math.max(0, splashConfig.minDisplayTime - elapsedTime);
        
        // 如果已经显示了最小时间，则立即跳转，否则等待剩余时间
        if (remainingTime <= 0) {
            proceedToNextPage();
        } else {
            setTimeout(proceedToNextPage, remainingTime);
        }
    }
    
    /**
     * 跳转到下一个页面（登录页或首页）
     */
    function proceedToNextPage() {
        // 检查用户是否已登录
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        
        // 获取当前URL参数，如果有redirect参数则保留
        const urlParams = new URLSearchParams(window.location.search);
        const redirectParam = urlParams.get('redirect');
        
        let targetUrl = 'login.html';
        
        // 如果用户已登录，直接跳转到首页
        if (isLoggedIn) {
            targetUrl = 'index.html';
        }
        
        // 如果有重定向参数，则添加到目标URL
        if (redirectParam) {
            targetUrl += `?redirect=${encodeURIComponent(redirectParam)}`;
        }
        
        // 执行页面跳转
        window.location.href = targetUrl;
    }
    
    // 开始预加载资源
    preloadResources();
})(); 