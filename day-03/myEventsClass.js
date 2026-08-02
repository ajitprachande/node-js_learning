const EventEmitter = require('node:events');

// const eventEmitter = new EventEmitter()

class Chat extends EventEmitter{
    SendMessage(msg) {
        console.log("message sent: ",msg);
        this.emit('ReceivedMsg', msg)       //emit() means : Fire an event.
    }
}

const chat = new Chat()

chat.on("ReceivedMsg", (msg) => {
    console.log("Received msg: ",msg);
})

// trigger event:
chat.SendMessage("Hello badakk.")
