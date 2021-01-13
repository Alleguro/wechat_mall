class Matrix {
    m; // 传进来的未转置的2维数组
    constructor(matrix) {
        this.m = matrix;

    }

//    获取数组长度
    get rowsNum() {
        return this.m.length;
    }

//    获取数组列数
    get colsNum() {
        return this.m[0].length;
    }

//    矩阵转置
    transpose() {
        const desArr = [];
        for (let j = 0; j < this.colsNum; j++) {
            desArr[j] = []; // [[],[],[]]
            for (let i = 0; i < this.rowsNum; i++) {
                desArr[j][i] = this.m[i][j];
            }
        }
        return desArr;
    }
}

export {Matrix}