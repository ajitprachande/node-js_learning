const EventEmitter = require('node:events')

const eventEmitter = new EventEmitter()

//7. listeners() 
function Greet(name) {
    console.log(`Hello ${name}`);
}

eventEmitter.on("welcome",Greet);
eventEmitter.on("welcome",Greet);

eventEmitter.emit('welcome', "ajit");

console.log(eventEmitter.listeners("welcome"));