const multer = require('multer');
const sharp = require('sharp');
const path = require('path');
const fs = require('fs');

// Dosya yükleme için multer storage yapılandırması
const storage = multer.memoryStorage(); // Resmi bellekte geçici olarak tutar

// Dosya tipi kontrolü
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|bmp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only image files (jpeg, jpg, png, gif) are allowed!'), false);
    }
}

// Multer ayarları
const upload = multer({
    storage: storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5 MB dosya boyutu sınırı
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

// Profil resmi yükleme middleware
const processProfileImage = async (req, res, next) => {
    if (!req.file) return next();

    const uploadPath = path.join(__dirname, '../uploads/profiles');

    // Klasör yoksa oluştur
    fs.mkdirSync(uploadPath, { recursive: true });

    try {
        const filename = `profileImage-${Date.now()}-${Math.round(Math.random() * 1E9)}.jpg`;

        await sharp(req.file.buffer)
            .resize({ width: 200, height: 200, fit: 'cover' }) // Resmi 200x200 boyutunda küçült
            .toFormat('jpeg') // Formatı JPEG yap
            .jpeg({ quality: 80 }) // Kaliteyi %80'e düşür
            .toFile(path.join(uploadPath, filename)); // Dosyayı kaydet

        req.file.filename = filename; // Yeni dosya adını req.file'a ekle
        next();
    } catch (error) {
        console.error('Resim işleme hatası:', error.message);
        res.status(500).json({ message: 'Resim yüklenirken bir hata oluştu.' });
    }
};

module.exports = { upload, processProfileImage };
