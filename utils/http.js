import { config } from "../config/config";
import { promisic } from "./util";

// 封装请求
class Http {
    static async request({ url, data, method = 'GET' }) {
        // 转换
        const res = await promisic(wx.request)({
            url: `${config.apiBaseUrl}${url}`,
            data,
            method,
            header: {
                appkey: config.appkey
            }
        })
        return res.data;
    }
}


export { Http }