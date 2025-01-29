const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

// Middleware: Kullanıcıyı doğrula
const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Authorization başlığından token'i al
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Token'i ayır ve doğrula
            token = req.headers.authorization.split(' ')[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Kullanıcıyı bul ve password hariç bilgileri getir
            req.user = await User.findById(decoded.id).select('-password');

            if (!req.user) {
                res.status(401);
                throw new Error('Kullanıcı bulunamadı, yetkilendirme başarısız');
            }

            next();
        } catch (error) {
            console.error('Token doğrulama başarısız:', error.message);
            res.status(401);
            throw new Error('Yetkilendirme başarısız, geçersiz token');
        }
    } else {
        res.status(401);
        throw new Error('Yetkilendirme başarısız, token eksik');
    }
});

// Middleware: Belirli rol(ler)i doğrula
const authorizeRoles = (...roles) => {
    return (req, res, next) => {
        if (req.user && roles.includes(req.user.role)) {
            next();
        } else {
            res.status(403);
            throw new Error(`Yetkilendirme başarısız, gerekli roller: ${roles.join(', ')}`);
        }
    };
};

module.exports = { protect, authorizeRoles };

