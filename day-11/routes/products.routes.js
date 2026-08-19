const express = require('express');
const controller = require('../controllers/product.controller.js');


const router = express.Router();

router.get('/', controller.getAllProducts)

router.get('/:id', controller.getProductById)

router.post("/", controller.createProduct)

router.delete('/:id', controller.deleteProductByID)

module.exports = router;
