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
            this.bindInitData(fenceGroup)
            console.log(fenceGroup)
            const judger = new Judger(fenceGroup);
            this.data.judger = judger;
        }
    },
    /**
     * 组件的初始数据
     */
    data: {
        judger: Object, // 更改状态
        fences: Object, // 遍历的数据
    },

    /**
     * 组件的方法列表
     */
    methods: {
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
            judger.judger(cell, x, y);
            this.setData({
                fences: judger.fenceGroup.fences
            })

        }
    }
})
