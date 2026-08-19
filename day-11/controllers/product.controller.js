const { PRODUCTS } = require('../models/products.js');

exports.getAllProducts = function (req, res) {
    res.status(200).json({
        PRODUCTS
    });
}

exports.getProductById = function (req, res) {
    const productId = parseInt(req.params.id)
    if (isNaN(productId))
        return res.status(400).json({ error: `Id not Exists` })

    const product = PRODUCTS.find(product => product.id == productId);

    if (!product) {
        return res.status(401).json({
            message: "Product not found.",
            success: false
        })
    }
    res.status(200).json({ product })
}

exports.createProduct = function (req, res) {
    const { name, price } = req.body;


    if (!name || name == '')
        return res.status(400).json({ error: `Product name required.` })

    if (!price || price == '')
        return res.status(400).json({ error: `Product price required.` })

    // const productId = PRODUCTS.length + 1;
    // Generate a new unique product ID:
    const productId = PRODUCTS.length > 0 ? Math.max(...PRODUCTS.map(product => product.id)) + 1 : 1;


    const NewProduct = { id: productId, name, price };
    PRODUCTS.push(NewProduct);

    return res.status(201).json({
        message: "PRODUCTS added to cart.",
        success: true,
        ProductDetail: NewProduct
    })

}

exports.deleteProductByID = function (req, res) {
    const id = parseInt(req.params.id);
    if (isNaN(id))
        return res.status(400).json({ error: `Id not exists.` })

    const productDel = PRODUCTS.findIndex(product => product.id == id)

    if (productDel < 0) {
        return res.status(400).json({
            message: `Product Not Exists with Id ${productDel}.`,
            success: false
        })
    }

    PRODUCTS.splice(productDel, 1);
    return res.status(200).json({
        message: `Product deleted successfully`,
        success: true
    });
}