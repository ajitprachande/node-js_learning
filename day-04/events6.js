const { eventNames } = require('node:cluster');
const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

// 12. removeListener

// function greet() {
//     console.log("Hello Ajit.");
// }

// eventEmitter.on("removeListener", (eventName) => {
//     console.log(`Listener removed from : ${eventName}`);    
// })
// eventEmitter.on("welcome",greet);

// eventEmitter.on("namaste",greet);

// eventEmitter.off("welcome",greet);
// eventEmitter.off("namaste",greet);

// Task:>
const server = new EventEmitter();

function requestHandler() {
    
}

server.on("removeListener", (eventName, listener) => {
    console.log("Removed Event: ",eventName);
    console.log("Function: ",listener.name);
})

server.on("request", requestHandler);

server.off("request", requestHandler);
