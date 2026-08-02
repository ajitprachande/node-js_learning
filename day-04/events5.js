
const EventEmitter = require('node:events');

const eventEmitter = new EventEmitter();

// special events newListener and removeListener.(it's not a method.)

// 11. newListener 

// eventEmitter.on("newListener", (event) => {
//     console.log(`new Listener added: ${event}`);
// })
// eventEmitter.on("Userlogin", () => {
//     console.log("LOGIN");
// })

// eventEmitter.on("login", () => {
//     console.log("LOGIN");
// })


console.log("================================================================================================");


// another example:
// const Order = () => {
//     console.log("item ordered.");
// }

// const Register = () => {
//     console.log("User Registered");
// }

// eventEmitter.on("newListener", (eventName, listener) => {
//     console.log(`Event: ${eventName}`);
//     console.log(`Function Name: ${listener.name}`);
// })

// eventEmitter.on("order", Order);
// console.log("----------------------------------------------------------------");
// eventEmitter.on("register", Register);


console.log("================================================================================================");



// Task : 

class Bank extends EventEmitter {
    operations() {
        this.emit("transaction");
        this.emit("withdraw");
    }

}

const bank = new Bank()

bank.on("newListener", (eventName, listener) => {
    console.log(`Registering listener for: ${eventName}`);
    console.log(`Function Name : ${listener.name}`);
    console.log("----------------------------------------------------------------");
})

const TransactionHandler = () => {
    console.log("Transaction successful.");
}

const WithdrawHandler = () => {
    console.log("Withdraw successful.");
}

bank.on("transaction", TransactionHandler)
bank.on("withdraw", WithdrawHandler)

bank.operations()
console.log("================================================================================================");
