import {
    Http
} from "../utils/http";

class Banner {

    static locationB = 'b-1';
    static locationG = 'b-2'

    // 获取首页 B位置海报
    static async getHomeLocationB() {
        return await Http.request({
            url: `banner/name/${Banner.locationB}`
        })
    }

    // 获取首页 G位三张海报
    static async getHomeLocationG() {
        return await Http.request({
            url: `banner/name/${Banner.locationG}`
        })
    }
}

export {
    Banner
}