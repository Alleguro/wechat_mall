// pages/detail/detail.js
import {
    Spu
} from "../../models/spu";
import {ShoppingWay} from "../../core/enum";
import {SaleExplain} from "../../models/sale-explain";
import {getSystemSize} from "../../utils/system";
import {px2rpx} from "../../miniprogram_npm/lin-ui/utils/util";
import {Cart} from "../../models/cart";
import {CartItem} from "../../models/cart-item";

Page({

    /**
     * 页面的初始数据
     */
    data: {
        showRealm: false, // 控制realm的显示隐藏
        cartItemCount: 0, // 购物车所有商品数量
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: async function (options) {
        const pid = options.pid
        const spu = await Spu.getDetail(pid)
        const explain = await SaleExplain.getFixed(); // 商品描述
        const skuListImg = this.filterImg(spu);
        //动态计算高度
        const h = await this.setDynamicSegmentHeight();
        this.setData({
            spu,
            skuListImg, // 滚动商品图
            explain, // 商品发货地址等等参数
            segHeight: h
        })
        this.updateCartItemCount() // 更新tabbar组件的购物车数量
    },
    //动态计算页面高度,减去搜索框与margin-top的高度就是页面内容的高度
    async setDynamicSegmentHeight() {
        const res = await getSystemSize();
        const windowHeightRpx = px2rpx(res.windowHeight)
        return windowHeightRpx - 60 - 20 - 2;
    },
    //过滤重复的商品图片
    filterImg(spu) {
        const skuListImg = [];
        for (let i = 0; i < spu.sku_list.length; i++) {
            if (skuListImg.indexOf(spu.sku_list[i].img) === -1) {
                skuListImg.push(spu.sku_list[i].img)
            }
        }
        return skuListImg;
    },
    onGotoHome(e) {
        wx.switchTab({
            url: `/pages/home/home`
        })
    },
    onGotoCart(e) {
        wx.switchTab({
            url: `/pages/cart/cart`
        })
    },
    onAddToCart(e) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.CART
        })
    },
    onBuy(e) {
        this.setData({
            showRealm: true,
            orderWay: ShoppingWay.BUY
        })
    },
    // 用户选择的购买方式，加入购物车或立即购买
    onShopping(e) {
        console.log('用户加入购物车的商品：', e.detail)
        const chosenSku = e.detail.sku // 商品参数
        const skuCount = e.detail.skuCount // 购买数量
        if (e.detail.orderWay == ShoppingWay.CART) { // 用户选择加入购物车
            const cart = new Cart();
            const cartItem = new CartItem(chosenSku, skuCount);
            cart.addItem(cartItem); // 加入购物车并添加到缓存
            this.updateCartItemCount();  // 更新tabbar组件的购物车数量
        }
    },
// 更新tabbar组件的购物车数量
    updateCartItemCount() {
        const cart = new Cart()
        this.setData({
            cartItemCount: cart.getCartItemCount(), // 获取购物车商品数量
            showRealm: false // 关闭realm组件
        })
    },
    //接收realm组件出来的请选择或已选择的内容
    onSpecChange(e) {
        this.setData({
            specs: e.detail
        })
    },
    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    }
})