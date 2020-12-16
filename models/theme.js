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
    themes = [];
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

    // 获取A位 主题
    getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA)
    }
}

export {
    Theme
}