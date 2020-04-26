//flattenDeep([1,[2,[3,[4]],5]])  // [1,2,3,4,5]  嵌套数组扁平化
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
console.log(`flattenDeep -> newArr`, newArr)