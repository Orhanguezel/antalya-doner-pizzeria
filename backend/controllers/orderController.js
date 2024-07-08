const Order = require('../models/Order');

// Yeni bir sipariş oluşturma
exports.createOrder = async (req, res) => {
  const { customerInfo, items, total, orderType, status } = req.body;

  if (!customerInfo || !items || total == null || !orderType) {
    return res.status(400).json({ message: 'customerInfo, items, total ve orderType gereklidir.' });
  }

  if (orderType === 'delivery') {
    if (!customerInfo.address || !customerInfo.phone) {
      return res.status(400).json({ message: 'Eve teslimat için address ve phone gereklidir.' });
    }
  }

  try {
    const order = new Order({
      customerInfo,
      items,
      total,
      orderType,
      status: status || 'Gelen Siparişler'
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Tüm siparişleri getirme
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate('userId');
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Belirli bir siparişi getirme
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate('userId');
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Sipariş durumunu güncelleme
exports.updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = req.body.status;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Siparişi iptal etme
exports.cancelOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const { cancelReason } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = 'İptal Edildi';
    order.cancelReason = cancelReason;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Hazırlık süresini güncelleme
exports.updatePreparationTime = async (req, res) => {
  try {
    const { id } = req.params;
    const { preparationTime } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.preparationTime = preparationTime;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
