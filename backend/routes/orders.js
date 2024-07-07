const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Tüm siparişleri getirme
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find();
    res.json(orders);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Sipariş oluşturma
router.post('/', async (req, res) => {
  const order = new Order({
    customerInfo: req.body.customerInfo,
    items: req.body.items,
    total: req.body.total,
    status: req.body.status
  });

  try {
    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Belirli bir siparişi getirme
router.get('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });
    res.json(order);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Siparişi güncelleme
router.patch('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    if (req.body.customerInfo) order.customerInfo = req.body.customerInfo;
    if (req.body.items) order.items = req.body.items;
    if (req.body.total) order.total = req.body.total;
    if (req.body.status) order.status = req.body.status;

    const updatedOrder = await order.save();
    res.json(updatedOrder);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Siparişi silme
router.delete('/:id', async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: 'Order not found' });

    await order.remove();
    res.json({ message: 'Order deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
