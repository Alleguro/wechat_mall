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

const {
    FenceGroup
} = require("../models/fence-group");
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        spu: Object
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
    },
    /**
     * 组件的方法列表
     */
    methods: {
        //处理无规格情况
        processNoSpec(spu) {
            this.setData({
                noSpec: true,
                // skuIntact: 无规格下面的不用管
            })
            this.bindSkuData(spu.sku_list[0]);
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
                this.bindSkuData(defaultSku)
            } else {
                this.bindSpuData();
            }
            this.bindFenceGroupData(fenceGroup)
            this.bindTipData();
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
        //判断用户是否选择了完整的sku
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
                console.log(currentSku);
                this.bindSkuData(currentSku); // 实现数据的联动
            }
            this.bindTipData(); // 判断是否选择了完整的sku
            this.bindFenceGroupData(judger.fenceGroup)
            console.log(judger.fenceGroup)
        }
    }
})