const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
// Get all categories
router.get('/', async (req, res) => {
  try {
    console.log('Request received to get all categories');
    const categories = await Category.find().populate({
      path: 'subcategories',
      populate: {
        path: 'items'
      }
    });
    console.log('Categories fetched successfully:', categories);
    res.status(200).json(categories);
  } catch (error) {
    console.error('Error occurred while fetching categories:', error.message);
    res.status(500).json({ error: error.message });
  }
});


// Create a new category
router.post('/', async (req, res) => {
  try {
    const category = new Category({
      name: req.body.name,
      description: req.body.description,
      subcategories: req.body.subcategories || []
    });

    const newCategory = await category.save();
    res.status(201).json(newCategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
