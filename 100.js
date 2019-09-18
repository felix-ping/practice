/*1st：（滴滴、饿了么）写 React / Vue 项目时为什么要在列表组件中写 key，其作用是什么？
*受楼下答案的一些特殊情况影响，导致很多人都认为key不能"提高"diff速度。在此继续重新梳理一下答案。

在楼下的答案中，部分讨论都是基于没有key的情况diff速度会更快。确实，这种观点并没有错。没有绑定key的情况下，并且在遍历模板简单的情况下，会导致虚拟新旧节点对比更快，节点也会复用。而这种复用是就地复用，一种鸭子辩型的复用。以下为简单的例子:

<div id="app">
    <div v-for="i in dataList">{{ i }}</div>
</div>
var vm = new Vue({
  el: '#app',
  data: {
    dataList: [1, 2, 3, 4, 5]
  }
})
以上的例子，v-for的内容会生成以下的dom节点数组，我们给每一个节点标记一个身份id：

  [
    '<div>1</div>', // id： A
    '<div>2</div>', // id:  B
    '<div>3</div>', // id:  C
    '<div>4</div>', // id:  D
    '<div>5</div>'  // id:  E
  ]
改变dataList数据，进行数据位置替换，对比改变后的数据
 vm.dataList = [4, 1, 3, 5, 2] // 数据位置替换

 // 没有key的情况， 节点位置不变，但是节点innerText内容更新了
  [
    '<div>4</div>', // id： A
    '<div>1</div>', // id:  B
    '<div>3</div>', // id:  C
    '<div>5</div>', // id:  D
    '<div>2</div>'  // id:  E
  ]

  // 有key的情况，dom节点位置进行了交换，但是内容没有更新
  // <div v-for="i in dataList" :key='i'>{{ i }}</div>
  [
    '<div>4</div>', // id： D
    '<div>1</div>', // id:  A
    '<div>3</div>', // id:  C
    '<div>5</div>', // id:  E
    '<div>2</div>'  // id:  B
  ]
增删dataList列表项

  vm.dataList = [3, 4, 5, 6, 7] // 数据进行增删

  // 1. 没有key的情况， 节点位置不变，内容也更新了
  [
    '<div>3</div>', // id： A
    '<div>4</div>', // id:  B
    '<div>5</div>', // id:  C
    '<div>6</div>', // id:  D
    '<div>7</div>'  // id:  E
  ]

  // 2. 有key的情况， 节点删除了 A, B 节点，新增了 F, G 节点
  // <div v-for="i in dataList" :key='i'>{{ i }}</div>
  [
    '<div>3</div>', // id： C
    '<div>4</div>', // id:  D
    '<div>5</div>', // id:  E
    '<div>6</div>', // id:  F
    '<div>7</div>'  // id:  G
  ]
从以上来看，不带有key，并且使用简单的模板，基于这个前提下，可以更有效的复用节点，diff速度来看也是不带key更加快速的，因为带key在增删节点上有耗时。这就是vue文档所说的默认模式。但是这个并不是key作用，而是没有key的情况下可以对节点就地复用，提高性能。

这种模式会带来一些隐藏的副作用，比如可能不会产生过渡效果，或者在某些节点有绑定数据（表单）状态，会出现状态错位。VUE文档也说明了 这个默认的模式是高效的，但是只适用于不依赖子组件状态或临时 DOM 状态 (例如：表单输入值) 的列表渲染输出

楼下 @yeild 也提到，在不带key的情况下，对于简单列表页渲染来说diff节点更快是没有错误的。但是这并不是key的作用呀。

但是key的作用是什么？
我重新梳理了一下文字，可能这样子会更好理解一些。

key是给每一个vnode的唯一id,可以依靠key,更准确, 更快的拿到oldVnode中对应的vnode节点。

1. 更准确
因为带key就不是就地复用了，在sameNode函数 a.key === b.key对比中可以避免就地复用的情况。所以会更加准确。

2. 更快
利用key的唯一性生成map对象来获取对应节点，比遍历方式更快。(这个观点，就是我最初的那个观点。从这个角度看，map会比遍历更快。)

原答案 -----------------------
vue和react都是采用diff算法来对比新旧虚拟节点，从而更新节点。在vue的diff函数中（建议先了解一下diff算法过程）。
在交叉对比中，当新节点跟旧节点头尾交叉对比没有结果时，会根据新节点的key去对比旧节点数组中的key，从而找到相应旧节点（这里对应的是一个key => index 的map映射）。如果没找到就认为是一个新增节点。而如果没有key，那么就会采用遍历查找的方式去找到对应的旧节点。一种一个map映射，另一种是遍历查找。相比而言。map映射的速度更快。
vue部分源码如下：

// vue项目  src/core/vdom/patch.js  -488行
// 以下是为了阅读性进行格式化后的代码

// oldCh 是一个旧虚拟节点数组
if (isUndef(oldKeyToIdx)) {
  oldKeyToIdx = createKeyToOldIdx(oldCh, oldStartIdx, oldEndIdx)
}
if(isDef(newStartVnode.key)) {
  // map 方式获取
  idxInOld = oldKeyToIdx[newStartVnode.key]
} else {
  // 遍历方式获取
  idxInOld = findIdxInOld(newStartVnode, oldCh, oldStartIdx, oldEndIdx)
}
创建map函数

function createKeyToOldIdx (children, beginIdx, endIdx) {
  let i, key
  const map = {}
  for (i = beginIdx; i <= endIdx; ++i) {
    key = children[i].key
    if (isDef(key)) map[key] = i
  }
  return map
}
遍历寻找

// sameVnode 是对比新旧节点是否相同的函数
 function findIdxInOld (node, oldCh, start, end) {
    for (let i = start; i < end; i++) {
      const c = oldCh[i]

      if (isDef(c) && sameVnode(node, c)) return i
    }
  }
*
*
* */
/*2nd ['1', '2', '3'].map(parseInt) what & why ?
*
*答案是[1, NaN, NaN]。
* 首先让我们回顾一下，map函数的第一个参数callback：
var new_array = arr.map(function callback(currentValue[, index[, array]]) { // Return element for new_array }[, thisArg])
这个callback一共可以接收三个参数，其中第一个参数代表当前被处理的元素，而第二个参数代表该元素的索引。

而parseInt则是用来解析字符串的，使字符串成为指定基数的整数。
parseInt(string, radix)
接收两个参数，第一个表示被处理的值（字符串），第二个表示为解析时的基数。

了解这两个函数后，我们可以模拟一下运行情况

parseInt('1', 0) //radix为0时，且string参数不以“0x”和“0”开头时，按照10为基数处理。这个时候返回1
parseInt('2', 1) //基数为1（1进制）表示的数中，最大值小于2，所以无法解析，返回NaN
parseInt('3', 2) //基数为2（2进制）表示的数中，最大值小于3，所以无法解析，返回NaN
map函数返回的是一个数组，所以最后结果为[1, NaN, NaN]

最后附上MDN上对于这两个函数的链接，具体参数大家可以到里面看
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/parseInt
https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/map
* */
/*第 3 题：（挖财）什么是防抖和节流？有什么区别？如何实现？
*
* 防抖
触发高频事件后n秒内函数只会执行一次，如果n秒内高频事件再次被触发，则重新计算时间

思路：
每次触发事件时都取消之前的延时调用方法

function debounce(fn) {
      let timeout = null; // 创建一个标记用来存放定时器的返回值
      return function () {
        clearTimeout(timeout); // 每当用户输入的时候把前一个 setTimeout clear 掉
        timeout = setTimeout(() => { // 然后又创建一个新的 setTimeout, 这样就能保证输入字符后的 interval 间隔内如果还有字符输入的话，就不会执行 fn 函数
          fn.apply(this, arguments);
        }, 500);
      };
    }
    function sayHi() {
      console.log('防抖成功');
    }

    var inp = document.getElementById('inp');
    inp.addEventListener('input', debounce(sayHi)); // 防抖
节流
高频事件触发，但在n秒内只会执行一次，所以节流会稀释函数的执行频率

思路：
每次触发事件时都判断当前是否有等待执行的延时函数

function throttle(fn) {
      let canRun = true; // 通过闭包保存一个标记
      return function () {
        if (!canRun) return; // 在函数开头判断标记是否为true，不为true则return
        canRun = false; // 立即设置为false
        setTimeout(() => { // 将外部传入的函数的执行放在setTimeout中
          fn.apply(this, arguments);
          // 最后在setTimeout执行完毕后再把标记设置为true(关键)表示可以执行下一次循环了。当定时器没有执行的时候标记永远是false，在开头被return掉
          canRun = true;
        }, 500);
      };
    }
    function sayHi(e) {
      console.log(e.target.innerWidth, e.target.innerHeight);
    }
    window.addEventListener('resize', throttle(sayHi));
*
*
*
*
* */
/*4th 介绍下 Set、Map、WeakSet 和 WeakMap 的区别？
*Set
1.成员不能重复
2.只有健值，没有健名，有点类似数组。
3. 可以遍历，方法有add, delete,has
set类似于精确相等运算符（===），主要的区别是**NaN等于自身，而精确相等运算符认为NaN不等于自身
weakSet

成员都是对象
成员都是弱引用，随时可以消失。 可以用来保存DOM节点，不容易造成内存泄漏
不能遍历，方法有add, delete,has
Map
本质上是健值对的集合，类似集合
可以遍历，方法很多，
Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键
weakMap
1.直接受对象作为健名（null除外），不接受其他类型的值作为健名

健名所指向的对象，不计入垃圾回收机制
不能遍历，方法同get,set,has,delete
*
*WeakMap 弱引用的只是键名，而不是键值。键值依然是正常引用
* */
/*5th. 介绍下深度优先遍历和广度优先遍历，如何实现？
*深度优先遍历
深度优先遍历DFS 与树的先序遍历比较类似。
假设初始状态是图中所有顶点均未被访问，则从某个顶点v出发，首先访问该顶点然后依次从它的各个未被访问的邻接点出发深度优先搜索遍历图，直至图中所有和v有路径相通的顶点都被访问到。若此时尚有其他顶点未被访问到，则另选一个未被访问的顶点作起始点，重复上述过程，直至图中所有顶点都被访问到为止。

深度优先遍历三种方式
let deepTraversal1 = (node, nodeList = []) => {
  if (node !== null) {
    nodeList.push(node)
    let children = node.children
    for (let i = 0; i < children.length; i++) {
      deepTraversal1(children[i], nodeList)
    }
  }
  return nodeList
}
let deepTraversal2 = (node) => {
  let nodes = []
  if (node !== null) {
    nodes.push(node)
    let children = node.children
    for (let i = 0; i < children.length; i++) {
      nodes = nodes.concat(deepTraversal2(children[i]))
    }
  }
  return nodes
}
// 非递归
let deepTraversal3 = (node) => {
  let stack = []
  let nodes = []
  if (node) {
    // 推入当前处理的node
    stack.push(node)
    while (stack.length) {
      let item = stack.pop()
      let children = item.children
      nodes.push(item)
      // node = [] stack = [parent]
      // node = [parent] stack = [child3,child2,child1]
      // node = [parent, child1] stack = [child3,child2,child1-2,child1-1]
      // node = [parent, child1-1] stack = [child3,child2,child1-2]
      for (let i = children.length - 1; i >= 0; i--) {
        stack.push(children[i])
      }
    }
  }
  return nodes
}
*
*
*
* */
/*7th ES5/ES6 的继承除了写法以外还有什么区别
class 声明会提升，但不会初始化赋值。Foo 进入暂时性死区，类似于 let、const 声明变量。
const bar = new Bar(); // it's ok
function Bar() {
  this.bar = 42;
}

const foo = new Foo(); // ReferenceError: Foo is not defined
class Foo {
  constructor() {
    this.foo = 42;
  }
}
class 声明内部会启用严格模式。
// 引用一个未声明的变量
function Bar() {
  baz = 42; // it's ok
}
const bar = new Bar();

class Foo {
  constructor() {
    fol = 42; // ReferenceError: fol is not defined
  }
}
const foo = new Foo();
class 的所有方法（包括静态方法和实例方法）都是不可枚举的。
// 引用一个未声明的变量
function Bar() {
  this.bar = 42;
}
Bar.answer = function() {
  return 42;
};
Bar.prototype.print = function() {
  console.log(this.bar);
};
const barKeys = Object.keys(Bar); // ['answer']
const barProtoKeys = Object.keys(Bar.prototype); // ['print']

class Foo {
  constructor() {
    this.foo = 42;
  }
  static answer() {
    return 42;
  }
  print() {
    console.log(this.foo);
  }
}
const fooKeys = Object.keys(Foo); // []
const fooProtoKeys = Object.keys(Foo.prototype); // []
class 的所有方法（包括静态方法和实例方法）都没有原型对象 prototype，所以也没有[[construct]]，不能使用 new 来调用。
function Bar() {
  this.bar = 42;
}
Bar.prototype.print = function() {
  console.log(this.bar);
};

const bar = new Bar();
const barPrint = new bar.print(); // it's ok

class Foo {
  constructor() {
    this.foo = 42;
  }
  print() {
    console.log(this.foo);
  }
}
const foo = new Foo();
const fooPrint = new foo.print(); // TypeError: foo.print is not a constructor
必须使用 new 调用 class。
function Bar() {
  this.bar = 42;
}
const bar = Bar(); // it's ok

class Foo {
  constructor() {
    this.foo = 42;
  }
}
const foo = Foo(); // TypeError: Class constructor Foo cannot be invoked without 'new'
class 内部无法重写类名。
function Bar() {
  Bar = 'Baz'; // it's ok
  this.bar = 42;
}
const bar = new Bar();
// Bar: 'Baz'
// bar: Bar {bar: 42}

class Foo {
  constructor() {
    this.foo = 42;
    Foo = 'Fol'; // TypeError: Assignment to constant variable
  }
}
const foo = new Foo();
Foo = 'Fol'; // it's ok

广度优先遍历 BFS
从图中某顶点v出发，在访问了v之后依次访问v的各个未曾访问过的邻接点，然后分别从这些邻接点出发依次访问它们的邻接点，并使得“先被访问的顶点的邻接点先于后被访问的顶点的邻接点被访问，直至图中所有已被访问的顶点的邻接点都被访问到。 如果此时图中尚有顶点未被访问，则需要另选一个未曾被访问过的顶点作为新的起始点，重复上述过程，直至图中所有顶点都被访问到为止。
*let widthTraversal2 = (node) => {
  let nodes = []
  let stack = []
  if (node) {
    stack.push(node)
    while (stack.length) {
      let item = stack.shift()
      let children = item.children
      nodes.push(item)
        // 队列，先进先出
        // nodes = [] stack = [parent]
        // nodes = [parent] stack = [child1,child2,child3]
        // nodes = [parent, child1] stack = [child2,child3,child1-1,child1-2]
        // nodes = [parent,child1,child2]
      for (let i = 0; i < children.length; i++) {
        stack.push(children[i])
      }
    }
  }
  return nodes
}
 *
  *
  *
  * */
/*8th  setTimeout、Promise、Async/Await 的区别
* 1. setTimeout
console.log('script start')	//1. 打印 script start
setTimeout(function(){
    console.log('settimeout')	// 4. 打印 settimeout
})	// 2. 调用 setTimeout 函数，并定义其完成后执行的回调函数
console.log('script end')	//3. 打印 script start
// 输出顺序：script start->script end->settimeout
2. Promise
Promise本身是同步的立即执行函数， 当在executor中执行resolve或者reject的时候, 此时是异步操作， 会先执行then/catch等，当主栈完成后，才会去调用resolve/reject中存放的方法执行，打印p的时候，是打印的返回结果，一个Promise实例。

console.log('script start')
let promise1 = new Promise(function (resolve) {
    console.log('promise1')
    resolve()
    console.log('promise1 end')
}).then(function () {
    console.log('promise2')
})
setTimeout(function(){
    console.log('settimeout')
})
console.log('script end')
// 输出顺序: script start->promise1->promise1 end->script end->promise2->settimeout
当JS主线程执行到Promise对象时，

promise1.then() 的回调就是一个 task

promise1 是 resolved或rejected: 那这个 task 就会放入当前事件循环回合的 microtask queue

promise1 是 pending: 这个 task 就会放入 事件循环的未来的某个(可能下一个)回合的 microtask queue 中

setTimeout 的回调也是个 task ，它会被放入 macrotask queue 即使是 0ms 的情况

3. async/await
async function async1(){
   console.log('async1 start');
    await async2();
    console.log('async1 end')
}
async function async2(){
    console.log('async2')
}

console.log('script start');
async1();
console.log('script end')

// 输出顺序：script start->async1 start->async2->script end->async1 end
async 函数返回一个 Promise 对象，当函数执行的时候，一旦遇到 await 就会先返回，等到触发的异步操作完成，再执行函数体内后面的语句。可以理解为，是让出了线程，跳出了 async 函数体。

举个例子：

async function func1() {
    return 1
}

console.log(func1())
在这里插入图片描述
很显然，func1的运行结果其实就是一个Promise对象。因此我们也可以使用then来处理后续逻辑。

func1().then(res => {
    console.log(res);  // 30
})
await的含义为等待，也就是 async 函数需要等待await后的函数执行完成并且有了返回结果（Promise对象）之后，才能继续执行下面的代码。await通过返回一个Promise对象来实现同步的效果。
*
*
*
*
* */
/*第 9 题：Async/Await 如何通过同步的方式实现异步
*
* https://juejin.im/post/5d2c814c6fb9a07ecd3d8e43
*
* */
/*10th
*
* //请写出输出内容
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
}
async function async2() {
	console.log('async2');
}

console.log('script start');

setTimeout(function() {
    console.log('setTimeout');
}, 0)

async1();

new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
});
console.log('script end');


//
// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// setTimeout

* */
/*11th. 已知如下数组：
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
[...new Set(arr.flat(Infinity))].sort((a,b)=>{return a-b})
*/

/*12th  JS 异步解决方案的发展历程以及优缺点
JS 异步已经告一段落了，这里来一波小总结

1. 回调函数（callback）
setTimeout(() => {
    // callback 函数体
}, 1000)
缺点：回调地狱，不能用 try catch 捕获错误，不能 return

回调地狱的根本问题在于：

缺乏顺序性： 回调地狱导致的调试困难，和大脑的思维方式不符
嵌套函数存在耦合性，一旦有所改动，就会牵一发而动全身，即（控制反转）
嵌套函数过多的多话，很难处理错误
ajax('XXX1', () => {
    // callback 函数体
    ajax('XXX2', () => {
        // callback 函数体
        ajax('XXX3', () => {
            // callback 函数体
        })
    })
})
优点：解决了同步的问题（只要有一个任务耗时很长，后面的任务都必须排队等着，会拖延整个程序的执行。）

2. Promise
Promise就是为了解决callback的问题而产生的。

Promise 实现了链式调用，也就是说每次 then 后返回的都是一个全新 Promise，如果我们在 then 中 return ，return 的结果会被 Promise.resolve() 包装

优点：解决了回调地狱的问题

ajax('XXX1')
  .then(res => {
      // 操作逻辑
      return ajax('XXX2')
  }).then(res => {
      // 操作逻辑
      return ajax('XXX3')
  }).then(res => {
      // 操作逻辑
  })
缺点：无法取消 Promise ，错误需要通过回调函数来捕获

3. Generator
特点：可以控制函数的执行，可以配合 co 函数库使用

function *fetch() {
    yield ajax('XXX1', () => {})
    yield ajax('XXX2', () => {})
    yield ajax('XXX3', () => {})
}
let it = fetch()
let result1 = it.next()
let result2 = it.next()
let result3 = it.next()
4. Async/await
async、await 是异步的终极解决方案

优点是：代码清晰，不用像 Promise 写一大堆 then 链，处理了回调地狱的问题

缺点：await 将异步代码改造成同步代码，如果多个异步操作没有依赖性而使用 await 会导致性能上的降低。

async function test() {
  // 以下代码没有依赖性的话，完全可以使用 Promise.all 的方式
  // 如果有依赖性的话，其实就是解决回调地狱的例子了
  await fetch('XXX1')
  await fetch('XXX2')
  await fetch('XXX3')
}
下面来看一个使用 await 的例子：

let a = 0
let b = async () => {
  a = a + await 10
  console.log('2', a) // -> '2' 10
}
b()
a++
console.log('1', a) // -> '1' 1
对于以上代码你可能会有疑惑，让我来解释下原因

首先函数 b 先执行，在执行到 await 10 之前变量 a 还是 0，因为 await 内部实现了 generator ，generator 会保留堆栈中东西，所以这时候 a = 0 被保存了下来
因为 await 是异步操作，后来的表达式不返回 Promise 的话，就会包装成 Promise.reslove(返回值)，然后会去执行函数外的同步代码
同步代码执行完毕后开始执行异步代码，将保存下来的值拿出来使用，这时候 a = 0 + 10
上述解释中提到了 await 内部实现了 generator，其实 await 就是 generator 加上 Promise的语法糖，且内部实现了自动执行 generator。如果你熟悉 co 的话，其实自己就可以实现这样的语法糖。



* */
/*第 21 题：有以下 3 个判断数组的方法，请分别介绍它们之间的区别和优劣Object.prototype.toString.call() 、 instanceof 以及 Array.isArray()
*
*1. Object.prototype.toString.call()
每一个继承 Object 的对象都有 toString 方法，如果 toString 方法没有重写的话，会返回 [Object type]，其中 type 为对象的类型。但当除了 Object 类型的对象外，其他类型直接使用 toString 方法时，会直接返回都是内容的字符串，所以我们需要使用call或者apply方法来改变toString方法的执行上下文。

const an = ['Hello','An'];
an.toString(); // "Hello,An"
Object.prototype.toString.call(an); // "[object Array]"
这种方法对于所有基本的数据类型都能进行判断，即使是 null 和 undefined 。

Object.prototype.toString.call('An') // "[object String]"
Object.prototype.toString.call(1) // "[object Number]"
Object.prototype.toString.call(Symbol(1)) // "[object Symbol]"
Object.prototype.toString.call(null) // "[object Null]"
Object.prototype.toString.call(undefined) // "[object Undefined]"
Object.prototype.toString.call(function(){}) // "[object Function]"
Object.prototype.toString.call({name: 'An'}) // "[object Object]"
Object.prototype.toString.call() 常用于判断浏览器内置对象时。

更多实现可见 谈谈 Object.prototype.toString

2. instanceof
instanceof  的内部机制是通过判断对象的原型链中是不是能找到类型的 prototype。

使用 instanceof判断一个对象是否为数组，instanceof 会判断这个对象的原型链上是否会找到对应的 Array 的原型，找到返回 true，否则返回 false。

[]  instanceof Array; // true
但 instanceof 只能用来判断对象类型，原始类型不可以。并且所有对象类型 instanceof Object 都是 true。

[]  instanceof Object; // true
3. Array.isArray()
功能：用来判断对象是否为数组

instanceof 与 isArray

当检测Array实例时，Array.isArray 优于 instanceof ，因为 Array.isArray 可以检测出 iframes

var iframe = document.createElement('iframe');
document.body.appendChild(iframe);
xArray = window.frames[window.frames.length-1].Array;
var arr = new xArray(1,2,3); // [1,2,3]

// Correctly checking for Array
Array.isArray(arr);  // true
Object.prototype.toString.call(arr); // true
// Considered harmful, because doesn't work though iframes
arr instanceof Array; // false
Array.isArray() 与 Object.prototype.toString.call()

Array.isArray()是ES5新增的方法，当不存在 Array.isArray() ，可以用 Object.prototype.toString.call() 实现。

if (!Array.isArray) {
  Array.isArray = function(arg) {
    return Object.prototype.toString.call(arg) === '[object Array]';
  };
}
*
* */
/*第 20 题：介绍下 npm 模块安装机制，为什么输入 npm install 就可以自动安装对应的模块？
*
*
*1. npm 模块安装机制：
发出npm install命令
查询node_modules目录之中是否已经存在指定模块
若存在，不再重新安装
若不存在
npm 向 registry 查询模块压缩包的网址
下载压缩包，存放在根目录下的.npm目录里
解压压缩包到当前项目的node_modules目录
2. npm 实现原理
输入 npm install 命令并敲下回车后，会经历如下几个阶段（以 npm 5.5.1 为例）：

执行工程自身 preinstall
当前 npm 工程如果定义了 preinstall 钩子此时会被执行。

确定首层依赖模块
首先需要做的是确定工程中的首层依赖，也就是 dependencies 和 devDependencies 属性中直接指定的模块（假设此时没有添加 npm install 参数）。

工程本身是整棵依赖树的根节点，每个首层依赖模块都是根节点下面的一棵子树，npm 会开启多进程从每个首层依赖模块开始逐步寻找更深层级的节点。

获取模块
获取模块是一个递归的过程，分为以下几步：

获取模块信息。在下载一个模块之前，首先要确定其版本，这是因为 package.json 中往往是 semantic version（semver，语义化版本）。此时如果版本描述文件（npm-shrinkwrap.json 或 package-lock.json）中有该模块信息直接拿即可，如果没有则从仓库获取。如 packaeg.json 中某个包的版本是 ^1.1.0，npm 就会去仓库中获取符合 1.x.x 形式的最新版本。
获取模块实体。上一步会获取到模块的压缩包地址（resolved 字段），npm 会用此地址检查本地缓存，缓存中有就直接拿，如果没有则从仓库下载。
查找该模块依赖，如果有依赖则回到第1步，如果没有则停止。
模块扁平化（dedupe）
上一步获取到的是一棵完整的依赖树，其中可能包含大量重复模块。比如 A 模块依赖于 loadsh，B 模块同样依赖于 lodash。在 npm3 以前会严格按照依赖树的结构进行安装，因此会造成模块冗余。

从 npm3 开始默认加入了一个 dedupe 的过程。它会遍历所有节点，逐个将模块放在根节点下面，也就是 node-modules 的第一层。当发现有重复模块时，则将其丢弃。

这里需要对重复模块进行一个定义，它指的是模块名相同且 semver 兼容。每个 semver 都对应一段版本允许范围，如果两个模块的版本允许范围存在交集，那么就可以得到一个兼容版本，而不必版本号完全一致，这可以使更多冗余模块在 dedupe 过程中被去掉。

比如 node-modules 下 foo 模块依赖 lodash@^1.0.0，bar 模块依赖 lodash@^1.1.0，则 ^1.1.0 为兼容版本。

而当 foo 依赖 lodash@^2.0.0，bar 依赖 lodash@^1.1.0，则依据 semver 的规则，二者不存在兼容版本。会将一个版本放在 node_modules 中，另一个仍保留在依赖树里。

举个例子，假设一个依赖树原本是这样：

node_modules
-- foo
---- lodash@version1

-- bar
---- lodash@version2

假设 version1 和 version2 是兼容版本，则经过 dedupe 会成为下面的形式：

node_modules
-- foo

-- bar

-- lodash（保留的版本为兼容版本）

假设 version1 和 version2 为非兼容版本，则后面的版本保留在依赖树中：

node_modules
-- foo
-- lodash@version1

-- bar
---- lodash@version2

安装模块
这一步将会更新工程中的 node_modules，并执行模块中的生命周期函数（按照 preinstall、install、postinstall 的顺序）。

执行工程自身生命周期
当前 npm 工程如果定义了钩子此时会被执行（按照 install、postinstall、prepublish、prepare 的顺序）。

最后一步是生成或更新版本描述文件，npm install 过程完成。
*
*
* */
/*第 23 题：介绍下观察者模式和订阅-发布模式的区别，各自适用于什么场景
*
*
* 观察者模式中主体和观察者是互相感知的，发布-订阅模式是借助第三方来实现调度的，发布者和订阅者之间互不感知
*
*可不可以理解 为 观察者模式没中间商赚差价
发布订阅模式 有中间商赚差价
*发布-订阅模式就好像报社， 邮局和个人的关系，报纸的订阅和分发是由邮局来完成的。报社只负责将报纸发送给邮局。
观察者模式就好像 个体奶农和个人的关系。奶农负责统计有多少人订了产品，所以个人都会有一个相同拿牛奶的方法。奶农有新奶了就负责调用这个方法
* */
/*
* 第 26 题: 前端中的模块化开发
*
*模块化主要是用来抽离公共代码，隔离作用域，避免变量冲突等。

IIFE： 使用自执行函数来编写模块化，特点：在一个单独的函数作用域中执行代码，避免变量冲突。

(function(){
  return {
	data:[]
  }
})()
AMD： 使用requireJS 来编写模块化，特点：依赖必须提前声明好。

define('./index.js',function(code){
	// code 就是index.js 返回的内容
})
CMD： 使用seaJS 来编写模块化，特点：支持动态引入依赖文件。

define(function(require, exports, module) {
  var indexCode = require('./index.js');
});
CommonJS： nodejs 中自带的模块化。

var fs = require('fs');
UMD：兼容AMD，CommonJS 模块化语法。

webpack(require.ensure)：webpack 2.x 版本中的代码分割。

ES Modules： ES6 引入的模块化，支持import 来引入另一个 js 。

import a from 'a';




https://www.processon.com/view/link/5c8409bbe4b02b2ce492286a#outline
*
* */
/*
28th. cookie 和 token 都存放在 header 中，为什么不会劫持 token？
1、首先token不是防止XSS的，而是为了防止CSRF的；
2、CSRF攻击的原因是浏览器会自动带上cookie，而浏览器不会自动带上token


*/
/*29th .聊聊 Vue 的双向数据绑定，Model 如何改变 View，View 又是如何改变 Model 的
*
* VM 主要做了两件微小的事情：

从 M 到 V 的映射（Data Binding），这样可以大量节省你人肉来 update View 的代码
从 V 到 M 的事件监听（DOM Listeners），这样你的 Model 会随着 View 触发事件而改变
1、M 到 V 实现

做到这件事的第一步是形成类似于：

// template
var tpl = '<p>{{ text }}</p>';
// data
var data = {
text: 'This is some text'
};
// magic process
template(tpl, data); // '<p>This is some text</p>'

2、V 到 M 实现

从 V 到 M 主要由两类（ 虽然本质上都是监听 DOM ）构成，一类是用户自定义的 listener， 一类是 VM 自动处理的含有 value 属性元素的 listener

第一类类似于你在 Vue 里用 v-on 时绑定的那样，VM 在实例化得时候可以将所有用户自定义的 listener 一次性代理到根元素上，这些 listener 可以访问到你的 model 对象，这样你就可以在 listener 中改变 model

第二类类似于对含有 v-model 与 value 元素的自动处理，我们期望的是例如在一个输入框内

<input type="text" v-model="message" />
输入值，那么我与之对应的 model 属性 message 也会随之改变，相当于 VM 做了一个默认的 listener，它会监听这些元素的改变然后自动改变 model
*
*
* */
/*第 30 题：两个数组合并成一个数组
请把两个数组 ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2'] 和 ['A', 'B', 'C', 'D']，合并为 ['A1', 'A2', 'A', 'B1', 'B2', 'B', 'C1', 'C2', 'C', 'D1', 'D2', 'D']。
let arr1 = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
let arr2 = ["A", "B", "C", "D"];
console.log(
  [...arr1, ...arr2]
    .sort(
      (v2, v1) => (
        v2.codePointAt(0) - v1.codePointAt(0) ||
        v1.length - v2.length ||
        v2.codePointAt(1) - v1.codePointAt(1)
      )
    )
);


var arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
var arr2 = ['A', 'B', 'C', 'D']

const func = (arr1, arr2) => arr2.reduce((acc, cur) => [...acc, ...arr1.filter(item => item.startsWith(cur)), cur], [])


let arr1 = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
let arr2 = ["A", "B", "C", "D"];
console.log(
  [...arr1, ...arr2]
    .sort(
      (v2, v1) => (
        v2.codePointAt(0) - v1.codePointAt(0) ||
        v1.length - v2.length ||
        v2.codePointAt(1) - v1.codePointAt(1)
      )
    )
);


let arr1 = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
let arr2 = ["A", "B", "C", "D"];
console.log(
  [...arr1, ...arr2]
    .sort(
      (v2, v1) => (
        v2.codePointAt(0) - v1.codePointAt(0) ||
        v1.length - v2.length ||
        v2.codePointAt(1) - v1.codePointAt(1)
      )
    )
);

var arr1 = ["A1", "A2", "B1", "B2", "C1", "C2", "D1", "D2"];
var arr2 = ["A", "B", "C", "D"];

arr2.forEach((it, index) => {
  arr1.splice((index + 1) * 2 + index, 0, it);
});

console.log(arr1);

let a1 =  ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
let a2 = ['A', 'B', 'C', 'D'].map((item) => {
  return item + 3
})

let a3 = [...a1, ...a2].sort().map((item) => {
  if(item.includes('3')){
    return item.split('')[0]
  }
  return item
})


const arr1 = ['A1', 'A2', 'B1', 'B2', 'C1', 'C2', 'D1', 'D2']
const arr2 = ['A', 'B', 'C', 'D']
const ret = []
let tmp = arr2[0]
let j = 0
for (let i=0;i<arr1.length;i++) {
  if (tmp === arr1[i].charAt(0)){
    ret.push(arr1[i])
  }else {
    ret.push(tmp)
    ret.push(arr1[i])
    tmp=arr2[++j]
  }
   if(i===arr1.length-1){
      ret.push(tmp)
    }
}
console.log(ret)
*/
/*第 32 题：Virtual DOM 真的比操作原生 DOM 快吗？谈谈你的想法
* 1. 原生 DOM 操作 vs. 通过框架封装操作。
这是一个性能 vs. 可维护性的取舍。框架的意义在于为你掩盖底层的 DOM 操作，让你用更声明式的方式来描述你的目的，从而让你的代码更容易维护。没有任何框架可以比纯手动的优化 DOM 操作更快，因为框架的 DOM 操作层需要应对任何上层 API 可能产生的操作，它的实现必须是普适的。针对任何一个 benchmark，我都可以写出比任何框架更快的手动优化，但是那有什么意义呢？在构建一个实际应用的时候，你难道为每一个地方都去做手动优化吗？出于可维护性的考虑，这显然不可能。框架给你的保证是，你在不需要手动优化的情况下，我依然可以给你提供过得去的性能。

2. 对 React 的 Virtual DOM 的误解。
React 从来没有说过 “React 比原生操作 DOM 快”。React 的基本思维模式是每次有变动就整个重新渲染整个应用。如果没有 Virtual DOM，简单来想就是直接重置 innerHTML。很多人都没有意识到，在一个大型列表所有数据都变了的情况下，重置 innerHTML 其实是一个还算合理的操作... 真正的问题是在 “全部重新渲染” 的思维模式下，即使只有一行数据变了，它也需要重置整个 innerHTML，这时候显然就有大量的浪费。

我们可以比较一下 innerHTML vs. Virtual DOM 的重绘性能消耗：

innerHTML: render html string O(template size) + 重新创建所有 DOM 元素 O(DOM size)
Virtual DOM: render Virtual DOM + diff O(template size) + 必要的 DOM 更新 O(DOM change)
Virtual DOM render + diff 显然比渲染 html 字符串要慢，但是！它依然是纯 js 层面的计算，比起后面的 DOM 操作来说，依然便宜了太多。可以看到，innerHTML 的总计算量不管是 js 计算还是 DOM 操作都是和整个界面的大小相关，但 Virtual DOM 的计算量里面，只有 js 计算和界面大小相关，DOM 操作是和数据的变动量相关的。前面说了，和 DOM 操作比起来，js 计算是极其便宜的。这才是为什么要有 Virtual DOM：它保证了 1）不管你的数据变化多少，每次重绘的性能都可以接受；2) 你依然可以用类似 innerHTML 的思路去写你的应用。

3. MVVM vs. Virtual DOM
相比起 React，其他 MVVM 系框架比如 Angular, Knockout 以及 Vue、Avalon 采用的都是数据绑定：通过 Directive/Binding 对象，观察数据变化并保留对实际 DOM 元素的引用，当有数据变化时进行对应的操作。MVVM 的变化检查是数据层面的，而 React 的检查是 DOM 结构层面的。MVVM 的性能也根据变动检测的实现原理有所不同：Angular 的脏检查使得任何变动都有固定的
O(watcher count) 的代价；Knockout/Vue/Avalon 都采用了依赖收集，在 js 和 DOM 层面都是 O(change)：

脏检查：scope digest O(watcher count) + 必要 DOM 更新 O(DOM change)
依赖收集：重新收集依赖 O(data change) + 必要 DOM 更新 O(DOM change)可以看到，Angular 最不效率的地方在于任何小变动都有的和 watcher 数量相关的性能代价。但是！当所有数据都变了的时候，Angular 其实并不吃亏。依赖收集在初始化和数据变化的时候都需要重新收集依赖，这个代价在小量更新的时候几乎可以忽略，但在数据量庞大的时候也会产生一定的消耗。
MVVM 渲染列表的时候，由于每一行都有自己的数据作用域，所以通常都是每一行有一个对应的 ViewModel 实例，或者是一个稍微轻量一些的利用原型继承的 "scope" 对象，但也有一定的代价。所以，MVVM 列表渲染的初始化几乎一定比 React 慢，因为创建 ViewModel / scope 实例比起 Virtual DOM 来说要昂贵很多。这里所有 MVVM 实现的一个共同问题就是在列表渲染的数据源变动时，尤其是当数据是全新的对象时，如何有效地复用已经创建的 ViewModel 实例和 DOM 元素。假如没有任何复用方面的优化，由于数据是 “全新” 的，MVVM 实际上需要销毁之前的所有实例，重新创建所有实例，最后再进行一次渲染！这就是为什么题目里链接的 angular/knockout 实现都相对比较慢。相比之下，React 的变动检查由于是 DOM 结构层面的，即使是全新的数据，只要最后渲染结果没变，那么就不需要做无用功。

Angular 和 Vue 都提供了列表重绘的优化机制，也就是 “提示” 框架如何有效地复用实例和 DOM 元素。比如数据库里的同一个对象，在两次前端 API 调用里面会成为不同的对象，但是它们依然有一样的 uid。这时候你就可以提示 track by uid 来让 Angular 知道，这两个对象其实是同一份数据。那么原来这份数据对应的实例和 DOM 元素都可以复用，只需要更新变动了的部分。或者，你也可以直接 track by $index 来进行 “原地复用”：直接根据在数组里的位置进行复用。在题目给出的例子里，如果 angular 实现加上 track by $index 的话，后续重绘是不会比 React 慢多少的。甚至在 dbmonster 测试中，Angular 和 Vue 用了 track by $index 以后都比 React 快: dbmon (注意 Angular 默认版本无优化，优化过的在下面）

顺道说一句，React 渲染列表的时候也需要提供 key 这个特殊 prop，本质上和 track-by 是一回事。

4. 性能比较也要看场合
在比较性能的时候，要分清楚初始渲染、小量数据更新、大量数据更新这些不同的场合。Virtual DOM、脏检查 MVVM、数据收集 MVVM 在不同场合各有不同的表现和不同的优化需求。Virtual DOM 为了提升小量数据更新时的性能，也需要针对性的优化，比如 shouldComponentUpdate 或是 immutable data。

初始渲染：Virtual DOM > 脏检查 >= 依赖收集
小量数据更新：依赖收集 >> Virtual DOM + 优化 > 脏检查（无法优化） > Virtual DOM 无优化
大量数据更新：脏检查 + 优化 >= 依赖收集 + 优化 > Virtual DOM（无法/无需优化）>> MVVM 无优化
不要天真地以为 Virtual DOM 就是快，diff 不是免费的，batching 么 MVVM 也能做，而且最终 patch 的时候还不是要用原生 API。在我看来 Virtual DOM 真正的价值从来都不是性能，而是它 1) 为函数式的 UI 编程方式打开了大门；2) 可以渲染到 DOM 以外的 backend，比如 ReactNative。

5. 总结
以上这些比较，更多的是对于框架开发研究者提供一些参考。主流的框架 + 合理的优化，足以应对绝大部分应用的性能需求。如果是对性能有极致需求的特殊情况，其实应该牺牲一些可维护性采取手动优化：比如 Atom 编辑器在文件渲染的实现上放弃了 React 而采用了自己实现的 tile-based rendering；又比如在移动端需要 DOM-pooling 的虚拟滚动，不需要考虑顺序变化，可以绕过框架的内置实现自己搞一个。

链接：https://www.zhihu.com/question/31809713/answer/53544875
*
*
*
*
*
* */
/*第 35 题：浏览器缓存读取规则
可以分成 Service Worker、Memory Cache、Disk Cache 和 Push Cache，那请求的时候 from memory cache 和 from disk cache 的依据是什么，哪些数据什么时候存放在 Memory Cache 和 Disk Cache中


https://www.jianshu.com/p/54cc04190252
*
*
*
* */
/*39th bfc
* BFC 就是块级格式上下文，是页面盒模型布局中的一种 CSS 渲染模式，相当于一个独立的容器，里面的元素和外部的元素相互不影响。创建 BFC 的方式有：

html 根元素
float 浮动
绝对定位
overflow 不为 visiable
display 为表格布局或者弹性布局
BFC 主要的作用是：

清除浮动
防止同一 BFC 容器中的相邻元素间的外边距重叠问题

BFC特性：

内部box会在垂直方向，一个接一个地放置。
Box垂直方向的距离由margin决定，在一个BFC中，两个相邻的块级盒子的垂直外边距会产生折叠。
在BFC中，每一个盒子的左外边缘（margin-left）会触碰到容器的左边缘(border-left)（对于从右到左的格式来说，则触碰到右边缘）
形成了BFC的区域不会与float box重叠
计算BFC高度时，浮动元素也参与计算
生成BFC除了 @webproblem 童鞋所说的还有：行内块元素、网格布局、contain值为layout、content或 strict的元素等。
更多生成BFC的方法：传送门

BFC作用：

利用特性4可实现左图右文之类的效果：
<img src='image.png'>
<p>我是超长的文字<p>
img {
    float:left
}
p {
    overflow:hidden
}
利用特性5可以解决浮动元素造成的父元素高度塌陷问题：
<div class='parent'>
    <div class='float'>浮动元素</div>
</div>
.parent {
    overflow:hidden;
}
.float {
    float:left;
}
*
*
*
* */
/*第 41 题 考察作用域的一道代码题
var a = 10;
(function () {
    console.log(a)
    a = 5
    console.log(window.a)
    var a = 20;
    console.log(a)
})()
依次输出：undefined -> 10 -> 20

解析：

在立即执行函数中，var a = 20; 语句定义了一个局部变量 a，由于js的变量声明提升机制，局部变量a的声明会被提升至立即执行函数的函数体最上方，且由于这样的提升并不包括赋值，因此第一条打印语句会打印undefined，最后一条语句会打印20。

由于变量声明提升，a = 5; 这条语句执行时，局部的变量a已经声明，因此它产生的效果是对局部的变量a赋值，此时window.a 依旧是最开始赋值的10，
*/
/*第 45 题：HTTPS 握手过程中，客户端如何验证证书的合法性
*1、首先什么是HTTP协议?
http协议是超文本传输协议，位于tcp/ip四层模型中的应用层；通过请求/响应的方式在客户端和服务器之间进行通信；但是缺少安全性，http协议信息传输是通过明文的方式传输，不做任何加密，相当于在网络上裸奔；容易被中间人恶意篡改，这种行为叫做中间人攻击；
2、加密通信：
为了安全性，双方可以使用对称加密的方式key进行信息交流，但是这种方式对称加密秘钥也会被拦截，也不够安全，进而还是存在被中间人攻击风险；
于是人们又想出来另外一种方式，使用非对称加密的方式；使用公钥/私钥加解密；通信方A发起通信并携带自己的公钥，接收方B通过公钥来加密对称秘钥；然后发送给发起方A；A通过私钥解密；双发接下来通过对称秘钥来进行加密通信；但是这种方式还是会存在一种安全性；中间人虽然不知道发起方A的私钥，但是可以做到偷天换日，将拦截发起方的公钥key;并将自己生成的一对公/私钥的公钥发送给B；接收方B并不知道公钥已经被偷偷换过；按照之前的流程，B通过公钥加密自己生成的对称加密秘钥key2;发送给A；
这次通信再次被中间人拦截，尽管后面的通信，两者还是用key2通信，但是中间人已经掌握了Key2;可以进行轻松的加解密；还是存在被中间人攻击风险；

3、解决困境：权威的证书颁发机构CA来解决；
3.1制作证书：作为服务端的A，首先把自己的公钥key1发给证书颁发机构，向证书颁发机构进行申请证书；证书颁发机构有一套自己的公私钥，CA通过自己的私钥来加密key1,并且通过服务端网址等信息生成一个证书签名，证书签名同样使用机构的私钥进行加密；制作完成后，机构将证书发给A；
3.2校验证书真伪：当B向服务端A发起请求通信的时候，A不再直接返回自己的公钥，而是返回一个证书；
说明：各大浏览器和操作系统已经维护了所有的权威证书机构的名称和公钥。B只需要知道是哪个权威机构发的证书，使用对应的机构公钥，就可以解密出证书签名；接下来，B使用同样的规则，生成自己的证书签名，如果两个签名是一致的，说明证书是有效的；
签名验证成功后，B就可以再次利用机构的公钥，解密出A的公钥key1;接下来的操作，就是和之前一样的流程了；
3.3：中间人是否会拦截发送假证书到B呢？
因为证书的签名是由服务器端网址等信息生成的，并且通过第三方机构的私钥加密中间人无法篡改； 所以最关键的问题是证书签名的真伪；

4、https主要的思想是在http基础上增加了ssl安全层，即以上认证过程；:
*
*
*
* */
/*第 47 题：双向绑定和 vuex 是否冲突
*在严格模式中使用Vuex，当用户输入时，v-model会试图直接修改属性值，但这个修改不是在mutation中修改的，所以会抛出一个错误。当需要在组件中使用vuex中的state时，有2种解决方案：
1、在input中绑定value(vuex中的state)，然后监听input的change或者input事件，在事件回调中调用mutation修改state的值
2、使用带有setter的双向绑定计算属性。见以下例子（来自官方文档）：

<input v-model="message">
computed: { message: { get () { return this.$store.state.obj.message }, set (value) { this.$store.commit('updateMessage', value) } } }
*
*
* */
/*第 59 题：给定两个数组，写一个方法来计算它们的交集。例如：给定 nums1 = [1, 2, 2, 1]，nums2 = [2, 2]，返回 [2, 2]。
*这道题不是工程题，是道算法题。求的是两个数组的最长公共子序列 (子序列要求顺序，交集不需要）。所以上面用一个filter一个includes或者indexOf的都是错的。

反例很简单。

var nums1 = [1]
var nums2 = [1,1]
或者

var nums1 = [1,1]
var nums2 = [1]
交集应该是[1]

跑一下你们的方法就能知道错了。

这道题两种思路，空间换时间，或者不用额外空间就提升时间复杂度。

空间换时间的思路是用个Hash表来存数组1的元素以及出现的个数（此处需要遍历n次，并存一个n级别的空间）。
遍历数组2，发现数组2里有Hash表里的值就存到Result数组里，并把Hash表内该值次数减一（为0之后就Delete）。如果不存在Hash表里，就跳过。这样时间复杂度就是(m+n)

不用额外空间，就用遍历n的时候，判断值在不在m里，如果在，把m里的该值push到Result数组里，并将该值从m数组里删掉（用splice）。这样就是不用额外空间，但是提高了时间复杂度。




哈希表，时间复杂度O(m + n) m为nums1长度，n为nums2长度

const intersect = (nums1, nums2) => {
  const map = {}
  const res = []
  for (let n of nums1) {
    if (map[n]) {
      map[n]++
    } else {
      map[n] = 1
    }
  }
  for (let n of nums2) {
    if (map[n] > 0) {
      res.push(n)
      map[n]--
    }
  }
  return res
}
*
*
*
* */
/*第 51 题：Vue 的响应式原理中 Object.defineProperty 有什么缺陷？为什么在 Vue3.0 采用了 Proxy，抛弃了 Object.defineProperty？
*
*Object.defineProperty无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；
Object.defineProperty只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy可以劫持整个对象，并返回一个新的对象。
Proxy不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。
*
*
* */
/*第 54 题：冒泡排序如何实现，时间复杂度是多少， 还可以如何改进？



function bubbleSort(arr) {
    for (let i = 0; i < arr.length; i++) {
        for (let j = 0; j < arr.length - i - 1; j++) {
            if (arr[j] > arr[j + 1]) {
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
    console.log(arr);
}

// 改进冒泡排序
function bubbleSort1(arr) {
    let i = arr.length - 1;

    while (i > 0) {
        let pos = 0;
        for (let j = 0; j < i; j++) {
            if (arr[j] > arr[j + 1]) {
                pos = j;
                const temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
        i = pos;
    }
    console.log(arr);
}
*
*
*
*
* */
/*第 57 题：分析比较 opacity: 0、visibility: hidden、display: none 优劣和适用场景
*
*display: none (不占空间，不能点击)（场景，显示出原来这里不存在的结构）
visibility: hidden（占据空间，不能点击）（场景：显示不会导致页面结构发生变动，不会撑开）
opacity: 0（占据空间，可以点击）（场景：可以跟transition搭配）



补充：株连性
如果祖先元素遭遇某祸害，则其子孙孙无一例外也要遭殃，比如：
opacity:0和display:none，若父节点元素应用了opacity:0和display:none，无论其子孙元素如何挣扎都不会再出现在大众视野；
而若父节点元素应用visibility:hidden，子孙元素应用visibility:visible，那么其就会毫无意外的显现出来。
*
*
*display: none 会回流操作 性能开销较大，
visibility: hidden 是重回操作 比回流操作性能高一些，（回流会计算相邻元素甚至组先级元素的位置，属性等）
opacity: 0 重建图层，性能较高
*
*
*
*
*总结一下：
结构：
display:none: 会让元素完全从渲染树中消失，渲染的时候不占据任何空间, 不能点击，
visibility: hidden:不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，不能点击
opacity: 0: 不会让元素从渲染树消失，渲染元素继续占据空间，只是内容不可见，可以点击

继承：
display: none和opacity: 0：是非继承属性，子孙节点消失由于元素从渲染树消失造成，通过修改子孙节点属性无法显示。
visibility: hidden：是继承属性，子孙节点消失由于继承了hidden，通过设置visibility: visible;可以让子孙节点显式。

性能：
displaynone : 修改元素会造成文档回流,读屏器不会读取display: none元素内容，性能消耗较大
visibility:hidden: 修改元素只会造成本元素的重绘,性能消耗较少读屏器读取visibility: hidden元素内容
opacity: 0 ： 修改元素会造成重绘，性能消耗较少

联系：它们都能让元素不可见
*
*
* */
/*
*
*
*第 60 题：已知如下代码，如何修改才能让图片宽度为 300px ？注意下面代码不可修改。
*
* 总结一下吧：
1.css方法
max-width:300px;覆盖其样式；
transform: scale(0.625)；按比例缩放图片；
2.js方法
document.getElementsByTagName("img")[0].setAttribute("style","width:300px!important;")
*
*
* */
/*第 63 题：如何设计实现无缝轮播
*
*  // scroll the notice
  useEffect(() => {
    const requestAnimationFrame =
      window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame
    const cancelAnimationFrame =
      window.cancelAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame

    const scrollNode = noticeContentEl.current
    const distance = scrollNode.clientWidth / 2

    scrollNode.style.left = scrollNode.style.left || 0
    window.__offset = window.__offset || 0

    let requestId = null
    const scrollLeft = () => {
      const speed = 0.5
      window.__offset = window.__offset + speed
      scrollNode.style.left = -window.__offset + 'px'
      // 关键行：当距离小于偏移量时，重置偏移量
      if (distance <= window.__offset) window.__offset = 0
      requestId = requestAnimationFrame(scrollLeft)
    }
    requestId = requestAnimationFrame(scrollLeft)

    if (pause) cancelAnimationFrame(requestId)
    return () => cancelAnimationFrame(requestId)
  }, [notice, pause])
*
*
*
*
* */
/*第 67 题：随机生成一个长度为 10 的整数类型的数组，例如 [2, 10, 3, 4, 5, 11, 10, 11, 20]，将其排列成一个新数组，要求新数组形式如下，例如 [[2, 3, 4, 5], [10, 11], [20]]。

// 得到一个两数之间的随机整数，包括两个数在内
function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min; //含最大值，含最小值
}
// 随机生成10个整数数组, 排序, 去重
let initArr = Array.from({ length: 10 }, (v) => { return getRandomIntInclusive(0, 99) });
initArr.sort((a,b) => { return a - b });
initArr = [...(new Set(initArr))];

// 放入hash表
let obj = {};
initArr.map((i) => {
    const intNum = Math.floor(i/10);
    if (!obj[intNum]) obj[intNum] = [];
    obj[intNum].push(i);
})

// 输出结果
const resArr = [];
for(let i in obj) {
    resArr.push(obj[i]);
}
console.log(resArr);

*
*
*
* */
/*第 65 题： a.b.c.d 和 a['b']['c']['d']，哪个性能更高
*应该是 a.b.c.d 比 a['b']['c']['d'] 性能高点，后者还要考虑 [ ] 中是变量的情况，再者，从两种形式的结构来看，显然编译器解析前者要比后者容易些，自然也就快一点。
*
*
*https://github.com/airuikun/Weekly-FE-Interview/issues/19
*
* */
/*第 72 题： 为什么普通 for 循环的性能远远高于 forEach 的性能，请解释其中的原因
*for 循环没有任何额外的函数调用栈和上下文；

forEach函数签名实际上是

array.forEach(function(currentValue, index, arr), thisValue)

它不是普通的 for 循环的语法糖，还有诸多参数和上下文需要在执行的时候考虑进来，这里可能拖慢性能；



let arrs = new Array(100000);

console.time('for');
for (let i = 0; i < arrs.length; i++) {

};
console.timeEnd('for');

console.time('forEach');

arrs.forEach((arr) => {

});
console.timeEnd('forEach');

for: 2.263ms
forEach: 0.254msf
*
* */
/*第 75 题：数组里面有10万个数据，取第一个元素和第10万个元素的时间相差多少
*
*数组可以直接根据索引取的对应的元素，所以不管取哪个位置的元素的时间复杂度都是 O(1)得出结论：消耗时间几乎一致，差异可以忽略不计
*
*
*JavaScript 没有真正意义上的数组，所有的数组其实是对象，其“索引”看起来是数字，其实会被转换成字符串，作为属性名（对象的 key）来使用。所以无论是取第 1 个还是取第 10 万个元素，都是用 key 精确查找哈希表的过程，其消耗时间大致相同。
*
*
*
* */
/*
第 77 题：算法题「旋转数组」

给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。

示例 1：
输入: [1, 2, 3, 4, 5, 6, 7] 和 k = 3
输出: [5, 6, 7, 1, 2, 3, 4]
解释:
向右旋转 1 步: [7, 1, 2, 3, 4, 5, 6]
向右旋转 2 步: [6, 7, 1, 2, 3, 4, 5]
向右旋转 3 步: [5, 6, 7, 1, 2, 3, 4]
复制代码示例 2：
输入: [-1, -100, 3, 99] 和 k = 2
输出: [3, 99, -1, -100]
解释:
向右旋转 1 步: [99, -1, -100, 3]
向右旋转 2 步: [3, 99, -1, -100]

* 因为步数有可能大于数组长度，所以要先取余

function rotate(arr, k) {
  const len = arr.length
  const step = k % len
  return arr.slice(-step).concat(arr.slice(0, len - step))
}
// rotate([1, 2, 3, 4, 5, 6], 7) => [6, 1, 2, 3, 4, 5]
*
*
* */
/*第 87 题：在输入框中如何判断输入的是一个正确的网址


const isUrl = urlStr => {
    try {
        const { href, origin, host, hostname, pathname } = new URL(urlStr)
        return href && origin && host && hostname && pathname && true
    } catch (e) {
        return false
    }
}



*/
/*99th
*
* function fun(num){
    let num1 = num / 10;
    let num2 = num % 10;
    if(num1<1){
        return num;
    }else{
        num1 = Math.floor(num1)
        return `${num2}${fun(num1)}`
    }
}
var a = fun(12345)
console.log(a)
console.log(typeof a)
*
*
* */
/*
第 130 题：输出以下代码执行结果，大致时间就好（不同于上题）
function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  await wait();
  await wait();
  await wait();
  console.timeEnd();
}
main();


先说结果，大概30秒多点，30秒是因为每个等待10秒，同步执行。
其实还有一个变种：

function wait() {
  return new Promise(resolve =>
    setTimeout(resolve, 10 * 1000)
  )
}

async function main() {
  console.time();
  let a = wait();
  let b = wait();
  let c = wait();
  await a;
  await b;
  await c;
  console.timeEnd();
}
main();
这个的运行时间是10s多一点，这是因为：a，b，c的异步请求会按顺序发起。而这个过程是不需要互相依赖等待的。等到wait的时候，其实是比较那个异步耗时最多。就会等待最长。最长的耗时就是整体的耗时。

如果在业务中，两个异步没有依赖关系。应该是后面这种写法。


*/
/*子组件为何不可以修改父组件传递的 Prop
1.单向数据流，易于监测数据的流动，出现了错误可以更加迅速的定位到错误发生的位置。
2.如果修改了，Vue 是如何监控到属性的修改并给出警告的。
if (process.env.NODE_ENV !== 'production') {
      var hyphenatedKey = hyphenate(key);
      if (isReservedAttribute(hyphenatedKey) ||
          config.isReservedAttr(hyphenatedKey)) {
        warn(
          ("\"" + hyphenatedKey + "\" is a reserved attribute and cannot be used as component prop."),
          vm
        );
      }
      defineReactive$$1(props, key, value, function () {
        if (!isRoot && !isUpdatingChildComponent) {
          warn(
            "Avoid mutating a prop directly since the value will be " +
            "overwritten whenever the parent component re-renders. " +
            "Instead, use a data or computed property based on the prop's " +
            "value. Prop being mutated: \"" + key + "\"",
            vm
          );
        }
      });
    }
在initProps的时候，在defineReactive时通过判断是否在开发环境，如果是开发环境，会在触发set的时候判断是否此key是否处于updatingChildren中被修改，如果不是，说明此修改来自子组件，触发warning提示。

需要特别注意的是，当你从子组件修改的prop属于基础类型时会触发提示。 这种情况下，你是无法修改父组件的数据源的， 因为基础类型赋值时是值拷贝。你直接将另一个非基础类型（Object, array）赋值到此key时也会触发提示(但实际上不会影响父组件的数据源)， 当你修改object的属性时不会触发提示，并且会修改父组件数据源的数据。

*/
/*
* 箭头函数的情况：
箭头函数没有自己的this，继承外层上下文绑定的this。

let obj = {
    age: 20,
    info: function() {
        return () => {
            console.log(this.age); //this继承的是外层上下文绑定的this
        }
    }
}

let person = {age: 28};
let info = obj.info();
info(); //20

let info2 = obj.info.call(person);
info2(); //28
*
* */
/*
* new
*
* function _new() {
    let target = {}; //创建的新对象
    //第一个参数是构造函数
    let [constructor, ...args] = [...arguments];
    //执行[[原型]]连接;target 是 constructor 的实例
    target.__proto__ = constructor.prototype;
    //执行构造函数，将属性或方法添加到创建的空对象上
    let result = constructor.apply(target, args);
    if (result && (typeof (result) == "object" || typeof (result) == "function")) {
        //如果构造函数执行的结构返回的是一个对象，那么返回这个对象
        return result;
    }
    //如果构造函数返回的不是一个对象，返回创建的新对象
    return target;
}


* */
/*
深拷贝
function deepClone(obj, hash = new WeakMap()) { //递归拷贝
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);
    if (obj === null || typeof obj !== 'object') {
        //如果不是复杂数据类型，直接返回
        return obj;
    }
    if (hash.has(obj)) {
        return hash.get(obj);
    }
    /**
     * 如果obj是数组，那么 obj.constructor 是 [Function: Array]
     * 如果obj是对象，那么 obj.constructor 是 [Function: Object]
     */
/*
let t = new obj.constructor();
hash.set(obj, t);
for (let key in obj) {
  //递归
  if (obj.hasOwnProperty(key)) {//是否是自身的属性
    t[key] = deepClone(obj[key], hash);
  }
}
return t;
}*/
/*
call
Function.prototype.call = function() {
    let [thisArg, ...args] = [...arguments];
    if (!thisArg) {
        //context为null或者是undefined
        thisArg = typeof window === 'undefined' ? global : window;
    }
    //this的指向的是当前函数 func (func.call)
    thisArg.func = this;
    //执行函数
    let result = thisArg.func(...args);
    delete thisArg.func; //thisArg上并没有 func 属性，因此需要移除
    return result;
}*/








