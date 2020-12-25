import {Paging} from "../utils/paging";

//获取瀑布流商品数据
class SpuPaging {
    static getLatestPaging() {
        return new Paging({
                url: 'spu/latest'
            },
            5
        )
    }
}

export {SpuPaging}