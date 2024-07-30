const express = require('express');
const {
  register,
  login,
  getAllUsers,
  blockUser,
  updateProfile,
  updateUserRole,
  forgotPassword,
  resetPassword,
  logout,
  deleteAllUsers,
} = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/users', protect, authorize('admin'), getAllUsers);
router.put('/users/block/:id', protect, authorize('admin'), blockUser);
router.put('/users/role/:id', protect, authorize('admin'), updateUserRole);
router.put('/users/profile', protect, updateProfile);
router.post('/forgot-password', forgotPassword);
router.put('/reset-password/:resetToken', resetPassword);
router.get('/logout', logout);
router.delete('/users', protect, authorize('admin'), deleteAllUsers);

module.exports = router;
