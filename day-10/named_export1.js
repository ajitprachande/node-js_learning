// User Defined Module (Custome module):

// const val = require('./math.js');
// console.log(val);

//Or Destructure value/name:
const { addFun, subFun, mulFun, divFun } = require('./math.js');


console.log(addFun(5, 5));
console.log(subFun(10, 5));
console.log(mulFun(10, 5));
console.log(divFun(10, 5));
