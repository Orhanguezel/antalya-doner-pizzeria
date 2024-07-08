const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/status', orderController.updateOrderStatus);
router.put('/:id/accept', (req, res) => orderController.updateOrderStatus(req, res, 'Kabul Edilen Siparişler'));
router.put('/:id/prepare', (req, res) => orderController.updateOrderStatus(req, res, 'Hazırlanan Siparişler'));
router.put('/:id/ready', (req, res) => orderController.updateOrderStatus(req, res, 'Taşınan Siparişler'));
router.put('/:id/out-for-delivery', (req, res) => orderController.updateOrderStatus(req, res, 'Teslim Edilen Siparişler'));
router.put('/:id/delivered', (req, res) => orderController.updateOrderStatus(req, res, 'Tamamlanan Siparişler'));
router.put('/:id/complete', (req, res) => orderController.updateOrderStatus(req, res, 'Tamamlanan Siparişler'));
router.put('/:id/cancel', orderController.cancelOrder);
router.put('/:id/update-preparation-time', orderController.updatePreparationTime);
router.delete('/:id', orderController.deleteOrder); // DELETE rotası eklendi

module.exports = router;
