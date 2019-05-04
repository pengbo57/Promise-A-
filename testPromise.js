
let Promise = require('./Promise');


/*let p1 = new Promise((resolve,reject)=>{
    Math.random()>.5? resolve(100):reject(-100);
});

let p2 = p1.then((res)=>{
    throw new Error('ccc')
   /!* return new Promise((resolve,reject)=>{
        resolve('hello')
    })*!/
});
let p3 = p2.then(null)
p3.then(res =>{
    console.log(res);
}).catch(reason=>{
    console.log(reason);
})*/
let p1 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject(100)
    },50)
})
let p2 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        reject(200)
    },20)
})
let p3 = new Promise((resolve,reject)=>{
    setTimeout(()=>{
        resolve(300)
    },80)
})
Promise.all([p1,p2,p3]).then(res=>{
    console.log(res);
}).catch(reason=>{
    console.log(reason);
})