const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');

// .env dosyasını sadece geliştirme ortamında yükleyin
if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config();
}

const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const itemRoutes = require('./routes/itemRoutes'); // Burada itemRoutes'u eklediğinizden emin olun
const orderRoutes = require('./routes/orderRoutes');

const app = express();
const port = process.env.PORT || 5000;

// CORS yapılandırması
const corsOptions = {
    origin: process.env.FRONTEND_URL || 'http://localhost:3000', // Frontend'in adresini buraya ekleyin
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // İzin verilen HTTP metodları
    credentials: true, // Credential'ları destekleyin (örn. cookie gönderme)
    optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());

// MongoDB connection
const mongoUri = process.env.MONGO_URI;
const connectWithRetry = () => {
    mongoose.connect(mongoUri, { useNewUrlParser: true, useUnifiedTopology: true })
        .then(() => {
            console.log('MongoDB database connection established successfully');
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error.message);
            setTimeout(connectWithRetry, 5000); // Retry connection after 5 seconds
        });
};

connectWithRetry();

// Routes
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/items', itemRoutes); // Burada itemRoutes'u eklediğinizden emin olun
app.use('/api/orders', orderRoutes);

// Static file serving
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
app.use(express.static(path.join(__dirname, 'public'))); // Tüm statik dosyalar için servis

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

// Server başlatma
app.listen(port, () => {
    console.log(`Server is running on port: ${port} in ${process.env.NODE_ENV} mode`);
});

// Yüklü route'ları loglama (Sadece geliştirme ortamında)
if (process.env.NODE_ENV !== 'production') {
    console.log('Loaded Routes:');
    app._router.stack.forEach(function (r) {
        if (r.route && r.route.path) {
            console.log(r.route.path);
        }
    });
}
