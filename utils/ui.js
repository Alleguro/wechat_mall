/*
 * @作者 Akiko
 * @创建时间 2021-01-31 00:53
 */

const showToast = function (title) {
    wx.showToast({
        icon: "none",
        duration: 2000,
        title
    })
}

export {showToast}