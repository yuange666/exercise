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
    static closure(){
        function f() {
            let i=0;
            return function () {
                console.log(++i);
            }
        }

        var b=[];
        for(var i=0;i<10;i++){
            b[i]=(function (j) {
                return function () {
                    return j
                }
            })(i)
        }

        function moduleA() {
            let name='aaa';
            function sayName() {
                console.log(name)
            }
            return {
                sayName
            }
        }
        moduleA().sayName();
    }
}