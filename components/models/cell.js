import {CellStatus} from "../../core/enum";

class Cell {
    title; // sku具体某个值
    id; // sku具体某个值的id
    status = CellStatus.WAITING; // 默认状态
    spec; // 初始数据
    skuImg; //可视规格图片

    constructor(spec) {
        this.title = spec.value;
        this.id = spec.value_id
        this.spec = spec;
    }

//    拼接code
    getCellCode() {
        return this.spec.key_id + "-" + this.spec.value_id;
    }

}

export {Cell}