
const {Buffer} = require('node:buffer')
const fs = require('fs')

const crypto = require("node:crypto");

// reading img:

// const img = fs.readFileSync('./OSI-Model.png')
// console.log(img); 

//Text file:
// const data = fs.readFileSync('./text.txt')
// console.log(data);
// console.log(data.toString());

// Encryption: 
const hash = crypto
    .createHash("sha256")
    .update(Buffer.from("ajit123"))
    .digest("hex");

console.log(hash);


