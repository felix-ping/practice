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