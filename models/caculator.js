/*
 * @作者 Akiko
 * @创建时间 2021-02-19 16:05
 */

import {accAdd, accMultiply} from "../utils/number";

class Caculator {
    totalPrice = 0; // 总价
    totalSkuCount = 0; // 总数量
    cartItems = []; // 购物车数据

    constructor(cartItems) {
        this.cartItems = cartItems;
    }

    //计算购物车商品价格
    calc() {
        this.cartItems.forEach(item => {
            this.push(item)
        })
    }

    //获取价格
    getTotalPrice() {
        return this.totalPrice
    }

    //获取数量
    getTotalSkuCount() {
        return this.totalSkuCount
    }

    push(cartItem) {
        let partTotalPrice = 0;
        if (cartItem.sku.discount_price) {
            // partTotalPrice = cartItem.count * cartItem.sku.discount_price // 这样计算小数点不精确
            partTotalPrice = accMultiply(cartItem.count, cartItem.sku.discount_price)
        } else {
            // partTotalPrice = cartItem.count * cartItem.sku.price // 这样计算小数点不精确
            partTotalPrice = accMultiply(cartItem.count, cartItem.sku.price)
        }
        // this.totalPrice += partTotalPrice; // 累加价格 这样计算小数点不精确
        this.totalPrice = accAdd(this.totalPrice, partTotalPrice);// 累加价格
        this.totalSkuCount += cartItem.count;
    }
}

export {Caculator}