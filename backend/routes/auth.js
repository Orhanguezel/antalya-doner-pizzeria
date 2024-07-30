const express = require('express');
const { register, login, getAllUsers } = require('../controllers/authController');
const { protect, authorize } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);

// Get all users
router.get('/users', protect, authorize('admin'), getAllUsers);

module.exports = router;
