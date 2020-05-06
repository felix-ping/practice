/* //flattenDeep([1,[2,[3,[4]],5]])  // [1,2,3,4,5]  嵌套数组扁平化
//方案一
let newArr = []
let flattenDeep = (arr) => {
  for (let value of arr) {
    if (typeof value === 'object') {
      flattenDeep(value)
    } else {
      newArr.push(value)
    }
  }
}
flattenDeep([1, [2, [3, [4]], 5,6,[7,[8]]]])
console.log(`flattenDeep -> newArr`, newArr) */



// var yi = new Date('2020-04-30'), deng = new Date(2020, 04, 30)
// ;[yi.getDay() === deng.getDay(),yi.getMonth()  === deng.getMonth()]
//false,false  getMonth从0开始，导致星期也不同，date相同都是30 .



/* for( let i =0;
  setTimeout(()=>console.log('b->',i)),
  i<3;
  setTimeout(()=>console.log('c->',i)),
  ++i){
    console.log('i',i)
    i=i+0.3
    console.log('i++',i)
} */


//在不使用%模运算符的情况下检查一个数字是否是偶数/
function ifEven(num){
  if(num&1){
    return false
  }else{
    return true
  }
}

function isEven2(num){ 
  if(num < 0 || num ===1){
    return false
  }
  if(num === 0){
    return true
  }
  return isEven2(num - 2)
}

