const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Dosya yükleme yolunu ve adını ayarlayan storage yapılandırması
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath;

        switch (file.fieldname) {
            case 'profileImage':
                uploadPath = path.join(__dirname, '../uploads/profiles/');
                break;
            case 'blogImage':
                uploadPath = path.join(__dirname, '../uploads/blogs/');
                break;
            default:
                uploadPath = path.join(__dirname, '../uploads/others/');
                break;
        }

        // Klasör var mı kontrol et, yoksa oluştur
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
    }
});

// Dosya tipini kontrol eden fonksiyon
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif|bmp/; // Yeni kabul edilen dosya türlerini buraya ekleyin
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase()); // Dosya uzantısı kontrolü
    const mimetype = filetypes.test(file.mimetype); // Dosya MIME türü kontrolü

    if (mimetype && extname) {
        return cb(null, true); // Dosya türü doğruysa devam eder
    } else {
        cb(new Error('Error: Only image files (jpeg, jpg, png, gif) are allowed!'), false); // Hata döner
    }
}


// Dosya yükleme ayarları (dosya boyutu sınırı ve dosya tipi kontrolü dahil)
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB dosya boyutu sınırı
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

// Modülü dışa aktar
module.exports = upload;
