const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://admin:adminpassword@localhost:27017/antalya-doner-pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

const testResetToken = async () => {
  try {
    const user = await User.findOne({ email: 'testuser@example.com' });
    if (!user) {
      console.log('User not found');
      return;
    }

    const resetToken = user.getResetPasswordToken();
    await user.save();

    console.log('Password reset token:', resetToken);
    console.log('Save this token and use it for resetting the password.');
  } catch (error) {
    console.error('Error generating reset token:', error);
  } finally {
    mongoose.connection.close();
  }
};

testResetToken();
