const mongoose = require('mongoose');
const Category = require('./models/Category');

mongoose.connect('mongodb://localhost:27017/antalya-doner-pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const clearDatabase = async () => {
  try {
    await Category.deleteMany({});
    console.log('Database cleared');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error clearing database:', error);
    mongoose.connection.close();
  }
};

clearDatabase();
