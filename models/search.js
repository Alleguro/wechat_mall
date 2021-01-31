/*
 * @作者 Akiko
 * @创建时间 2021-01-30 15:02
 */

import {Paging} from "../utils/paging";

class Search {
    //q是关键字
    static search(q) {
        return new Paging({
            url: `search?q=${q}`
        },)
    }
}

export {Search}