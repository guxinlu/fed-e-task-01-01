const fp = require('lodash/fp')
const { toLower } = require('lodash')
const car = [
    {name: 'Ferrari FF', horsepower:600, dollar_value:700000, in_stock:true},
    {name: 'Spyker C12 Zagato', horsepower:600, dollar_value:648000, in_stock:true},
    {name: 'Jaguar XKR-S', horsepower:550, dollar_value:132000, in_stock:false},
    {name: 'Audi R8', horsepower:525, dollar_value:114200, in_stock:false},
    {name: 'Aston Martin One-77', horsepower:750, dollar_value:1850000, in_stock:true},
    {name: 'Pagani Huayra', horsepower:700, dollar_value:1300000, in_stock:false}
]
const r1 = fp.flowRight(fp.prop('in_stock'), fp.last)//练习1
console.log(r1(car))

const r2 = fp.flowRight(fp.prop('name'), fp.first)//练习2
console.log(r2(car))

let _average = function(xs){//练习3
    return fp.reduce(fp.add, 0 , xs)/xs.length
}
const averageDollarValue = fp.flowRight(_average, fp.map(arr => arr.dollar_value))
console.log(averageDollarValue(car))

let _underscore = fp.replace(/\W+/g, '_')//练习4
const sanitizeNames = fp.flowRight(fp.map(_underscore),fp.map(fp.toLower), fp.map(v => v.name))

console.log(sanitizeNames(car))
