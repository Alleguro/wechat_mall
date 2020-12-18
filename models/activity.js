const {Http} = require("../utils/http");

//获取首页D位 优惠券入口
class Activity {
    static async getHomeLocationD() {
        return await Http.request({
            url: 'activity/name/a-2'
        })
    }
}

export {Activity}