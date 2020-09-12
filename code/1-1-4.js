
const PENDING = 'pending';//等待

const FULFILLED = 'fulfilled'; //成功

const REJECTED = 'rejected'; //失败

class MyPromise{
    constructor(excutor){
        try {
            excutor(this.resolve, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }

    status = PENDING;
    value = undefined;
    reason = undefined;
    successCallback = [];
    failureCallback = [];

    resolve = value => {
        if(this.status !== PENDING)return
        this.status = FULFILLED;
        this.value = value;
        while(this.successCallback.length)this.successCallback.shift()()
    }

    reject = reason => {
        if(this.status !== PENDING)return
        this.status = REJECTED;
        this.reason = reason;
        while(this.failureCallback.length)this.failureCallback.shift()()
    }

    then(successCallback, failureCallback){
        successCallback = successCallback ? successCallback : value => value;
        failureCallback = failureCallback ? failureCallback : reason => { throw reason};
        let promise2 = new MyPromise((resolve, reject) => {
            if(this.status === FULFILLED){
                setTimeout(() => {
                    try {
                        let x = successCallback(this.value)
                        resolvePromise(promise2, x, resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                },0)
            }else if(this.status === REJECTED){
                setTimeout(() => {
                    try {
                        let x = failureCallback(this.reason)
                        resolvePromise(promise2, x , resolve, reject)
                    } catch (error) {
                        reject(error)
                    }
                },0)
            }else{
                this.successCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = successCallback(this.value)
                            resolvePromise(promise2, x, resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    },0)
                });
                this.failureCallback.push(() => {
                    setTimeout(() => {
                        try {
                            let x = failureCallback(this.reason)
                            resolvePromise(promise2, x , resolve, reject)
                        } catch (error) {
                            reject(error)
                        }
                    },0)
                });
            }
        })
        return promise2
    }

    catch(failureCallback){
        return this.then(undefined, failureCallback)
    }

    finally(finallyCallback){
        return this.then(v => {
            return MyPromise.resolve(finallyCallback()).then(() =>  v)
        },r => {
            return MyPromise.resolve(finallyCallback()).then(() => {throw r})
        })
    }



    static all(array){
        let result = []
        let index = 0//为防止出现空值，加入index，计算addData调用次数
        return new MyPromise((resolve, reject) => {
            function addData(key, value){
                result[key] = value
                index++
                if (index === array.length)resolve(result)
                //当addData调用次数和传入的数组长度相等说明所有异步操作都执行完了，调用resolve，确定该promise实例的状态。
                //并把resul数组传递出去
            }
            for(let i = 0 ; i < array.length ; i++) {
                let current = array[i]
                if(current instanceof MyPromise){
                    current.then(v => {
                        addData(i, v)
                    }, r => reject(r))
                }else{
                    addData(i, current)
                }
            }
            //for循环结束后直接resolve(result)的话，如果promise有异步操作，成功回调无法将该promise值加入result数组
        })
    }

    static resolve(value){
        if(value instanceof MyPromise){
            return value
        }else{
            return new MyPromise(resolve => resolve(value))
        }
    }
        

}



function resolvePromise (promise2, x, resolve, reject){
    if (promise2 === x){
      return reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    }

    if(x instanceof MyPromise){
      x.then(resolve, reject)
      }else{
          resolve(x)
      }
  }
  
 let p1 = new MyPromise((resolve, reject) => {
    //   throw new Error('excutor error')
    // resolve(100)
    setTimeout(() => {
        resolve('...2000')
    },2000)
  })
 function p2 () {
     return new MyPromise((resolve, reject) => {
    //   throw new Error('excutor error')
    // resolve(100)
    // setTimeout(() => {
    //     reject('...2000')
    // },2000)
    reject('p2 rej')
  })
}
  

  
p2().finally(() => {
    console.log('p2 f')
}).then(v => {
    console.log(v)
    console.log('suc')
}, r => {
    console.log(r)
    console.log('fail')
})

  