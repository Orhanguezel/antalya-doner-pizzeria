const path = require('path');
require('dotenv').config({
    path: process.env.NODE_ENV === 'production'
        ? path.resolve(__dirname, '.env.production')
        : path.resolve(__dirname, '.env.development'),
});


const config = {
    env: process.env.NODE_ENV || 'development',
    port: process.env.PORT || 5001,
    mongo: {
        uri: process.env.MONGO_URI || 'mongodb://localhost:27017/antalya-doner-pizzeria',
        user: process.env.MONGO_USER || '',
        password: process.env.MONGO_PASSWORD || '',
        authSource: process.env.MONGO_AUTH_SOURCE || '',
    },
    cors: {
        origins: [
            process.env.FRONTEND_URL || 'http://localhost:3001',
            'https://www.antalya-doner-pizzeria.de',
        ],
    },
};

module.exports = config;


