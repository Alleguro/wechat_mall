import {
    Http
} from "../utils/http";

//业务对象
//theme、banner、spu、sku、address、user
class Theme {
    static locationA = 't-1';
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'
    themes = []; // 保存数据和状态

    // 获取首页 所有主题
    async getThemes() {
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        this.themes = await Http.request({
            url: `theme/by/names`,
            data: {
                names
            }
        })
    }

    // 获取首页带有spu的theme相关数据
    static getThemeSpuByName(name) {
        return Http.request({
            url: `theme/name/${name}/with_spu`
        })
    }

    // 获取A位 主题
    getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA)
    }

    //  获取E位
    getHomeLocationE() {
        return this.themes.find(t => t.name === Theme.locationE)
    }

    // 封装获取E位 spu商品详情 滚动区域
    static getLocationEspu() {
        return Theme.getThemeSpuByName(Theme.locationE);
    }


    // 获取F位 甄选入口
    getHomeLocationF() {
        return this.themes.find(t => t.name === Theme.locationF)
    }

    // 获取H位 时尚穿搭
    getHomeLocationH() {
        return this.themes.find(t => t.name === Theme.locationH)
    }

    // 获取A位 主题 错误的方法
    // 非static变量不能在static方法调用啊
    // static getHomeLocationA() {
    //     return this.themes.find(t => t.name === Theme.locationA)
    // }
}

export {
    Theme
}