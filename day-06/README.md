## Buffer in NodeJs
```
- A Buffer in Node.js is a built-in object used to store and manipulate raw binary data. 
- It acts as temporary memory for handling data streams such as files, network communication, images, videos, and cryptographic operations. 
- Since JavaScript strings are designed for text, Node.js uses Buffers to efficiently process binary data.
```

| Buffer                          | String                 |
| ------------------------------- | ---------------------- |
| Stores binary data              | Stores text            |
| Mutable                         | Immutable              |
| Used for files, images, streams | Used for readable text |
| Sequence of bytes               | Sequence of characters |


| Method              | Definition                            | Common Use                    |
| ------------------- | ------------------------------------- | ----------------------------- |
| `Buffer.from()`     | Creates a Buffer from existing data   | Strings, arrays, binary input |
| `Buffer.alloc()`    | Creates an empty Buffer of fixed size | Reserve memory                |
| `buffer.write()`    | Writes data into a Buffer             | Update buffer contents        |
| `buffer.toString()` | Converts a Buffer to a string         | Display readable text         |
| `buffer.length`     | Returns the Buffer size in bytes      | Check data size               |
| `Buffer.concat()`   | Merges multiple Buffers               | Streams, file chunks          |
| `buffer.slice()`    | Returns part of a Buffer              | Extract binary data           |
| `buffer.equals()`   | Compares two Buffers                  | Verify binary equality        |
| `Buffer.isBuffer()` | Checks if a value is a Buffer         | Input validation              |
| `buffer.copy()`     | Copies data to another Buffer         | Duplicate binary data         |
| `buffer.fill()`     | Fills a Buffer with a value           | Initialize memory             |
| `buffer.indexOf()`  | Finds data in a Buffer                | Search binary content         |



Why does Node.js use Buffers instead of Strings for files?
---------------------
- Because many files (images, videos, PDFs, ZIPs, etc.) contain binary data, not plain text. 
- A Buffer stores raw bytes exactly as they are, preserving the original data. Converting binary files directly to strings can corrupt them,
- whereas Buffers allow Node.js to safely read, process, and transfer binary data.
---

