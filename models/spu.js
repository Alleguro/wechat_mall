import {Http} from "../utils/http";

class Spu {

    //判断是否是无规格
    static isNoSpec(spu) {
        //唯一的sku同时没有规格
        if (spu.sku_list.length === 1 && spu.sku_list[0].specs.length === 0) {
            return true
        }
        return false
    }

    //获取id
    static async getDetail(id) {
        return await Http.request({
            url: `spu/id/${id}/detail`
        })
    }
}

export {
    Spu
}