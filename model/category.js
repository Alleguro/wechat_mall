import { Http } from "../utils/http";

// 获取Home页面 C位置 六宫格数据
class Category {
    static async getGridCategory() {
        return await Http.request({
            url: 'category/grid/all'
        })
    }
}

export { Category }