/*
var a = {n:1}
var b= a
a.x = a = {n:2}
console.log(a.x);//undefined
console.log(b.x);//{n:2}
//.x优先级最高,创建a.x===undefined
//a={n:2}中,没有.x所以是undefined
//a.x=a时,.x={n:2},所以b指向的内存中有.x 就是{n:2}*/

/*
function fun(n,o) {
  console.log(o);
  return {
    fun:function (m) {
      return fun(m,n)
    }
  }
}

var fn =fun(0)  //undefined
fn.fun(1)//0,0,0
fn.fun(2)
fn.fun(3)

fn=fun(0).fun(1).fun(2).fun(3)
//undefined,0,1,2

fn=fun(0).fun(1)
fn.fun(2)
//1*/


function Foo(){
  getName = function (){console.log(1)}
  return this
}
Foo.getName=function () {
  console.log(2)
}
Foo.prototype.getName = function () {
  console.log(3)
}
var getName = function () {
  console.log(4)
}

function getName() {
  console.log(5);
}

Foo.getName()//2
getName()//4
Foo().getName()//1
getName()//1
new Foo.getName()//2
new Foo().getName()//3
new new Foo().getName()//3



let arr = [{a:1,age:11,ph:153},{b:2,age:20,ph:143},{c:3,age:12,ph:101}]
function sorts(data, key){
  let mapArr = arr.map((item)=>{return item[key]})
  let sortMap = mapArr.sort((a,b)=>{return a - b})
  let result = sortMap.map((item)=>{
    for(let i =0;i< arr.length;i++){
      if(arr[i][key]===item){
        return arr[i]
      }
    }
  })
  return result
}

sorts(arr,'age')
sorts(arr,'ph')

