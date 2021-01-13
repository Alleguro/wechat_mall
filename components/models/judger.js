/*
 * @作者 Akiko
 * @创建时间 2021-01-11 20:40
 */


import {SkuCode} from "./sku-code";
import {CellStatus} from "../../core/enum";
import {SkuPending} from "./sku-pending";
import {Joiner} from "../../utils/joiner";

//  法官和仲裁者的意思
class Judger {
    fenceGroup; // realm传进来的矩阵转置后的数据
    pathDick = []; // 所有有可能的sku路径组合成的字典
    skupending; // 记录用户当前点击的节点

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup;
        this._initPathDict();
        this._initSkupending();

    }

//    保存用户当前的cell节点
    _initSkupending() {
        this.skupending = new SkuPending();
    }

//    初始化路径字典
    _initPathDict() {
        this.fenceGroup.skuList.forEach(s => {
            const skuCode = new SkuCode(s.code)
            //把sku所有可能的路径都拼接起来，形成路径字典
            this.pathDick = this.pathDick.concat(skuCode.totalsegments)
        })
        console.log(this.pathDick)
    }

//    更改cell的状态
    judger(cell, x, y) {
        this._changeCellStatus(cell, x, y);
        //    刷新每一个cell的状态
        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y);
            if (!path) {
                return
            }
            console.log(path);
            const isIn = this._isInDict(path); // 潜在路径
            if (isIn) {
                this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING;
            } else {
                this.fenceGroup.fences[x].cells[y].status = CellStatus.FORBIDDEN;
            }
        })
    }

//    判断潜在路径是否存在
    _isInDict(path) {
        return this.pathDick.includes(path);
    }

//    寻找潜在路径,这里的cell是fenceGroup里传来，而不是realm传来的
    _findPotentialPath(cell, x, y) {
        const joiner = new Joiner('#');
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skupending.findSelectedCellByX(i);
            //当前行
            if (x === i) {
                //    cell id 1-42
                if (this.skupending.isSelected(cell, x)) {
                    return; // 已选中的跳过
                }
                const cellCode = this._getCellCode(cell.spec)
                joiner.join(cellCode);
            } else {
                //其他行
                if (selected) {
                    //    selected cell path
                    const selectedCellCode = this._getCellCode(selected.spec)
                    joiner.join(selectedCellCode);
                }
            }
        }
        return joiner.getStr(); // 得到最终拼接的字符串
    }

//    获取cell的key_id和value_id
    _getCellCode(spec) {
        return spec.key_id + "-" + spec.value_id;
    }

//    更改cell的状态
    _changeCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.SELECTED
            this.skupending.insertCell(cell, x);
            // console.log(this.skupending.pending)

        }
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.fences[x].cells[y].status = CellStatus.WAITING
            this.skupending.removeCell(x);
            // console.log(this.skupending.pending)

        }
    }
}

export {Judger}