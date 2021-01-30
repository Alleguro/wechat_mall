/*
 * @作者 Akiko
 * @创建时间 2021-01-26 16:09
 */
import {Http} from "../utils/http";

class SaleExplain {
    static async getFixed() {
        const explains = await Http.request({
            url: `sale_explain/fixed`
        })
        return explains.map(e => {
            return e.text
        })
    }
}

export {SaleExplain}