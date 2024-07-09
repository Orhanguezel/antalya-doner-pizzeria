const { Category } = require('../models/Category');

exports.getCategories = async (req, res) => {
  try {
    const categories = await Category.find().populate({
      path: 'subcategories',
      populate: {
        path: 'items'
      }
    });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
