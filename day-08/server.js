const { log } = require('console');
const express = require('express')

const app = express();
const hostname = '127.0.0.1'
const port = 8000

app.get('/', (req, res) => {

    console.log(req.headers);
    console.log(`${req.headers['accept-language']}`);

    res.end('Homepage');
})

app.get('/about', (req, res) => {
    res.end('about us page.')
})

app.get('/contact',(req, res) => {
    res.end("My mobile number is: +91 1234567890.")
})

app.listen(port, () => {
    console.log(`Your express app runnnig on: http://${hostname}:${port}`);
});