const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getUserProfile } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

router.post('/register', registerUser);
router.post('/login', loginUser); // Bu yolun doğru olduğundan emin olun
router.get('/profile', protect, getUserProfile);

module.exports = router;
