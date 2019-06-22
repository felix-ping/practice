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


/*1. webpack与grunt、gulp的不同？
三者都是前端构建工具，grunt和gulp在早期比较流行，现在webpack相对来说比较主流，不过一些轻量化的任务还是会用gulp来处理，比如单独打包CSS文件等。

grunt和gulp是基于任务和流（Task、Stream）的。类似jQuery，找到一个（或一类）文件，对其做一系列链式操作，更新流上的数据， 整条链式操作构成了一个任务，多个任务就构成了整个web的构建流程。

webpack是基于入口的。webpack会自动地递归解析入口所需要加载的所有资源文件，然后用不同的Loader来处理不同的文件，用Plugin来扩展webpack功能。

所以总结一下：

从构建思路来说
gulp和grunt需要开发者将整个前端构建过程拆分成多个`Task`，并合理控制所有`Task`的调用关系
webpack需要开发者找到入口，并需要清楚对于不同的资源应该使用什么Loader做何种解析和加工
对于知识背景来说
gulp更像后端开发者的思路，需要对于整个流程了如指掌 webpack更倾向于前端开发者的思路
2. 与webpack类似的工具还有哪些？谈谈你为什么最终选择（或放弃）使用webpack？
同样是基于入口的打包工具还有以下几个主流的：

webpack
rollup
parcel
从应用场景上来看：

webpack适用于大型复杂的前端站点构建
rollup适用于基础库的打包，如vue、react
parcel适用于简单的实验性项目，他可以满足低门槛的快速看到效果
由于parcel在打包过程中给出的调试信息十分有限，所以一旦打包出错难以调试，所以不建议复杂的项目使用parcel
3.有哪些常见的Loader？他们是解决什么问题的？
file-loader：把文件输出到一个文件夹中，在代码中通过相对 URL 去引用输出的文件
url-loader：和 file-loader 类似，但是能在文件很小的情况下以 base64 的方式把文件内容注入到代码中去
source-map-loader：加载额外的 Source Map 文件，以方便断点调试
image-loader：加载并且压缩图片文件
babel-loader：把 ES6 转换成 ES5
css-loader：加载 CSS，支持模块化、压缩、文件导入等特性
style-loader：把 CSS 代码注入到 JavaScript 中，通过 DOM 操作去加载 CSS。
eslint-loader：通过 ESLint 检查 JavaScript 代码
4.有哪些常见的Plugin？他们是解决什么问题的？
define-plugin：定义环境变量
commons-chunk-plugin：提取公共代码
uglifyjs-webpack-plugin：通过UglifyES压缩ES6代码
5.Loader和Plugin的不同？
不同的作用

Loader直译为"加载器"。Webpack将一切文件视为模块，但是webpack原生是只能解析js文件，如果想将其他文件也打包的话，就会用到loader。 所以Loader的作用是让webpack拥有了加载和解析非JavaScript文件的能力。
Plugin直译为"插件"。Plugin可以扩展webpack的功能，让webpack具有更多的灵活性。 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过 Webpack 提供的 API 改变输出结果。
不同的用法

Loader在module.rules中配置，也就是说他作为模块的解析规则而存在。 类型为数组，每一项都是一个Object，里面描述了对于什么类型的文件（test），使用什么加载(loader)和使用的参数（options）
Plugin在plugins中单独配置。 类型为数组，每一项是一个plugin的实例，参数都通过构造函数传入。
6.webpack的构建流程是什么?从读取配置到输出文件这个过程尽量说全
Webpack 的运行流程是一个串行的过程，从启动到结束会依次执行以下流程：

初始化参数：从配置文件和 Shell 语句中读取与合并参数，得出最终的参数；
开始编译：用上一步得到的参数初始化 Compiler 对象，加载所有配置的插件，执行对象的 run 方法开始执行编译；
确定入口：根据配置中的 entry 找出所有的入口文件；
编译模块：从入口文件出发，调用所有配置的 Loader 对模块进行翻译，再找出该模块依赖的模块，再递归本步骤直到所有入口依赖的文件都经过了本步骤的处理；
完成模块编译：在经过第4步使用 Loader 翻译完所有模块后，得到了每个模块被翻译后的最终内容以及它们之间的依赖关系；
输出资源：根据入口和模块之间的依赖关系，组装成一个个包含多个模块的 Chunk，再把每个 Chunk 转换成一个单独的文件加入到输出列表，这步是可以修改输出内容的最后机会；
输出完成：在确定好输出内容后，根据配置确定输出的路径和文件名，把文件内容写入到文件系统。
在以上过程中，Webpack 会在特定的时间点广播出特定的事件，插件在监听到感兴趣的事件后会执行特定的逻辑，并且插件可以调用 Webpack 提供的 API 改变 Webpack 的运行结果。
*/


//正则表达式知识点总结
/* [abc]匹配abc中的任一个
 * \b匹配单词边界
 * |分支，|两边分别匹配不同的条件
 * 量词 +*?{}后面跟？时表示懒惰模式，默认是贪婪模式。
 *(?=assert)匹配断言，获取断言前的部分
 * (?<=assert)匹配断言，获取断言后的部分
  * (?!assert)(?<!assert)
  *(?:)不分组
  * (?<name>exp) 定义name组 \k<name>
  *[^x]反向匹配
  * string.match(reg) reg.exec(string)
  * */

//Vue-router 跳转和 location.href 有什么区别？
/*无论是 HTML5 history 模式还是 hash 模式，它的表现行为一致，所以，当你要切换路由模式，或者在 IE9 降级使用 hash 模式，无须作任何变动。

在 HTML5 history 模式下，router-link 会守卫点击事件，让浏览器不再重新加载页面。

当你在 HTML5 history 模式下使用 base 选项之后，所有的 to 属性都不需要写 (基路径) 了。*/

//表单隐藏域type=hidden的作用
/*1.隐藏域的作用是帮助表单收集和发送信息，便于后端处理数据。
2.用户点击提交数据的时候，隐藏域的信息也被一起发送到了后端。后端接收前端传来的数据，需要确认前端的身份，是本公司的网页传来的数据，而不是其他黑客知道后端地址后传来的假数据。那么就加一个隐藏域，验证value里的值和数据库里name的值是不是对应的。
3.有时候一个表单里有多个提交按钮，后端不知道用户是点击哪个按钮提交过来的呢？这时候我们只要加隐藏域，对每一个按钮起个名字(value值)，后端接收到数据后，检查value值，就能知道是哪个按钮提交的了。
4.有时候一个网页中有多个form，我们知道多个form是不能同时提交的，但有时这些form确实相互作用，我们就可以在form中添加隐藏域来使它们联系起来。
5.JavaScript不支持全局变量，但有时我们必须用全局变量，我们就可以把值先存在隐藏域里，它的值就不会丢失了。
6.  还有个例子，比如按一个按钮弹出四个小窗口，当点击其中的一个小窗口时其他三个自动关闭．可是IE不支持小窗口相互调用，所以只有在父窗口写个隐藏域，当小窗口看到那个隐藏域的值是close时就自己关掉。
*/


//深度克隆对象的方法有哪些

/*function deepCopy(target){
let copyed_objs = [];//此数组解决了循环引用和相同引用的问题，它存放已经递归到的目标对象
    function _deepCopy(target){
        if((typeof target !== 'object')||!target){return target;}
        for(let i= 0 ;i<copyed_objs.length;i++){
            if(copyed_objs[i].target === target){
                return copyed_objs[i].copyTarget;
            }
        }
        let obj = {};
        if(Array.isArray(target)){
            obj = [];//处理target是数组的情况
        }
        copyed_objs.push({target:target,copyTarget:obj})
        Object.keys(target).forEach(key=>{
            if(obj[key]){ return;}
            obj[key] = _deepCopy(target[key]);
        });
        return obj;
    }
    return _deepCopy(target);
}
var a = {
    arr:[1,2,3,{key:'123'}],//数组测试
};
a.self = a;//循环引用测试
a.common1 = {name:'ccc'};
a.common2 = a.common1;//相同引用测试
var c = deepCopy(a);
c.common1.name = 'changed';
console.log(c);

*/


//console.log(1+'2') 和 console.log(1-'2') 的打印结果？
//结果分别是12和-1 涉及的知识点是隐性类型转换

// var a = 1;
//     var b = 3;
//     console.log( a+++b );
//4
// 其实是 a++ + b 所以是4


/*function Foo() {
    getName = function () { alert (1); };
    return this;
}
    Foo.getName = function () { alert (2);};
    Foo.prototype.getName = function () { alert (3);};
    var getName = function () { alert (4);};
    function getName() { alert (5);}
    //请写出以下输出结果：
    Foo.getName(); //2
    getName(); // 4
    Foo().getName(); // 1
    getName(); // 1
    new Foo.getName(); //2 相当于 new (Foo.getName)();
    new Foo().getName(); // 3 相当于 (new Foo()).getName()
    new new Foo().getName(); // 3 相当于 new ((new Foo()).getName)()
*/

/*
求斐波那契数列（兔子数列） 1,1,2,3,5,8,13,21,34,55,89...中的第 n 项
let n = 1
function fn(n) {
  if(n < 3){
    return 1
  }
  return fn(n-1) + fn(n-2)
}

fn(20)//6765
*/


//取出网址中的查询参数
/*
let netUrl = 'https://www.google.com/search?newwindow=1&safe=strict&source=hp&ei=wtKPW_PSFoOnoATYl7_YAQ&btnG=Google+%E6%90%9C%E7%B4%A2&q=%E6%98%AF%232%24%E5%9C%B0%E6%96%B9%25gs%5Ejlkj%26sdf*jlkjl()fsaldjf&oq=%E6%97%A5%E6%9C%AC&gs_l=psy-ab.3..0l10.1605.3039.0.3219.4.3.0.0.0.0.144.261.0j2.3.0....0...1c.1j4.64.psy-ab..1.3.399.10..35i39k1.139.VMt82ZO3Oe4'
let reg = /(?<=[?&])(\w+=[^?&]+)/g
let result = netUrl.match(reg)
console.log(result);

let regSliceBefore = /=/g
let xxx = {}
for ( let item of result) {
  let key = item.slice(0, item.search(regSliceBefore))
  let value = decodeURI(item.slice(item.search(regSliceBefore)+1))
  xxx[key] = value
}

console.log(xxx);*/
