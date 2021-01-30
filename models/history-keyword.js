/*
 * @作者 Akiko
 * @创建时间 2021-01-29 23:36
 */

//操作本地缓存，全局只有一个
class HistoryKeyword {
    static MAX_ITEM_COUNT = 20; // 最多存放的数量
    static KEY = 'keywords'; // 缓存的key值
    keywords = []; // 临时保存缓存的数据
    constructor() {
        //单例模式
        if (typeof HistoryKeyword.instance === 'object') {
            return HistoryKeyword.instance;
        }
        HistoryKeyword.instance = this
        this.keywords = this._getLocalKeywords() // 读取缓存
        return this;
    }
//    保存数据
    save(keyword) {
        const items = this.keywords.filter(k => {
            return k === keyword;
        })
        if (items.length !== 0) {
            return;
        }
        if (this.keywords.length >= HistoryKeyword.MAX_ITEM_COUNT) {
            this.keywords.pop(); // 删除数组最后一个元素
        }
        this.keywords.unshift(keyword); // 把新的历史记录添加到数组首位
        this._refreshLocal()
    }
    //读取数据
    get() {
        return this.keywords;
    }
//    清除数据
    clear() {
        this.keywords = [];
        this._refreshLocal()
    }
//    写入缓存
    _refreshLocal() {
        wx.setStorageSync(HistoryKeyword.KEY, this.keywords);
    }
//    读取缓存
    _getLocalKeywords() {
        const keywords = wx.getStorageSync(HistoryKeyword.KEY)
        if (!keywords) {
            wx.setStorageSync(HistoryKeyword.KEY, []);
            return [];
        }
        return keywords;
    }
}

export {HistoryKeyword}