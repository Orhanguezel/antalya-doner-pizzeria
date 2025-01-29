const { MongoClient } = require('mongodb');

const uri = process.env.MONGO_URI;
const client = new MongoClient(uri);

const testMongoDB = async () => {
    try {
        await client.connect();
        console.log('✅ Connected successfully to MongoDB');

        const database = client.db('antalya-doner-pizzeria');
        const categories = database.collection('categories');
        const data = await categories.find().toArray();
        console.log('✅ Fetched categories:', data);
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
    } finally {
        await client.close();
    }
};

testMongoDB();

