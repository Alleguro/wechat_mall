// components/cart-item/index.js
import {parseSpecValue} from "../../utils/sku";
import {Cart} from "../../models/cart";

const cart = new Cart();
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        cartItem: Object,
    },

    /**
     * 组件的初始数据
     */
    data: {
        specStr: String, // 是否有规格
        soldOut: String, // 售馨
        discount: Boolean, // 折扣
        online: Boolean, // 上下架
        stock: Cart.SKU_MAX_COUNT, // 库存
        skuCount: 1 // 商品购买的数量
    },
    observers: {
        cartItem: function (cartItem) {
            if (!cartItem) {
                return
            }
            const specStr = parseSpecValue(cartItem.sku.specs) // 规格
            const discount = cartItem.sku.discount_price ? true : false // 折扣
            const soldOut = Cart.isSoldOut(cartItem) // 售馨
            const online = Cart.isOnline(cartItem) // 上下架
            this.setData({
                specStr,
                discount,
                soldOut,
                online,
                stock: cartItem.sku.stock,  // 库存
                skuCount: cartItem.count
            })
        }
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //    删除此商品
        onDelete() {
            const skuId = this.properties.cartItem.skuId;
            cart.removeItem(skuId)
            this.setData({
                cartItem: null
            })
            // 删除后触发的事件
            this.triggerEvent('itemdelete', {
                skuId
            })
        },
        //    选中或取消此商品
        checkedItem(e) {
            const checked = e.detail.checked; // 改变ui层的状态
            cart.checkItem(this.properties.cartItem.skuId); // 改变全局的cartItem数据的状态
            this.properties.cartItem.checked = checked;
            this.triggerEvent('itemcheck', {})
        },
        //    count数字改变时触发的方法
        onSelectCount(e) {
            let newCount = e.detail.count;
            cart.replaceItemCount(this.properties.cartItem.skuId, newCount)
            this.triggerEvent("countfloat")
        }
    }
})
