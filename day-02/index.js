const fs = require('node:fs');

const content = fs.readFileSync('content.txt','utf-8')
console.log(content);

// fs.writeFileSync("./write.txt","This msg is copied from index.js file");

// fs.writeFileSync("write.txt", content)    //writeFileSync it always overrides the content

//fs.appendFileSync("write.txt", content)    //this always add the content to the file. the content(data) is  getting added. it not over-rides.  


// create dir  
// fs.mkdirSync("Dir");
// fs.mkdirSync("Codes/ui", { recursive: true});

// remove dir
// fs.rmdirSync("Dir")

//  to delete a file:
// fs.writeFileSync("del.txt","Delete this file")
// fs.unlinkSync("del.txt");
