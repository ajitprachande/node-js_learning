const express = require('express');
const productRoute = require('./routes/products.routes.js');
const LoggerMiddleware = require('./middleware/logger.middleware.js')

const app = express();

const port = 3000;

app.use(express.json())
app.use(LoggerMiddleware)


app.get('/', (req, res) => {
    return res.status(200).json("WELOME TO YOUR STORE...");
});
// Routes
app.use('/products', productRoute)

app.listen(port, () => console.log(`listening on port: ${port}`));