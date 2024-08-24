const multer = require('multer');
const path = require('path');

// Set storage engine with dynamic paths
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let uploadPath;

        // Determine the upload path based on the fieldname
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

        cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
        // Generate a unique filename
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, `${file.fieldname}-${uniqueSuffix}${path.extname(file.originalname)}`);
    }
});

// File type validation function
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb(new Error('Error: Only image files (jpeg, jpg, png, gif) are allowed!'), false);
    }
}

// Initialize the upload middleware
const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 }, // 1MB file size limit
    fileFilter: (req, file, cb) => {
        checkFileType(file, cb);
    }
});

// Export the middleware for single file upload
module.exports = upload;
