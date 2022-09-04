import { Http } from "../utils/http";

class Bannner {

    static locationB = 'b-1'

    // 获取首页B轮播海报
    static async getHomeLocationB() {
        return await Http.request({
            url: `/banner/name/${Bannner.locationB}`
        })
    }
}

export { Bannner }