### What are Events in Node.js?
- Node.js follows an event-driven architecture
  where actions (events) trigger specific responses.
- The EventEmitter class in the events module is used to handle events in Node.js.
- Events in Node.js work like a publisher-subscriber model
- Where an event is emitted and event listeners (handlers) respond to it.

### why Use Events?
- Helps in asynchronous programming without callback hell.
- Used heavily in real-time applications like chat apps, notifications, and streams
- Core modules like fs, http, and stream use events internally.    can you teach me in full depth what it is ? 


### EventEmitter Methods
1. on()
    - on() registers (listens for) an event and executes a callback function every time that event is emitted.
    - The callback runs every time the event is emitted.
    - Multiple listeners can be attached to the same event.
2. emit()
    - emit() triggers (fires) an event and immediately executes all listeners registered for that event.
    - It returns:
        -  true if at least one listener was called.
        -  false if no listeners were registered.
    - By default, emit() is "synchronous", so listeners run before the next line of code.
3. once()
    - once() listens for an event only one time. After the event occurs, Node.js automatically removes the listener.

4. off()
    - off() removes a previously registered event listener from an EventEmitter.
    - Syntax:
        - eventEmitter.off(eventName, listenerFunction);
    - You must pass the same function reference that was registered.
    - off() is an alias for removeListener().
    - Removing listeners helps avoid memory leaks and duplicate processing.

5. removeAllListeners()
    - removeAllListeners() removes all registered listeners from an event or from the entire EventEmitter.
    - removeAllListeners(eventName) removes every listener for one event.
    -  It is useful during application shutdown, cleanup, and resetting components.
6. listeners() 
    - listeners() returns an array containing all the listener functions registered for a specific event.
    - Syntax: 
        - eventEmitter.listeners(eventName)
    - Returns:  An array of listener functions.

7. listenerCount()
    - listenerCount() returns the number of listeners currently registered for a specific event.
    - Syntax: 
        - eventEmitter.listenerCount(eventName);
    - It returns a Number, not an array.
    - It's useful for debugging and monitoring listener registrations.
    - After removing listeners, the count decreases automatically.



