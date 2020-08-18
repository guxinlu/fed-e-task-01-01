new Promise(function(resolve, reject){
    var a = 'hello '
    resolve(a)
}).then(v => {
    var b = 'lagou '
    return v + b
}).then(v => {
    var c = 'I love U'
    console.log(v + c)
})