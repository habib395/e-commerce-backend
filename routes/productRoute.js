const express = require('express');
const router = express.Router();
const productController = require('../controllers/productsController'); 

// 1. Get all products (with optional limit for homepage)
router.get('/products', productController.getAllProducts);

// 2. Get single product
router.get('/products/:id', productController.getSingleProduct);

// 3. Category filtering route
router.get('/products/category/:category', productController.getProductsByCategory) 

// Brand filtering route
// RTK Query calls: /products/brand/Apple
router.get('/products/brand/:brand', productController.getProductsByBrand) 

// 5. Get unique categories
router.get('/categories', productController.getUniqueCategories);

// Get unique brands
router.get('/brands', productController.getUniqueBrands);

module.exports = router;