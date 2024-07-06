const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  prices: {
    default: { type: Number, required: true },
    klein: { type: Number },
    groß: { type: Number },
    kleineSchale: { type: Number },
    großeSchale: { type: Number }
  },
  extras: {
    type: Map,
    of: Number
  },
  image: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});

module.exports = mongoose.model('Item', itemSchema);
