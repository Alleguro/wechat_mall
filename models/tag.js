/*
 * @作者 Akiko
 * @创建时间 2021-01-30 05:05
 */

import {Http} from "../utils/http";

// 热门搜索标签
class Tag {
    static async getSearchTags() {
        return await Http.request({
            url: `tag/type/1`
        })
    }
}

export {Tag}