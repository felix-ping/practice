/*11. 已知如下数组：
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组

var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
[...new Set(arr.flat(Infinity))].sort((a,b)=>{return a-b})
*/



/*
第 92 题：已知数据格式，实现一个函数 fn 找出链条中所有的父级 id
const value = '112'
const fn = (value) => {
...
}

const data = [{
    id: '1',
    name: 'test1',
    children: [
        {
            id: '11',
            name: 'test11',
            children: [
                {
                    id: '111',
                    name: 'test111'
                },
                {
                    id: '112',
                    name: 'test112'
                }
            ]

        },
        {
            id: '12',
            name: 'test12',
            children: [
                {
                    id: '121',
                    name: 'test121'
                },
                {
                    id: '122',
                    name: 'test122'
                }
            ]
        }
    ]
}];
fn(value) // 输出 [1， 11， 112]


function fn(id, list) {
  const match = list.find(item => item.id === id);
  if (match) return [id];
  const sub = list.find(item => id.startsWith(item.id));
  return [sub.id].concat(fn(id, sub.children));
}

const fn = (data, value) => {
  let res = []
  const dfs = (arr, temp = []) => {
    for (const node of arr) {
      if (node.children) {
        dfs(node.children, temp.concat(node.id))
      } else if(node.id === value){
        res = temp.concat(node.id)
        return
      }
    }
  }
  dfs(data)
  return res
}
const data = [{
  id: '1',
  name: 'test1',
  children: [
    {
      id: '11',
      name: 'test11',
      children: [
        {
          id: '111',
          name: 'test111'
        },
        {
          id: '112',
          name: 'test112'
        }
      ]

    },
    {
      id: '12',
      name: 'test12',
      children: [
        {
          id: '121',
          name: 'test121'
        },
        {
          id: '122',
          name: 'test122'
        }
      ]
    }
  ]
}];
fn(data,'122')*/

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

/*第 51 题：Vue 的响应式原理中 Object.defineProperty 有什么缺陷？为什么在 Vue3.0 采用了 Proxy，抛弃了 Object.defineProperty？
*
*Object.defineProperty无法监控到数组下标的变化，导致通过数组下标添加元素，不能实时响应；
Object.defineProperty只能劫持对象的属性，从而需要对每个对象，每个属性进行遍历，如果，属性值是对象，还需要深度遍历。Proxy可以劫持整个对象，并返回一个新的对象。
Proxy不仅可以代理对象，还可以代理数组。还可以代理动态增加的属性。
*
*
* */




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