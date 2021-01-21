// components/spu-preview/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        data: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        tags: Array
    },
    observers: {
        data: function (data) {
            if (!data) {
                return;
            }
            if (!data.tags) {
                return;
            }
            //split:分割字符串成字符串数组
            const tags = data.tags.split('$')
            this.setData({
                tags
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //动态获取图片的宽高，让图片的宽高比例不变
        onImgLoad(e) {
            const {width, height} = e.detail;
            //比例公式 ：width/height = 340/h
            this.setData({
                w: 340,
                h: 340 * height / width
            })
        },

        //跳转商品详情
        onItemTap(e) {
            const pid = e.currentTarget.dataset.pid;
            wx.navigateTo({
                url: `/pages/detail/detail?pid=${pid}`
            })
        }
    }
})
