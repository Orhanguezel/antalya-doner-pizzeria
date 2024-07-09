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

module.exports = router;
