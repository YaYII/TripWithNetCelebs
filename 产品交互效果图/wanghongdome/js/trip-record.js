/**
 * 行程记录页面的JavaScript逻辑
 * 用于展示已结束行程的详细记录和评价
 */

const { createApp } = Vue

createApp({
    data() {
        return {
            // 行程ID
            tripId: null,
            
            // 行程详情
            trip: {
                id: null,
                title: '',
                description: '',
                destination: '',
                date: '',
                duration: '',
                images: [],
                totalCommission: '',
                schedule: [],
                totalParticipants: 0,
                contentCount: 0,
                rating: 0,
                ratingCount: 0,
                ratingTags: [],
                contents: [],
                feedback: null
            },
            
            // 轮播图实例
            swiper: null
        }
    },
    methods: {
        /**
         * 返回上一页
         */
        goBack() {
            window.history.back();
        },
        
        /**
         * 分享行程
         */
        shareTrip() {
            this.showToast('分享功能即将上线');
        },
        
        /**
         * 查看相似行程
         */
        viewSimilarTrips() {
            // 使用AppRouter导航到相关行程列表页
            if (window.AppRouter) {
                // 以目的地为筛选条件导航到行程列表页
                window.AppRouter.goToTripFromList(
                    null, // 无特定tripId
                    -1,   // 无索引
                    0,    // 总数为0
                    [{
                        name: '目的地',
                        value: this.trip.destination
                    }]
                );
                return;
            }
            
            // 兼容旧版：直接导航到行程列表页
            window.location.href = `trip-list.html?destination=${encodeURIComponent(this.trip.destination)}&source=destination`;
        },
        
        /**
         * 查看相似行程（别名方法，用于兼容HTML中的调用）
         */
        goToSimilarTrips() {
            this.viewSimilarTrips();
        },
        
        /**
         * 查看内容详情
         * @param {string} url - 内容链接
         */
        viewContent(url) {
            // 在实际应用中，应该跳转到内容详情页或外部平台
            window.open(url, '_blank');
        },
        
        /**
         * 格式化数字，超过1万显示为x.x万
         * @param {number} num - 数字
         * @returns {string} - 格式化后的数字字符串
         */
        formatNumber(num) {
            if (num >= 10000) {
                return (num / 10000).toFixed(1) + '万';
            }
            return num.toString();
        },
        
        /**
         * 显示提示信息
         * @param {string} message - 提示消息
         */
        showToast(message) {
            const toast = document.createElement('div');
            toast.className = 'toast';
            toast.textContent = message;
            document.body.appendChild(toast);
            
            setTimeout(() => {
                toast.classList.add('show');
                setTimeout(() => {
                    toast.classList.remove('show');
                    setTimeout(() => {
                        document.body.removeChild(toast);
                    }, 300);
                }, 2000);
            }, 100);
        },
        
        /**
         * 初始化轮播图
         */
        initSwiper() {
            // 确保DOM已经渲染完成
            this.$nextTick(() => {
                // 初始化Swiper
                this.swiper = new Swiper('.swiper', {
                    loop: true,
                    autoplay: {
                        delay: 3000,
                        disableOnInteraction: false
                    },
                    pagination: {
                        el: '.swiper-pagination',
                        clickable: true
                    }
                });
            });
        },
        
        /**
         * 加载行程记录详情
         * @param {number} tripId - 行程ID
         */
        loadTripRecord(tripId) {
            // 实际项目中应该从API获取数据
            // 这里使用模拟数据
            const completedTrips = {
                109: {
                    id: 109,
                    title: '珠海长隆海洋王国亲子2日游',
                    description: '此次行程是与网红达人小丽一起探索珠海长隆海洋王国的奇妙世界，近距离接触海洋生物，观看精彩表演，体验刺激游乐设施。行程适合亲子家庭，为孩子们带来了难忘的海洋探索之旅。',
                    destination: '珠海长隆海洋王国',
                    date: '2023-12-15',
                    duration: '2天1晚',
                    images: ['../img/test.png', '../img/test.png', '../img/test.png'],
                    totalCommission: '1,280',
                    schedule: [
                        {
                            time: '第一天 09:00',
                            activity: '集合出发',
                            description: '珠海市区指定地点集合，乘车前往长隆海洋王国'
                        },
                        {
                            time: '第一天 10:30',
                            activity: '抵达海洋王国',
                            description: '办理入园手续，开始一天的海洋探索之旅'
                        },
                        {
                            time: '第一天 12:00',
                            activity: '午餐&海豚表演',
                            description: '享用午餐，观看精彩的海豚表演'
                        },
                        {
                            time: '第一天 14:00',
                            activity: '鲸鲨馆参观',
                            description: '参观世界最大的鲸鲨馆，近距离观察海洋生物'
                        },
                        {
                            time: '第一天 16:00',
                            activity: '游乐设施体验',
                            description: '体验园区内的刺激游乐设施'
                        },
                        {
                            time: '第一天 18:00',
                            activity: '晚餐&入住酒店',
                            description: '享用晚餐，入住长隆海洋王国酒店'
                        },
                        {
                            time: '第二天 09:00',
                            activity: '早餐',
                            description: '酒店享用早餐'
                        },
                        {
                            time: '第二天 10:00',
                            activity: '企鹅馆参观',
                            description: '参观企鹅馆，了解极地生物'
                        },
                        {
                            time: '第二天 12:00',
                            activity: '午餐&内容创作',
                            description: '享用午餐，进行内容拍摄和创作'
                        },
                        {
                            time: '第二天 15:00',
                            activity: '返程',
                            description: '结束行程，乘车返回市区'
                        }
                    ],
                    totalParticipants: 28,
                    contentCount: 32,
                    rating: 4.8,
                    ratingCount: 26,
                    ratingTags: [
                        { name: '行程丰富', count: 21 },
                        { name: '讲解专业', count: 18 },
                        { name: '服务周到', count: 15 },
                        { name: '体验精彩', count: 23 },
                        { name: '拍摄便利', count: 19 }
                    ],
                    contents: [
                        {
                            id: 1001,
                            creatorName: '旅行达人小王',
                            creatorAvatar: '../img/potato.png',
                            platform: '抖音',
                            likes: 15800,
                            comments: 380,
                            type: 'video',
                            thumbnail: '../img/test.png',
                            title: '带娃游长隆，这些必玩项目千万别错过！',
                            date: '2023-12-18',
                            url: 'https://www.example.com/video1'
                        },
                        {
                            id: 1002,
                            creatorName: '美食达人小李',
                            creatorAvatar: '../img/potato.png',
                            platform: '小红书',
                            likes: 8600,
                            comments: 210,
                            type: 'image',
                            thumbnail: '../img/test.png',
                            title: '长隆海洋王国美食攻略，这些必吃不踩雷！',
                            date: '2023-12-17',
                            url: 'https://www.example.com/article1'
                        },
                        {
                            id: 1003,
                            creatorName: '摄影师老张',
                            creatorAvatar: '../img/potato.png',
                            platform: '微博',
                            likes: 12300,
                            comments: 156,
                            type: 'image',
                            thumbnail: '../img/test.png',
                            title: '长隆海洋王国摄影指南，拍出大片感！',
                            date: '2023-12-16',
                            url: 'https://www.example.com/gallery1'
                        }
                    ],
                    feedback: {
                        rating: 5,
                        content: '这次行程非常棒！行程安排合理，导游小丽很专业，给我们介绍了很多海洋生物的知识，孩子们非常喜欢。住宿和餐饮也很不错，给我的内容创作提供了很多灵感。期待下次合作！',
                        date: '2023-12-16'
                    }
                },
                110: {
                    id: 110,
                    title: '珠海外伶仃岛探险之旅',
                    description: '这是一次精彩的海岛探险之旅，探索珠海外伶仃岛的自然美景和历史文化。行程包括徒步环岛、海滩活动、渔村访问和观赏日落等丰富内容，为网红创作者提供了多样化的内容素材。',
                    destination: '珠海外伶仃岛',
                    date: '2023-11-10',
                    duration: '3天2晚',
                    images: ['../img/test.png', '../img/test.png', '../img/test.png'],
                    totalCommission: '1,500',
                    schedule: [
                        {
                            time: '第一天 08:00',
                            activity: '集合出发',
                            description: '珠海九洲港码头集合，乘船前往外伶仃岛'
                        },
                        {
                            time: '第一天 10:00',
                            activity: '抵达外伶仃岛',
                            description: '办理入住手续，稍作休息'
                        },
                        {
                            time: '第一天 11:30',
                            activity: '午餐',
                            description: '品尝当地特色海鲜午餐'
                        },
                        {
                            time: '第一天 13:30',
                            activity: '沙滩活动',
                            description: '在金沙滩进行拍摄和休闲活动'
                        },
                        {
                            time: '第一天 17:00',
                            activity: '日落观赏',
                            description: '在最佳观景点观赏外伶仃岛日落'
                        },
                        {
                            time: '第二天 08:00',
                            activity: '早餐',
                            description: '酒店享用早餐'
                        },
                        {
                            time: '第二天 09:30',
                            activity: '环岛徒步',
                            description: '徒步探索岛屿自然风光和历史遗迹'
                        },
                        {
                            time: '第二天 15:00',
                            activity: '渔村访问',
                            description: '参观传统渔村，了解当地生活'
                        },
                        {
                            time: '第三天 09:00',
                            activity: '自由活动',
                            description: '自由拍摄和内容创作时间'
                        },
                        {
                            time: '第三天 13:00',
                            activity: '返程',
                            description: '乘船返回珠海市区'
                        }
                    ],
                    totalParticipants: 22,
                    contentCount: 28,
                    rating: 4.6,
                    ratingCount: 20,
                    ratingTags: [
                        { name: '景色优美', count: 18 },
                        { name: '拍摄素材丰富', count: 16 },
                        { name: '住宿舒适', count: 12 },
                        { name: '行程紧凑', count: 10 },
                        { name: '海鲜新鲜', count: 15 }
                    ],
                    contents: [
                        {
                            id: 2001,
                            creatorName: '旅行达人小王',
                            creatorAvatar: '../img/potato.png',
                            platform: '抖音',
                            likes: 22000,
                            comments: 520,
                            type: 'video',
                            thumbnail: '../img/test.png',
                            title: '隐藏在珠海的绝美海岛，你一定没去过！',
                            date: '2023-11-12',
                            url: 'https://www.example.com/video2'
                        },
                        {
                            id: 2002,
                            creatorName: '风景摄影师老刘',
                            creatorAvatar: '../img/potato.png',
                            platform: '小红书',
                            likes: 13500,
                            comments: 320,
                            type: 'image',
                            thumbnail: '../img/test.png',
                            title: '外伶仃岛日落摄影攻略，手机也能拍大片',
                            date: '2023-11-11',
                            url: 'https://www.example.com/article2'
                        }
                    ],
                    feedback: {
                        rating: 4,
                        content: '非常不错的行程，岛上景色优美，拍摄素材丰富。唯一的缺点是夏季去的话会比较炎热，建议做好防晒准备。总体来说是一次值得推荐的体验！',
                        date: '2023-11-13'
                    }
                }
            };
            
            // 检查是否有对应的行程记录
            if (completedTrips[tripId]) {
                this.trip = completedTrips[tripId];
                
                // 初始化轮播图
                this.initSwiper();
            } else {
                this.showToast('未找到该行程记录');
                setTimeout(() => {
                    window.history.back();
                }, 1500);
            }
        },
        
        /**
         * 初始化页面
         */
        initPage() {
            // 从URL获取行程ID
            const urlParams = new URLSearchParams(window.location.search);
            this.tripId = parseInt('109');
            
            // if (!this.tripId) {
            //     this.showToast('无效的行程ID');
            //     setTimeout(() => {
            //         window.history.back();
            //     }, 1500);
            //     return;
            // }
            
            // 加载行程记录详情
            this.loadTripRecord(this.tripId);
        }
    },
    mounted() {
        // 初始化页面
        this.initPage();
    }
}).mount('#app'); 