const express = require('express');
const fs = require('node:fs');
const path = require('node:path');

const app = express();
const port = 8000;

app.use(express.json())

app.use(function(req, res, next){
    const now = Date();
    const log = `\n [${now}]  ${req.method}   ${req.path}`

    const logFilePath = path.join(__dirname, 'Middleware-ReqLog.txt')
    fs.appendFileSync(logFilePath, log, 'utf-8')
    
    next();

})

 

app.use(function(req, res, next){
    console.log("hey i am middleware A, running...");
    next();
})

app.use(function(req, res, next){
    console.log(`Middleware 2, Running...`);
    next();
})


app.get('/',(req, res) => {
    return res.status(200).end("Welcome to Daddy's Home....")
})



app.listen(port, () => {console.log(`App listening on port :=> ${port}`)});