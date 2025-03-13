const { createApp } = Vue

const app = createApp({
    data() {
        return {
            trip: {
                name: '香港经典三日游',
                price: 2999,
                departureDate: '2024年2月1日'
            },
            form: {
                adultCount: 1,
                childCount: 0,
                contactName: '',
                contactPhone: '',
                specialRequirements: ''
            }
        }
    },
    computed: {
        totalPrice() {
            return this.trip.price * (this.form.adultCount + this.form.childCount * 0.5)
        }
    },
    methods: {
        submitBooking() {
            // 处理提交预订逻辑
            console.log('提交预订', this.form)
            alert('预订成功！')
            window.location.href = 'orders.html'
        }
    }
})

app.mount('#app')