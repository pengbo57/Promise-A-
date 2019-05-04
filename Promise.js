class Promise {
    constructor(fn) {
        this.state = 'pending';
        this.resolveList = [];
        this.rejectList = [];
        this.value = undefined;
        let resolveFn = (val) => {
            this.timer = setTimeout(() => {
                clearInterval(this.timer);
                if (this.state !== 'pending') return;
                this.state = 'fulfilled';
                this.value = val;
                this.resolveList.forEach(item => {
                    typeof item === 'function' ? item(val) : null;
                })
            }, 0)
        };
        let rejectFn = (val) => {
            this.timer = setTimeout(() => {
                clearInterval(this.timer);
                if (this.state !== 'pending') return;
                this.state = 'rejected';
                this.value = val;
                this.rejectList.forEach(item => {
                    typeof item === 'function' ? item(val) : null;
                })
            }, 0)
        };

        try {
            fn(resolveFn, rejectFn)
        } catch (e) {
            rejectFn(e)
        }

    }

    then(resolveCallBack, rejectCallBack) {
        typeof resolveCallBack !== 'function' ? resolveCallBack = result => result
            : null;
        typeof rejectCallBack !== "function" ? rejectCallBack = reason => {
            throw new Error(reason instanceof Error ? reason.message : reason)
        } : null;


        return new Promise((resolve, reject) => {
            this.resolveList.push(() => {
                let x = resolveCallBack(this.value)
                try {
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x)
                } catch (e) {
                    reject(e)
                }
            });
            this.rejectList.push(() => {
                let x = rejectCallBack(this.value)
                try {
                    x instanceof Promise ? x.then(resolve, reject) : resolve(x)
                } catch (e) {
                    reject(e)
                }
            })
        })

    }

    catch(rejectCallBack) {
        return this.then(null, rejectCallBack)
    }

    static all(promiseAry = []) {
        return new Promise((resolve, reject) => {
            let index = 0,
                result = [];
            for (let i = 0; i < promiseAry.length; i++) {
                promiseAry[i].then((val) => {
                    index++;
                    result[i] = val;
                    if (index === promiseAry.length) {
                        resolve(result);
                    }
                }, reason => {
                    reject(reason)
                })
            }
        })
    }
}

module.exports = Promise;