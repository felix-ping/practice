/*
var a = {n:1}
var b= a
a.x = a = {n:2}
console.log(a.x);//undefined
console.log(b.x);//{n:2}
//.x优先级最高,创建a.x===undefined
//a={n:2}中,没有.x所以是undefined
//a.x=a时,.x={n:2},所以b指向的内存中有.x 就是{n:2}*/
