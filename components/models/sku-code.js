/*
 * @作者 Akiko
 * @创建时间 2021-01-11 20:52
 */
import {combination} from "../../utils/util";

class SkuCode {
    code; // 原始的完整的code码
    spuId;
    totalsegments = [] // 保存当前sku所有的可能的组合

    constructor(code) {
        this.code = code
        this._splitToSegments()
    }

    //code码拆解
    _splitToSegments() {
        // 2$1-44#3-9#4-14
        const spuAndSpec = this.code.split('$')
        this.spuId = spuAndSpec[0]

        const specCodeArray = spuAndSpec[1].split('#');
        const length = specCodeArray.length;

        //计算数组所有的可能组合
        //3选1循环一次、3选2循环1一次、3选3循环一次。共三次
        for (let i = 1; i <= length; i++) {
            const segments = combination(specCodeArray, i); // i控制组合每次选的次数
            const newSegments = segments.map(segs => {
                //    把多维数组变为1维数组，多维的内容用#拼接起来
                return segs.join('#')

            })
            //    把当前sku所有路径拼接起来丢进一个新数组里
            this.totalsegments = this.totalsegments.concat(newSegments);
        }

    }
}

export {SkuCode}