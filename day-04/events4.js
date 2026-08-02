const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

//8. eventNames()
class SmartHome extends EventEmitter {
    smartHome() {
        this.emit("lightOn");
        this.emit("fanOn");
        this.emit("doorOpen");
        this.emit("alarm");
    }
}

const activity = new SmartHome();

activity.on("lightOn", () => {
    console.log("Light ON.");
})

activity.on("fanOn", () => {
    console.log("Fan ON.");
})

activity.on("doorOpen", () => {
    console.log("Door Open.");
})

activity.on("alarm", () => {
    console.log("Alarmmmm.");
})

// activity.smartHome();

console.log(activity.eventNames());
activity.removeAllListeners("alarm")
console.log(activity.eventNames());

// activity.smartHome();
// =============================================================================================================================

// 9. setMaxListeners()  and  10. getMaxListeners :
const login = () => {
    console.log("Login success.");
}

eventEmitter.on('login',login);
eventEmitter.on('login',login);
eventEmitter.on('login',login);
eventEmitter.on('login',login);
eventEmitter.on('login',login);
eventEmitter.on('login',login);
eventEmitter.on('login',login);
eventEmitter.on('login',login);
eventEmitter.on('login',login);
eventEmitter.on('login',login);
eventEmitter.on('login',login);
eventEmitter.on('login',login);
eventEmitter.on('login',login);

eventEmitter.setMaxListeners(12);

eventEmitter.on('login',login);
eventEmitter.emit("login")


console.log(eventEmitter.getMaxListeners("login"));




