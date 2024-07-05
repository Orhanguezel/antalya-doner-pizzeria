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
    const { name, description, images } = req.body;
    const subcategory = new Subcategory({ name, description, images });
    await subcategory.save();
    res.status(201).json(subcategory);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
