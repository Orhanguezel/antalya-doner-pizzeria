const Order = require('../models/Order');

// Yeni bir sipariş oluşturma
exports.createOrder = async (req, res) => {
  const { customerInfo, items, total, orderType, status, deliveryFee } = req.body;

  // Zorunlu alan kontrolü
  if (!customerInfo || !items || total == null || !orderType) {
    return res.status(400).json({ message: 'customerInfo, items, total ve orderType gereklidir.' });
  }

  if (orderType === 'delivery') {
    if (!customerInfo.address || !customerInfo.phone || !customerInfo.name || !customerInfo.surname || !customerInfo.region || !customerInfo.paymentMethod) {
      return res.status(400).json({ message: 'Eve teslimat için name, surname, address, phone, region ve paymentMethod gereklidir.' });
    }
  } else if (orderType === 'pickup') {
    if (!customerInfo.name || !customerInfo.surname || !customerInfo.phone) {
      return res.status(400).json({ message: 'Abholung im Restaurant için name, surname ve phone gereklidir.' });
    }
  } else if (orderType === 'dinein') {
    if (!customerInfo.name || !customerInfo.surname) {
      return res.status(400).json({ message: 'Im Restaurant essen için name ve surname gereklidir.' });
    }
  }

  try {
    const order = new Order({
      customerInfo,
      items,
      total,
      orderType,
      status: status || 'Gelen Siparişler',
      deliveryFee: deliveryFee || 0,
      archived: false
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
    const orders = await Order.find({ archived: false });
    res.status(200).json(orders);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Belirli bir siparişi getirme
exports.getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
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
    if (req.body.status) {
      order.status = req.body.status;
    }
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Siparişi silme
exports.deleteOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    await order.remove();
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Siparişi arşivleme
exports.archiveOrder = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return res.status(404).json({ message: 'Order not found' });
    }
    order.status = 'Completed';
    order.archived = true;
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
