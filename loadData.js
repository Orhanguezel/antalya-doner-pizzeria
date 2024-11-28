require('dotenv').config({ path: './.env.local' });
const mongoose = require('mongoose');
const Category = require('./models/Category');
const Subcategory = require('./models/Subcategory');
const Item = require('./models/Item');

// Insert data dosyalarını içeri aktar
const insertData1 = require('./insertData1');
const insertData2 = require('./insertData2');
const insertData3 = require('./insertData3');
const insertData4 = require('./insertData4');
const insertData5 = require('./insertData5');
const insertData6 = require('./insertData6');

// Tüm veriler bir arada
const allData = [insertData1, insertData2, insertData3, insertData4, insertData5, insertData6];

// MongoDB bağlantısı
const uri = process.env.MONGO_URI;

if (!uri) {
  throw new Error('MONGO_URI is not defined in .env.local file');
}

mongoose.connect(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

mongoose.set('strictQuery', false);

const insertData = async (data) => {
  try {
    const subcategories = [];
    for (const subcategoryData of data.subcategories) {
      const items = await Item.insertMany(subcategoryData.items);
      const subcategory = {
        ...subcategoryData,
        items: items.map(item => item._id),
      };
      const subcat = new Subcategory(subcategory);
      await subcat.save();
      subcategories.push(subcat._id);
    }

    const category = new Category({
      ...data,
      subcategories,
    });

    await category.save();
    console.log(`Category "${data.name}" successfully inserted`);
  } catch (error) {
    console.error(`Error inserting data for "${data.name}":`, error.message);
  }
};

const loadAllData = async () => {
  try {
    for (const data of allData) {
      await insertData(data);
    }
    console.log('All data successfully loaded');
    mongoose.connection.close();
  } catch (error) {
    console.error('Error loading data:', error.message);
    mongoose.connection.close();
  }
};

loadAllData();
