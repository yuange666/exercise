Promise.all = function (promises) {
    //promises 是可迭代对象，省略参数合法性检查
    return new Promise((resolve, reject) => {
        //Array.from 将可迭代对象转换成数组
        promises = Array.from(promises);
        if (promises.length === 0) {
            resolve([]);
        } else {
            let result = [];
            let index = 0;
            for (let i = 0;  i < promises.length; i++ ) {
                // 考虑到 i 可能是 thenable 对象也可能是普通值
                Promise.resolve(promises[i]).then(data => {
                    result[i] = data;
                    if (++index === promises.length) {
                        // 所有的 promises 状态都是 fulfilled，promise.all 返回的实例才变成 fulfilled 态
                        resolve(result);
                    }
                }, err => {
                    reject(err);
                });
            }
        }
    });
};
