const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController'); 

// 1. Get all products (with optional limit for homepage)
router.get('/products', productsController.getAllProducts);

// 2. Get single product
router.get('/products/:id', productsController.getSingleProduct);

// 3. Category filtering route
router.get('/products/category/:category', productsController.getProductsByCategory) 

// Brand filtering route
router.get('/products/brand/:brand', productsController.getProductsByBrand) 

// 5. Get unique categories
router.get('/categories', productsController.getUniqueCategories);

// Get unique brands
router.get('/brands', productsController.getUniqueBrands);

module.exports = router;