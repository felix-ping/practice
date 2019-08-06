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


/*
二分查找
function Find(target, array) {
    let i = 0;
    let j = array[i].length - 1;
    while (i < array.length && j >= 0) {
        if (array[i][j] < target) {
            i++;
        } else if (array[i][j] > target) {
            j--;
        } else {
            return true;
        }
    }
    return false;
}

//测试用例
console.log(Find(10, [
    [1, 2, 3, 4],
    [5, 9, 10, 11],
    [13, 20, 21, 23]
    ])
);*/



/*const numbers = [1, 2, 3];
numbers[10] = 11;
console.log(numbers);
//[1, 2, 3, 7 x empty, 11]
*/



/*const a = {};
const b = { key: "b" };
const c = { key: "c" };

a[b] = 123;
a[c] = 456;

console.log(a[b]);
//456
a中b,c均为[Object,object]

*/


/*
let a = 3;
let b = new Number(3);
a是数字,是基本类型
b虽然是数字,却有__proto__

*/


/*
function getAge(...args) {
  console.log(typeof args);
}
getAge(21);
//"object"
*/

// const sum = eval("10*10+5");  //105 eval会为字符串传递的代码求值。
//const obj = { 1: "a", 2: "b", 3: "c" }; obj.hasOwnProperty("1"); //true 所有对象键（不包括Symbols）都会被存储为字符串



/*3. for of , for in 和 forEach,map 的区别。

for...of循环：具有 iterator 接口，就可以用for...of循环遍历它的成员(属性值)。for...of循环可以使用的范围包括数组、Set 和 Map 结构、某些类似数组的对象、Generator 对象，以及字符串。for...of循环调用遍历器接口，数组的遍历器接口只返回具有数字索引的属性。对于普通的对象，for...of结构不能直接使用，会报错，必须部署了 Iterator 接口后才能使用。可以中断循环。
for...in循环：遍历对象自身的和继承的可枚举的属性, 不能直接获取属性值。可以中断循环。
forEach: 只能遍历数组，不能中断，没有返回值(或认为返回值是undefined)。
map: 只能遍历数组，不能中断，返回值是修改后的数组。

PS: Object.keys()：返回给定对象所有可枚举属性的字符串数组。
*/


/*思考: [] == ![]

首先，我们需要知道 ! 优先级是高于 == (更多运算符优先级可查看: 运算符优先级)
![] 引用类型转换成布尔值都是true,因此![]的是false
根据上面的比较步骤中的第五条，其中一方是 boolean，将 boolean 转为 number 再进行判断，false转换成 number，对应的值是 0.
根据上面比较步骤中的第六条，有一方是 number，那么将object也转换成Number,空数组转换成数字，对应的值是0.(空数组转换成数字，对应的值是0，如果数组中只有一个数字，那么转成number就是这个数字，其它情况，均为NaN)
0 == 0; 为true

*/

/*跨域的方法有哪些？原理是什么？
*jsonp
* cors
* postMessage
* websocket
* node 中间件
*
*
* */


/*16.实现双向绑定 Proxy 与 Object.defineProperty 相比优劣如何?


Object.definedProperty 的作用是劫持一个对象的属性，劫持属性的getter和setter方法，在对象的属性发生变化时进行特定的操作。而 Proxy 劫持的是整个对象。


Proxy 会返回一个代理对象，我们只需要操作新对象即可，而 Object.defineProperty  只能遍历对象属性直接修改。


Object.definedProperty 不支持数组，更准确的说是不支持数组的各种API，因为如果仅仅考虑arry[i] = value 这种情况，是可以劫持的，但是这种劫持意义不大。而 Proxy 可以支持数组的各种API。


尽管 Object.defineProperty 有诸多缺陷，但是其兼容性要好于 Proxy.


PS: Vue2.x 使用 Object.defineProperty 实现数据双向绑定，V3.0 则使用了 Proxy.
*/


/*
* es6
*function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    return [...new Set(arr)]
}


function unique(arr) {
    if (!Array.isArray(arr)) {
        console.log('type error!')
        return
    }
    return Array.from(new Set(arr))
}

*
* */


/*已知如下数组：
var arr = [ [1, 2, 2], [3, 4, 5, 5], [6, 7, 8, 9, [11, 12, [12, 13, [14] ] ] ], 10];
编写一个程序将数组扁平化去并除其中重复部分数据，最终得到一个升序且不重复的数组


//Array.from(new Set(arr.flat(Infinity))).sort((a,b)=>{ return a-b})

*/


/*请解释下什么是cookie隔离？为什么要隔离？如何隔离？
*
*
*如果静态文件放在后台（前后端不分离时候），那静态文件请求的时候都带有的cookie的数据提交给server的，非常浪费流量，

cookie有域的限制，因此不能跨域提交请求，故使用非主要域名的时候，请求头中就不会带有cookie数据，
这样可以降低请求头的大小，降低请求时间，从而达到降低整体请求延时的目的。

同时这种方式不会将cookie传入Web Server，也减少了Web Server对cookie的处理分析环节，
提高了webserver的http请求的解析速度。
*
*
*
* 一般来说就是几种种情况
第一前端需要的,
第二后端需要的
第三其它第三方需要的
第四: 静态资源什么都不需要的
做域名拆分
* */


/*
思考：
1. 要选出10亿个数字里的top10，那么理论上每个数字都要过一下，所以10亿次比较是下限
2. 把10亿个数字存到内存，可能需要3G以上的空间，如何降低？理论上最少需要 10个数字的空间就能装满 top 10 ，所以空间下限是 10个数字的空间
3. 一开始读入10个数字，然后逐个读取余下数字，发现新数字比这10个中任何一个大，就留下新数字，剔除小数字（这里至多比较10次）
所以很快你会找到一个最笨的解法，需要10个数字的空间，比较大约 100亿次


解决办法:优先队列
*/


/*Vue2中注册在router-link上事件无效解决方法
*
*如果当前router-link的tag不是a的话（官方文档中说明：默认为a，可以通过tag改变渲染后的标签），那么就会往自己的子元素（组件）找，找到的第一个就会把一些属性及时间覆盖过去
*
*<router-link  @click.native="change"><span>{{item.text}}</span></router-link>
* 只需要在@click后面加上native就可以了
*
* */


/*MVVM全称是Model-View-ViewModel
Vue是以数据为驱动的，Vue自身将DOM和数据进行绑定，一旦创建绑定，DOM和数据将保持同步，每当数据发生变化，DOM会跟着变化。  ViewModel是Vue的核心，它是Vue的一个实例。Vue实例时作用域某个HTML元素上的这个HTML元素可以是body，也可以是某个id所指代的元素。
DOMListeners和DataBindings是实现双向绑定的关键。DOMListeners监听页面所有View层DOM元素的变化，当发生变化，Model层的数据随之变化；DataBindings监听Model层的数据，当数据发生变化，View层的DOM元素随之变化。
Model(模型):数据层，负责存储数据。
View(控制器):就是ViewController层，他的任务就是从ViewModel层获取数据，然后显示。
ViewModel(视图模型):就是View和Model层的粘合剂，封装业务逻辑处理，封装网络处理，封装数据缓存。就是把原来ViewController层的业务逻辑和页面逻辑等剥离出来放到ViewModel层。*/



/*
async1();
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
    await x()
    console.log('x end')
}
function x (){
  console.log('async0')
}
async function async2() {
    console.log('async2');
   setTimeout(function() {
    console.log('async2xx');
}, 0)
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)


new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
}).then(function() {
    console.log('promise3');
});
console.log('script end');

// script start
// async1 start
// async2
// promise1
// script end
// async1 end
// promise2
// undefined
// setTimeout
* */




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


/*async function timeout(ms) {
  console.log(1)
  await new Promise((resolve) => {
    console.log(2)
    setTimeout(function(){
      console.log(6)
      resolve()
    }, ms);
    console.log(3)
  });
  console.log(4)
}

async function asyncPrint(value, ms) {
  console.log(5)
  await timeout(ms);
  console.log(value);
}

asyncPrint('hello world', 2000);*/

/*async function dbFuc(db) {
  let docs = [{}, {}, {}];
  let promises = docs.map((doc) => db.post(doc));

  let results = await Promise.all(promises);
  console.log(results);
}*/


/*Set
1.成员不能重复
2.只有健值，没有健名，有点类似数组。
3. 可以遍历，方法有add, delete,has
weakSet

    成员都是对象
    成员都是弱引用，随时可以消失。 可以用来保存DOM节点，不容易造成内存泄漏
    不能遍历，方法有add, delete,has
    Map
    本质上是健值对的集合，类似集合
    可以遍历，方法很多，可以干跟各种数据格式转换
    weakMap
    1.直接受对象作为健名（null除外），不接受其他类型的值作为健名
    健名所指向的对象，不计入垃圾回收机制
    不能遍历，方法同get,set,has,delete
*/

/*
*
    Set
        成员唯一、无序且不重复
        [value, value]，键值与键名是一致的（或者说只有键值，没有键名）
        可以遍历，方法有：add、delete、has
    WeakSet
        成员都是对象
        成员都是弱引用，可以被垃圾回收机制回收，可以用来保存DOM节点，不容易造成内存泄漏
        不能遍历，方法有add、delete、has
    Map
        本质上是键值对的集合，类似集合
        可以遍历，方法很多可以跟各种数据格式转换
    WeakMap
        只接受对象作为键名（null除外），不接受其他类型的值作为键名
        键名是弱引用，键值可以是任意的，键名所指向的对象可以被垃圾回收，此时键名是无效的
        不能遍历，方法有get、set、has、delete
*/


/*
*key的作用是什么
* 1. 更准确
因为带key就不是就地复用了，在sameNode函数 a.key === b.key对比中可以避免就地复用的情况。所以会更加准确。

2. 更快
利用key的唯一性生成map对象来获取对应节点，比遍历方式更快。(这个观点，就是我最初的那个观点。从这个角度看，map会比遍历更快。)
* */


/*setTimeout(function() {
    console.log('setTimeout3');
}, 0)
async1();
async function async1() {
    console.log('async1 start');
    await async2();
    console.log('async1 end');
    await x()
    console.log('x end')
}
function x (){
  console.log('async0')
}
async function async2() {
    console.log('async2');
   setTimeout(function() {
    console.log('async2xx');
}, 0)
}
console.log('script start');
setTimeout(function() {
    console.log('setTimeout');
}, 0)


new Promise(function(resolve) {
    console.log('promise1');
    resolve();
}).then(function() {
    console.log('promise2');
}).then(function() {
    console.log('promise3');
});
console.log('script end');*/