let quick = (arr) => {
  if (arr.length < 2) {
    return arr
  }
  let basic = arr[0], left = [], right = [];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > basic) {
      right.push(arr[i])
    }
    if (arr[i] <= basic) {
      left.push(arr[i])
    }
  }
  return quick(left).concat(basic, quick(right))//
};
console.log(quick([5, 3, 4, 5, 7, 5, 2, 1, 8, 5, 3, 1223, 1, 0]));


let bubble = (arr) => {
  let swap;
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {//
      if (arr[j] > arr[j + 1]) {
        swap = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = swap
      }
    }
  }
  return arr
};
const arr = [3, 1, 2, 4, 5, 9, 7, 4, 2, 8, 1, 6, 0];
console.log(bubble(arr));


let selectSort = (arr) => {
  let swap, min;
  for (let i = 0; i < arr.length; i++) {
    min = i;
    for (let j = i + 1; j < arr.length; j++) {//
      if (arr[min] > arr[j]) {
        min = j
      }
    }
    swap = arr[i];
    arr[i] = arr[min];
    arr[min] = swap
  }
  return arr
};
const array4 = [3, 1, 2, 4, 5, 9, 7, 4, 2, 8, 1, 6, 0];
console.log(selectSort(array4));

let insertionSort = (arr) => {
  let preIndex, current;
  for (let i = 1; i < arr.length; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];//
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
};
const arr2 = [3, 1, 2, 4, 5, 9, 7, 4, 2, 8, 1, 6, 0];
console.log(insertionSort(arr2));

let counter = (arr) => {
  let count = [];
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i];
    if (count[value] >= 1) {
      count[value]++
    } else {
      count[value] = 1
    }
  }
  let newArr = [];
  for (let j = 0; j < count.length; j++) {
    if (count[j]) {
      while (count[j] > 0) {
        newArr.push(j);
        count[j]--
      }
    }
  }
  return newArr
};
const array3 = [3, 1, 2, 4, 5, 9, 7, 4, 2, 8, 1, 6, 0];
console.log(counter(array3));


Array.prototype.binary = function (star, end, value) {
  if (star > end) return -1;//
  let mid = Math.floor((star + end) / 2);
  if (this[mid] > value) {
    return this.binary(star, mid, value)//
  }
  if (this[mid] < value) {//
    return this.binary(mid, end, value)//
  }
  return mid//
};
console.log([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].binary(0, 10, 1));


Array.prototype.mergeSort = function () {
  if (this.length < 2) {
    return this
  }
  let middle = this.length / 2;

  function merge(left, right) {
    let final = [];
    while (left.length && right.length) {
      final.push(left[0] <= right[0] ? left.shift() : right.shift())
    }
    return final.concat(left.concat(right))
  }

  return merge(this.slice(0, parseInt(middle)).mergeSort(), this.slice(parseInt(middle)).mergeSort())//

};
console.log([1, 2, 1, 4, 5, 6, 3, 4, 7, 8, 9, 4, 3, 2, 0].mergeSort());


const Bus = {
  event: {},
  on: function (eventName, fn) {
    if (this.event[eventName] === undefined) {
      this.event[eventName] = []
    }
    this.event[eventName].push(fn)
  },
  emit: function (eventName, data) {
    if (this.event[eventName]) {
      this.event[eventName].map(function (fn) {
        fn.call(undefined, data)
      })
    }
  }
};
Bus.on('event', function (data) {
  console.log(1, data)
});
Bus.on('hi', function (data) {
  console.log(2, data)
});
Bus.on('hi', function (data) {
  console.log(3, data + 1)
});
Bus.emit('event', {name: 'hello'});
Bus.emit('hi', {to: 'hunger'});
Bus.emit('hi', {to: 'valley'});
Bus.emit('go', {to: 'xxx'});

function listen(element, eventType, selector, fn) {
  element.addEventListener(eventType, (e) => {
    let el = e.target;
    while (!el.matches(selector)) {
      if (el === element) {
        el = null;
        break
      }
      el = el.parentNode
    }
    el && fn.call(el, e, el)
  })
}
let ul = document.querySelector(ul);
listen(ul, 'click', li, (e, el) => {
  console.log(e)
});
// ul > li * 5 > span;


// 1、自我介绍，挑一个简历上的项目介绍一下
// 2、你的实习负责什么工作？
// 3、你的轮子是怎么造的？（这里我挖坑了，说参考elementui和antdesign）
// 4、elementui和antdesign这两个框架某个组件的设计思想上有什么区别
// 5、看过elementui和antdesign的源码吗？
// 6、有几种获取数据的方式？（还有吗还有吗）如何实现？
// 7、了解异步吗？有哪些方面的应用（只说出了ajax，然后又挖坑了不知道为什么提了一句this.$nextTick）
// 8、有没有看过this.$nextTick的源码，能讲一下吗
// 9、了解事件流吗？说一下？
// 10、有几种动画的实现方式？（还有吗还有吗）详细讲一下。js怎么实现动画？
// 11、讲一下requestAnimationFrame的用法
// 12、说一下定位，还有他们的各个属性（忘记了子元素是absolute也会相对父元素是absolute的绝对定位）
// 13、说一下BFC？如何触发BFC？（一直问还有吗还有吗，我真的不知道了）
// 14、做过移动端吗？有哪些需要注意的地方？（还有吗还有吗）
// 15、有用过jQuery吗？原生熟悉吗？
// 16、如何学习的前端？都看了什么书？
// 17、有什么要问我的？


// 简单自我介绍, 介绍一下你的项目, 技术栈 ?
// react和vue的比较 ?
// React Diff 算法 ? 
// 观察者模式实现 ? 
// 移动端高清方案如何解决 ? 
// webpack的原理, loader 和 plugin 是干什么的? 有自己手写过么 ?
// 简述从网页输入url到网页展示的过程发生了哪些事情 ? 
// SSR 和 客户端渲染有什么区别 , vue是如何实现绑定事件的 ? 
// 简述公司node架构中容灾的实现 ? 
// 浏览器事件有哪些过程? 为什么一般在冒泡阶段, 而不是在捕获阶段注册监听? addEventListener 参数分别是什么 ? 
// 面向对象如何实现? 需要复用的变量 怎么处理 ? 
// 移动端300ms延时的原因? 如何处理?
// 主流框架的数据单向/双向绑定实现原理 ? 
// 简述转行经历, 如何学习 ? 
// 你觉得自己在前端工作的最大的优点是什么 拿实际工作的内容举例?
// 简述项目,React vue区别 virsualDOM实现

// 技术二面
// http code码?
// 移动端rem布局如何实现? 简述原理?
// 前端跨域方案
// js 有哪些数据类型 如何判断? null 和 undefined区别 应用场景?
// 最后问我为什么换工作

// 技术三面
// java转前端的优势你觉得有什么？
// DOM基础知识,添加元素,删除元素等等...
// DOM节点类型
// 正则表达式如何匹配一段url ?在正则表达式中有哪几种作用？
// 这一面基本上就是纯原生了
// 手写一个简单的object.defineproperty
// 最后聊了一下项目,聊了一下前公司


/*1. DNS解析,将域名解析为ip地址(搜索浏览器自己的DNS缓存...)
2. TCP三次握手
3. 发送http请求
4. 接收http响应
5. 浏览器解析渲染页面
6. TCP四次挥手
7.  重流和重绘*/


/*浏览器解析文档资源并渲染页面是个怎样的流程？
浏览器通过 HTMLParser 根据深度遍历的原则把 HTML 解析成 DOM Tree。
浏览器通过 CSSParser 将 CSS 解析成 CSS Rule Tree（CSSOM Tree）。
浏览器将 JavaScript 通过 DOM API 或者 CSSOM API 将 JS 代码解析并应用到布局中，按要求呈现响应的结果。
根据 DOM 树和 CSSOM 树来构造 render Tree。
layout：重排（也可以叫回流），当 render tree 中任一节点的几何尺寸发生改变，render tree 就会重新布局，重新来计算所有节点在屏幕的位置。
repaint：重绘，当 render tree 中任一元素样式属性（几何尺寸没改变）发生改变时，render tree 都会重新画，比如字体颜色，背景等变化。
paint：遍历 render tree，并调动硬件图形 API 来绘制每个节点。*/


/*5.Loader和Plugin的不同？
不同的作用
Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。
Plugin直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。
不同的用法
Loader在module.rules中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）
Plugin在plugins中单独配置。 类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入。*/



// vue.router中可以在router-view中添加key触发mounted中不能触发的单页面中的更新。
//https相对于http就是增加了SSL层的封装，由不加密变为加密。但因为涉及解码影响速率问题，只有重要信息用https。



// 你了解什么是技术债务吗
/*1.什么是技术债？
代码写好就提交，意味着欠债的开始。稍微欠点儿技术债的确可以加速开发速度，但前提是事后及时重写代码。如果只借不还，后果很危险。在不准确的代码上所花的每一分钟，都算是技术债的应付利息。不稳固、脆弱的代码实现所引发的债务负担，会使整个工程组织陷入裹足不前的艰难境地！

2.技术债的类型
不合适的设计，比如过度设计、业务发现大变化、抽象能力不足等
缺陷，不说了八阿哥...
手工测试过多
集成和版本管理不善
缺乏平台经验
...

3.技术债的后果
爆发点不可逾期，哪天来个p0，就可以回家了
交付时间延长
缺陷数量可观
开发和支持成本持续上升
产品萎缩
可预测性较低
表现越来越差
挫败感四处弥漫
客户满意度降低
...

4.技术债的起源
如期完工的压力，不说了，每周996都开发不完的任务
试图以错误的方式提高效率，
试图减少测试提高效率，比如单元测试、集成测试、系统测试、白盒测试、黑盒测试不足
债累债
人员技术水平不足
业务不熟悉，设计错误
...

5.技术债必须加以管理
让技术债在业务层面可见
让技术债在技术层面可见
统计技术债所偿还的利息，NO DATA NO BB
向团队成员普及技术债的危害
...

6.偿还技术债
并非所有的技术债都应该偿还，比如：行将就木的产品、一次性原型、短命产品
应用有债就还原则
分期偿还技术债
先偿还高息技术债
一边做有客户价值的工作，一边偿还技术债

7.手段
1.熟悉系统的业务
2.熟悉系统的代码
3.挖掘系统存在的技术债
4.找到技术债后，做汇总，做评估，做测试
5.向上级反馈技术债，争取资源去消灭技术债
6.上线新方案，统计新方案与旧方案的对比，使得个人的价值得到更多的认可
7.一边做日常工作，一边做技术债的工作，千万不能忘了日常的工作重心陷入天天抱怨系统的技术债中

8.解决的技术债越多，收获越多
在工作中，认识了很多风格迥异的同事，有热衷技术的技术宅，有打酱油的A员工，有热衷架构的大牛，从个人的实践来看，解决的技术债越多，个人的架构能力、抽象能力、发现问题的能力越强，自己也从技术债中受益良多...

来源：https://www.jianshu.com/p/e532a7e4f768
*/