const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((err) => {
  console.error('Error connecting to MongoDB:', err);
});

async function createUsers() {
  const plainPassword = 'password123';
  const hashedPassword1 = await bcrypt.hash(plainPassword, 10);
  const hashedPassword2 = await bcrypt.hash(plainPassword, 10);

  console.log('Admin hashed password:', hashedPassword1);
  console.log('User hashed password:', hashedPassword2);

  const users = [
    {
      username: 'superadmin',
      email: 'superadmin@example.com',
      password: hashedPassword1,
      role: 'admin',
      profile_image: 'default.jpg',
      blocked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      username: 'user1',
      email: 'user1@example.com',
      password: hashedPassword2,
      role: 'user',
      profile_image: 'default.jpg',
      blocked: false,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ];

  try {
    await User.deleteMany({});
    await User.insertMany(users);
    console.log('Users created successfully');
  } catch (err) {
    console.error('Error creating users:', err);
  } finally {
    mongoose.connection.close();
  }
}

createUsers();
