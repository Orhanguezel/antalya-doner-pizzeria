const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

// Sipariş oluşturma ve tüm siparişleri alma
router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);

// Arşivlenmiş siparişleri alma
router.get('/archived', orderController.getArchivedOrders); 

// Belirli bir siparişi ID ile alma
router.get('/:id', orderController.getOrderById);

// Sipariş durumlarını güncelleme rotaları
router.put('/:id/status', orderController.updateOrderStatus); // Herhangi bir durumu güncelleme
router.put('/:id/accept', (req, res, next) => {
  req.body.status = 'Bestellungen in Vorbereitung'; // Accepted status
  orderController.updateOrderStatus(req, res, next);
});
router.put('/:id/prepare', (req, res, next) => {
  req.body.status = 'Bestellungen werden geliefert'; // Preparing status
  orderController.updateOrderStatus(req, res, next);
});
router.put('/:id/ready', (req, res, next) => {
  req.body.status = 'Gelieferte Bestellungen'; // Ready status
  orderController.updateOrderStatus(req, res, next);
});
router.put('/:id/out-for-delivery', (req, res, next) => {
  req.body.status = 'Bestellungen werden geliefert'; // Out-for-delivery status
  orderController.updateOrderStatus(req, res, next);
});
router.put('/:id/delivered', (req, res, next) => {
  req.body.status = 'Gelieferte Bestellungen'; // Delivered status
  orderController.updateOrderStatus(req, res, next);
});
router.put('/:id/complete', (req, res, next) => {
  req.body.status = 'Abgeschlossen'; // Completed status
  orderController.updateOrderStatus(req, res, next);
});
router.put('/:id/cancel', (req, res, next) => {
  req.body.status = 'Abgeschlossen'; // Canceled status, this might be better if you have a "Canceled" status in your enum
  orderController.updateOrderStatus(req, res, next);
});

// Sipariş hazırlık süresini güncelleme
router.put('/:id/update-preparation-time', orderController.updatePreparationTime);

// Siparişi arşivleme ve silme
router.put('/:id/archive', orderController.archiveOrder); // Arşivleme durumu
router.delete('/:id', orderController.deleteOrder); // Siparişi silme

module.exports = router;
