/*
 * @作者 Akiko
 * @创建时间 2021-02-02 16:33
 */

class CartItem {
    skuId = null;
    count = 0;
    sku = null;
    checked = true;

    constructor(sku, count) {
        this.sku = sku;
        this.skuId = sku.id;
        this.count = count;
    }

}

export {CartItem}