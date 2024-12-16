const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://admin:adminpassword@localhost:27017/antalya-doner-pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

const testLogin = async () => {
  try {
    const user = await User.findOne({ email: 'testuser@example.com' });
    if (!user) {
      console.log('User not found');
      return;
    }

    const isMatch = await user.matchPassword('password123');
    if (!isMatch) {
      console.log('Invalid credentials');
      return;
    }

    console.log('Login successful:', user);
  } catch (error) {
    console.error('Error logging in:', error);
  } finally {
    mongoose.connection.close();
  }
};

testLogin();
