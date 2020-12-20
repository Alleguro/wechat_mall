// pages/home/home.js
import {
    Category
} from "../../models/category";
import {
    Activity
} from "../../models/activity";

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
        gridC: null,
        activityD: null,
        themeE: null,
        themeESpu: null,
        themeF: null
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        await this.initAllData();
    },

    //进入页面初次加载数据
    async initAllData() {
        // 实例化主题对象 
        // 类的对象：本身具有保存数据的功能，同时也能保存类的状态
        const theme = new Theme();
        await theme.getThemes();
        // 获取A位置主题 主题
        const themeA = theme.getHomeLocationA();

        // 获取B位置 轮播图
        const bannerB = await Banner.getHomeLocationB();

        // 获取C位置 六宫格
        const gridC = await Category.getHomeLocationC();

        //获取D位置 优惠券入口
        const activityD = await Activity.getHomeLocationD()

        // 获取E位 商品滚动列表
        const themeE = theme.getHomeLocationE();
        let themeESpu = []; // E位商品spu的容器
        if (themeE.online) {
            // 获取E位商品spu 商品滚动列表
            const data = await Theme.getLocationEspu();
            if (data) {
                //截取0~8的数据
                themeESpu = data.spu_list.slice(0, 8);
            }
        }

        // 获取F位 甄选入口
        const themeF = theme.getHomeLocationF();

        this.setData({
            themeA,
            bannerB,
            gridC,
            activityD,
            themeE,
            themeESpu,
            themeF
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