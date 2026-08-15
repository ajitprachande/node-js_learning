const express = require('express')

const app = express();
const port = 8000;

app.use(function (req, res, next) {
    console.log(`${req.method}  ${req.path}`);
    next()
})

function AuthFun(req, res, next) {
    console.log("Authorized User success.");
    next();
}

//Global level middleware
app.use(AuthFun);

// Product middleware
function Product(req, res, next) {

    const id = parseInt(req.params.id);

    const product = products.find((product) => product.id === id)

    if (!product) {
        return res.status(404).json({
            message: 'Product not found.',
            ProductID: req.params.id,
            success: false,
        })
    }

    // Store product in request object
    console.log("Product Found.");
    
    req.product = product;
    next();
}

const products = [
    {
        id: 1,
        name: "parleG",
        price: 20
    },
    {
        id: 2,
        name: "Lays",
        price: 50
    }
]

app.get('/products', (req, res) => {
    const product = products;
    res.status(200).json({product})
})


//  route-level middleware.
app.get('/products/:id', Product, (req, res) => {
   
    res.status(200).json({
        product: req.product
    })
})

app.get('/home', (req, res) => {
    return res.status(200).json({
        message: "Home page",
        success: true
    })
})

app.listen(port, () => console.log(`Running: ${port}`));