const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

// Get all categories
router.get('/', async (req, res) => {
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
