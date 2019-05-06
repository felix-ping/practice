let qucik = (arr) => {
  if (arr.length < 2) { return arr }//
  let basic = arr[0], left = [], right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > basic) {
      right.push(arr[i])
    }
    if (arr[i] <= basic) {
      left.push(arr[i])
    }
  }
  return qucik(left).concat(basic, qucik(right))//
}
console.log(qucik([5, 3, 4, 5, 7, 5, 2, 1, 8, 5, 3, 1223, 1, 0]))


let bubble = (arr) => {
  let swap
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length - i; j++) {//
      if (arr[j] > arr[j + 1]) {
        swap = arr[j]
        arr[j] = arr[j + 1]
        arr[j + 1] = swap
      }
    }
  }
  return arr
}
const array = [3, 1, 2, 4, 5, 9, 7, 4, 2, 8, 1, 6, 0]
console.log(bubble(array))


let selectSort = (arr) => {
  let swap, min
  for (let i = 0; i < arr.length; i++) {
    min = i
    for (let j = i + 1; j < arr.length; j++) {//
      if (arr[min] > arr[j]) {
        min = j
      }
    }
    swap = arr[i]
    arr[i] = arr[min]
    arr[min] = swap
  }
  return arr
}
const array = [3, 1, 2, 4, 5, 9, 7, 4, 2, 8, 1, 6, 0]
console.log(selectSort(array))

let insertionSort = (arr) => {
  let preIndex, current
  for (let i = 1; i < arr.length; i++) {
    preIndex = i - 1
    current = arr[i]
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]//
      preIndex--
    }
    arr[preIndex + 1] = current
  }
  return arr
}
const array = [3, 1, 2, 4, 5, 9, 7, 4, 2, 8, 1, 6, 0]
console.log(insertionSort(array))

let counter = (arr) => {
  let count = []
  for (let i = 0; i < arr.length; i++) {
    let value = arr[i]
    if (count[value] >= 1) {
      count[value]++
    } else {
      count[value] = 1
    }
  }
  let newArr = []
  for (let j = 0; j < count.length; j++) {
    if (count[j]) {
      while (count[j] > 0) {
        newArr.push(j)
        count[j]--
      }
    }
  }
  return newArr
}
const array = [3, 1, 2, 4, 5, 9, 7, 4, 2, 8, 1, 6, 0]
console.log(counter(array))


Array.prototype.binary = function (star, end, value) {
  if (star > end) return -1;//
  let mid = Math.floor((star + end) / 2)
  if (this[mid] > value) {
    return this.binary(star, mid , value)//
  }
  if (this[mid] < value) {//
    return this.binary(mid , end, value)//
  }
  return mid//
}
console.log([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].binary(0, 10, 1))




Array.prototype.mergeSort=function(){
  if(this.length<2){return this}
  let mid = this.length/2
  function merge(left,right){
    let final=[]
    while(left.length && right.length){
      final.push(left[0] <= right[0] ? left.shift() : right.shift())
    }
    return final.concat(left.concat(right))//
  }
  return merge(this.slice(0,parseInt(mid)).mergeSort(),this.slice(parseInt(mid)).mergeSort())//
  
}
console.log([1, 2, 1, 4, 5, 6, 3, 4, 7, 8, 9, 4, 3, 2, 0].mergeSort())



const Bus = {
    event: {},
    on: function (eventName, fn) {
      if (this.event[eventName] === undefined) {
        this.event[eventName] = []
      }
      this.event[eventName].push(fn)
    },
    emit: function (eventName, data) {
      if(this.event[eventName]){
        this.event[eventName].map(function (fn) {
          fn.call(undefined,data)
        })
      }
    }
  }
  Bus.on('event', function (data) {
    console.log(1, data)
  })
  Bus.on('hi', function (data) {
    console.log(2, data)
  })
  Bus.on('hi', function (data) {
    console.log(3, data + 1)
  })
  Bus.emit('event', { name: 'hello' })
  Bus.emit('hi', { to: 'hunger' })
  Bus.emit('hi', { to: 'valley' })
  Bus.emit('go', { to: 'xxx' })

  function listen(element, eventType, selector, fn) {
    element.addEventListener(eventType, (e) => {
        let el = e.target
        while (!el.matches(selector)) {
            if (el === element) {
                el = null
                break
            }
            el = el.parentNode
        }
        el && fn.call(el, e, el)
    })
}
listen(ul, 'click', li, (e, el) => {
    console.log(e)
})
ul > li * 5 > span



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



// 1. DNS解析,将域名解析为ip地址(搜索浏览器自己的DNS缓存...)
// 2. TCP三次握手
// 3. 发送http请求
// 4. 接收http响应
// 5. 浏览器解析渲染页面
// 6. TCP四次挥手
// 7.  重流和重绘