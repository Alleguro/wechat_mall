import { Http } from "../utils/http";


// 获取 Home 页面 D位的优惠券入口
class Activity {

    static async getHomeLocationD() {
        return await Http.request({
            url: 'activity/name/a-2'
        })
    }

}

export { Activity }