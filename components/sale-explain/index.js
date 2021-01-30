// components/sale-explain/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        texts: Array //商品详情描述
    },

    /**
     * 组件的初始数据
     */
    data: {
        _texts: Array, // 这样能防止内存泄漏
    },
    observers: {
        'texts': function (texts) {
            this.setData({
                _texts: texts
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {}
})
