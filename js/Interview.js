export class Interview {
    //事件执行机制
    static eventLoop() {
        console.log(1)
        setTimeout(() => {
            console.log(2)
            new Promise(resolve => {
                console.log(4)
                resolve()
            }).then(() => {
                console.log(5)
            })
        });
        new Promise(resolve => {
            console.log(7)
            resolve()
        }).then(() => {
            console.log(8)
        });
        setTimeout(() => {
            console.log(9)
            new Promise(resolve => {
                console.log(11)
                resolve()
            }).then(() => {
                console.log(12)
            })
        })
    }

    //防抖
    static debounce(fn, time) {
        let timer = null;
        return function () {
            if (timer) {
                clearTimeout(timer);
                timer = null;
            }
            timer = setTimeout(() => {
                fn.apply(this, arguments);
            }, time);
        }
    }

    //节流
    static throttle(fn, gapTime) {
        let lastTime = null;
        return function () {
            let now = +new Date();
            if (now - lastTime > gapTime || !lastTime) {
                fn.apply(this, arguments);
                lastTime = now;
            }
        }
    }

    //闭包
    static closure() {
        function f() {
            let i = 0;
            return function () {
                console.log(++i);
            }
        }

        var b = [];
        for (var i = 0; i < 10; i++) {
            b[i] = (function (j) {
                return function () {
                    return j
                }
            })(i)
        }

        function moduleA() {
            let name = 'aaa';

            function sayName() {
                console.log(name)
            }

            return {
                sayName
            }
        }

        moduleA().sayName();
    }

    //实现flat函数(两种)
    static flat(src, dst = []) {
        src.forEach(v => {
            if (Array.isArray(v)) {
                Interview.flat(v, dst);
            } else {
                dst.push(v);
            }
        });
        return dst
    }

    static flatten(arr) {
        return arr.reduce((flat, toFlatten) => {
            return flat.concat(Array.isArray(toFlatten) ? Interview.flatten(toFlatten) : toFlatten);
        }, []);
    }

    //函数去重(四种)
    static arrayUniq(arr) {
        let obj = {};
        let res = [];
        if (arr.length > 1) {
            arr.forEach(v => {
                if (!obj[v]) {
                    res.push(v);
                    obj[v] = true;
                }
            })
        } else {
            res=arr;
        }
        return res;
    }
    static es6Uniq(arr){
        return [...new Set(arr)];
    }
    static mapUniq(arry) {
        let map = new Map();
        let result = new Array();
        for (let i = 0; i < arry.length; i++) {
            if (map.has(arry[i])) {
                map.set(arry[i], true);
            } else {
                map.set(arry[i], false);
                result.push(arry[i]);
            }
        }
        return result;
    }
    static reduceUniq(arr){
        return arr.reduce((pre,cur)=>{
            return pre.includes(cur)?pre:[...pre,cur]
        },[])
    }
}