const { createApp } = Vue

const app = createApp({
    data() {
        return {
            currentTab: 'all',
            selectedOrder: null,
            tabs: [
                { label: '全部', value: 'all' },
                { label: '待付款', value: 'unpaid' },
                { label: '待出行', value: 'pending' },
                { label: '已完成', value: 'completed' },
                { label: '已取消', value: 'cancelled' }
            ],
            orders: [
                {
                    id: 1,
                    orderNo: '20240101001',
                    status: '待付款',
                    tripName: '香港经典三日游',
                    tripImage: '../img/trip1.jpg',
                    departureDate: '2024年2月1日',
                    adultCount: 2,
                    childCount: 0,
                    totalPrice: 5998,
                    actions: [
                        { type: 'pay', label: '去支付', primary: true },
                        { type: 'cancel', label: '取消订单', primary: false }
                    ]
                },
                {
                    id: 2,
                    orderNo: '20231225001',
                    status: '已完成',
                    tripName: '港澳联游五日',
                    tripImage: '../img/trip2.jpg',
                    departureDate: '2023年12月25日',
                    adultCount: 2,
                    childCount: 1,
                    totalPrice: 8997,
                    actions: [
                        { type: 'review', label: '评价', primary: true },
                        { type: 'rebooking', label: '再次预订', primary: false }
                    ]
                }
            ]
        }
    },
    computed: {
        filteredOrders() {
            if (this.currentTab === 'all') return this.orders
            const statusMap = {
                unpaid: '待付款',
                pending: '待出行',
                completed: '已完成',
                cancelled: '已取消'
            }
            return this.orders.filter(order => order.status === statusMap[this.currentTab])
        }
    },
    methods: {
        getTabCount(tab) {
            if (tab === 'all') return this.orders.length
            const statusMap = {
                unpaid: '待付款',
                pending: '待出行',
                completed: '已完成',
                cancelled: '已取消'
            }
            return this.orders.filter(order => order.status === statusMap[tab]).length
        },
        getStatusClass(status) {
            const classMap = {
                '待付款': 'status-unpaid',
                '待出行': 'status-pending',
                '已完成': 'status-completed',
                '已取消': 'status-cancelled'
            }
            return classMap[status] || ''
        },
        showOrderDetail(order) {
            this.selectedOrder = order
        },
        closeOrderDetail() {
            this.selectedOrder = null
        },
        handleAction(type, order) {
            switch(type) {
                case 'pay':
                    window.location.href = `payment.html?orderNo=${order.orderNo}`
                    break
                case 'cancel':
                    if(confirm('确定要取消订单吗？')) {
                        order.status = '已取消'
                        order.actions = [
                            { type: 'delete', label: '删除订单', primary: false }
                        ]
                    }
                    break
                case 'review':
                    // 跳转到评价页面
                    window.location.href = `review.html?orderNo=${order.orderNo}`
                    break
                case 'rebooking':
                    window.location.href = `booking.html?tripName=${order.tripName}`
                    break
                case 'delete':
                    if(confirm('确定要删除订单吗？删除后将无法恢复。')) {
                        const index = this.orders.findIndex(o => o.id === order.id)
                        if (index > -1) {
                            this.orders.splice(index, 1)
                        }
                    }
                    break
            }
        }
    }
})

app.mount('#app')