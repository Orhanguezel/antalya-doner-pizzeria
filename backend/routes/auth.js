const express = require('express');
const { register, login, getAllUsers, blockUser } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Get all users
router.get('/users', protect, authorize('admin'), getAllUsers);

// Block user
router.put('/users/block/:id', protect, authorize('admin'), blockUser);

module.exports = router;
