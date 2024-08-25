const Item = require('../models/Item');
const CustomError = require('../utils/CustomError');

exports.getItems = async (req, res, next) => {
  try {
    const items = await Item.find();
    res.status(200).json(items);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.getItemById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      return next(new CustomError('Item not found', 404));
    }
    res.status(200).json(item);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.createItem = async (req, res, next) => {
  try {
    const newItem = new Item(req.body);
    const savedItem = await newItem.save();
    res.status(201).json(savedItem);
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};

exports.updateItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const updatedItem = await Item.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedItem) {
      return next(new CustomError('Item not found', 404));
    }
    res.status(200).json(updatedItem);
  } catch (error) {
    next(new CustomError('Error updating item: ' + error.message, 500));
  }
};

exports.deleteItem = async (req, res, next) => {
  try {
    const { id } = req.params;
    const item = await Item.findById(id);
    if (!item) {
      return next(new CustomError('Item not found', 404));
    }
    await item.remove();
    res.status(200).json({ message: 'Item deleted successfully' });
  } catch (error) {
    next(new CustomError(error.message, 500));
  }
};
