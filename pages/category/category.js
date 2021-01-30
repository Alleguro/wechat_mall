// pages/category/category.js
import {getSystemSize} from "../../utils/system";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";
import {Categories} from "../../models/categories";
import {SpuListType} from "../../core/enum";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        defaultRootId: 2 // 默认选中的一级菜单
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        await this.setDynamicSegmentHeight();
        await this.initCategoryData()
    },
    //请求数据
    async initCategoryData() {
        const categories = new Categories();
        this.data.categories = categories;
        await categories.getAll(); // 请求所有数据
        const roots = categories.getRoots(); // 一级菜单
        const defaultRoot = this.getDefaultRoot(roots); // 默认选择的一级菜单
        const currentSubs = categories.getSubs(defaultRoot.id); // 二级菜单
        this.setData({
            roots,
            currentSubs,
            currentBannerImg: defaultRoot.img // 右侧二级菜单的头图
        })
    },
    // 默认选择的一级菜单
    getDefaultRoot(roots) {
        let defaultRoot = roots.find(r => r.id === this.data.defaultRootId);
        if (!defaultRoot) {
            defaultRoot = roots[0];
        }
        return defaultRoot;
    },
    //点击一级菜单触发的方法
    onSegChange(e) {
        const rootId = parseInt(e.detail.activeKey); // 必须转int类型才能接收到数据
        const currentSubs = this.data.categories.getSubs(rootId)
        const currentRoot = this.data.categories.getRoot(rootId);  //获取某个一级菜单的内容
        this.setData({
            currentSubs,
            currentBannerImg: currentRoot.img
        })
    },
    //动态计算页面高度,减去搜索框与margin-top的高度就是页面内容的高度
    async setDynamicSegmentHeight() {
        const res = await getSystemSize();
        const windowHeightRpx = px2rpx(res.windowHeight)
        const h = windowHeightRpx - 60 - 20 - 2;
        this.setData({
            segHeight: h
        })
    },
    onGotoSearch(e) {
        wx.navigateTo({
            url: `/pages/search/search`
        })
    },
    //点击二级菜单跳转到spu-list商品合集页面
    onJumpToSpuList(e) {
        const cid = e.detail.cid;
        wx.navigateTo({
            url: `/pages/spu-list/spu-list?cid=${cid}&type=${SpuListType.SUB_CATEGORY}`
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})