// pages/home/home.js
import {
    Category
} from "../../models/category";
import {
    Activity
} from "../../models/activity";
import {
    SpuPaging
} from "../../models/spu-paging";

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
        themeF: null,
        bannerG: null,
        themeH: null,
        spuPaging: null, // 分页数据
        loadingType: 'loading' // 分页加载中 或 到底了
    },

    /**
     * 生命周期函数--监听页面加载
     */
    async onLoad() {
        await this.initAllData();
        await this.initBottomSpuList();
    },

    //获取瀑布流数据
    async initBottomSpuList() {
        const paging = SpuPaging.getLatestPaging();
        // 要保存数据状态，所以保存到data里，不然触底刷新时只能每次都new一个新的paging，这样的做法是不对的
        this.data.spuPaging = paging;
        const data = await paging.getMoreData();
        if (!data) {
            return;
        }
        //瀑布流内部已经实现了累加的功能，每次传最新的数据进去即可
        wx.lin.renderWaterFlow(data.items)
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
        // 获取G位 三海报
        const bannerG = await Banner.getHomeLocationG();
        // 获取H位 时尚穿搭
        const themeH = theme.getHomeLocationH();
        this.setData({
            themeA,
            bannerB,
            gridC,
            activityD,
            themeE,
            themeESpu,
            themeF,
            bannerG,
            themeH
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: async function () {
        const data = await this.data.spuPaging.getMoreData();
        if (!data) {
            return;
        }
        //瀑布流内部已经实现了累加的功能，每次传最新的数据进去即可
        wx.lin.renderWaterFlow(data.items)
        if (!data.moreData) {
            this.setData({
                loadingType: 'end'
            })
        }
    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function () {

    },


    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})