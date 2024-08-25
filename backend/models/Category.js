const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const categorySchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }]
}, { timestamps: true }); // Zaman damgaları eklenerek oluşturulma ve güncellenme tarihleri kaydedilir

const Category = mongoose.model('Category', categorySchema);
module.exports = Category;
