//2. Default export:  

// const val = require('./math')
const {Add, Sub} = require('./math')

console.log(Add(5, 5, 5));
console.log(Sub(5, 2));

// console.log(val());