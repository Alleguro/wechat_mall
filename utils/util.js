// 让不知promise的方法返回promise，从而实现promise的转换、
const promisic = function (func) {
    return function (params = {}) {
        return new Promise((resolve, reject) => {
            const args = Object.assign(params, {
                success: (res) => {
                    resolve(res);
                },
                fail: (error) => {
                    reject(error);
                }
            });
            func(args);
        })
    }
}
//代理模式

export {promisic}