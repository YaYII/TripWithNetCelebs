/**
 * 应用路由器
 * 负责处理不同场景下的页面跳转逻辑
 */

/**
 * 根据来源跳转到不同的行程详情页
 * @param {string} tripId 行程ID
 * @param {string} source 来源页面 (destination: 景点详情页, recommended: 推荐行程, list: 行程列表页)
 * @param {Object} params 附加参数
 */
function navigateToTripDetail(tripId, source, params = {}) {
    if (!tripId) {
        console.error('行程ID不能为空');
        return;
    }
    
    // 构建查询参数
    const queryParams = new URLSearchParams();
    queryParams.append('id', tripId);
    
    // 添加附加参数
    Object.keys(params).forEach(key => {
        queryParams.append(key, params[key]);
    });
    
    // 根据来源选择不同的行程详情页
    let targetPage = 'trip-detail.html';
    
    switch (source) {
        case 'destination':
            // 从景点详情页进入
            targetPage = 'trip-detail-destination.html';
            
            // 如果有景点ID，添加到参数中
            if (params.destinationId) {
                queryParams.append('destinationId', params.destinationId);
            }
            break;
            
        case 'recommended':
            // 从首页推荐行程进入
            targetPage = 'trip-detail-recommended.html';
            
            // 添加推荐原因
            if (params.recommendReason) {
                queryParams.append('recommendReason', params.recommendReason);
            }
            break;
            
        case 'list':
            // 从行程列表页进入
            targetPage = 'trip-detail-list.html';
            
            // 添加当前索引和总数
            if (params.index !== undefined && params.total !== undefined) {
                queryParams.append('index', params.index);
                queryParams.append('total', params.total);
            }
            
            // 添加筛选条件
            if (params.filters) {
                queryParams.append('filters', JSON.stringify(params.filters));
            }
            break;
            
        default:
            // 默认使用基础版本
            targetPage = 'trip-detail.html';
            break;
    }
    
    // 导航到目标页面
    window.location.href = `${targetPage}?${queryParams.toString()}`;
}

/**
 * 从景点详情页导航到行程详情
 * @param {string} tripId 行程ID 
 * @param {string} destinationId 景点ID
 * @param {string} destinationName 景点名称
 */
function goToTripFromDestination(tripId, destinationId, destinationName) {
    navigateToTripDetail(tripId, 'destination', {
        destinationId,
        destinationName
    });
}

/**
 * 从首页推荐行程导航到行程详情
 * @param {string} tripId 行程ID
 * @param {string} reason 推荐原因
 */
function goToTripFromRecommended(tripId, reason) {
    navigateToTripDetail(tripId, 'recommended', {
        recommendReason: reason || '根据您的兴趣推荐'
    });
}

/**
 * 从行程列表页导航到行程详情
 * @param {string} tripId 行程ID
 * @param {number} index 当前行程在列表中的索引
 * @param {number} total 列表中的总行程数
 * @param {Array} filters 当前应用的筛选条件
 */
function goToTripFromList(tripId, index, total, filters) {
    navigateToTripDetail(tripId, 'list', {
        index,
        total,
        filters
    });
}

/**
 * 导航到目的地详情页
 * @param {string} destinationId 目的地ID
 * @param {string} destinationName 目的地名称
 */
function goToDestination(destinationId, destinationName) {
    if (!destinationId) {
        console.error('目的地ID不能为空');
        return;
    }
    
    // 构建查询参数
    const queryParams = new URLSearchParams();
    queryParams.append('id', destinationId);
    
    if (destinationName) {
        queryParams.append('name', destinationName);
    }
    
    // 导航到目的地详情页
    window.location.href = `destination-detail.html?${queryParams.toString()}`;
}

/**
 * 导航到行程记录页面
 * @param {string} tripId 行程ID
 * @param {Object} params 附加参数
 */
function navigateToTripRecord(tripId, params = {}) {
    if (!tripId) {
        console.error('行程ID不能为空');
        return;
    }
    
    // 构建查询参数
    const queryParams = new URLSearchParams();
    queryParams.append('id', tripId);
    
    // 添加附加参数
    Object.keys(params).forEach(key => {
        queryParams.append(key, params[key]);
    });
    
    // 导航到行程记录页面
    window.location.href = `trip-record.html?${queryParams.toString()}`;
}

// 导出函数供其他脚本使用
window.AppRouter = {
    navigateToTripDetail,
    goToTripFromDestination,
    goToTripFromRecommended,
    goToTripFromList,
    goToDestination,
    navigateToTripRecord
}; 