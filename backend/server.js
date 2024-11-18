const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
require('dotenv').config();

// Import routes
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const orderRoutes = require('./routes/orderRoutes')
const app = express();
const port = process.env.PORT || 5001;
if (!global.mongoUri) {
    global.mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/antalya-doner-pizzeria';
  }

// CORS configuration
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'https://www.antalya-doner-pizzeria.de',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));


app.use(express.json());  // To parse JSON payloads

// MongoDB connection with retry logic
const connectWithRetry = () => {
    mongoose.connect(global.mongoUri, {
        user: process.env.MONGO_USER,
        pass: process.env.MONGO_PASSWORD,
        authSource: process.env.MONGO_AUTH_SOURCE || 'admin',
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    
    .then(() => {
        console.log('MongoDB connection established successfully');
    })
    .catch((error) => {
        console.error('MongoDB connection error:', error.message);
        setTimeout(connectWithRetry, 5001); // Retry connection after 5 seconds
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

// HTTP server setup
const server = http.createServer(app);

// Socket.io setup
const io = new Server(server, {
    cors: {
        origin: process.env.FRONTEND_URL,  // Production URL from environment
        methods: ['GET', 'POST']
    }
});

// Socket.io connection listener
io.on('connection', (socket) => {
    console.log('A new user connected:', socket.id);

    // Notify all admins when a new order is placed
    socket.on('newOrder', (order) => {
        console.log('New order received:', order);
        io.emit('orderNotification', order); // Broadcast to all connected clients
    });

    socket.on('disconnect', () => {
        console.log('User disconnected:', socket.id);
    });
});

// Start server
server.listen(port, () => {
    console.log(`Server is running on port: ${port} in ${process.env.NODE_ENV || 'development'} mode`);
});