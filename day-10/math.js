
// 1. Named Export:
// exports.addFun = function Add(a, b) {
//     return a + b;
// }

// exports.subFun = function Sub(a, b) {
//     return a - b;
// }

// exports.mulFun = function Mul(a, b) {
//     return a * b;
// }

// exports.divFun = function Div(a, b) {
//     return a / b;
// }
//===========================================
//2. Default export:

function Add(a, b, c) {
    return a + b + c;
}

function Sub(a, b) {
    return a - b;
}

module.exports = {
    Add, Sub
}

// console.log(module.exports)
//OR => direct to functoin

// module.exports =  function MyModule() {
//     return "I am Default module."

// }