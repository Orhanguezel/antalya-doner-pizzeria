const express = require('express');
const router = express.Router();
const Subcategory = require('../models/Subcategory');

// Get all subcategories
router.get('/', async (req, res) => {
  try {
    const subcategories = await Subcategory.find().populate('items');
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create a new subcategory
router.post('/', async (req, res) => {
  try {
    const subcategory = new Subcategory({
      name: req.body.name,
      description: req.body.description,
      items: req.body.items || []
    });

    const newSubcategory = await subcategory.save();
    res.status(201).json(newSubcategory);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
