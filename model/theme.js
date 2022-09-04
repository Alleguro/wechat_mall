import { Http } from "../utils/http";

class Theme {

    static locationA = 't-1'  // A位海报
    static locationE = 't-2'
    static locationF = 't-3'
    static locationH = 't-4'

    themes = [];

    // 获取所有专题
    async getThemes() {
        const names = `${Theme.locationA},${Theme.locationE},${Theme.locationF},${Theme.locationH}`
        this.themes = await Http.request({
            url: `theme/by/names`,
            data: {
                names
            }
        })

    }

    // 获取首页A专题
    async getHomeLocationA() {
        return this.themes.find(t => t.name === Theme.locationA)
    }

    // 获取首页E专题
    async getHomeLocationE() {
        return this.themes.find(t => t.name === Theme.locationE)
    }

}

export { Theme }