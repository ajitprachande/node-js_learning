// Import the built-in EventEmitter class from the Node.js 'events' module.
const EventEmitter = require('node:events');

// Create an instance (object) of the EventEmitter class.
const eventEmitter = new EventEmitter();

//1. on()
eventEmitter.on('orderPlaced', ()=> {
    console.log("order Data saved.");
})

eventEmitter.on('orderPlaced', () => {
    console.log("confirmation email sent to mail.");
})

eventEmitter.on('orderPlaced', () => {
    console.log("product reduced.");
})

eventEmitter.on('orderPlaced', () => {
    console.log("Generate invoice");
})

eventEmitter.on('orderPlaced', () => {
    console.log("notify admin.");
})

// 2. emit() 
// Emit (trigger) the 'orderPlaced' event.
eventEmitter.emit('orderPlaced');

const payment = new EventEmitter();

//3. once()
payment.once("paymentSuccess", (amount) => {
    console.log(`Invoice generate for ${amount}`);
})

payment.emit("paymentSuccess", 500);


class User extends EventEmitter {
    login(username) {
        this.emit("firstLogin", username);

    }
}

const user = new User();
user.once('firstLogin', (username) => {
    console.log(`Welcome ${username}! This is your One time login url.`);
    
});

user.login("Ajit");
user.login("Ajit");


//4. off()
function Login() {
    console.log("user Logged-in.");
    
}
// Register the 'Login' function as a listener for the 'welcome' event.
eventEmitter.on('welcome', Login);

// Remove (unsubscribe) the 'Login' listener from the 'welcome' event.
eventEmitter.off('welcome', Login);

eventEmitter.emit('welcome', Login);
//another Example 

const chat = new EventEmitter();

function receiveMessage(msg) {
    console.log(`Message : ${msg}`);
}

chat.on('message',receiveMessage)
chat.emit("message","hello how are you???");
chat.on('message',receiveMessage);
chat.off('message',receiveMessage);

//5. removeAllListener() 

eventEmitter.on("home", () => {
    console.log("Home page");
})

eventEmitter.emit('home');
eventEmitter.emit('home');
eventEmitter.removeAllListeners('home');
eventEmitter.emit('home');    





