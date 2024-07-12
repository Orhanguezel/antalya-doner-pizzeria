require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// MongoDB bağlantısını kur
const uri = process.env.MONGO_URI;
console.log('MongoDB URI:', uri);

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.set('strictQuery', false);

// Admin kullanıcı bilgileri
const adminUsername = 'admin';
const adminEmail = 'admin@example.com';
const adminPassword = 'adminpassword';

// Şifreyi hashle ve admin kullanıcısını kaydet
const createAdminUser = async () => {
  try {
    const existingUser = await User.findOne({ email: adminEmail });
    if (existingUser) {
      console.log('Admin user already exists');
      mongoose.connection.close();
      return;
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10);
    const adminUser = new User({
      username: adminUsername,
      email: adminEmail,
      password: hashedPassword,
      role: 'admin',
    });

    await adminUser.save();
    console.log('Admin user created successfully');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error creating admin user:', error);
    mongoose.connection.close();
  }
};

createAdminUser();
