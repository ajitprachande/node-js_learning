const EventEmitter = require('node:events')

const eventEmitter = new EventEmitter();

// removeAllListener() 

eventEmitter.on("home", (name) => {
    console.log("Home page", name);
})

eventEmitter.on("home", function home(){
    console.log("User dashboard.");
})

eventEmitter.removeAllListeners();

eventEmitter.emit("home", 'ajit');

// another ex.:

const app = new EventEmitter();

app.on('login', () => console.log("login success."));
app.on('payment', () => console.log("payment done."));
app.on('logout', () => console.log("logout success."));

app.emit('login');

app.emit('payment');
app.removeAllListeners();
app.emit('logout');

// // Task:
class Notification extends EventEmitter {
    
    sendNotification() {
        this.emit('email')
        this.emit('sms')
        this.emit('otp')
    }
}

const notify = new Notification();

notify.on('email', () => {
    console.log("Email sent");
})
notify.on('sms', () => {
    console.log("SMS sent");
})
notify.on('otp', () => {
    console.log("OTP sent");
})

//first time
notify.sendNotification();

// remove all listeners
notify.removeAllListeners();

//second time
notify.sendNotification();


