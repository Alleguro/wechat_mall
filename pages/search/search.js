// pages/search/search.js
import {HistoryKeyword} from "../../models/history-keyword";
import {Tag} from "../../models/tag";
import {Search} from "../../models/search";

const history = new HistoryKeyword();// 缓存
Page({
    /**
     * 页面的初始数据
     */
    data: {},
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
        const keyword = e.detail.value || e.detail.name; // 搜索框的内容进来 或  点击tag标签进来的内容
        history.save(keyword); // 写入缓存
        this.setData({
            historyTags: history.get()// 读取缓存
        })
        const paging = Search.search(keyword); // 搜索商品
        const data = await paging.getMoreData();
        this.bindItems(data)
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