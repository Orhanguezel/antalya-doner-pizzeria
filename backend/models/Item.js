const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  nr: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  zusatztoffe: [Number],
  allergene: [String],
  description: { type: String, required: true },
  prices: {
    default: { type: Number },
    klein: Number,
    groß: Number,
    aufPommes: Number,
    kleineSchale: Number,
    großeSchale: Number
  },
  extras: Schema.Types.Mixed,
});

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
