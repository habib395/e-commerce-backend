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

    } catch {
        console.error("MongoDB Connection Error:", error)
    }
}

module.exports = { connectDB, client };