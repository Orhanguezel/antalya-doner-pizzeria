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
  updateUserByAdmin
} = require('../controllers/userController');

const { protect, admin } = require('../middleware/authMiddleware');
const { upload, processProfileImage } = require('../middleware/uploadMiddleware');

const router = express.Router();

// Kullanıcı route'ları
router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:token', resetPassword);

// Korunan route'lar
router.get('/profile', protect, getProfile);
router.get('/verify-token', protect, verifyToken);
router.put('/profile', protect, upload.single('profileImage'), processProfileImage, updateProfile);
router.post('/logout', protect, logout);

// Admin route'ları
router.get('/', protect, admin, getAllUsers);
router.put('/:id/role', protect, admin, updateUserRole);
router.put('/:id', protect, admin, updateUserByAdmin);
router.delete('/:id', protect, admin, deleteUser);
router.delete('/delete-all', protect, admin, deleteAllUsers);

// Kullanıcı bloklama route'u
router.put('/block/:id', protect, admin, blockUser);

module.exports = router;
