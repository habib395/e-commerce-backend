require('dotenv').config()
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/db');
const productRoutes = require('./routes/productRoute')

const app = express();
const port = process.env.PORT || 3000;

//middleware
app.use(cors())
app.use(express.json())

const startServer = async() =>{
    try {
        await connectDB()
        console.log('DB connection established successfull')

        app.get('/', (req, res) => {
            res.send('E-commerce site is open and ready')
        })

        //products routes
        app.use('/api/v1/products', productRoutes)

        app.listen(port, () => {
            console.log(`product is waiting for sell at port: ${port}`)
        })
    } catch (error) {
        console.error('failed to start server')
    }
}

startServer();


