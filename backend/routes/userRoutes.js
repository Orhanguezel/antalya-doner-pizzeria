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

// Kullanıcı route'ları
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

// Korunan route'lar
router.get('/profile', protect, getProfile);
router.get('/verify-token', protect, verifyToken);
router.put('/profile', protect, upload.single('profileImage'), updateProfile);
router.post('/logout', protect, logout);

// Admin route'ları (korunan)
router.get('/', protect, admin, getAllUsers); // Tüm kullanıcıları getirme
router.put('/:id/role', protect, admin, updateUserRole); // Kullanıcı rolü güncelleme
router.put('/:id', protect, admin, updateUserByAdmin); // Admin tarafından kullanıcı güncelleme
router.delete('/:id', protect, admin, deleteUser); // Kullanıcı silme
router.delete('/delete-all', protect, admin, deleteAllUsers); // Tüm kullanıcıları silme (admin haricinde)

// Bloklama route'u (admin için)
router.put('/block/:id', protect, admin, blockUser); // Kullanıcıyı bloklama

module.exports = router;
