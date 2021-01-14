/*
 * @作者 Akiko
 * @创建时间 2021-01-12 20:31
 */

class SkuPending {
    pending = []; // 记录用户的选择节点

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