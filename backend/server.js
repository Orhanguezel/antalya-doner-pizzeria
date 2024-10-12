const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http'); // HTTP sunucusu ekleniyor
const { Server } = require('socket.io'); // Socket.io ekleniyor

// Load environment variables from .env file
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 5001;

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'https://www.antalya-doner-pizzeria.de',  // Production URL here
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());  // To parse JSON payloads

// MongoDB connection with retry logic
const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/antalya_doner_pizzeria';
const connectWithRetry = () => {
    mongoose.connect(mongoUri)
        .then(() => {
            console.log('MongoDB database connection established successfully');
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error.message);
            setTimeout(connectWithRetry, 5001); // Retry after 5 seconds
        });
};

connectWithRetry();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);

// Serve static files
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// Root route
app.get('/', (req, res) => {
    res.send('Backend is running');
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: 'Something broke!',
        error: process.env.NODE_ENV !== 'production' ? err.message : undefined
    });
});

// HTTP sunucusunu oluşturma
const server = http.createServer(app);

// Socket.io sunucusunu başlatma
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL || 'https://www.antalya-doner-pizzeria.de',  // Production URL here
        methods: ['GET', 'POST']
    }
});

// Socket.io bağlantı dinleyicisi
io.on('connection', (socket) => {
    console.log('Yeni bir kullanıcı bağlandı:', socket.id);

    // Sipariş geldiğinde tüm adminlere bildirim gönderme
    socket.on('newOrder', (order) => {
        console.log('Yeni sipariş:', order);
        io.emit('orderNotification', order); // Tüm bağlı kullanıcılara bildirimi gönder
    });

    socket.on('disconnect', () => {
        console.log('Kullanıcı bağlantısı kesildi:', socket.id);
    });
});

// Sunucuyu başlatma
server.listen(port, () => {
    console.log(`Server is running on port: ${port} in ${process.env.NODE_ENV} mode`);
});
