// components/counter/index.js
const {Cart} = require("../../models/cart");
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        //定义count初始化时显示的值
        count: {
            type: Number,
            value: Cart.SKU_MIN_COUNT
        },
        min: {
            type: Number,
            value: Cart.SKU_MIN_COUNT
        },
        max: {
            type: Number,
            value: Cart.SKU_MAX_COUNT
        }
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        //数量超出或低于最少时会触发的方法
        onOverStep(e) {
            const minOrMaxOut = e.detail.type;
            if (minOrMaxOut == 'overflow_max') {
                wx.showToast({
                    icon: "none",
                    duration: 3000,
                    title: `超出最大购买数量`
                })
            }
            if (minOrMaxOut == 'overflow_min') {
                wx.showToast({
                    icon: "none",
                    duration: 3000,
                    title: `最少需要购买${Cart.SKU_MIN_COUNT}件噢`
                })
            }
        }
    }
})
