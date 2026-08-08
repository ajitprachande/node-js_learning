const http = require('node:http')
const fs = require('node:fs')
const Path = require('node:path')

const server = http.createServer(function (req, res) {

    const method = req.method;
    const serverPath = req.url;

    console.log(`Method: ${method}`);
    console.log(`URL: ${serverPath}`);
    console.log(__filename);
    console.log(__dirname);
    console.log(process.cwd());
    

    //          Date object
    const now = new Date();

    //log of request 
    const log = `\n[${now}] : ${method} : ${serverPath} `;

    // console.log(`[${now}] : ${method} : ${serverPath} `);

    //specifying log file path in current dir otherwise it saves in nodejs defined dir.
    const logFilePath = Path.join(__dirname, "log.txt")

    //appending each logs to the log file
    fs.appendFileSync(logFilePath, log, 'utf-8')

    switch (method) {
        case 'GET': {
            switch (serverPath) {
                case '/':
                    res.writeHead(200)
                    return res.end("Hello User.")
                
                case '/contact-us':
                    res.writeHead(200)
                    return res.end("mail me on abc123@outlook.com \nor\n contact me +91 9844200000")

                case '/tweet':
                    return res.writeHead(200).end("Your Tweets: ...")
               
                default:
                    return res.writeHead(404).end("Page Not Found.")
            }
        }
            break
        case 'POST': {
            switch (serverPath) {
                
                case '/tweet':
                    return res.writeHead(201).end("your tweet sent.")
                
                default:
                    return res.writeHead(404).end("PAGE NOT FOUND.")
            }
        }
    }

    res.writeHead(404).end("page not found.")

})

server.listen(3000, () => { console.log("Server listemimg on port: 3000") });