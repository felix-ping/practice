function flatten(arr) {
  while (arr.some(item => Array.isArray(item))) {
    arr = [].concat(...arr);
  }
  return arr;
}
flatten([1, [2, 3]]) //[1,2,3]
flatten([1, [2, 3, [4, 5]]]); //[1,2,3,4,5]
Array.from(new Set([1, 2, 3, 3, 4, 4])) //[1,2,3,4]
  ;[...new Set([1, 2, 3, 3, 4, 4])] //[1,2,3,4]
//类数组转化

Array.prototype.slice.call(arguments) //arguments是类数组(伪数组)
Array.prototype.slice.apply(arguments)
Array.from(arguments)
  ;[...arguments]
Array.prototype.slice = function (start, end) {
  var result = new Array();
  start = start || 0;
  end = end || this.length; //this指向调用的对象，当用了call后，能够改变this的指向，也就是指向传进来的对象，这是关键  
  for (var i = start; i < end; i++) {
    result.push(this[i]);
  }
  return result;
} 
