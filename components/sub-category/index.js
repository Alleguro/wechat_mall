// components/sub-category/index.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        categories: Array,//二级菜单数据
        bannerImg: String //头图
    },

    /**
     * 组件的初始数据
     */
    data: {},

    /**
     * 组件的方法列表
     */
    methods: {
        //点击二级菜单跳转到spu-list集合页面
        onTapGridItem(e) {
            const id = e.detail.key
            this.triggerEvent('itemtap', {
                cid: id
            })
        },
    }
})
