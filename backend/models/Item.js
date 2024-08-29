const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const itemSchema = new Schema({
  nr: { type: String, required: true },
  type: { type: String, required: true },
  name: { type: String, required: true },
  zusatztoffe: [Number],
  allergene: [String],
  description: { type: String }, // Description is optional
  prices: {
    default: { type: Number }, // Default price
    klein: Number,
    groß: Number,
    aufPommes: Number,
    kleineSchale: Number,
    großeSchale: Number
  },
  extras: { type: Schema.Types.Mixed, default: null }, // Extras are optional
}, { timestamps: true });

const Item = mongoose.model('Item', itemSchema);
module.exports = Item;
