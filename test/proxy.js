const arr = [1, 2, {
  name: 'felix',
  age: 18,
  value: 999999,
  lang: 'chinese'
}, null, false, 'xxx']

let proxy = new Proxy(arr, {
  get: function (target, name) {
    console.log(`get`, target, name)
    return Reflect.get(target, name)
  },
  set: function (target, name, value, receiver) {
    console.log(`set`, target, name, value, receiver)

    return Reflect.set(target, name, value, receiver)
  },
  has(target, name) {
    console.log(`has`, target, name)
    return Reflect.has(target, name)
  },
  deleteProperty(target, name) {
    console.log('delete' + name);
    return Reflect.deleteProperty(target, name);
  },
})
let string = JSON.stringify(proxy)
console.log(`string`, string)

console.log(`proxy`, proxy)



const dom = new Proxy({}, {
  get(target, property) {
  console.log(`get -> target, property`, target, property)
    return function(attrs = {}, ...children) {
      console.log(`get -> children`, attrs,children)
      const el = document.createElement(property);
      for (let prop of Object.keys(attrs)) {
        el.setAttribute(prop, attrs[prop]);
      }
      for (let child of children) {
        if (typeof child === 'string') {
          child = document.createTextNode(child);
        }
        el.appendChild(child);
      }
      return el;
    }
  
  }
});

const el = dom.div({},
  'Hello, my name is ',
  dom.a({href: '//example.com'}, 'Mark'),
  '. I like:',
  dom.ul({},
    dom.li({}, 'The web'),
    dom.li({}, 'Food'),
    dom.li({}, '…actually that\'s it')
  )
);

document.body.appendChild(el);




// const queuedObservers = new Set();
// const observe = fn => queuedObservers.add(fn);
// const observable = obj => new Proxy(obj, {set});
// function set(target, key, value, receiver) {
//   const result = Reflect.set(target, key, value, receiver);
//   queuedObservers.forEach(observer => observer());
//   return result;
// }
// const person = observable({
//   name: '张三',
//   age: 20
// });

// function print() {
//   console.log(`${person.name}, ${person.age}`)
// }

// observe(print);
// person.name = '李四';

const queuedObservers = []
const watcher = obj=> new Proxy(obj,{
  set(target,key, value, receiver){
    let result = Reflect.set(target, key, value, receiver)
    queuedObservers.forEach(fn=> fn())
    return result
  }
})
function observe(...fn){
  queuedObservers.push(...fn)
  console.log(`observe -> queuedObservers`, queuedObservers)
  
}
function print(){
  console.log(`${person.name}, ${person.age}`)
}
function alert1(){
  alert(JSON.stringify(person))
}


observe(print,alert1)
let person = watcher({name:'yi',age:3})
person.name
person.age=300