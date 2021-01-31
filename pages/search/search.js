// pages/search/search.js
import {HistoryKeyword} from "../../models/history-keyword";
import {Tag} from "../../models/tag";
import {Search} from "../../models/search";
import {showToast} from "../../utils/ui";

const history = new HistoryKeyword();// 缓存
Page({
    /**
     * 页面的初始数据
     */
    data: {
        loadingType: 'loading' // 分页加载中 或 到底了
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const historyTags = history.get(); // 读取缓存的历史搜索标签
        const hotTags = await Tag.getSearchTags(); // 热门搜索标签
        this.setData({
            historyTags, hotTags
        })
    },
    //搜索
    async onSearch(e) {
        this.setData({
            search: true,
            items: []
        })
        const keyword = e.detail.value || e.detail.name; // 搜索框的内容进来 或 点击tag标签进来的内容
        if (!keyword || keyword.trim().length === 0) { // 内容不能为空或者是空格
            showToast('请输入关键字')
            return;
        }
        history.save(keyword); // 写入缓存
        this.setData({
            historyTags: history.get()// 读取缓存
        })
        const paging = Search.search(keyword); // 请求接口搜索商品
        wx.lin.showLoading({
            color: "#157658",
            type: 'flash',
            fullScreen: true // loading居中显示，全屏模式
        })
        const data = await paging.getMoreData();

        wx.lin.hideLoading() // 关闭loading

        this.bindItems(data)
        if (!data.moreData) {
            this.setData({
                loadingType: 'end'
            })
        }
    },
    // 绑定搜索到的商品内容
    bindItems(data) {
        if (data.accumulator.length !== 0) {
            this.setData({
                items: data.accumulator
            })
        }
    },
    //删除缓存
    onDeleteHistory() {
        history.clear(); // 清除缓存
        this.setData({
            historyTags: []
        })
    },
    //搜索框取消按钮
    onCancel() {
        this.setData({
            search: false
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})