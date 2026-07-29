const add = require('./Addition.js');

console.log(add.addFun(5,5));
console.log(add.addNum(5, 5, 5));

// console.log(secret_msg);   
  //ReferenceError: secret_msg is not defined  Why? Because secret_msg is inside the wrapper function of Addition.js.


