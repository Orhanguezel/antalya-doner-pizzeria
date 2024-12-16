const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://admin:adminpassword@localhost:27017/antalya-doner-pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  authSource: 'admin',
})
.then(() => console.log('MongoDB connected successfully'))
.catch((err) => console.error('MongoDB connection error:', err));

const testUser = async () => {
  try {
    const newUser = new User({
      username: 'testuser',
      email: 'testuser@example.com',
      password: 'password123',
      role: 'user',
      address: '123 Test Street',
      phoneNumber: '1234567890',
    });

    await newUser.save();
    console.log('User created successfully:', newUser);
  } catch (error) {
    console.error('Error creating user:', error);
  } finally {
    mongoose.connection.close();
  }
};

testUser();
