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
const orderRoutes = require('./routes/orderRoutes');

// Express uygulaması ve port ayarı
const app = express();
const port = process.env.PORT || 5001;

// Global MongoDB URI
if (!global.mongoUri) {
    global.mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/antalya-doner-pizzeria';
}

// **CORS** Yapılandırması
const corsOptions = {
    origin: [
        'http://localhost:3001', // Geliştirme ortamı
        'https://www.antalya-doner-pizzeria.de', // Canlı ortam
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true, // Kimlik doğrulama ve çerezler için
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json()); // JSON veri işlemesi
app.use(express.urlencoded({ extended: true })); // URL-encoded veriler için

// **MongoDB** Bağlantısı
const connectWithRetry = () => {
    mongoose
        .connect(global.mongoUri, {
            user: process.env.MONGO_USER || 'admin',
            pass: process.env.MONGO_PASSWORD || 'adminpassword',
            authSource: process.env.MONGO_AUTH_SOURCE || 'admin',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('✅ MongoDB bağlantısı başarılı.'))
        .catch((error) => {
            console.error('❌ MongoDB bağlantı hatası:', error.message);
            setTimeout(connectWithRetry, 5000); // Bağlantı hatasında 5 saniye sonra tekrar dene
        });
};

connectWithRetry();

// **Route'lar**
app.use('/api/users', userRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/subcategories', subcategoryRoutes);
app.use('/api/items', itemRoutes);
app.use('/api/orders', orderRoutes);

// **Statik Dosya Servisi**
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
app.use(express.static(path.join(__dirname, 'public')));

// **Root Route**
app.get('/', (req, res) => {
    res.send('🚀 Backend is running!');
});

// **Error Middleware**
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
        message: '⚠️ Bir hata oluştu!',
        error: process.env.NODE_ENV !== 'production' ? err.message : undefined,
    });
});

// **HTTP ve Socket.io Sunucusu**
const server = http.createServer(app);

// **Socket.io Ayarları**
const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:3001',
            'https://www.antalya-doner-pizzeria.de',
        ],
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        credentials: true,
    },
});

// **Socket.io Bağlantı Dinleyicisi**
io.on('connection', (socket) => {
    console.log('🟢 Yeni bir kullanıcı bağlandı:', socket.id);

    // Yeni sipariş bildirimi
    socket.on('newOrder', (order) => {
        console.log('📦 Yeni sipariş alındı:', order);
        io.emit('orderNotification', order); // Tüm bağlı istemcilere gönder
    });

    socket.on('disconnect', () => {
        console.log('🔴 Kullanıcı bağlantısı kesildi:', socket.id);
    });
});

// **Sunucu Başlatma**
server.listen(port, () => {
    console.log(`🚀 Sunucu ${port} portunda ${process.env.NODE_ENV || 'development'} modunda çalışıyor.`);
});
