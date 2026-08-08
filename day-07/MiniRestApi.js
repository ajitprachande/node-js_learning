const http = require('node:http')

const Users = [
    {
        id: 101,
        name: "Ajit"
    },
    {
        id: 102,
        name: "OM"
    }
]
const server = http.createServer(function (req, res) {
    //Fetch User 'GET'
    if (req.method == 'GET' && req.url == '/users') {
        res.writeHead(200, { 'content-type': 'application/json' })
        return res.end(JSON.stringify(Users))
    }
    //Create user 'POST'
    if (req.method == 'POST' && req.url == '/users') {
        const user = req.body || {};
        res.writeHead(201, { 'content-type': 'application/json' })
        return res.end(JSON.stringify({
            message: "User created."
        }))
    }

    // Replace the User 'PUT'
    if (req.method == 'PUT' && req.url == `/users/101`) {

        res.writeHead(201, { 'content-type': 'appliction/json' })
        return res.end(JSON.stringify({
            success: true,
            message: "User replaced with new Data.",
        }))
    }
    //Delete the user 'DELETE'
    if (req.method == 'DELETE' && req.url == `/users/101`) {

        res.writeHead(200, { 'content-type': 'appliction/json' })
        return res.end(JSON.stringify({
            message: "User Deleted Success.",
        }))
    }

    return res.writeHead(200).end("Hey Welcome...");
})
server.listen(8000, () => console.log("Server running on port: 8000"));