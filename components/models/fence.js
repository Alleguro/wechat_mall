import {Cell} from "./cell";

class Fence {
    cells = []; // 一组规格值
    specs; // 未区分前的规格值
    title; // 规格值的名称
    id; // 规格名的唯一标识
    constructor(specs) {
        this.specs = specs;
        this.title = specs[0].key;
        this.id = specs[0].key_id;
    }
    init() {
        this._initCells();
    }
    _initCells() {
        this.specs.forEach(s => {
            //    规格值去重
            //    some:满足一个条件返回true
            //    every:满足所有条件才返回true
            const existed = this.cells.some(c => {
                return c.id === s.value_id;
            })
            if (existed) {
                return;
            }
            const cell = new Cell(s);
            this.cells.push(cell)
        })
    }
    //把可视规格一一对应起来
    setFenceSketch(skuList) {
        this.cells.forEach(c => {
            this._setCellSkuImg(c, skuList);
        })
    }
    //查找sku可视规格
    _setCellSkuImg(cell, skuList) {
        const specCode = cell.getCellCode();
        const matchedSku = skuList.find(s => s.code.includes(specCode));
        if (matchedSku) {
            cell.skuImg = matchedSku.img; // 把cell里的skuImg对应起来，可视规格图
        }
    }
}
export {Fence}