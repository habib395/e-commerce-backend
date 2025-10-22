const { client } = require("../config/db");
const { ObjectId } = require('mongodb'); 

const productCollection = client.db('e-commerce').collection('products');
exports.getAllProducts = async (req, res) => {
    try {
    const cursor = productCollection.find({});
    const result = await cursor.toArray();
    res.status(200).send(result)
    } catch (error) {
    console.error('Error fetching all products:', error);
    res.status(500).send({ 
        success: false,
        message: 'Failed to fetch products from database',
        error: error.message
    })
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