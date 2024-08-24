const mongoose = require('mongoose');
require('dotenv').config();
const Blog = require('../models/blog.model');
const Category = require('../models/Category');
const User = require('../models/User');

const clearDatabase = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        console.log(`MONGO_URI: ${process.env.MONGO_URI}`);
        await Blog.deleteMany({});
        await Category.deleteMany({});
        await User.deleteMany({});
        console.log('Database cleared');
        mongoose.connection.close();
    } catch (error) {
        console.error('Error clearing database:', error.message);
    }
};

clearDatabase();
