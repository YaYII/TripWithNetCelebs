const { createApp } = Vue

const app = createApp({
    data() {
        return {
            currentStatus: 'all',
            statusTabs: [
                { label: '全部', value: 'all', icon: 'M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z' },
                { label: '已支付', value: 'paid', icon: 'M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z' },
                { label: '已取消', value: 'cancelled', icon: 'M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z' },
                { label: '已退款', value: 'refunding', icon: 'M20 8H4V6h16v2zm0 2H4v2h16v-2zm0 4H4v2h16v-2z' }
            ],
            orders: [
                {
                    id: 1,
                    title: '珠海长隆海洋王国深度游',
                    image: '../img/test.png',
                    location: '珠海',
                    orderNumber: 'MD202403150001',
                    status: 'paid',
                    statusText: '已支付',
                    departureDate: '2024-06-15',
                    adultCount: 2,
                    childCount: 1,
                    totalPrice: 2697,
                    createTime: '2024-03-15 14:30',
                    isHot: true,
                    influencer: {
                        name: '旅行达人小王',
                        avatar: '../img/potato.png',
                        followers: 1256
                    },
                    duration: '3天',
                    participants: {
                        current: 28,
                        total: 30
                    }
                },
                {
                    id: 2,
                    title: '三亚亚龙湾度假3日游',
                    image: '../img/test.png',
                    location: '三亚',
                    orderNumber: 'MD202403140002',
                    status: 'paid',
                    statusText: '已支付',
                    departureDate: '2024-05-25',
                    adultCount: 1,
                    childCount: 0,
                    totalPrice: 2999,
                    createTime: '2024-03-14 16:45',
                    isHot: false,
                    influencer: {
                        name: '海岛玩家阿丽',
                        avatar: '../img/potato.png',
                        followers: 986
                    },
                    duration: '3天',
                    participants: {
                        current: 15,
                        total: 20
                    }
                },
                {
                    id: 3,
                    title: '丽江古城文化之旅',
                    image: '../img/test.png',
                    location: '丽江',
                    orderNumber: 'MD202403130003',
                    status: 'cancelled',
                    statusText: '已取消',
                    departureDate: '2024-04-28',
                    adultCount: 2,
                    childCount: 0,
                    totalPrice: 3998,
                    createTime: '2024-03-13 09:15',
                    isHot: false,
                    influencer: {
                        name: '古镇探索者',
                        avatar: '../img/potato.png',
                        followers: 1120
                    },
                    duration: '4天',
                    participants: {
                        current: 22,
                        total: 25
                    }
                },
                {
                    id: 4,
                    title: '张家界森林公园探险',
                    image: '../img/test.png',
                    location: '张家界',
                    orderNumber: 'MD202403120004',
                    status: 'refunding',
                    statusText: '已退款',
                    departureDate: '2024-05-30',
                    adultCount: 3,
                    childCount: 0,
                    totalPrice: 5999,
                    createTime: '2024-03-12 11:20',
                    isHot: false,
                    influencer: {
                        name: '户外探险家',
                        avatar: '../img/potato.png',
                        followers: 1560
                    },
                    duration: '5天',
                    participants: {
                        current: 18,
                        total: 20
                    }
                }
            ]
        }
    },
    computed: {
        filteredOrders() {
            if (this.currentStatus === 'all') {
                return this.orders;
            }
            return this.orders.filter(order => order.status === this.currentStatus);
        }
    },
    methods: {
        goBack() {
            window.location.href = 'profile.html'
        },
        viewOrder(order) {
            window.location.href = `booking-success.html?orderId=${order.id}`;
        },
        applyRefund(order) {
            window.location.href = `booking-success.html?orderId=${order.id}&action=refund`;
        }
    }
})

app.mount('#app')