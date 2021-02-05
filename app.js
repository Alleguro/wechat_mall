//app.js
import {Cart} from "./models/cart";

App({
    onLaunch: function () {
        const cart = new Cart(); // 购物车
        if (!cart.isEmpty()) { // 如果购物车数据不为空则显示红点
            wx.showTabBarRedDot({
                index: 2
            })
        }
    }
})