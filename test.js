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
