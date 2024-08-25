const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const subcategorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  images: [String],
  items: [{ type: Schema.Types.ObjectId, ref: 'Item' }]
});

const Subcategory = mongoose.model('Subcategory', subcategorySchema);
module.exports = Subcategory;
