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
  deleteUser,
  updateUserByAdmin,
} = require('../controllers/userController');
const { protect, admin } = require('../middleware/authMiddleware');
const upload = require('../middleware/uploadMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.put('/profile', protect, upload.single('profileImage'), updateProfile);
router.post('/logout', protect, logout);

router.get('/', protect, admin, getAllUsers);
router.put('/:id/role', protect, admin, updateUserRole);
router.put('/:id', protect, admin, updateUserByAdmin); // Admin tarafından kullanıcı güncelleme
router.delete('/:id', protect, admin, deleteUser); // Kullanıcı silme route'u
router.delete('/delete-all', protect, admin, deleteAllUsers);

module.exports = router;
