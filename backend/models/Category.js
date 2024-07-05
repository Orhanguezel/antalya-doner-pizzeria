const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  nr: String,
  type: String,
  name: String,
  zusatztoffe: [Number],
  allergene: [String],
  description: String,
  prices: {
    default: Number,
    klein: Number,
    groß: Number,
    kleineSchale: Number,
    großeSchale: Number,
  },
  image: String,
  extras: {
    additional_items: [String],
    additional_price: Number,
    premium_items: [String],
    premium_price: Number
  }
});

const subcategorySchema = new mongoose.Schema({
  name: String,
  description: String,
  images: [String],
  items: [itemSchema]
});

const categorySchema = new mongoose.Schema({
  name: String,
  description: String,
  subcategories: [subcategorySchema]
});

module.exports = mongoose.model('Category', categorySchema);
