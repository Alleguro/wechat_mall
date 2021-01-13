import {Http} from "../utils/http";

class Spu {

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