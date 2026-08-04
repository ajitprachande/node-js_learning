const {Buffer} = require('node:buffer')
const { log } = require('node:console');
const { buffer } = require('node:stream/consumers');

// const buf = Buffer.alloc(4)
// console.log(buf);
// console.log(buf[1]);

//================================================================================================================================
// const buf = Buffer.from("hello")
// console.log(buf);
// console.log(buf.toString());


//================================================================================================================================
// const buf = Buffer.alloc(6);
// buf.write("ajitpra");
// console.log(buf);
// console.log(buf.toString());

//================================================================================================================================

// const buf = Buffer.from("coding");
// console.log(buf.toString('utf-8')); 
// console.log(buf.toString('utf-8', 0, 2));   //output: co 


//================================================================================================================================
/* //concat() : Combines multiple Buffers into one.
    const bf1 = Buffer.from("hello ");
    const bf2 = Buffer.from("Ajit");

    const merged = Buffer.concat([bf1, bf2])
    console.log(merged);
    console.log(merged.toString());

    console.log(merged.length);
*/

//================================================================================================================================
// slice() Returns a portion of the Buffer without modifying the original.

// const buff = Buffer.from("NodeJS");
// console.log(buff.slice(0,4));
// console.log(buff.toString().slice(0,4));

//================================================================================================================================
// equals() : Checks whether two Buffers contain exactly the same data.

// const first = Buffer.from("ajit")
// const second = Buffer.from("amit")
// console.log(first.equals(second));

//================================================================================================================================
// Buffer.isBuffer() : Checks whether a value is a Buffer.
// const buf = Buffer.from("hello")
// console.log(Buffer.isBuffer(buf));  // true

// const str = buf.toString();
// console.log(Buffer.isBuffer(str));  // false

//================================================================================================================================
//buffer.fill() : Fills every byte in the Buffer with the specified value.
// const bf = Buffer.alloc(5);
// console.log(bf.fill("A").toString());

//================================================================================================================================
// buffer.indexOf() : Finds the position of a value inside the Buffer.

// const buf = Buffer.from("Hello ajit");
// console.log(buf.indexOf("ajit"));
//================================================================================================================================



