const mongoose = require('mongoose');
const Category = require('./models/Category'); // Correctly import the Category model
const Subcategory = require('./models/Subcategory'); // Correctly import the Subcategory model
const Item = require('./models/Item'); // Correctly import the Item model

mongoose.connect('mongodb://localhost:27017/antalya-doner-pizzeria', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('strictQuery', false);

const clearDatabase = async () => {
  try {
    await Category.deleteMany({});
    await Subcategory.deleteMany({});
    await Item.deleteMany({});
    console.log('Categories, subcategories, and items cleared');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error clearing categories:', error);
    mongoose.connection.close();
  }
};

clearDatabase();
