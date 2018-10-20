// function execTime(t,callback){
//     setTimeout(callback,t)
// }
// console.log(1)
// execTime(3000,function(){
//     console.log(3)
// })
// console.log(2)



// function fn(){return a }
// a.valueOf=function(){return 'a'}
// function a(){return b}
// b.valueOf=function(){ return 'b'}
// function b(){return 'c'}
// console.log(fn()=='a')
// console.log(fn()()=='b')
// console.log(fn()()()=='c')

// function exam(){
//     return new Promise(function(resolve,reject){
//         let score =Math.floor(Math.random()*101)
//         if(score>=60){
//             resolve(score)
//         }else{
//             console.log('no')
//             setTimeout(()=>resolve(exam())
//             ,1000)
//         }
//     })
// }
// exam().then((score)=>{console.log('ok',score)},(error)=>{console.log(error,'error')})   //这里有问题需要重新考虑

// function execTimes(fn,times){
//     let begin=new Date()
//     return (string) => {
//         for (let i = 0; i < times; i++) {
//             fn(string)
//         }
//         let end = new Date()
//         console.log('耗时:', end - begin)
//     } 
// }
// function sort(string){
//     return string.split('').sort().join('')
// }
// execTimes(sort,1000)('hello')
// function isMatch(str1,str2){
//     if(str1.length!==str2.length)return false
//     let res1=str1.split('').sort().toString()
//     let res2=str2.split('').sort().toString()
//     return res1===res2
// }
// isMatch('hello','olelh')

// var app={
//     fn1:function(){console.log(1,this)},
//     fn2:function(){return function(){console.log(2,this)}},
//     fn3:function(){function fn(){console.log(3,this)};fn()},
//     fn4:function(){return {fn:function(){console.log(4,this)}}},
//     fn5(){setTimeout(function(){console.log(5,this)},10)},
//     fn6(){setTimeout(()=>{console.log(6,this)},20)},
//     fn7(){setTimeout((function(){ console.log(7,this)}).bind(this),30)},
//     fn8:()=>{setTimeout(()=>{ console.log(8,this)},40)}
// }   
// app.fn1.call(app)//app
// app.fn2.call(app).call(undefined)//window
// app.fn3.call(app)//声明一个函数并立即执行,理由同上
// app.fn4().fn()//返回的对象fn ,app.fn4()返回一个对象fn, fn.call(fn)  
// app.fn5()//window ,MDN文档,settimeout的this指向window
// app.fn6()//app ,箭头函数this指向外层this
// app.fn7()//app,bind绑定的当前声明环境的this
// app.fn8.call(window)//window ,this是外层的this,即app所处环境的this


// function jsonp(url , data={} ,callbackName='callback'){
//     let arr = []
//     for (let key in data) {
//         if (data.hasOwnProperty(key)) {
//             arr.push(`${key}=${data[key]}`)
//         }
//     }
//     let query = arr.join('&')
//     console.log(2,query)
//     let creatScript = document.createElement('script')
//     creatScript.src = url + '?'+'callback=' +callbackName+ '&'+query
//     console.log(333,creatScript)
//     document.body.appendChild(creatScript)
//     return new Promise(function (resolve, reject) {
//         window[callbackName] = (data) => {
//             resolve(data)
//             document.body.removeChild(creatScript)
//         }

//     })
// }
// jsonp('http://photo.sina.cn/aj/index',
//     {page:1,cate:'recommend'},'jsoncallback').then(data =>{console.log(data)})

// setTimeout(()=>{console.log(4)},0)
// new Promise(resolve=>{
//     console.log(1)
//     for(var i=0;i<10000;i++){
//         i==9999&&resolve()
//     }
//     console.log(2)
// }).then(()=>{console.log(5)
//     Promise.resolve(7).then(v=>console.log(v))
// }).then(()=>{console.log(6)})
// console.log(3)



// setTimeout(()=>{console.log(4);
//         Promise.resolve(8)
//         .then(v=>{console.log(v)})
//             .then(()=>{console.log(9)})},0)
// setTimeout(()=>{console.log(10)
//         Promise.resolve(11)
//         .then(v=>{console.log(v)})
//             .then(()=>{console.log(12)})},0)
// new Promise(resolve=>{console.log(1)
//     for(var i=0;i<10000;i++){i==9999&&resolve()}
//     console.log(2)
// }).then(()=>{console.log(5)
//         Promise.resolve(7).then(v=>console.log(v))
//     }).then(()=>{console.log(6)})
// console.log(3)









// function deepCopyArray(arr){
//     let newArr=[]
//     for(let i=0;i<arr.length;i++){
//         if(typeof arr[i]!=='object'){
//             newArr.push(arr[i])
//                 }else if( Object.prototype.toString.call(arr[i])=='[object Array]'&&arr[i]==arr){
//             newArr.push(newArr)
//         }else{newArr.push(deepCopyArray(arr[i]))}
//     }
//     return newArr
// }
// let arr1=[1,2,3]
// arr1.push(arr1)
// let arr2=deepCopyArray(arr1)
// console.log(arr2)
// arr1=[6,6,6]
// console.log(arr1)
// console.log(arr2)




// function dispatch(n,m){
//     let arr=[]
//     for(let u=0;u<m;u++){//确定几个桶
//         arr[u]=0 
//     }

//     u=0
//     let arr1=[]
//     for (let j=1;j<=n;j++){//确定每个桶装几个
//         arr1.push(j)
//     if(u===m){u=0}
//         arr[u]=arr[u]+1
//         u++
//     }

//     let newArr=[]   
//     while(arr.length!=0){
//         let count=arr.shift()
//         for(let e=1;e<=count;e++){
//             let xxx=[]
//             while(count!=0){
//                 xxx.push(arr1.shift())
//                 count--
//             }
//             newArr.push(xxx)
//         }
//     }
//     console.log(newArr)
// }
// dispatch(13,6)



// let circle=document.getElementById('circle')
// let onmousedown=(e)=>{
//     let clientX=e.clientX
//     let clientY=e.clientY
//     document.addEventListener('mousemove',onmousemove)
//     document.addEventListener('mouseup',clearEvents)
//     setPosition(clientX,clientY)
// }
// let onmousemove=(e)=>{
//     let {clientX,clientY}=e
//     setPosition(clientX,clientY)
// }
// let setPosition=(x,y)=>{
//     if(x<0){x=0};if(y<0){y=0}
//     if(x>document.documentElement.clientWidth){x=document.documentElement.clientWidth}
//     if(y>document.documentElement.clientHeight){y=document.documentElement.clientHeight}
//     circle.style.left=`${x}px`
//     circle.style.top=`${y}px`
// }
// let clearEvents=(e)=>{
//     document.removeEventListener('mousemove',onmousemove)
//     document.removeEventListener('mouseup',clearEvents)
// }
// circle.addEventListener('mousedown',onmousedown)




// function sort(arr) {
//   return arr.sort((a, b) => a-b)
// }
// sort.call(undefined,[144,37,89,44])


// var nums = [1, 1, 2, 3, 2, 5]
// var removeDuplicates =function(nums){
//   for (let i = 0; i < nums.length; i++) {
//     if (nums[i] !== undefined) {
//       for (let j = i + 1; j < nums.length; j++) {
//         if (nums[i] === nums[j]) {
//           nums[j] = undefined
//         }
//       }
//     }
//   }
//   for (let i in nums) {
//     if (!nums[i]) {
//       nums.splice(i, 1)
//     }
//   }
//   console.log(nums)
// }
// removeDuplicates(nums)



// const Bus = {
//   event: {},
//   on: function (eventName, fn) {
//     if (this.event[eventName] === undefined) {
//       this.event[eventName] = []
//     }
//     this.event[eventName].push(fn)
//   },
//   emit: function (eventName, data) {
//     if(this.event[eventName]){
//       this.event[eventName].map(function (fn) {
//         fn.call(undefined,data)
//       })
//     }
//   }
// }
// Bus.on('event', function (data) {
//   console.log(1, data)
// })
// Bus.on('hi', function (data) {
//   console.log(2, data)
// })
// Bus.on('hi', function (data) {
//   console.log(3, data + 1)
// })
// Bus.emit('event', { name: 'hello' })
// Bus.emit('hi', { to: 'hunger' })
// Bus.emit('hi', { to: 'valley' })
// Bus.emit('go', { to: 'xxx' })

////////////////////代码块儿1
const tasks = []; // 这里存放异步操作的 Promise
const output = (i) => new Promise((resolve) => {
    setTimeout(() => {
        console.log(new Date, i);
        resolve();
    }, 1000 * i);
});

// 生成全部的异步操作
for (var i = 0; i < 5; i++) {
    tasks.push(output(i));
}

// 异步操作完成之后，输出最后的 i
Promise.all(tasks).then(() => {
    setTimeout(() => {
        console.log(new Date, i);
    }, 1000);
});




///////////////代码块儿2
// 模拟其他语言中的 sleep，实际上可以是任何异步操作
const sleep = (timeountMS) => new Promise((resolve) => {
    setTimeout(resolve, timeountMS);
});

(async () => {  // 声明即执行的 async 函数表达式
    for (var i = 0; i < 5; i++) {
        await sleep(1000);
        console.log(new Date, i);
    }

    await sleep(1000);
    console.log(new Date, i);
})();


function Vue(options) {
    for (let keys in options) {
        let val = options[keys]
        for (let key in val) {
            Object.defineProperty(this, key, {
                configurable: true,
                enumerable: true,
                get: () => {
                    return val[key]
                },
                set: (newVal) => {
                    val[key] = newVal
                    return val[key]
                }
            })
        }
    }
}
let app = new Vue({
    data: {
        name: '张三',
        message: 'hi',
        age: 18,
    },
    lists: {
        list: 123,
    }
})
console.log(app.message)
console.log(app.list)
app.list = '李四'
console.log(app.list)




//页面防抖
$('textarea').on('keydown', debounce(ajaxAction, 2500));

function debounce(fn, delay) {
    var timer = null; // 声明计时器
    return function () {
        var context = this;
        var args = arguments;
        clearTimeout(timer);
        timer = setTimeout(function () {
            fn.apply(context, args);
        }, delay);
    };
}


let exposure = new Exposure(node)
exposure.once(function () {
    console.log(this)
    console.log('world')
})
function Exposure(node) {
    this.node = node
    this.lock = false
}
Exposure.prototype.once = function (callback) {
    this.node.addEventListener('scroll', () => {
        let scrollTop = this.node.scrollTop
        let windowHeight = this.node.innerHeight
        let offsetTop = this.node.offsetTop
        if (offsetTop < scrollTop + windowHeight && offsetTop > scrollTop) {
            if (!this.lock) {
                callback.call(this)
                this.lock = true
            }

        }
    })
}


function Vue(options = {}) {
    this.data = options.data
    this.computed = options.computed
    let _this = this
    function Observe(data) {
        Object.keys(data).forEach(item => {
            Object.defineProperty(_this, item, {
                set(newVal) {
                    this.data[item] = newVal
                },
                get() {
                    if(typeof data[item] === 'function') {
                        return data[item].call(this)
                    }
                    return data[item]
                }
            })
        })
    }
    Observe(this.data)
    Observe(this.computed)

}

let app = new Vue({
    data: {
        firstName: 'zhang',
        lastName: 'san',
    },
    computed: {
        name: function() {
            return this.firstName + '' + this.lastName
        }
    }
})
console.log(app.name)
app.firstName = 'li'
console.log(app.name)


function debounce(fn, time) {
    let id = null
    return function() {
        clearTimeout(id)
        id = setTimeout(() => {
            fn.call(this)
        }, time)
    }
}
function print() {
    console.log('print')
}
window.addEventListener('scroll', debounce(print, 300))



function throttle(fn, time) {
    let start = Date.now()
    let currentTime
    return function () {
        currentTime = Date.now()
        while (currentTime < start + time) { return }
        fn()
        start = currentTime
    }
}
function print() {
    console.log('print')
}
window.addEventListener('scroll', throttle(print, 1000))


var a = 1
function fn1() {
    function fn3() {
        functionfn2() {
            console.log(a)
        }
        var a
        fn2()
        a = 4
    }
    var a = 2
    return fn3
}
var fn = fn1()
fn()

var a = 1
function fn1() {
    var a
    function fn3() {
        var a
        function fn2() {
            console.log(a)
        }
        fn2()
        a = 4
    }
    a = 2
    return fn3
}
var fn = fn1()
fn.call(undefined)
//undefined

//算法实现

//冒泡\选择\插入\基数\计数\堆\快速\归并\桶

// 冒泡排序 

function bubbleSort(arr) {
    let min = null
    let swap = null
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                min = arr[j]
                arr[j] = arr[i]
                arr[i] =min
            }
        }
    }
}