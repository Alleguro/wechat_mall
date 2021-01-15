// components/realm/index.js

import {Judger} from "../models/judger";

const {FenceGroup} = require("../models/fence-group");
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
            const fenceGroup = new FenceGroup(spu)
            fenceGroup.initFences();
            console.log(fenceGroup)
            const judger = new Judger(fenceGroup);
            this.data.judger = judger;
            const defaultSku = fenceGroup.getDefaultSku()
            if (defaultSku) {
                this.bindSkuData(defaultSku)
            } else {
                this.bindSpuData();
            }
            this.bindInitData(fenceGroup)
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
        price: null,// 原价
        discountPrice: null // 折扣价
    },

    /**
     * 组件的方法列表
     */
    methods: {
        //没有默认sku
        bindSpuData() {
            const spu = this.properties.spu
            this.setData({
                previewImg: spu.img,
                title: spu.title,
                price: spu.price,
                discountPrice: spu.discount_price
            })
        },
        //有默认sku
        bindSkuData(sku) {
            this.setData({
                previewImg: sku.img,
                title: sku.title,
                price: sku.price,
                discountPrice: sku.discount_price
            })
        },
        //初始化数据
        bindInitData(fenceGroup) {
            this.setData({
                fences: fenceGroup.fences
            })
        },
        //接收cell组件传来的值
        onCellTap(e) {
            const cell = e.detail.cell;
            const x = e.detail.x;
            const y = e.detail.y
            const judger = this.data.judger;
            console.log(e.detail)
            judger.judge(cell, x, y);
            this.setData({
                fences: judger.fenceGroup.fences
            })

        }
    }
})
