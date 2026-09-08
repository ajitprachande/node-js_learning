const express = require('express');

const controller = require('../controllers/brand.controller');

const db = require('../db');
const { route } = require('./products.routes');


const router = express.Router();

router.get('/', controller.getbrands);

router.get('/:id',controller.getBrandById)

router.post('/',controller.createbrand);

router.get('/:id/products', controller.getProductsByBrand)

module.exports = router