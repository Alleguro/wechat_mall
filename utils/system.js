/*
 * @作者 Akiko
 * @创建时间 2021-01-27 09:33
 */

import {promisic} from "./util";

//获取页面的宽高
const getSystemSize = async function () {
    const res = await promisic(wx.getSystemInfo)();
    return {
        windowHeight: res.windowHeight,
        windowWidth: res.windowWidth,
        screenWidth: res.screenWidth,
        screenHeight: res.screenHeight
    }
}

export {getSystemSize}