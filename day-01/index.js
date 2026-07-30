const fs = require('fs')    // Built-in module

console.log("hello all, from index.js");

// node --version
// node --watch index.js
// npm install 
//  >> npm --version

// alert() = alert is not part of js, it's given by browser functinality
// when we execute this in CLI we don'thave that functinality that is not available in node.js

// 2 diff env to run JS
// Browser (JS, Browser API - fetch, alert)
// NodeJS - (JS, fs, crypto-module, cryptographic, fileHandling)

/*
what is module?
A module is a JavaScript file that encapsulates related code.
Modules make applications easier to organize, maintain, and reuse.
There are three categories of modules:

    1. Built-in (Core) modules (fs, http, path, os, crypto, events, stream,url)

    2. User-defined modules (your own files like math.js)

    3. Third-party modules (installed via npm, such as express, mongoose, axios)

JavaScript has two major module systems:

CommonJS (require, module.exports)

ES Modules (import, export)

*/

fs.writeFile("./info.txt","hello ajit", () => { })

// reading a file:=
const read = fs.readFileSync("./info.txt",'utf-8')
console.log(read);

fs.
