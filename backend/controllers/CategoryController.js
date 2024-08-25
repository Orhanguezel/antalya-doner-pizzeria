const { Category } = require('../models/Category');
const CustomError = require('../utils/CustomError');

exports.getCategories = async (req, res, next) => {
  try {
    const categories = await Category.find().populate({
      path: 'subcategories',
      populate: {
        path: 'items'
      }
    });
    res.status(200).json(categories);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
