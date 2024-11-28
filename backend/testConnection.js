const mongoose = require('mongoose');

const uri = 'mongodb://admin:adminpassword@localhost:27017/antalya-doner-pizzeria';

mongoose.connect(uri, {
  user: 'admin',
  pass: 'adminpassword',
  authSource: 'admin',
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('MongoDB connection established successfully');
    mongoose.connection.close();
  })
  .catch((err) => {
    console.error('MongoDB connection error:', err);
  });
