const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DB_URI;

//mongoClient object creating
const client = new MongoClient(uri, {
    serverApi: {
      version: ServerApiVersion.v1,
      strict: true,
      deprecationErrors: true,
    }
});

const connectDB = async() => { 
    try {
      await client.connect();
      await client.db("admin").command({ ping: 1 });
      console.log("Pinged your deployment. You successfully connected to MongoDB!");

    //products related apis
    // const productCollection = client.db('e-commerce').collection('products');

    // app.get('/products', async(req, res) => {
    //     try {
    //         const cursor = productCollection.find();
    //         const result = await cursor.toArray();
    //         res.send(result)
    //     } catch (error) {
    //         console.error(err)
    //         res.status(500).send({ message: "Error fetching products"});
    //     }
    // });

    } catch {
        console.error("MongoDB Connection Error:, error")
    }
}

module.exports = {connectDB, client};