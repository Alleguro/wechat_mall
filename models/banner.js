import {
    Http
} from "../utils/http";

class Banner {

    static locationB = 'b-1';

    // 获取首页 B位置海报
    static async getHomeLocationB() {
        return await Http.request({
            url: `banner/name/${Banner.locationB}`
        })
    }
}

export {
    Banner
}