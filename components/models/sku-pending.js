/*
 * @作者 Akiko
 * @创建时间 2021-01-12 20:31
 */

import {Cell} from "./cell";
import {CellStatus} from "../../core/enum";
import {Joiner} from "../../utils/joiner";

class SkuPending {
    pending = []; // 记录用户的选择节点
    size; // 完整sku规格的长度

    constructor(size) {
        this.size = size;
    }

// 把默认sku放进已选记录节点里
    init(sku) {
        for (let i = 0; i < sku.specs.length; i++) {
            const cell = new Cell(sku.specs[i]);
            this.insertCell(cell, i);
        }
    }

    //查找已选择的sku
    getCurrentSpecValues() {
        const value = this.pending.map(cell => {
            return cell ? cell.spec.value : null;
        })
        return value; // 返回是一个新数组
    }

    //查找潜在的没选择（缺失）的sku
    getMissingSpecKeys() {
        const keyIndex = [];
        for (let i = 0; i < this.size; i++) {
            if (!this.pending[i]) {
                keyIndex.push(i);
            }
        }
        return keyIndex;
    }

//    获取完整的skuCode码
    getSkuCode() {
        const joiner = new Joiner('#'); // 字符串的拼接
        this.pending.forEach(cell => {
            const cellCode = cell.getCellCode()
            joiner.join(cellCode);
        })
        return joiner.getStr(); // 返回拼接好的code码
    }

//   判断用户是否已经选择完整的sku （页面"已选择"的显示逻辑）
    isIntact() {
        for (let i = 0; i < this.size; i++) {
            if (this._isEmptyPart(i)) {
                return false;
            }
        }
        return true;
    }

//    判断pending数组下面是否都有值
    _isEmptyPart(index) {
        return this.pending[index] ? false : true
    }

//   正选:x代表cell所在的行
    insertCell(cell, x) {
        this.pending[x] = cell;
    }

//   反选:取消已选择的cell
    removeCell(x) {
        this.pending[x] = null;
    }

//    找到其他行已选的cell
    findSelectedCellByX(x) {
        return this.pending[x];
    }

//    已选中的跳过
    isSelected(cell, x) {
        const pendingCell = this.pending[x];
        if (!pendingCell) {
            return false;
        }
        //同一行的cell不一定就是选中的cell，所以这里要再做一层判断
        return cell.id === pendingCell.id;
    }
}

export {SkuPending};