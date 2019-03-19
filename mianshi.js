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