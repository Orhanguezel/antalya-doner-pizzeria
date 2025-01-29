const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const http = require('http');
const { Server } = require('socket.io');
const config = require('./config');

// Import routes
const userRoutes = require('./routes/userRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const subcategoryRoutes = require('./routes/subcategoryRoutes');
const itemRoutes = require('./routes/itemRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Express uygulaması
const app = express();

// **CORS** Yapılandırması
const corsOptions = {
    origin: config.cors.origins,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// **MongoDB** Bağlantısı
const connectWithRetry = () => {
    console.log(`🔄 MongoDB'ye bağlanılıyor: ${config.mongo.uri}`);
    mongoose
        .connect(config.mongo.uri, {
            user: config.mongo.user,
            pass: config.mongo.password,
            authSource: config.mongo.authSource || 'admin',
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => console.log('✅ MongoDB bağlantısı başarılı.'))
        .catch((error) => {
            console.error(`❌ MongoDB bağlantı hatası: ${error.message}`);
            console.log('⏳ 5 saniye sonra tekrar denenecek...');
            setTimeout(connectWithRetry, 5000);
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
        error: config.env !== 'production' ? err.message : undefined,
    });
});

// **HTTP ve Socket.io Sunucusu**
const server = http.createServer(app);

// **Socket.io Ayarları**
const io = new Server(server, {
    cors: {
        origin: config.cors.origins,
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
        io.emit('orderNotification', order);
    });

    socket.on('disconnect', () => {
        console.log('🔴 Kullanıcı bağlantısı kesildi:', socket.id);
    });
});

// **Sunucu Başlatma**
server.listen(config.port, () => {
    console.log(`🚀 Sunucu ${config.port} portunda ${config.env} modunda çalışıyor.`);
});
