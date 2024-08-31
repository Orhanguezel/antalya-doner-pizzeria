const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/User');

const protect = asyncHandler(async (req, res, next) => {
    let token;

    // Bearer token kontrolü
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1];  // "Bearer <token>" şeklindeki header'dan token'ı alıyoruz
            const decoded = jwt.verify(token, process.env.JWT_SECRET);  // JWT token'ı doğruluyoruz

            // Kullanıcıyı token'dan alıyoruz
            req.user = await User.findById(decoded.id).select('-password');  // Kullanıcıyı DB'den alıyoruz, password'u çıkartıyoruz

            if (!req.user) {
                res.status(401);
                throw new Error('Not authorized, user not found');  // Eğer kullanıcı bulunamazsa hata döndürüyoruz
            }

            next();  // Eğer her şey doğruysa, sonraki middleware'e geçiyoruz
        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401);
            throw new Error('Not authorized, token failed');  // Token doğrulama başarısız olursa hata döndürüyoruz
        }
    } else {
        res.status(401);
        throw new Error('Not authorized, no token');  // Token yoksa hata döndürüyoruz
    }
});

// Admin yetkisi kontrolü
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {  // Kullanıcının rolü admin mi kontrol ediyoruz
        next();  // Eğer adminse, sonraki middleware'e geçiyoruz
    } else {
        res.status(403);  // 403 Forbidden, çünkü kullanıcı var ama yetkisi yok
        throw new Error('Not authorized as an admin');
    }
};

module.exports = { protect, admin };
