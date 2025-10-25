const { client } = require("../config/db");
const { ObjectId } = require('mongodb'); 

const productCollection = client.db('e-commerce').collection('products');
const MAX_HOME_PRODUCTS = 20;

exports.getAllProducts = async (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || 0; 

        let cursor = productCollection.find({});
        
        if (limit > 0 && limit <= MAX_HOME_PRODUCTS) {
            cursor = cursor.limit(limit);
        }
        
        const result = await cursor.toArray();
        
        res.status(200).send({
            success: true,
            data: result,
            totalCount: await productCollection.countDocuments({}) // মোট সংখ্যা (যদি লাগে)
        });

    } catch (error) {
        console.error('Error fetching all products:', error);
        res.status(500).send({ 
            success: false,
            message: 'Failed to fetch products from database',
            error: error.message
        });
    }
}

exports.getSingleProduct = async (req, res) => {
    try {
        const productId = req.params.id; 
        const query = { _id: new ObjectId(productId) };
        const product = await productCollection.findOne(query);

        if (!product) {
            return res.status(404).send({
                success: false,
                message: `Product not found with ID: ${productId}`
            });
        }

        res.status(200).send({
            success: true,
            data: product
        });

    } catch (error) {
        if (error.name === 'BSONTypeError') {
             return res.status(400).send({ 
                success: false,
                message: 'Invalid product ID format'
            });
        }

        console.error('Error fetching single product:', error);
        res.status(500).send({ 
            success: false,
            message: 'Failed to fetch product from database',
            error: error.message
        });
    }
}

exports.getProductsByCategory = async (req, res) => {
    try {
        const categoryName = req.params.category; 
        const query = { category: categoryName };
        const products = await productCollection.find(query).toArray();

        res.status(200).send({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Error fetching products by category:', error);
        res.status(500).send({ 
            success: false,
            message: 'Failed to fetch products by category',
            error: error.message
        });
    }
}

exports.getProductsByBrand = async (req, res) => {
    try {
        const brandName = req.params.brand; 
        const query = { brand: brandName };
        const products = await productCollection.find(query).toArray();

        res.status(200).send({
            success: true,
            data: products
        });
    } catch (error) {
        console.error('Error fetching products by brand:', error);
        res.status(500).send({ 
            success: false,
            message: 'Failed to fetch products by brand',
            error: error.message
        });
    }
}

exports.getUniqueCategories = async (req, res) => {
    try {
        const categoriesCursor = productCollection.aggregate([
            { $group: { _id: "$category" } },
            { $group: { _id: null, categories: { $push: "$_id" } } },
            { $project: { _id: 0, categories: 1 } }
        ]);
        
        const result = await categoriesCursor.next(); 
        const categories = result ? result.categories : []; 

        res.status(200).send({
            success: true,
            data: categories 
        });
        
    } catch (error) {
        console.error('Error fetching unique categories:', error);
        res.status(500).send({ 
            success: false,
            message: 'Failed to fetch categories',
            error: error.message
        });
    }
}

exports.getUniqueBrands = async (req, res) => {
    try {
        const brandsCursor = productCollection.aggregate([
            { $group: { _id: "$brand" } }, 
            { $group: { _id: null, brands: { $push: "$_id" } } },
            { $project: { _id: 0, brands: 1 } }
        ]);
        
        const result = await brandsCursor.next(); 
        const brands = result ? result.brands : []; 

        res.status(200).send({
            success: true,
            data: brands,
        });
        
    } catch (error) {
        console.error('Error fetching unique brands:', error);
        res.status(500).send({ 
            success: false,
            message: 'Failed to fetch brands',
            error: error.message
        });
    }
}