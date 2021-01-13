/*
 * @作者 Akiko
 * @创建时间 2021-01-13 13:28
 */

//字符串的拼接
class Joiner {
    _str = ''
    _symbol = '-'
    _cutCharNum = 1

    constructor(symbol, cutCharNum) {
        if (symbol) {
            this._symbol = symbol
        }
        if (cutCharNum) {
            this._cutCharNum = cutCharNum
        }
    }

    join(part) {
        if (part) {
            this._str += `${part}${this._symbol}`;
        }
    }

    getStr() {
        return this._str.substring(0, this._str.length - this._cutCharNum)
    }

}

export {
    Joiner
}