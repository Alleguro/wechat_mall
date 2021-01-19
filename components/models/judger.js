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
    skuPending; // 记录用户当前点击的节点

    constructor(fenceGroup) {
        this.fenceGroup = fenceGroup;
        this._initPathDict();
        this._initSkuPending();
    }

//    页面"已选择"的显示逻辑
    isSkuIntact() {
        return this.skuPending.isIntact();
    }

    //查找已选择的sku
    getCurrentValues() {
        return this.skuPending.getCurrentSpecValues();
    }

    //查找潜在的没选择（缺失）的sku
    getMissingKeys() {
        const missingKeysIndex = this.skuPending.getMissingSpecKeys();
        return missingKeysIndex.map(i => {
            return this.fenceGroup.fences[i].title;
        })
    }

//    保存用户当前的cell节点
    _initSkuPending() {
        const specsLength = this.fenceGroup.fences.length;    // 完整的sku规格长度
        this.skuPending = new SkuPending(specsLength);
        //    默认sku
        const defaultSku = this.fenceGroup.getDefaultSku();
        if (!defaultSku) {
            return
        }
        this.skuPending.init(defaultSku);
        this._initSelectedCell();
        //    刷新页面所有cell的状态,判断默认sku是否存在
        this.judge(null, null, null, true);
    }

    //    初始化默认sku
    _initSelectedCell() {
        this.skuPending.pending.forEach(cell => {
            this.fenceGroup.setCellStatusById(cell.id, CellStatus.SELECTED)
        })
    }

//    初始化路径字典
    _initPathDict() {
        this.fenceGroup.skuList.forEach(s => {
            const skuCode = new SkuCode(s.code)
            //把sku所有可能的路径都拼接起来，形成路径字典
            this.pathDick = this.pathDick.concat(skuCode.totalsegments)
        })
    }

//    更改cell的状态
    judge(cell, x, y, isInit = false) {
        //如果不是初始化
        if (!isInit) {
            this._changeCurrentCellStatus(cell, x, y);
        }

        //    刷新每一个cell的状态
        this.fenceGroup.eachCell((cell, x, y) => {
            const path = this._findPotentialPath(cell, x, y);
            if (!path) {
                return
            }
            const isIn = this._isInDict(path); // 潜在路径
            if (isIn) {
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING);
            } else {
                this.fenceGroup.setCellStatusByXY(x, y, CellStatus.FORBIDDEN);
            }
        })
    }

//    获取确定的sku
    getDeterminateSku() {
        const code = this.skuPending.getSkuCode();
        const sku = this.fenceGroup.getSku(code);
        return sku;
    }

//    判断潜在路径是否存在
    _isInDict(path) {
        return this.pathDick.includes(path);
    }

//    寻找潜在路径,这里的cell和x是fenceGroup里传来，而不是realm传来的
    _findPotentialPath(cell, x, y) {
        const joiner = new Joiner('#');
        for (let i = 0; i < this.fenceGroup.fences.length; i++) {
            const selected = this.skuPending.findSelectedCellByX(i);
            //当前行
            if (x === i) {
                //    cell id 1-42
                if (this.skuPending.isSelected(cell, x)) {
                    return // 已选中的跳过,停止执行后面的代码
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
    _changeCurrentCellStatus(cell, x, y) {
        if (cell.status === CellStatus.WAITING) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.SELECTED);
            this.skuPending.insertCell(cell, x);
        }
        if (cell.status === CellStatus.SELECTED) {
            this.fenceGroup.setCellStatusByXY(x, y, CellStatus.WAITING);
            this.skuPending.removeCell(x);
        }
    }
}

export {Judger}