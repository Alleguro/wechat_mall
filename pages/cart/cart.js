// pages/cart/cart.js
import {Cart} from "../../models/cart";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartItems: [], // 本地缓存中购物车的所有数据
        isEmpty: false, // 购物车没有数据的时候才显示
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // 用户可能会不断切换页面，onShow能保证每次切换到购物车页面都刷新购物车页面
        const cart = new Cart()
        const cartItems = cart.getAllCartItemFromLocal().items; // 获取本地缓存中购物车的所有数据
        console.log(cartItems)
        if (cart.isEmpty()) { // 购物车数据如果为空
            this.empty();   // 购物车没数据的时候才显示empty组件
            return;
        }
        this.setData({
            cartItems
        })
        this.notEmpty(); // 购物车不为空执行的方法
    },
    // 购物车没数据的时候才显示empty组件
    empty() {
        this.setData({
            isEmpty: true
        })
        // 购物车没数据时取消红点
        wx.hideTabBarRedDot({
            index: 2 // 红点出现的位置
        })
    },
// 购物车不为空执行的方法
    notEmpty() {
        this.setData({
            isEmpty: false
        })
        wx.showTabBarRedDot({
            index: 2
        })
    }


})