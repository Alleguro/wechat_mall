const {Http} = require("../utils/http");

class Activity {
    static async getHomeLocationD() {
        return await Http.request({
            url: 'activity/name/a-2'
        })
    }
}

export {Activity}