/*
 * @作者 Akiko
 * @创建时间 2021-01-28 18:26
 */

import {Http} from "../utils/http";

class Categories {
    roots = [] // 一级分类
    subs = [] // 二级分类

    async getAll() {
        const data = await Http.request({
            url: `category/all`
        })
        this.roots = data.roots
        this.subs = data.subs
    }

    //一级菜单数据
    getRoots() {
        return this.roots;
    }

    //获取某个一级菜单的内容
    getRoot(rootId) {
        return this.roots.find(r => r.id === rootId)
    }

    //二级菜单数据
    getSubs(parentId) {
        // filter：过滤，因为二级分类不止一个，只有filter能保证返回的是一个数组
        return this.subs.filter(sub => sub.parent_id === parentId)
    }


}

export {
    Categories
}