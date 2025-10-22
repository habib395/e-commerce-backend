const { client } = require("../config/db");


exports.getAllProducts = async (req, res) => {
    try {
    const productCollection = client.db('e-commerce').collection('products');
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