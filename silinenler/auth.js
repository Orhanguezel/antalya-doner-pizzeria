const express = require('express');
const {
  register,
  login,
  getAllUsers,
  deleteUser,
  updateUserRole,
  updateProfile,
  uploadProfileImage,
  forgotPassword,
  resetPassword,
  logout,
  deleteAllUsers
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, getAllUsers);
router.delete('/user/:id', protect, authorize('admin'), deleteUser);
router.put('/user/:id/role', protect, authorize('admin'), updateUserRole);
router.put('/profile', protect, updateProfile);
router.post('/upload-profile-image', protect, uploadProfileImage);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.post('/logout', protect, logout);
router.delete('/delete_all_users', protect, authorize('admin'), deleteAllUsers); // Doğru route

module.exports = router;
