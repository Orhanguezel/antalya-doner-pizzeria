const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const CustomError = require('../utils/CustomError');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');
const { OAuth2Client } = require('google-auth-library');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// Helper function to create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '1h' });
};

// Google Login
const googleLogin = async (req, res, next) => {
  const { token } = req.body;

  try {
    const ticket = await client.verifyIdToken({
      idToken: token,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { name, email, picture } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      user = await User.create({
        username: name,
        email,
        profile_image: picture,
        password: '', // Google hesabıyla kaydolduğu için şifre yok
        role: 'user',
      });
    }

    const authToken = createToken(user._id);

    res.status(200).json({
      success: true,
      token: authToken,
      data: {
        username: user.username,
        email: user.email,
        role: user.role,
        profile_image: user.profile_image,
        blocked: user.blocked,
        _id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(new CustomError('Google login failed', 500));
  }
};

// Register user
const register = async (req, res, next) => {
  try {
    const { username, email, password, role } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return next(new CustomError('Username or email already exists', 400));
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      username,
      email,
      password: hashedPassword,
      role: role || 'user',
    });

    const token = createToken(user._id);

    res.status(201).json({
      success: true,
      token,
      data: {
        username: user.username,
        email: user.email,
        role: user.role,
        profile_image: user.profile_image,
        blocked: user.blocked,
        _id: user._id,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log("Login request received with email:", email); // Debugging
    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await bcrypt.compare(password, user.password))) {
      console.log("Invalid credentials for email:", email); // Debugging
      return next(new CustomError('Invalid credentials', 400));
    }

    if (user.blocked) {
      console.log("Blocked user tried to login:", email); // Debugging
      return next(new CustomError('Your account has been blocked', 403));
    }

    const token = createToken(user._id);
    console.log("Login successful for email:", email); // Debugging

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    console.error('Login error:', error); // Debugging
    next(error);
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({});
    res.status(200).json({
      success: true,
      data: users // Ensure this is an array
    });
  } catch (error) {
    next(error);
  }
};

// Block user
const blockUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new CustomError('User not found', 404));
    }

    user.blocked = true;
    await user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Update user profile
const updateProfile = async (req, res, next) => {
  try {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['username', 'email', 'password', 'profile_image'];
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update));

    if (!isValidOperation) {
      return next(new CustomError('Invalid updates', 400));
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return next(new CustomError('User not found', 404));
    }

    updates.forEach((update) => (user[update] = req.body[update]));
    if (req.body.password) {
      user.password = await bcrypt.hash(req.body.password, 10);
    }

    await user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Update user role
const updateUserRole = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return next(new CustomError('User not found', 404));
    }

    user.role = req.body.role;
    await user.save();

    res.status(200).json({
      success: true,
      data: user,
    });
  } catch (error) {
    next(error);
  }
};

// Forgot password
const forgotPassword = async (req, res, next) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return next(new CustomError('User not found', 404));
    }

    const resetToken = user.getResetPasswordToken();
    await user.save({ validateBeforeSave: false });

    const resetUrl = `${req.protocol}://${req.get('host')}/api/auth/reset-password/${resetToken}`;
    const message = `You are receiving this email because you (or someone else) has requested the reset of a password. Please make a PUT request to: \n\n ${resetUrl}`;

    try {
      await sendEmail({
        email: user.email,
        subject: 'Password reset token',
        message,
      });

      res.status(200).json({ success: true, data: 'Email sent' });
    } catch (error) {
      user.resetPasswordToken = undefined;
      user.resetPasswordExpire = undefined;
      await user.save({ validateBeforeSave: false });
      return next(new CustomError('Email could not be sent', 500));
    }
  } catch (error) {
    next(error);
  }
};

// Reset password
const resetPassword = async (req, res, next) => {
  const resetPasswordToken = crypto.createHash('sha256').update(req.params.resetToken).digest('hex');

  try {
    const user = await User.findOne({
      resetPasswordToken,
      resetPasswordExpire: { $gt: Date.now() },
    });

    if (!user) {
      return next(new CustomError('Invalid token', 400));
    }

    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save();

    const token = createToken(user._id);

    res.status(200).json({
      success: true,
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Logout user
const logout = (req, res) => {
  res.status(200).json({ success: true, data: 'User logged out' });
};

// Delete all users
const deleteAllUsers = async (req, res, next) => {
  try {
    await User.deleteMany({});
    res.status(200).json({ success: true, message: 'All users deleted' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
  googleLogin,
  getAllUsers,
  blockUser,
  updateProfile,
  updateUserRole,
  forgotPassword,
  resetPassword,
  logout,
  deleteAllUsers,
};
