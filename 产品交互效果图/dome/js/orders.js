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
                    id: 'ORD20230001',
                    status: 'pending',
                    statusText: '待付款',
                    orderTime: '2023-03-15 14:30',
                    expireTime: '2023-03-15 15:00',
                    tripName: '香港经典三日游',
                    tripDate: '2023-04-10 - 2023-04-12',
                    price: 2999,
                    persons: 2,
                    totalAmount: 5998,
                    tripImage: '../img/test.png',
                    canPay: true,
                    canCancel: true,
                    canReview: false
                },
                {
                    id: 'ORD20230002',
                    status: 'paid',
                    statusText: '待出行',
                    orderTime: '2023-03-10 09:15',
                    tripName: '澳门美食文化之旅',
                    tripDate: '2023-05-20 - 2023-05-21',
                    price: 1999,
                    persons: 1,
                    totalAmount: 1999,
                    tripImage: '../img/test.png',
                    canPay: false,
                    canCancel: true,
                    canReview: false
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