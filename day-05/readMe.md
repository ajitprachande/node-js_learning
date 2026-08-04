# Node.js EventEmitter - Chat Room Simulation

## Task

Build a simple **Chat Room Simulation** using Node.js's built-in `EventEmitter` class.

The application demonstrates how events can be used to simulate a real-time chat system where users can:

- Join a chat room
- Send messages
- Leave a chat room

The project follows an **event-driven architecture**, where actions trigger events and registered listeners respond automatically.

## Project Structure

```
ChatRoom/
│
├── chatRoom.js      # ChatRoom class and business logic
├── index.js         # Registers listeners and runs the application
└── README.md
```
## Events Used

Event  
 ---------------------
 >>`join` = Triggered when a user joins the chat 
 >> `message` = Triggered when a user sends a message 
 >>  `leave` = Triggered when a user leaves the chat

---

## Concepts Covered

- EventEmitter
- Custom Events
- Event Listeners (`on()`)
- `emit()`
- Classes
- Inheritance (`extends`)
- Constructor
- JavaScript `Set`
- Module Exports
- CommonJS (`require`)

---

## Sample Output

```
ajit joined the chat.
Omraj joined the chat.

NEW Message: ajit : Hii Raj...
NEW Message: Omraj : bol...

ajit Left the chat.

ajit is not in Chat. won't send message
```

---

## Learning Outcome
I learned how to build an event-driven application using Node.js. created custom events, emitted data between components, handled events using listeners, managed application state with a `Set`, and organized the project using classes and modules.