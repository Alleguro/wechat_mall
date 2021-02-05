/*
 * @作者 Akiko
 * @创建时间 2021-01-20 16:08
 */

class Cart {
    static SKU_MIN_COUNT = 1;        // 商品购买最小数量
    static SKU_MAX_COUNT = 77;       // 商品购买最大数量
    static CART_ITEM_MAX_COUNT = 77; // 商品购买种类最大数量
    static STORAGE_KEY = 'cart';     // 缓存中购物车的key
    _cartData = null; // 缓存里的数据

    //代理模式

    static constructor() {
        if (typeof Cart.instance === 'object') {
            return Cart.instance
        }
        Cart.instance = this
        return this
    }

//    获取本地缓存购物车的所有数据
    getAllCartItemFromLocal() {
        return this._getCartData()
    }

//    判断购物车数据是否为空
    isEmpty() {
        const cartData = this._getCartData();
        return cartData.items.length === 0;
    }

//    计算购物车商品数量
    getCartItemCount() {
        return this._getCartData().items.length;
    }

// 添加商品进购物车
    addItem(newItem) {
        if (this.beyondMaxCartItemCount()) {
            throw new Error('超出购物车最大数量')
        }
        this._pushItem(newItem);
        this._refreshStorage(); //刷新缓存
    }

// 删除购物车里的商品
    removeItem(skuId) {
        const oldItemIndex = this._findEqualItemIndex(skuId);
        const cartData = this._getCartData();
        cartData.items.splice(oldItemIndex, 1) // 根据商品在数组中的坐标删除
        this._refreshStorage(); // 刷新本地缓存
    }

//    查找购物车的某个商品的在数组中的坐标
    _findEqualItemIndex(skuId) {
        const cartData = this._getCartData();
        return cartData.items.findIndex(item => {
            return item.skuId == skuId;
        })
    }

// 刷新缓存
    _refreshStorage() {
        wx.setStorageSync(Cart.STORAGE_KEY, this._cartData)
    }

    _pushItem(newItem) {
        const cartData = this._getCartData()
        const oldItem = this.findEqualItem(newItem.skuId) // 查找此商品是否已经存在购物车里
        if (!oldItem) {
            cartData.items.unshift(newItem) // 如果不存在则把商品加入购物车
        } else {
            this._combineItems(oldItem, newItem) // 如果存在则把此商品的数量叠加
        }
    }

    findEqualItem(skuId) {
        let oldItem = null;
        const items = this._getCartData().items
        for (let i = 0; i < items.length; i++) {
            if (this._isEqualItem(items[i], skuId)) {
                oldItem = items[i]
                break;
            }
        }
        return oldItem
    }

    _isEqualItem(oldItem, skuId) {
        return oldItem.skuId === skuId;
    }

    _combineItems(oldItem, newItem) {
        this._plusCount(oldItem, newItem.count)
    }

    _plusCount(item, count) {
        item.count += count;
        if (item.count >= Cart.SKU_MAX_COUNT) {
            item.count = Cart.SKU_MAX_COUNT;
        }
    }

    //获取购物车数据
    _getCartData() {
        if (this._cartData !== null) {
            return this._cartData;
        }
        let cartData = wx.getStorageSync(Cart.STORAGE_KEY)
        if (!cartData) {
            cartData = this._initCartDataStorage()
        }
        this._cartData = cartData
        return cartData;
    }

    // 初始化购物车数据，并写进缓存
    _initCartDataStorage() {
        const cartData = {
            items: []
        }
        wx.setStorageSync(Cart.STORAGE_KEY, cartData)
        return cartData;
    }

// 判断购物车所有种类是否超出最大限制
    beyondMaxCartItemCount() {
        const cartData = this._getCartData(); // 获取购物车所有商品种类
        return cartData.items.length >= Cart.CART_ITEM_MAX_COUNT;
    }
}

export {Cart}