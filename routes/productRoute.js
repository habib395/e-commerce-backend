const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController'); 

//all products
router.get('/products', productController.getAllProducts);

// single product
router.get('/products/:id', productController.getSingleProduct);

module.exports = router;