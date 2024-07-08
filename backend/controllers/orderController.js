const Order = require('../models/Order');


// Yeni bir sipariş oluşturma
exports.createOrder = async (req, res) => {
  const { customerInfo, items, total, orderType, status } = req.body;
  let { deliveryFee } = req.body;

  if (!customerInfo || !items || total == null || !orderType) {
    return res.status(400).json({ message: 'customerInfo, items, total ve orderType gereklidir.' });
  }

  if (orderType === 'delivery') {
    if (!customerInfo.address || !customerInfo.phone) {
      return res.status(400).json({ message: 'Eve teslimat için address ve phone gereklidir.' });
    }
    deliveryFee = deliveryFee || 0; // Teslimat ücreti 0 olarak varsay
  } else {
    deliveryFee = 0; // Teslimat ücreti diğer sipariş türlerinde 0 olarak ayarla
  }

  try {
    const order = new Order({
      customerInfo,
      items,
      total,
      orderType,
      status: status || 'Gelen Siparişler',
      deliveryFee // Teslimat ücretini ekleyin
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
