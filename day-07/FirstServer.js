//Creating First HTTP server core nodeJS:

const http = require("node:http");

const server = http.createServer(function (req, res) {
    console.log("I got an incoming request.");

    // res.writeHead(200, { 'content-type': 'application/json' });
    // res.end(JSON.stringify({
    //     data: "helllo world.😀"
    // })); 
    
    //OR=
   
    res.writeHead(200);

    res.end('Running your first http server... Congratsss')     //finishes the response.
});
server.listen(8000, () => {
    console.log("http server running on port {8000}");
});