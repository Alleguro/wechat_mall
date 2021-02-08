// components/cart-item/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cartItem: Object
    },

    /**
     * 组件的初始数据
     */
    data: {
        specStr: String, // 是否有规格
        soldOut: String, // 售馨
        discount: Boolean, // 折扣
        online: Boolean, // 上下架
    },
    observers: {
        cartItem: function (cartItem) {
            if (!cartItem) {
                return
            }
            const specStr = '' // 规格
            const discount = '' // 折扣
            const soldOut = '' // 售馨
            const online = '' // 上下架
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {}
})
