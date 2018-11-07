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
    for (let i = 0; i < arr.length; i++) {
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] > arr[j]) {
                min = arr[j]
                arr[j] = arr[i]
                arr[i] = min
            }
        }
    }
    return arr
}
const array = [5, 9, 7, 4, 2, 8, 1, 6, 0]
bubbleSort(array)


//选择排序
function selectSort(arr) {
    let min, minIndex, swap = null 
    for (let i = 0; i < arr.length; i++) {
        minIndex = i 
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[minIndex] > arr[j]) {
                minIndex = j
            }
        }
        if (minIndex !== i) {
            swap = arr[i]
            arr[i] = arr[minIndex]
            arr[minIndex] = swap
        }
    }
    return arr
}
const array = [5, 9, 7, 4, 2, 8, 1, 6, 0, 3, 11, 10, 12]
selectSort(array)


//红灯三秒亮一次，绿灯一秒亮一次，黄灯2秒亮一次；如何让三个灯不断交替重复亮灯？（用Promse实现）
//三个亮灯函数已经存在：

function red() {console.log('red');}
function green() {console.log('green');}
function yellow() {console.log('yellow');}
function changeLight(start, fn, time) {
    let current = Date.now()
    while (current - start < time) {current = Date.now()}
    fn()
    return current
}
function lightLoop(){
    return new Promise(function (resolve, reject){
        function startWork() {
            return new Promise((resolve, reject) => {
                let start = Date.now()
                resolve(start)
            })
        }
        startWork()
        .then((start) => {return changeLight(start, red, 3000)})
        .then((start) => {return changeLight(start, green, 1000)})  
        .then((start) => {return changeLight(start, yellow, 2000)})
        .then(()=> {return lightLoop() })
    })
}
lightLoop()

//另一种实现
{
    function red() {console.log('red');}
    function green() {console.log('green');}
    function yellow() {console.log('yellow');}
    function lighting(time, callback) {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                callback()
                resolve()
            }, time)
        })
    }
    function start () {
        return new Promise((resolve, reject) => {resolve()})
    }
    function infiLoop () {
        return new Promise((resolve, reject) => {
            start().then(() => {return lighting(3000, red)})
            .then(() => {return lighting(1000, green)})
            .then(() => {return lighting(2000, yellow)})
            .then(() => {infiLoop()}) 
        })
        
    }
    infiLoop()
    
}
//async await
{
    function red() {console.log('red');}
    function green() {console.log('green');}
    function yellow() {console.log('yellow');}
    function lighting(callback, time){
        return new Promise((resolve) => {
            setTimeout(() => {
                callback()
                resolve()//这里是一个没有理解透彻的点
            }, time)
        })
    }
    async function infiLoop() {
        return new Promise((res, rej) => {
            (async function start() {
                await lighting(red, 3000)
                await lighting(green, 1000)
                await lighting(yellow, 2000)
                await infiLoop()
            })()
        })
    }
    infiLoop()
}



//
function setColor(color, time) {
    return function (callback) {
        document.getElementById("lamp").style.backgroundColor = color;
        setTimeout(callback, time)
    }
}
var queue = function (funcs) {
    (function next() {
        if (funcs.length > 0) {
            var f = funcs.shift();
            f(next);
        }
    })();
};

+function tick() {
    queue([
        setColor("red", 3000),
        setColor("green", 2000),
        setColor("gray", 1000),
        tick])
}()

//
let f = 0, seconds = [3000, 1000, 2000], colors = [red, green, yellow], next = [1, 2, 0];
let async = timeout => {
    let p = new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve();
        }, timeout);
    });
    return p;
};
let fn = () => {
    async(seconds[f]).then(() => {
        colors[f]();
        f = next[f];
        fn();
    });
};
fn();

//
Promise.recursion = function (fn) {
    function foo(i = 0) {
        fn(i);
        return Promise.delay(1000).then(foo.bind(null, i + 1));
    }

    return foo();
}

Promise.recursion(i => {
    if (i > 60) throw new Error('1分钟后停止');
    var colors = ['red', 'green', 'yellow'];
    l.style.background = colors[i % 3];
}).catch(err => {
    console.log(err.message);
})


async function xxx(time, value) {
    await yyy(time)
    console.log(value)
}

function yyy (timeout) {
    return new Promise((res, rej) => {
        setTimeout(() => {
            res()
        }, timeout);
    })
}

xxx(1000, 'hello world')


const yyy = async function (time) {
    await new Promise((res) => {
        setTimeout(() => {
            res()
        }, time)
    })
}
async function xxx(time, value) {
    await yyy(time)
    console.log(value)
}
xxx(1000, 'hello world')

let [foo, bar] = await Promise.all([getFoo(), getBar()])

let fooPromise = getFoo()
let barPromise = getBar()
let foo = await fooPromise
let bar = await barPromise










//点击分页页码可实现无刷新页面加载
//同时 URL 在数据加载后会发生变化展示对应页码
//刷新页面（带页码参数）会定位到当前页码
//当点击返回时可会到上个页面

init()
//处理返回数据
window.onpopstate = function () {
    init()
}

//用了事件代理
document.querySelector('.pagination').onclick = function (e) {
    var page = e.target.getAttribute('data-page')
    if (page) {  //如果没点到li上 page 是null
        getAndRender(page)
    }
}


//初始化，根据 url 中 page 的值定位到对应页面，如果没设置展示第1页
function init() {
    var serach = location.search.replace(/^\?/, '').split('=');
    console.log(11)
    console.log(location.search)
    console.log(serach)
    if (serach[0] === 'page') {
        initGetAndRender(serach[1])
    } else {
        initGetAndRender(1)
    }
}

// 获取数据，并且渲染页面
function getAndRender(page) {
    showLoading()
    getNews(page, function (ret) {
        renderNews(ret.data)  //渲染页面
        hideLoading()
        setUrl(page)          //设置 url
        setPagingState(page)  //设置分页状态
    })
}

//初始化从url解析加载数据时不需要设置url了，否则返回会出错
function initGetAndRender(page) {
    showLoading()
    getNews(page, function (ret) {
        renderNews(ret.data)  //渲染页面
        hideLoading()         //设置 url
        setPagingState(page)  //设置分页状态
    })
}


//设置url
function setUrl(page) {
    var url = location.pathname + '?page=' + page
    history.pushState({ url: url, title: document.title }, document.title, url)
}

//改变页面标签状态
function setPagingState(page) {
    var pageNodes = document.querySelectorAll('.pagination>li');
    pageNodes.forEach(function (node) {
        node.classList.remove('active')
    })
    pageNodes[page - 1].classList.add('active')
}


function getNews(page, onSuccess) {
    var url = 'http://photo.sina.cn/aj/index'
    var data = {
        page: page,
        cate: 'recommend',
        jsoncallback: '__onGetData__'
    }
    window.__onGetData__ = function (data) {
        onSuccess && onSuccess(data);
    }

    jsonp(url, data);

    function jsonp(url, data) {
        var script = document.createElement('script')
        var queryString = []
        for (var key in data) {
            queryString.push(key + '=' + encodeURIComponent(data[key]))
        }
        script.src = url + '?' + queryString.join('&')
        document.head.appendChild(script)
        document.head.removeChild(script)
    }
}

function renderNews(items) {
    var tpl = '';
    for (var i = 0; i < items.length; i++) {
        tpl += '<li class="item">';
        tpl += ' <a href="' + items[i].wap_url + '" class="link" style="background-image:url(' + items[i].img_url + ')"></a>';
        tpl += ' <h4 class="header">' + items[i].short_name + '</h4>';
        tpl += '<p class="desp">' + items[i].short_intro + '</p>';
        tpl += '</li>';
    }
    document.querySelector('.pic-ct').innerHTML = tpl;
}

function showLoading() {
    document.querySelector('#cover').style.display = 'block';
}
function hideLoading() {
    document.querySelector('#cover').style.display = 'none';
}










document.querySelector('.pagination').onclick = function(e){
    let page = e.target.getAttribute('data-page')
    if(page){  //如果没点到li上 page 是null
        getNews(page, function(ret){
            console.log(ret)
		})
    }
}


function getNews(page, onSuccess) {
    let url = 'http://photo.sina.cn/aj/index'
    const data = {
        page: page,
        cate: 'recommend',//这里是怎么拿到的?
        jsoncallback: '__onGetData__'
    }
    window.__onGetData__ = function(data) {
        onSuccess && onSuccess(data)
    }
    jsonp(url, data)
    function jsonp(url, data) {
        let script = document.createElement('script')
        let queryString = []
        for (let key in data) {
            queryString.push(key + '=' + encodeURIComponent(data[key]))
        }
        script.src = url + '?' + queryString.join('&')
        document.head.appendChild(script)
        document.head.removeChild(script)
    }
}

//实现一个find函数，模拟原生的find函数，find(list, predicate)。
//在list中逐项查找，返回第一个通过predicate迭代函数真值检测的元素值，如果没有元素通过检测则返回 undefined。
// 如果找到匹配的元素，函数将立即返回，不会遍历整个list
var even = find([1, 2, 3, 4, 5, 6], function (num) { return num % 2 == 0; });

function find(list, predicate) {
    for (var index = 0; index < list.length; index++) {
        if (predicate(list[index], index, list)) return list[index];
    }
}

// 实现一个filter函数，模拟原生的filter函数，filter(list, predicate)。
// 遍历list中的每个值，返回所有通过predicate真值检测的元素所组成的数组。

var evens = filter([1, 2, 3, 4, 5, 6], function(num){ return num % 2 == 0; });
// [2, 4, 6]

function filter(list, predicate) {
    let arr = []
    for (let i = 0; i < list.length; i++){
        if(predicate(list[i])) {
            arr.push(list[i])
        }
    }
    console.log(arr)
    return arr
}

// 实现一个invoke函数，invoke(list, methodName, arguments)

// 在list的每个元素上执行methodName方法。 任何传递给invoke的额外参数，invoke都会在调用methodName方法的时候传递给它。

invoke([[5, 1, 7], [3, 2, 1]], 'sort'); // [[1, 5, 7], [1, 2, 3]];


function isFunction() {
    return typeof obj == 'function'
}

function invoke(list, method) {
    var args = [].slice.call(arguments, 2);
    var isFunc = isFunction(method);
    return list.map(function (value) {
        var func = isFunc ? method : value[method];
        console.log(value, method)
        return func == null ? func : func.apply(value, args);
    });
}


// 实现一个parseQuery函数，能够解析location的search字符串(不包括'?')。
// 输入一个search，输出一个object，同名参数则是会成为数组。


var search = "name=sa&age=12&address=qwe&address=poi&kaka";
var result = parseQuery(search);
console.log(result) //{address:["qwe", "poi"],age:"12",kaka:"",name:"sa"}



function parseQuery(query) {
    var reg = /([^&=\s]+)[=\s]?([^&=\s]*)/g;
    var obj = {};
    while (reg.exec(query)) {
        var key = RegExp.$1;
        var value = RegExp.$2;
        if (Array.isArray(obj[key]) && value !== "") {
            obj[key].push(value);
            continue;
        }
        if (obj.hasOwnProperty(key) && value !== "") {
            obj[key] = [obj[key], value];
            continue;
        }
        obj[key] = value;
    }
    return obj;
}

//实现一个create函数，模拟原生的new操作符。



function Preson(name, age) {
    this.name = name;
    this.age = age;
}
Preson.prototype = {
    protype: "type"
}
var test = create(Preson, "adam", 19);
console.log(test); //{name:"adam",age:19};
console.log(test.protype) //type




function create(construct) {
    var args = Array.prototype.slice.call(arguments, 1);

    var obj = {};

    Object.setPrototypeOf(obj, construct.prototype);
    //或者obj.__proto__ = construct.prototype;
    // obj.constructor.prototype = construct.prototype是不会有效果的
    var res = construct.apply(obj, args);

    if (typeof res === "object" && res !== null) {
        return res;
    }

    return obj;
}


//实现一个flatten函数，将一个嵌套多层的数组 array（数组） (嵌套可以是任何层数)转换为只有一层的数组，数组中元素仅基本类型的元素或数组，不存在循环引用的情况
//方法一
let arr = [3, [2, -4, [5, 7]], -3, ['aa', [['bb']]]]
let arr2 = flatten2(arr)
console.log(arr2)

function flatten2(arr) {
    let newArr = arr.flat(Infinity)
    return newArr
}

//方法二
let arr = [3, [2, -4, [5, 7]], -3, ['aa', [['bb']]]]
let arr2 = flatten2(arr)
console.log(arr2)

function flatten2(arr) {
    let newArr = []
    function flatten1(arr) {
        for (let key in arr) {
            if (arr[key] && arr[key] instanceof Object) {
                flatten1(arr[key])
            }else{
                newArr.push(arr[key]) 
            }   
        }
    }
    flatten1(arr)
    return newArr
}

//方法三
let arr = [3, [2, -4, [5, 7]], -3, ['aa', [['bb']]]]
let arr2 = flatten2(arr)
console.log(arr2)

function flatten2(arr) {
    return arr.reduce(function (initArr, currentArr) {
        return initArr.concat(Array.isArray(currentArr) ? flatten2(currentArr) : currentArr)
    }, [])
}


//实现一个reduce函数，作用和原生的reduce类似。
// reduce(list, iteratee, [memo])，
// memo是reduce函数的初始值，会被每一次成功调用iteratee函数的返回值所取代 。
// 这个迭代传递4个参数：memo,value 和 迭代的index和最后一个引用的整个 list。
// 如果没有memo传递给reduce的初始调用，iteratee不会被列表中的第一个元素调用。
// 第一个元素将取代memo参数传递给列表中下一个元素调用的iteratee函数。

var sum = reduce([1, 2, 3], function(memo, num){ return memo + num; }, 0);

function reduce(list, iteratee, memo) {
    let _memo = memo 
    for (let key in list) {
        _memo = other(list[key], iteratee, _memo)
    }
    return _memo
}

function other(value, iteratee, memo) {
    return iteratee(memo, value)
}
console.log(sum)

function iterator(list, iteratee, memo, index, length) {
    for (; index >= 0 && index < length; index++) {
        memo = iteratee(memo, list[index], index, list);
    }
    return memo;
}

function reduce(list, iteratee, memo) {
    var index = 0, length = list.length;
    if (arguments.length < 3) {
        memo = list[index];
        index = 1;
    }
    return iterator(list, iteratee, memo, index, length);
}

var sum = reduce([1, 2, 3], function (memo, num) { return memo + num; }, 0);


//通过对list里的每个元素调用转换函数(iteratee迭代器)生成一个与之相对应的数组。iteratee传递三个参数：value，然后是迭代 index。
let exec = map([1, 2, 3], function(num) {return num * 3 } ) //[3, 6, 9]
function map(arr, iterator) {
    let newArr = []
    for (let value of arr) {
        newArr.push(iterator(value))
    }
    return newArr
}
console.log(exec)


function map(list, iteratee) {
    let result = []
    for (let index = 0; index < list.length; index++) {
        result[index] = iteratee(list[index], index, list)
    }
    return result
}
let exec = map([1, 2, 3], function(num) {return num * 3 } )
console.log(exec)
//http://js.jirengu.com/titefesuda/2/edit?html,css,output
//http://js.jirengu.com/wudoyaxuma/6/edit?html,css,output



//手写深拷贝
// 深度优先遍历复制, 借助队列
function deepCopy(obj) {
    var newObj = {},
        srcQueue = [obj], srcVisitedQueue = [],
        copyQueue = [newObj], copyVisitedQueue = [];

    while (srcQueue.length > 0) {
        var currentSrcElement = srcQueue.shift(),
            currentCopyElement = copyQueue.shift();

        srcVisitedQueue.push(currentSrcElement);
        copyVisitedQueue.push(currentCopyElement);

        for (var key in currentSrcElement) {
            if (typeof currentCopyElement[key] !== 'object') {
                currentCopyElement[key] = currentSrcElement[key];
            } else {
                // 有环的情况
                var index = srcVisitedQueue.indexOf(currentSrcElement[key]);
                if (index >= 0) {
                    currentCopyElement[key] = copyVisitedQueue[index];
                } else {
                    srcQueue.push(currentSrcElement[key]);
                    currentCopyElement[key] = {};
                    copyQueue.push(currentCopyElement[key]);
                }
            }
        }
    }

    return newObj;
}

// Test case
// 1. 只含有简单类型的Object{a: 1, b:2} => pass
// 2. 简单类型和复杂类型同时存在的情况下的Object => pass:
// var obj1 = {
//     a: 1,
//     b: 2,
//     c: {
//         d: 3,
//         e: {
//             f: 4,
//             g: 5
//         }
//     },
//     h: {
//         i: 6,
//         j: 7
//     }
// };
// 3. 有环的情况下的Object => pass:
// var obj1 = {
//     a: 1,
//     b: 2,
//     c: obj1
// };



// 



function _LazyMan(name) {
    this.tasks = [];   
    var self = this;
    var fn =(function(n){
        var name = n;
        return function(){
            console.log("Hi! This is " + name + "!");
            self.next();
        }
    })(name);
    this.tasks.push(fn);
    setTimeout(function(){
        self.next();
    }, 0); // 在下一个事件循环启动任务
}
/* 事件调度函数 */
_LazyMan.prototype.next = function() { 
    var fn = this.tasks.shift();
    fn && fn();
}
_LazyMan.prototype.eat = function(name) {
    var self = this;
    var fn =(function(name){
        return function(){
            console.log("Eat " + name + "~");
            self.next()
        }
    })(name);
    this.tasks.push(fn);
    return this; // 实现链式调用
}
_LazyMan.prototype.sleep = function(time) {
    var self = this;
    var fn = (function(time){
        return function() {
            setTimeout(function(){
                console.log("Wake up after " + time + "s!");
                self.next();
            }, time * 1000);
        }
    })(time);
    this.tasks.push(fn);
   return this;
}
_LazyMan.prototype.sleepFirst = function(time) {
    var self = this;
    var fn = (function(time) {
        return function() {
            setTimeout(function() {
                console.log("Wake up after " + time + "s!");
                self.next();
            }, time * 1000);
        }
    })(time);
    this.tasks.unshift(fn);
    return this;
}
/* 封装 */
function LazyMan(name){
    return new _LazyMan(name);
}