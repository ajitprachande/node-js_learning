## What is a Custom Module?
+ A custom module in Node.js is a module created by the developer to encapsulate and reuse application-specific functionality across different files.
+ Unlike built-in modules such as fs or path, custom modules are created by us.

## How Custom Modules Work
`Export`    
- Used to make functionality available outside the module.

---
    module.exports = something;
---

`Import`
- Used to use exported functionality in another file.
- CommonJS:
---
    const something = require("./file");
---

## There are two module systems 
---
        CommonJS
            ↓
        module.exports / require()

        ES Modules
            ↓
        export / import
---

### follow easy trick:
---
                        NODE.JS MODULES
                            │
                ┌────────────┴────────────┐
                │                         │
            CommonJS                  ES Modules
                │                         │
        module.exports              export
        require()                   import
                │                         │
                │                  ┌──────┴──────┐
                │                  │             │
                │                Named        Default
                │                  │             │
                │             export name    export default
                │                  │             │
                │             { name }       no { }
                │
        module.exports = {
            add,
            subtract
        }
---

