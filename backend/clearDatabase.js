const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Category = require('./models/Category'); // Category modelini doğru şekilde import edin
const Subcategory = require('./models/Subcategory'); // Subcategory modelini doğru şekilde import edin
const Item = require('./models/Item'); // Item modelini doğru şekilde import edin

// .env dosyasındaki değişkenleri yükle
dotenv.config();

mongoose.set('strictQuery', false);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 saniye zaman aşımı
      socketTimeoutMS: 45000, // 45 saniye zaman aşımı
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1); // Bağlantı hatası durumunda süreci sonlandır
  }
};

const clearDatabase = async () => {
  try {
    await connectDB();
    await Category.deleteMany({});
    await Subcategory.deleteMany({});
    await Item.deleteMany({});
    console.log('Categories, subcategories, and items cleared');
  } catch (error) {
    console.error('Error clearing categories:', error);
  } finally {
    mongoose.connection.close();
  }
};

clearDatabase();
