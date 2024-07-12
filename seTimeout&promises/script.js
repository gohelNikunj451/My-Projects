//callback

// function sum(a, b) {
//     console.log("sum")
//     console.log(a + b);
// }
// function method(a, b, sumFunction) {
//     console.log("method");
//     sumFunction(a, b);
// }

// method(5, 5, sum);

//callback Hell :

// function getData(data,dataFun){
//     setTimeout(()=>{
//         console.log("data : ",data);
//         if(dataFun){
//             dataFun();
//         }
//     },3*1000);

// }
// getData(1,()=>{
//     console.log("collectin data 2 ...")
//     getData(2,()=>{
//         console.log("collectin data 3 ...")
//         getData(3,()=>{

//         })
//     })
// })

// Promise

// let promise=new Promise((resolve,reject)=>{
//     console.log("i am reject");
//     reject("your order has been cancelled")

// })
// let lromise=new Promise((resolve,reject)=>{
//     console.log("i am resolve");
//     resolve("your order has been cancelled")

// })
// let cromise=new Promise((resolve,reject)=>{
//     console.log("i am panding");

// })

// function getData(data,dataFun){
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             if(dataFun){
//                 dataFun();
//             }
//             resolve("success");
//             console.log(data);
//         },3*1000)
//     })
// }

// const getPromise=()=>{
//     return new Promise((resolve,reject)=>{
//         console.log("iam promise");
//         // resolve("resolve");
//         reject("error");
//     })
// }
// let promise=getPromise();

// promise.then((res)=>{
//     console.log("Success fully ",res);
// })
// promise.catch(()=>{

//     console.log("rejected");
// })

// const getPromise1=()=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve("getData 1")
//         },3*1000)
//     })
// }
// const getPromise2=()=>{
//     return new Promise((resolve,reject)=>{
//         setTimeout(()=>{
//             resolve("getData 2")
//         },3*1000)
//     })
// }
// console.log("data fettching 1...")
// getPromise1().then((res)=>{
//     console.log(res);
//     console.log("data fattching 2...")
//     getPromise2().then((res)=>{
//         console.log(res)
//     })
// })

// Solution of callBack Hell

// const getData=(data)=>{
//     return new Promise((resolve,reject)=>{
//         console.log("fettching data ",data);
//         setTimeout(()=>{
//             console.log("data ",data);
//             resolve("complete ",data);

//         },3*1000)
//     })
// }
// getData(1).then(()=>{
//     console.log("complete");
//     getData(2).then(()=>{
//         console.log("complete");
//     })
// })

//Promise chain

// getData(1)
//     .then((res)=>{
//         return getData(2);
//     })
//     .then((res)=>{
//         return getData(3);
//     })


//async Function

async function api(data){
    return new Promise((resolve,reject)=>{
        console.log("getting data ", data);
        setTimeout(()=>{
            console.log("complete data",data);
            resolve(200);
        },3000);
    })
}

async function Funapi(){
    
    await api(1);
    await api(2);
    await api(3);
}
