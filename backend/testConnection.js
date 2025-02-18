const mongoose = require('mongoose');

const testConnection = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            authSource: process.env.MONGO_AUTH_SOURCE || 'admin',
        });
        console.log('✅ MongoDB connection established successfully');
    } catch (err) {
        console.error('❌ MongoDB connection error:', err.message);
    } finally {
        mongoose.connection.close();
    }
};

testConnection();

