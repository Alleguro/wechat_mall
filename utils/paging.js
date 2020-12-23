const {Http} = require("./http");

class Paging {
    req; // 请求对象
    count; // 每次请求条数
    start; // 请求起始位置
    url; // 保存原始的url路径
    locker = false; // 锁:默认关闭，可获取数据
    accumulator = []; // 累加的数据
    moreData = true; // 更多数据

    constructor(req, count = 10, start = 0) {
        this.req = req;
        this.count = count;
        this.start = start;
        this.url = req.url;
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
        this._accmulate(paging.items)
        return {
            empty: false,
            items: paging.items,
            moreData: this.moreData,
            accumulator: this.accumulator
        }
    }

    //累加器
    _accmulate(items) {
        this.accumulator = this.accumulator.concat(items)
    }

    //判断是否有更多数据
    static _moreData(totalPage, pageNum) {
        //pageNum是从0开始的
        return pageNum < totalPage - 1;
    }

    _getCurrentReq() {
        let url = this.url;
        const params = `start=${this.start}&count=${this.count}`
        //情况1：url = v1/spu/latest + '?' + params
        //情况2：url = v1/spu/latest?other=abc + '?' + params
        if (url.includes('?')) {
            url += '&' + params;
        } else {
            url += '?' + params;
        }
        this.req.url = url;
        return this.req;
    }

    _getLocker() {
        //锁：正锁着，不能获取数据
        if (this.locker) {
            return false;
        }
        //锁:未上锁，可以获取数据，并锁上
        this.locker = true;
        return true;
    }

    _releaseLocker() {
        //解锁：能获取数据
        this.locker = false;
    }
}

export {Paging}
