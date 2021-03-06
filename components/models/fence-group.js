import {Matrix} from "./matrix";
import {Fence} from "./fence";
import {Cell} from "./cell";

class FenceGroup {
    spu; // 获取到的初始数据
    skuList;  // 初始的skuList数据
    fences = []; // 矩阵转职后的所有组的sku数据

    constructor(spu) {
        this.spu = spu;
        this.skuList = spu.sku_list;
    }

//    默认sku
    getDefaultSku() {
        //获取到默认sku的id
        const defaultSkuId = this.spu.default_sku_id;
        if (!defaultSkuId) {
            return;
        }
        return this.skuList.find(s => s.id === defaultSkuId);
    }

    //查找某个确定skuCode的商品数据
    getSku(skuCode) {
        //补全code码前面的spu码
        const fullSkuCode = this.spu.id + '$' + skuCode;
        const sku = this.spu.sku_list.find(s => s.code === fullSkuCode);
        return sku ? sku : null;
    }

    //加载默认sku时刷新所有cell状态
    setCellStatusById(cellId, status) {
        this.eachCell((cell) => {
            if (cell.id === cellId) {
                cell.status = status
            }
        })
    }

    //更改点击的cell状态
    setCellStatusByXY(x, y, status) {
        this.fences[x].cells[y].status = status;
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
            //可视规格
            if (this._hasSketchFence() && this._isSketchFence(fence.id)) {
                fence.setFenceSketch(this.skuList);
            }
            fences.push(fence);
        })
        this.fences = fences;
    }

//    判断是否存在可视规格
    _hasSketchFence() {
        return this.spu.sketch_spec_id ? true : false;
    }

//    查找可视规格id
    _isSketchFence(fenceId) {
        return this.spu.sketch_spec_id === fenceId;
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