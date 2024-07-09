const Subcategory = require('../models/Subcategory');

exports.getSubcategories = async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('items');
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createSubcategory = async (req, res) => {
  try {
    const newSubcategory = new Subcategory(req.body);
    const savedSubcategory = await newSubcategory.save();
    res.status(201).json(savedSubcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
