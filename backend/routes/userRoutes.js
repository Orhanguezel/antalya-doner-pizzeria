const express = require('express');
const {
    register,
    login,
    getProfile,
    verifyToken,
    getAllUsers,
    blockUser,
    updateProfile,
    updateUserRole,
    forgotPassword,
    resetPassword,
    logout,
    deleteAllUsers,
    deleteUser,
    updateUserByAdmin,
} = require('../controllers/userController');

const { protect, authorizeRoles } = require('../middleware/authMiddleware');
const { upload, processProfileImage } = require('../middleware/uploadMiddleware');

const router = express.Router();

// **Genel Kullanıcı Route'ları**
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// **Korunan Kullanıcı Route'ları**
router.use(protect); // Tüm aşağıdaki route'lar için koruma uygula

router.get('/profile', getProfile);
router.get('/verify-token', verifyToken);
router.put('/profile', upload.single('profileImage'), processProfileImage, updateProfile);
router.post('/logout', logout);

// **Admin Route'ları**
router.use(authorizeRoles('admin')); // Admin yetkilendirmesi uygula

router.get('/', getAllUsers);
router.put('/:id/role', updateUserRole);
router.put('/:id', updateUserByAdmin);
router.delete('/:id', deleteUser);
router.delete('/delete-all', deleteAllUsers);
router.put('/block/:id', blockUser);

module.exports = router;

