// adding the events module     //This module contains the EventEmitter class.
const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();
//          event name,   listener 
eventEmitter.on('home', (name) => {
    console.log("Welcome to Home page ",name);
})

eventEmitter.on('home', (name) => {
    console.log(`Welcome ${name} to your personal dashboard.`);  
})

eventEmitter.once('notify', () => {
    console.log("this event will execute only once.");
})

// // Emit the event
// eventEmitter.emit("home","ajit");
// eventEmitter.emit("home","ajit");

console.log(eventEmitter.listeners('home'));
eventEmitter.emit("home","ajit");

// eventEmitter.emit("notify");    
// eventEmitter.emit("notify");


const myListener = () => console.log('My own Listener running...');
eventEmitter.on('test',myListener);
eventEmitter.emit('test');
eventEmitter.emit('test');


eventEmitter.removeListener('test', myListener);
eventEmitter.emit('test');
