/**
 * 目的地行程页面脚本
 * 注意: 此页面已弃用，使用destination-detail.html替代
 * 保留此文件仅为兼容性，未来将完全移除
 */

// 初始化Vue应用
new Vue({
    el: '#app',
    data: {
        // 页面数据
        isLoading: true,
        destinationId: '',
        destination: null,
        trips: [],
        isSearchVisible: false,
        searchQuery: '',
        activeFilter: 'all',
        
        // 隐藏底部导航
        hideBottomNav: true,
    },
    created() {
        this.initPage();
    },
    computed: {
        // 筛选后的行程
        filteredTrips() {
            return this.trips;
        }
    },
    methods: {
        // 初始化页面
        initPage() {
            // 获取目的地ID
            const urlParams = new URLSearchParams(window.location.search);
            this.destinationId = urlParams.get('id') || '';
            
            setTimeout(() => {
                this.isLoading = false;
                // 已弃用，应重定向到新的目的地详情页
                window.location.href = `destination-detail.html?id=${this.destinationId}`;
            }, 100);
        },
        
        // 返回
        goBack() {
            window.history.back();
        },
        
        // 切换搜索栏显示状态
        toggleSearch() {
            this.isSearchVisible = !this.isSearchVisible;
            if (this.isSearchVisible) {
                this.$nextTick(() => {
                    this.$refs.searchInput.focus();
                });
            } else {
                this.searchQuery = '';
            }
        },
        
        // 切换筛选
        setFilter(filter) {
            this.activeFilter = filter;
        },
        
        // 查看行程详情
        viewTripDetail(tripId) {
            window.location.href = `trip-detail.html?id=${tripId}`;
        },
        
        // 查看景点行程
        viewDestinationTrips(destinationId) {
            // 重定向到新的目的地详情页
            window.location.href = `destination-detail.html?id=${destinationId}`;
        },
        
        // 清除搜索
        clearSearch() {
            this.searchQuery = '';
            this.$refs.searchInput.focus();
        }
    }
}); 