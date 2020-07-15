{
  Function.prototype.newCall = function (context, ...parameter) {
    if (typeof context === 'object' || typeof context === 'function') {
      context = context || window
    } else {
      context = Object.create(null)
    }
    let fn = Symbol()
    context[fn] = this
    const res = context[fn](...parameter)
    delete context.fn;
    return res
  }
  let person = {
    name: 'Abiel',
    x:1,y:2
  }
  function sayHi(age, sex) {
    console.log(this.name, age, sex);
  }
  sayHi.newCall(person, 25, '男'); // Abiel 25 男



  Function.prototype.newApply = function (context, parameter) {
    if (typeof context === 'object' || typeof context === 'function') {
      context = context || window
    } else {
      context = Object.create(null)
    }
    let fn = Symbol()
    context[fn] = this
    const res = context[fn](...parameter);
    delete context[fn]
    return res
  }
  let person1 = {
    name: "Abiel"
  };
  function sayHi(age, sex) {
    console.log(this.name, age, sex);
  }
  sayHi.newApply(person1, [25, '男']) //Abiel 25 男


  Function.prototype.bind = function (context,...innerArgs) {
    var that = this
    return function (...finnalyArgs) {
      return that.call(context,...innerArgs,...finnalyArgs)
    }
  }
  let person2 = {
    name: 'Abiel'
  }
  function sayHi(age,sex) {
    console.log(this.name, age, sex);
  }
  let personSayHi = sayHi.bind(person2, 25)
  personSayHi('男')
}  