// pages/cart/cart.js
import {Cart} from "../../models/cart";
import {Caculator} from "../../models/caculator";

const cart = new Cart();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        cartItems: [], // 本地缓存中购物车的所有数据
        isEmpty: false, // 购物车没有数据的时候才显示
        allChecked: false, // 全选
        totalPrice: 0, // 商品总价
        totalSkuCount: 0, // 商品总数
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
        this.isAllChecked(); // 全选方法
        this.refreshCartData(); // 刷新和计算购物车内商品总价
    },
    //刷新和计算购物车内商品总价
    refreshCartData() {
        const checkedItems = cart.getCheckedItems() // 获取所有已勾选的商品
        let calculator = new Caculator(checkedItems)
        calculator.calc(); // 计算价格
        this.setCalcData(calculator)   //绑定商品总价和总数
    },
    //绑定商品总价和总数
    setCalcData(calculator) {
        const totalPrice = calculator.getTotalPrice()
        const totalSkuCount = calculator.getTotalSkuCount()
        this.setData({
            totalPrice,
            totalSkuCount
        })
    },
    //某个商品数量变化时触发的方法
    onCountFloat() {
        this.refreshCartData();
    },
    //判断全选按钮状态
    isAllChecked() {
        const allChecked = cart.isAllChecked();
        this.setData({
            allChecked
        })
    },
    //某一个商品选中或取消选中时都触发全选方法
    onSingleCheck(e) {
        this.isAllChecked();
        this.refreshCartData() //刷新和计算购物车内商品总价
    },
    //某一个商品删除时都触发全选方法
    onDeleteItem(e) {
        this.isAllChecked()
        this.refreshCartData() //刷新和计算购物车内商品总价
    },
    // 全选或全取消
    onCheckAll(e) {
        const checked = e.detail.checked;
        cart.checkAll(checked)
        this.setData({
            cartItems: this.data.cartItems // 刷新页面数据
        })
        this.refreshCartData() //刷新和计算购物车内商品总价
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