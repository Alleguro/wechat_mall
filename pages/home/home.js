// pages/home/home.js
import {Category} from "../../models/category";

const {
    Banner
} = require("../../models/banner");
const {
    Theme
} = require("../../models/theme");
Page({

    /**
     * 页面的初始数据
     */
    data: {
        themeA: null,
        bannerB: null,
        gridC: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        await this.initAllData();
    },

    //进入页面初次加载数据
    async initAllData() {
        // 实例化主题
        const theme = new Theme();
        await theme.getThemes();
        // 获取A位置主题 主题
        const themeA = theme.getHomeLocationA();

        // 获取B位置 轮播图
        const bannerB = await Banner.getHomeLocationB();

        // 获取C位置 六宫格
        const gridC = await Category.getHomeLocationC()
        this.setData({
            themeA,
            bannerB,
            gridC
        })
    },


    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})