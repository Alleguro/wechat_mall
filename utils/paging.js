const {Http} = require("./http");

class Paging {
    req; // 请求对象
    url; // 保存原始数据
    count; // 每次请求条数
    start; // 请求初始位置
    moreData = true; // 是否有更多数据
    locker = false; // 锁:默认是false，此时能获取数据
    accumulator = [];// 数据累加

    constructor(req, count = 10, start = 0) {
        this.req = req;
        this.url = req.url;
        this.count = count;
        this.start = start;
    }

    async getMoreData() {
        if (!this.moreData) {
            return
        }
        if (!this._getLocker()) {
            return;
        }
        const data = await this._actualGetData();
        this._releaseLocker();
        return data;
    }

    async _actualGetData() {
        const req = this._getCurrentReq();
        let paging = await Http.request(req);
        if (!paging) {
            return;
        }
        if (paging.total === 0) {
            return {
                empty: true,
                items: [],
                moreData: false,
                accumulator: []
            }
        }
        this.moreData = Paging._moreData(paging.total_page, paging.page);
        if (this.moreData) {
            this.start += this.count;
        }
        this._accmulate(paging.items);
        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator
        }
    }

    // 累加器
    _accmulate(items) {
        this.accumulator = this.accumulator.concat(items);
    }

    // 是否有更多数据
    static _moreData(totalPage, pageNum) {
        return pageNum < totalPage - 1;
    }

    //处理url
    _getCurrentReq() {
        let url = this.url;
        let params = `start=${this.start}&count=${this.count}`
        if (url.includes('?')) {
            url += '&' + params
        } else {
            url += '?' + params
        }
        this.req.url = url;
        return this.req;
    }

    _getLocker() {
        // 正锁着，不能获取数据
        if (this.locker) {
            return false;
        }

        this.locker = true;
        return true;
    }

    _releaseLocker() {
        this.locker = false;
    }

}

export {Paging}