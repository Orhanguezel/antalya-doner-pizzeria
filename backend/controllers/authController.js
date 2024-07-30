const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const CustomError = require('../utils/CustomError');

const register = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await User.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return next(new CustomError('Username or email already exists', 400));
    }

    const user = await User.create({ username, email, password });

    res.status(201).json({
      success: true,
      data: {
        username: user.username,
        email: user.email,
        _id: user._id
      }
    });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    console.log(`Login request: ${JSON.stringify(req.body)}`);

    const user = await User.findOne({ email }).select('+password');
    if (!user) {
      console.log('User not found');
      return next(new CustomError('Invalid credentials', 400));
    }

    console.log(`User found: ${JSON.stringify(user)}`);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log(`Password provided: ${password}`);
    console.log(`Password in database: ${user.password}`);
    console.log(`Password match: ${isMatch}`);

    if (!isMatch) {
      return next(new CustomError('Invalid credentials', 400));
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.status(200).json({
      success: true,
      token
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { register, login };
