const User = require('../models/User');
const asyncHandler = require('express-async-handler');
const generateToken = require('../utils/generateToken');
const bcrypt = require('bcryptjs');

// Register User
const register = asyncHandler(async (req, res) => {
  const { username, email, password, role } = req.body;

  const userExists = await User.findOne({ $or: [{ email }, { username }] });
  if (userExists) {
    res.status(400);
    throw new Error('Benutzer existiert bereits');
  }

  const user = await User.create({ username, email, password, role });
  if (user) {
    res.status(201).json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error('Ungültige Benutzerdaten');
  }
});

// Login User
const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    console.error('Email not found');
    res.status(401);
    throw new Error('Email nicht gefunden');
  }

  const isPasswordMatch = await user.matchPassword(password);
  if (!isPasswordMatch) {
    console.error('Password mismatch');
    res.status(401);
    throw new Error('Falsches Passwort');
  }

  if (user && isPasswordMatch) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error('Ungültige Email oder Passwort');
  }
});

// Get All Users
const getAllUsers = asyncHandler(async (req, res) => {
  const users = await User.find({}).select('-password');
  res.json(users);
});

// Block User
const blockUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);
  if (user) {
    user.isBlocked = true;
    await user.save();
    res.json({ message: 'User blocked' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update Profile
const updateProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.username = req.body.username || user.username;
    user.email = req.body.email || user.email;

    if (req.file) {
      user.profileImage = `/uploads/profiles/${req.file.filename}`;
    }

    if (req.body.password) {
      user.password = req.body.password;
    }

    const updatedUser = await user.save();

    res.json({
      _id: updatedUser._id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role,
      profileImage: updatedUser.profileImage,
      token: generateToken(updatedUser._id),
    });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Update User Role
const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.role = req.body.role;
    await user.save();
    res.json({ message: 'User role updated' });
  } else {
    res.status(404);
    throw new Error('User not found');
  }
});

// Forgot Password
const forgotPassword = asyncHandler(async (req, res) => {
  res.send('Forgot Password');
});

// Reset Password
const resetPassword = asyncHandler(async (req, res) => {
  res.send('Reset Password');
});

// Logout User
const logout = asyncHandler(async (req, res) => {
  res.json({ message: 'User logged out' });
});

// Delete All Users
const deleteAllUsers = asyncHandler(async (req, res) => {
  try {
    const result = await User.deleteMany({ role: { $ne: 'admin' } });
    console.log(`Deleted ${result.deletedCount} users`);
    res.json({ message: 'All non-admin users deleted', deletedCount: result.deletedCount });
  } catch (error) {
    console.error('Error deleting users:', error);
    res.status(500).json({ message: 'Failed to delete users' });
  }
});

module.exports = {
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
};