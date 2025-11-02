const { client } = require('../config/db');
const branchCollection = client.db('e-commerce').collection('branchs');

exports.getAllBranches = async(req, res) => {
    try {
        let cursor = branchCollection.find({});
        const result = await cursor.toArray();

        res.status(200).json({
            success: true,
            data: result,
            totalBranches: result.length,
        });

    } catch (error) {
        console.error('Error fetching all branches:', error); 
        res.status(500).json({ 
            success: false,
            message: 'Failed to fetch branches from database', 
            error: error.message
        });
    }
}
