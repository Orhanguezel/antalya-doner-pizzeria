// mongodb-test.js
const { MongoClient } = require('mongodb');

// Çevresel değişkenlerden MongoDB URI'sini alıyoruz.
const uri = process.env.MONGO_URI || 'mongodb://admin:adminpassword@141.136.36.40:27017/antalya-doner-pizzeria?authSource=admin';
const client = new MongoClient(uri);

async function testConnection() {
    try {
        // MongoDB'ye bağlanıyoruz.
        await client.connect();
        console.log('Connected successfully to MongoDB');
        // Bağlantı başarılı olduysa, kategoriler koleksiyonunu sorguluyoruz.
        const database = client.db('antalya-doner-pizzeria');
        const categories = database.collection('categories');
        const data = await categories.find().toArray();
        console.log('Fetched categories:', data);
    } catch (err) {
        console.error('MongoDB connection error:', err.message);
    } finally {
        await client.close();
    }
}

testConnection();
