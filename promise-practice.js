/*
const promise1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('success')
  }, 1000)
})
const promise2 = promise1.then(() => {
  throw new Error('error!!!')
})

console.log('promise1', promise1)
console.log('promise2', promise2)

setTimeout(() => {
  console.log('promise1', promise1)
  console.log('promise2', promise2)
}, 2000)

promise1 Promise { <pending> }
promise2 Promise { <pending> }
(node:50928) UnhandledPromiseRejectionWarning: Unhandled promise rejection (rejection id: 1): Error: error!!!
    (node:50928) [DEP0018] DeprecationWarning: Unhandled promise rejections are deprecated. In the future, promise rejections that are not handled will terminate the Node.js process with a non-zero exit code.
    promise1 Promise { 'success' }
promise2 Promise {
<rejected> Error: error!!!
      at promise.then (...)
  at <anonymous> }
  */



/*Promise.resolve()
  .then(() => {
    return new Error('error!!!')
  })
  .then((res) => {
    console.log('then: ', res)
  })
  .catch((err) => {
    console.log('catch: ', err)
  })
运行结果：
then: Error: error!!!
    at Promise.resolve.then (...)
    at ...
解释：.then 或者 .catch 中 return 一个 error 对象并不会抛出错误，所以不会被后续的 .catch 捕获，需要改成其中一种：
return Promise.reject(new Error('error!!!'))
throw new Error('error!!!')复制代码因为返回任意一个非 promise 的值都会被包裹成 promise 对象，即 return new Error('error!!!') 等价于 return Promise.resolve(new Error('error!!!'))。
。*/

//.then 或 .catch 返回的值不能是 promise 本身，否则会造成死循环。


//Promise.resolve(1)
//   .then(2)
//   .then(Promise.resolve(3))
//   .then(console.log)
//1   .then 或者 .catch 的参数期望是函数，传入非函数则会发生值穿透
