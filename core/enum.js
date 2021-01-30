/*
 * @作者 Akiko
 * @创建时间 2021-01-12 17:58
 */

//sku下cell的状态
const CellStatus = {
    FORBIDDEN: 'forbidden',
    SELECTED: 'selected',
    WAITING: 'waiting'
}

// 用户的购物方式
const ShoppingWay = {
    CART: 'cart',
    BUY: 'buy'
}

// spu-list页面显示的内容为什么类别
const SpuListType = {
    THEME: 'theme',
    ROOT_CATEGORY: 'root_category',
    SUB_CATEGORY: 'sub_category',
    LATEST: 'latest'
}
export {
    CellStatus, ShoppingWay, SpuListType
}
