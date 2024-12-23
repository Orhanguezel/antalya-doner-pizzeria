const multer = require('multer');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp'); // Resimleri küçültmek için

// Yükleme klasörlerini tanımlayın
const UPLOAD_DIR = path.join(__dirname, '../uploads'); // Ana yükleme klasörü

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath;

        switch (file.fieldname) {
            case 'profileImage':
                uploadPath = path.join(UPLOAD_DIR, 'profiles');
                break;
            case 'blogImage':
                uploadPath = path.join(UPLOAD_DIR, 'blogs');
                break;
            default:
                uploadPath = path.join(UPLOAD_DIR, 'others');
                break;
        }

        // Klasör oluştur (recursive)
        fs.mkdir(uploadPath, { recursive: true }, (err) => {
            if (err) {
                return cb(new Error('Upload directory creation failed!'));
            }
            cb(null, uploadPath);
        });
    },
    filename: (req, file, cb) => {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

// Dosya tipini kontrol eden fonksiyon
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|bmp/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only image files are allowed!'), false);
    }
}

const upload = multer({
    storage: storage,
    limits: { fileSize: 2 * 1024 * 1024 }, // 2MB sınırı
    fileFilter: (req, file, cb) => checkFileType(file, cb),
});

// **Profil resmi küçültme middleware'i**
const processProfileImage = async (req, res, next) => {
    if (!req.file) return next();

    const filePath = req.file.path; // Orijinal dosya yolu
    const resizedFileName = `resized-${req.file.filename}`;
    const resizedFilePath = path.join(path.dirname(filePath), resizedFileName);

    try {
        await sharp(filePath)
            .resize(300, 300, { fit: 'cover' })
            .toFormat('jpeg')
            .jpeg({ quality: 80 })
            .toFile(resizedFilePath);

        // Orijinal dosyayı sil
        fs.unlink(filePath, (err) => {
            if (err) console.error('Original file deletion error:', err);
        });

        // Güncellenmiş dosya yolu
        req.file.filename = resizedFileName;
        req.file.path = resizedFilePath;
        next();
    } catch (error) {
        console.error('Image processing failed:', error);
        return res.status(500).json({ message: 'Resim işlenirken hata oluştu' });
    }
};

module.exports = { upload, processProfileImage };
