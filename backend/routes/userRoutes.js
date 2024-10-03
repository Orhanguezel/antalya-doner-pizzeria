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
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

// Benutzer-Route (Kullanıcı route'ları)
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword); // Şifre sıfırlama isteği
router.put('/reset-password/:token', resetPassword); // Şifre sıfırlama işlemi

// Geschützte Route (Korunan route'lar)
router.get('/profile', protect, getProfile);
router.get('/verify-token', protect, verifyToken);
router.put('/profile', protect, upload.single('profileImage'), updateProfile);
router.post('/logout', protect, logout);

// Admin-Route (Yönetici route'ları)
router.get('/', protect, admin, getAllUsers); // Tüm kullanıcıları getirme
router.put('/:id/role', protect, admin, updateUserRole); // Kullanıcı rolü güncelleme
router.put('/:id', protect, admin, updateUserByAdmin); // Admin tarafından kullanıcı güncelleme
router.delete('/:id', protect, admin, deleteUser); // Kullanıcı silme
router.delete('/delete-all', protect, admin, deleteAllUsers); // Tüm kullanıcıları silme (admin haricinde)

// Sperren Route (Bloklama route'u)
router.put('/block/:id', protect, admin, blockUser); // Kullanıcıyı bloklama

module.exports = router;
