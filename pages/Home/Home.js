// pages/Home/Home.js

import { Theme } from "../../model/theme";
import { Bannner } from "../../model/bannner";
import { Category } from "../../model/category";
import { Activity } from "../../model/activity";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        themeE: null,
        bannerB: null,
        gridC: [],
        activityD: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad(options) {
        await this.initAllData();
    },

    // 初始化数据
    async initAllData() {
        // 实例化首页主题对象
        const theme = new Theme();
        await theme.getThemes();

        // 获取A位置 主题
        const themeA = await theme.getHomeLocationA()
        // 获取E位置
        const themeE = await theme.getHomeLocationE()

        // 获取B位置 轮播图
        const bannerB = await Bannner.getHomeLocationB();
        // 获取C位置 六宫格
        const gridC = await Category.getGridCategory();
        // 获取D位置 优惠券入口
        const activityD = await Activity.getHomeLocationD();

        this.setData({
            themeA,
            themeE,
            bannerB,
            gridC,
            activityD
        })
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})