const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  nr: String,
  type: String,
  name: String,
  zusatztoffe: [Number],
  allergene: [String],
  description: String,
  prices: {
    klein: Number,
    groß: Number,
    default: Number,
  },
  image: String,
  extras: {
    type: Map,
    of: Number
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
