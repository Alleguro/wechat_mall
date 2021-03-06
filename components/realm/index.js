// components/realm/index.js

import {
    Judger
} from "../models/judger";
import {
    Spu
} from "../../models/spu";
import object from "../../miniprogram_npm/lin-ui/common/async-validator/validator/object";
import {
    Cell
} from "../models/cell";
import {Cart} from "../../models/cart";
import {showToast} from "../../utils/ui";

const {
    FenceGroup
} = require("../models/fence-group");
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object,
        orderWay: String, // 用户的购买方式 加入购物车或立即购买
    },

    observers: {
        'spu': function (spu) {
            if (!spu) {
                return;
            }
            //判断此商品是否无规格
            if (Spu.isNoSpec(spu)) {
                //无规格情况
                this.processNoSpec(spu);
            } else {
                //有规格情况
                this.processHasSpecs(spu);
            }
            this.triggerSpecEvent();  // 把已选择或请选择的值和状态传给detail页面
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        judger: Object, // 更改状态
        fences: Object, // 遍历的数据,
        previewImg: String, // 商品图
        title: String, // 商品名称
        price: null, // 原价
        discountPrice: null, // 折扣价
        stock: null, // 库存 具体的sku才有库存
        noSpec: Object, // 判断商品是否无规格
        skuIntact: Object, // 判断用户是否选择了完整的sku
        currentSkuCount: Cart.SKU_MIN_COUNT, // 保存商品购买数量
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //处理无规格情况
        processNoSpec(spu) {
            console.log(spu)
            this.setData({
                noSpec: true,
                // skuIntact: 无规格下面的不用管
            })
            this.bindSkuData(spu.sku_list[0]);
            this.setStockStatus(spu.sku_list[0].stock, this.data.currentSkuCount)
        },
        //有规格情况
        processHasSpecs(spu) {
            const fenceGroup = new FenceGroup(spu)
            fenceGroup.initFences(); // sku矩阵转置
            console.log(fenceGroup)
            const judger = new Judger(fenceGroup); // sku潜在路径字典与状态切换
            this.data.judger = judger;
            const defaultSku = fenceGroup.getDefaultSku() // 默认sku
            if (defaultSku) {
                this.bindSkuData(defaultSku);
                this.setStockStatus(defaultSku.stock, this.data.currentSkuCount)
            } else {
                this.bindSpuData();
            }
            this.bindFenceGroupData(fenceGroup);
            this.bindTipData();
        },
        // 把已选择或请选择的值和状态传给detail页面
        triggerSpecEvent() {
            const noSpec = Spu.isNoSpec(this.properties.spu)
            console.log(noSpec)
            if (noSpec) {
                this.triggerEvent('specChange', {
                    noSpec
                })
            } else {
                this.triggerEvent('specChange', {
                    noSpec: Spu.isNoSpec(this.properties.spu),
                    skuIntact: this.data.judger.isSkuIntact(),
                    currentValues: this.data.judger.getCurrentValues(), // 用户已选择的sku
                    missingKeys: this.data.judger.getMissingKeys() // 用户未选择的潜在sku
                })
            }
        },
        //没有默认sku
        bindSpuData() {
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discountPrice: spu.discount_price,
            })
        },
        //有默认sku
        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice: sku.discount_price,
                stock: sku.stock,
            })
        },
        //判断用户是否选择了完整的sku,从而显示页面已选择的内容
        bindTipData() {
            this.setData({
                skuIntact: this.data.judger.isSkuIntact(),
                currentValues: this.data.judger.getCurrentValues(), // 用户已选择的sku
                missingKeys: this.data.judger.getMissingKeys() // 用户未选择的潜在sku
            })
        },
        //初始化数据
        bindFenceGroupData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences,
            })
        },
        //设置stock状态
        setStockStatus(stock, currentCount) {
            this.setData({
                outStock: this.isOutOfStock(stock, currentCount)
            })
        },
        //判断库存量和当前用户购买的数量
        isOutOfStock(stock, currentCount) {
            return stock < currentCount; // 用户选择的数量大于库存返回true
        },
        //每次加减商品数量或输入商品数量后触发的方法，获取到count
        onSelectCount(e) {
            const currentCount = e.detail.count;
            this.data.currentSkuCount = currentCount;
            if (this.noSpec()) {
                this.setStockStatus(this.getNoSpecSku().stock, currentCount);
            } else {
                if (this.data.judger.isSkuIntact()) {// 判断是否选择了完整的sku
                    const sku = this.data.judger.getDeterminateSku();
                    this.setStockStatus(sku.stock, currentCount);
                }
            }
        },
        //接收cell组件传来的值
        onCellTap(e) {
            const data = e.detail.cell;
            const x = e.detail.x;
            const y = e.detail.y
            const cell = new Cell(data.spec);
            cell.status = data.status;
            const judger = this.data.judger;
            judger.judge(cell, x, y);
            const skuIntact = judger.isSkuIntact(); // 是否选择了完整的sku
            if (skuIntact) {
                const currentSku = judger.getDeterminateSku() // 获取完整的选择的sku数据
                console.log(currentSku)
                this.bindSkuData(currentSku); // 实现数据的联动
                this.setStockStatus(currentSku.stock, this.data.currentSkuCount); // 判断用户选择的商品数量是否超出库存,超出则显示缺货
            }
            this.bindTipData(); // 已选择或未选择的内容
            this.bindFenceGroupData(judger.fenceGroup)
            this.triggerSpecEvent(); // 把已选择或请选择的值和状态传给detail页面
        },

        //    无规格情况判断
        noSpec() {
            const spu = this.properties.spu;
            return Spu.isNoSpec(spu);
        },
//    加入购物车或立即购买
        onBuyOrCart(e) {
            if (this.noSpec()) {
                this.shoppingNoSpec(); // 无规格商品
            } else {
                this.shoppingVarious(); // 有规格商品
            }
        },
// 1.购买有规格商品情况
        shoppingVarious() {
            const intact = this.data.judger.isSkuIntact() // 判断用户是否选择了完整的sku
            if (!intact) {
                const missKeys = this.data.judger.getMissingKeys(); // 用户还没选择的cell
                wx.showToast({
                    icon: 'none',
                    title: `请选择:${missKeys.join(',')}`,
                    duration: 3000
                })
                return
            }
            this._triggerShoppingEvent(this.data.judger.getDeterminateSku()); // 用户确定的sku
        },
// 2.购买无规格商品情况
        shoppingNoSpec() {
            this._triggerShoppingEvent(this.getNoSpecSku());
        },
//无规格商品数据
        getNoSpecSku() {
            return this.properties.spu.sku_list[0];
        },
// 要传送的购买数据或购物车数据
        _triggerShoppingEvent(sku) {
            this.triggerEvent('shopping', {
                orderWay: this.properties.orderWay,  // 用户的购买方式
                spuId: this.properties.spu.id, // 立即购买还是加入购物车都需要spuId
                sku: sku,
                skuCount: this.data.currentSkuCount // 用户购买数量
            })
        }
    }
})