
class Container {

    static of (value){
   
     return new Container(value)
   
    }
   
    constructor (value){
   
     this._value = value
   
    }
   
    map (fn){//map方法可以运行一个函数对值进行处理（变形关系）
   
     return Container.of(fn(this._value))
   
    }
   
   }
   

class MayBe {

    static of (value){
     return new MayBe(value)
    }
   
    constructor (value){
     this._value = value
    }
      
    map (fn){
   
     return this.isNothing()? this : MayBe.of(fn(this._value))
   
    }
   
    isNothing(){
   
     return this._value === null || this._value === undefined
   
    }
   
   }

const fp = require('lodash/fp')
const { map, first } = require('lodash')
let maybe = MayBe.of([5, 6, 1])
const trace = fp.curry((tag, v) => {

    console.log(tag,v)
  
    return v
  
  })
//练习1
let ex1 = (y, arr) => {
    return fp.map(x => fp.add(x, y))(arr)
}
let curryEx1Plus5 = fp.curry(ex1)(5)

console.log(maybe.map(curryEx1Plus5))

//练习2
let xs = Container.of(['do', 're','me', 'fa','sol', 'la', 'ti','do'])

let ex2 = (arr) => {
    return fp.first(arr)
}

console.log(xs.map(ex2))

//练习3

let safeProp = fp.curry(function (x, o){
    return MayBe.of(o[x])
})

let user = {
    id: 2,
    name: 'albert'
}


let ex3 = (arr) => {
    return safeProp('name')(arr).map(fp.first)
}
console.log(ex3(user))

//练习4

let ex4 = (n) => {
    return MayBe.of(n).map(parseInt)
}

console.log(ex4('6'))