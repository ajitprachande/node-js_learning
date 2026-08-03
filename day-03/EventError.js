const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

eventEmitter.on("error", (err) => {
    console.error(`Error occurred :  ${err}`);
})

eventEmitter.emit("error", new Error("something went Wrongg.") );   