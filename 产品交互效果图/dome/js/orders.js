const { createApp } = Vue

const app = createApp({
    data() {
        return {
            currentTab: 'all',
            tabs: [
                { label: '全部', value: 'all' },
                { label: '待付款', value: 'unpaid' },
                { label: '待出行', value: 'pending' },
                { label: '已完成', value: 'completed' }
            ],
            orders: [
                {
                    id: 1,
                    orderNo: '20240101001',
                    status: '待付款',
                    tripName: '香港经典三日游',
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
                completed: '已完成'
            }
            return this.orders.filter(order => order.status === statusMap[this.currentTab])
        }
    },
    methods: {
        handleAction(type, order) {
            switch(type) {
                case 'pay':
                    window.location.href = `payment.html?orderNo=${order.orderNo}`
                    break
                case 'cancel':
                    if(confirm('确定要取消订单吗？')) {
                        // 处理取消订单逻辑
                    }
                    break
                case 'review':
                    // 处理评价逻辑
                    break
                case 'rebooking':
                    window.location.href = `booking.html?tripName=${order.tripName}`
                    break
            }
        }
    }
})

app.mount('#app')