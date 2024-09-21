const Order = require('../models/Order');
const CustomError = require('../utils/CustomError');

// Sipariş durumu için geçerli durumlar
const ORDER_STATUSES = [
  'Eingehende Bestellungen',
  'Bestellungen in Vorbereitung',
  'Bestellungen werden geliefert',
  'Gelieferte Bestellungen',
  'Abgeschlossen'
];

// Yeni bir sipariş oluşturma
exports.createOrder = async (req, res, next) => {
  const { customerInfo, items, total, orderType, status, deliveryFee } = req.body;

  // Zorunlu alan kontrolü
  if (!customerInfo || !items || total == null || !orderType) {
    return next(new CustomError('customerInfo, items, total und orderType sind erforderlich.', 400));
  }

  try {
    const order = new Order({
      customerInfo,
      items,
      total,
      orderType,
      status: status || 'Eingehende Bestellungen', // Varsayılan durum
      deliveryFee: deliveryFee || 0,
      archived: false
    });

    const newOrder = await order.save();
    res.status(201).json(newOrder);
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};

// Tüm aktif siparişleri getirme
exports.getAllOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ archived: false });
    res.status(200).json(orders);
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};

// Arşivlenmiş siparişleri getirme
exports.getArchivedOrders = async (req, res, next) => {
  try {
    const orders = await Order.find({ archived: true });
    res.status(200).json(orders);
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};

// Belirli bir siparişi ID'ye göre getirme
exports.getOrderById = async (req, res, next) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) {
      return next(new CustomError('Order nicht gefunden', 404));
    }
    res.status(200).json(order);
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};

// Sipariş durumunu güncelleme
exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return next(new CustomError('Order nicht gefunden', 404));
    }
    
    if (req.body.status) {
      if (!ORDER_STATUSES.includes(req.body.status)) {
        return next(new CustomError(`Ungültiger Status: ${req.body.status}`, 400));
      }
      order.status = req.body.status;
    }
    
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    console.error('Fehler beim Aktualisieren des Bestellstatus:', error);
    next(new CustomError(error.message, 400));
  }
};

// Siparişi arşivleme
exports.archiveOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) {
      return next(new CustomError('Order nicht gefunden', 404));
    }
    order.status = 'Abgeschlossen';  // Enum'da tanımlı geçerli değer
    order.archived = true;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};

// Siparişi silme
exports.deleteOrder = async (req, res, next) => {
  try {
    const { id } = req.params;
    const order = await Order.findByIdAndDelete(id);
    if (!order) {
      return next(new CustomError('Order nicht gefunden', 404));
    }
    res.status(200).json({ message: 'Order erfolgreich gelöscht' });
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};

// Hazırlık süresini güncelleme
exports.updatePreparationTime = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { preparationTime } = req.body;
    const order = await Order.findById(id);
    if (!order) {
      return next(new CustomError('Order nicht gefunden', 404));
    }
    order.preparationTime = preparationTime;
    await order.save();
    res.status(200).json(order);
  } catch (error) {
    next(new CustomError(error.message, 400));
  }
};
