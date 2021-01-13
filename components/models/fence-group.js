import {Matrix} from "./matrix";
import {Fence} from "./fence";

class FenceGroup {
    spu; // 获取到的初始数据
    skuList;  // 初始的skuList数据
    fences = []; // 矩阵转职后的所有组的sku数据

    constructor(spu) {
        this.spu = spu;
        this.skuList = spu.sku_list;
    }

//    初始值sku数据
    initFences() {
        //    创建矩阵
        const matrix = this._createMatrix(this.skuList);
        const fences = [];
        const AT = matrix.transpose();
        AT.forEach(r => {
            const fence = new Fence(r);
            fence.init(); // 初始化一组sku数据
            fences.push(fence);
        })
        this.fences = fences;
    }

//    点击cell后刷新所有cell的状态
    eachCell(cb) {
        for (let i = 0; i < this.fences.length; i++) {
            for (let j = 0; j < this.fences[i].cells.length; j++) {
                const cell = this.fences[i].cells[j];
                cb(cell, i, j);
            }
        }
    }

//    创建矩阵,把skuList下面的所有specs数组丢进m里，形成2维数组
    _createMatrix(skuList) {
        const m = [];
        skuList.forEach(sku => {
            m.push(sku.specs);
        })
        return new Matrix(m);
    }
}

export {FenceGroup}