function deepClone(source) {
  const targetObj = source.constructor === Array ? [] : {}; // 判断复制的目标是数组还是对象
  for (let keys in source) { // 遍历目标
    if (source.hasOwnProperty(keys)) {
      if (source[keys] && typeof source[keys] === 'object') { // 如果值是对象，就递归一下
        targetObj[keys] = source[keys].constructor === Array ? [] : {};
        targetObj[keys] = deepClone(source[keys]);
      } else { // 如果不是，就直接赋值
        targetObj[keys] = source[keys];
      }
    }
  }
  return targetObj;
}

/* 2.6.3 defineProterty和proxy的对比
1.defineProterty是es5的标准,proxy是es6的标准;
2.proxy可以监听到数组索引赋值,改变数组长度的变化;
3.proxy是监听对象,不用深层遍历,defineProterty是监听属性;
3.利用defineProterty实现双向数据绑定(vue2.x采用的核心)
4.利用proxy实现双向数据绑定(vue3.x会采用)
 */

/*   //传递两个参数，一个是object, 一个是proxy的handler
//如果是不是嵌套的object，直接加上proxy返回，如果是嵌套的object，那么进入addSubProxy进行递归。
function toDeepProxy(object, handler) {
   if (!isPureObject(object)) addSubProxy(object, handler);
   return new Proxy(object, handler);

//这是一个递归函数，目的是遍历object的所有属性，如果不是pure object,那么就继续遍历object的属性的属性，如果是pure object那么就加上proxy
   function addSubProxy(object, handler) {
       for (let prop in object) {
           if ( typeof object[prop] == 'object') {
               if (!isPureObject(object[prop])) addSubProxy(object[prop], handler);
               object[prop] = new Proxy(object[prop], handler);
           }
       }
       object = new Proxy(object, handler)
   }

//是不是一个pure object,意思就是object里面没有再嵌套object了
   function isPureObject(object) {
       if (typeof object!== 'object') {
           return false;
       } else {
           for (let prop in object) {
               if (typeof object[prop] == 'object') {
                   return false;
               }
           }
       }
       return true;
   }
}
let object = {
   name: {
       first: {
           four: 5,
           second: {
               third: 'ssss'
           }
       }
   },
   class: 5,
   arr: [1, 2, {arr1:10}],
   age: {
       age1: 10
   }
}
//这是一个嵌套了对象和数组的数组
let objectArr = [{name:{first:'ss'}, arr1:[1,2]}, 2, 3, 4, 5, 6]

//这是proxy的handler
let handler = {
   get(target, property) {
       console.log('get:' + property)
       return Reflect.get(target, property);
   },
   set(target, property, value) {
       console.log('set:' + property + '=' + value);
       return Reflect.set(target, property, value);
   }
}
//变成监听对象
object = toDeepProxy(object, handler);
objectArr = toDeepProxy(objectArr, handler);

//进行一系列操作
console.time('pro')
objectArr.length
objectArr[3];
objectArr[2]=10
objectArr[0].name.first = 'ss'
objectArr[0].arr1[0]
object.name.first.second.third = 'yyyyy'
object.class = 6;
object.name.first.four
object.arr[2].arr1
object.age.age1 = 20;
console.timeEnd('pro')
*/