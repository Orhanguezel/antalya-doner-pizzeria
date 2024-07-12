const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  console.log('Register Request Body:', req.body);

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, email, password: hashedPassword });
    await user.save();

    const token = generateToken(user._id);
    res.status(201).json({ token, user });
  } catch (error) {
    console.error('Register User Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const loginUser = async (req, res) => {
  const { email, username, password } = req.body;

  console.log('Login Request Body:', req.body);

  try {
    const user = await User.findOne({ $or: [{ email }, { username }] });
    if (!user) {
      console.log('User not found with email or username:', email || username);
      return res.status(401).json({ error: 'Invalid email/username or password' });
    }

    console.log('User found:', user);
    console.log('Password from request:', password);
    console.log('Hashed Password from database:', user.password);

    const isMatch = await bcrypt.compare(password, user.password);
    console.log('Password match result:', isMatch);

    if (isMatch) {
      const token = generateToken(user._id);
      res.json({ token, user });
    } else {
      console.log('Invalid password for user:', email || username);
      res.status(401).json({ error: 'Invalid email/username or password' });
    }
  } catch (error) {
    console.error('Login User Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.json(user);
  } catch (error) {
    console.error('Get User Profile Error:', error.message);
    res.status(500).json({ error: error.message });
  }
};

module.exports = { registerUser, loginUser, getUserProfile };
