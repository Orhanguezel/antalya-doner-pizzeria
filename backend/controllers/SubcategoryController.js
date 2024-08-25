const Subcategory = require('../models/Subcategory');
const CustomError = require('../utils/CustomError');

exports.getSubcategories = async (req, res, next) => {
  try {
    const subcategories = await Subcategory.find().populate('items');
    res.status(200).json(subcategories);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.createSubcategory = async (req, res, next) => {
  try {
    const newSubcategory = new Subcategory(req.body);
    const savedSubcategory = await newSubcategory.save();
    res.status(201).json(savedSubcategory);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
