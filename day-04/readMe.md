### eventNames()
- eventNames() returns an array of all event names that currently have one or more registered listeners.
- It does not return listener functions.
- It takes no arguments.
- Syntax:
    - eventEmitter.eventNames();
- If an event has no listeners, it won't appear in the returned array.
- It's mainly used for debugging and inspecting an EventEmitter.

### setMaxListeners()
- setMaxListeners() changes the maximum number of listeners allowed for an event before Node.js shows a warning.
- setMaxListeners(n) sets the maximum number of listeners that may be registered for a single event on an EventEmitter before Node.js emits a MaxListenersExceededWarning
- Syntax:
    - eventEmitter.setMaxListeners(number);         (Now Node.js won't warn until more than (number ) listeners are added.)
- Default maximum listeners = 10.
- Exceeding the limit does not stop the program.
- Node.js prints a warning to help detect possible memory leaks.
- setMaxListeners() changes only the warning threshold.

### getMaxListeners()
- getMaxListeners() returns the current maximum number of listeners allowed for an EventEmitter before Node.js shows a warning.
- Syntax:
    - eventEmitter.getMaxListeners();
- The default value is 10.
- It does not count listeners.

### newListener       - (newListener is an event, not a method.)
- The newListener event is emitted "before" a listener is added to an EventEmitter, allowing code to observe or customize listener registration.
- Node.js emits it automatically.
- Its callback receives the event name and the listener function.
- Syntax:
    - eventEmitter.on("newListener", (eventName, listener) => {
    
    });

- Thinking it runs after registration. It actually runs before the listener is added.

### removeListener       - (removeListener is an event, not a method.)
- The removeListener event is emitted "after" a listener has been removed from an EventEmitter, allowing applications to observe listener removal.
- removeListener is a special event that is emitted automatically whenever a listener is removed from an EventEmitter.
- Syntax:
    - eventEmitter.on("removeListener", (eventName, listener) => {

    });
    
- Node.js emits it automatically.
- It fires after a listener has been removed.
- Its callback receives the event name and the removed listener function.
- It's mainly used for monitoring, debugging, auditing, and framework development.





