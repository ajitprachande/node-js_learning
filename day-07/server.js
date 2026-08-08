const http = require('node:http')
const fs = require("node:fs")
const Path = require("node:path")

const server = http.createServer(function (req, res) {
    console.log(req.headers);

    console.log(`Date: ${Date.now()}`);

    console.log(`URL: ${req.url}`);
    console.log(`Method: ${req.method}`);
    console.log(`HOST: ${req.headers.host}`);
    console.log(`Accept language: ${req.headers['accept-language']}`);

    switch (req.url) {
        case '/':
            res.writeHead(200);
            return res.end("Home page");
        case '/about':
            res.writeHead(200);
            return res.end("About Me ");
        case '/contact':
            res.writeHead(200);
            return res.end("contact mee");
        case '/projects':
            res.writeHead(200);
            return res.end("projects...");
        default:
            res.writeHead(404);
            return res.end("Page not found.")
    }


});

//Example 2:

//Js Object
const User =
{
    id: 102,
    name: "abc",
    sal: 1000000,
    skills: ['html', 'css', 'js', 'nodejs', 'express']
}
const server2 = http.createServer(function (req, res) {


    const currDT = Date();
    const UserLog = `\n[${currDT}] : ${req.method} : ${req.url} : ID = ${User.id} : Name = ${User.name}`;

    const UserLogPath = Path.join(__dirname, 'UserLog.txt')

    fs.appendFileSync(UserLogPath, UserLog, 'utf-8')



    res.writeHead(200, { "content-type": "application/json" })
    res.end(`Users: ${JSON.stringify(User)}`)           // `JSON.stringify()` converts the JavaScript object into a JSON string
})
server2.listen(3000, () => {
    console.log("Server is running on port: 3000");
    
});


server.listen(8000, () => {
    console.log("Server is running on port: 8000");

});