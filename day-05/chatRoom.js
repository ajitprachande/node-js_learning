// join() sendMessage() and leave() 

const { log } = require('node:console');
const EventEmitter = require('node:events');

class ChatRoom extends EventEmitter {
    constructor() {
        super();
        this.users = new Set();
    }

    join(user) {
        this.users.add(user);
        this.emit('join', user);

    }
    SendMessage(user, message) {
        if(this.users.has(user)) {
            this.emit('message', user, message);

        }else{
            console.log(`${user} is not in Chat. won't send message`);
        }
    }
    leave(user) {
        if(this.users.has(user)) {
            this.users.delete(user);
            this.emit('leave', user)
        }else{
            console.log(`${user} is not in chat.`);
            
        }
    }
}
module.exports = ChatRoom



