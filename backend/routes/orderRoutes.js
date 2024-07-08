const express = require('express');
const router = express.Router();
const orderController = require('../controllers/orderController');

router.post('/', orderController.createOrder);
router.get('/', orderController.getAllOrders);
router.get('/:id', orderController.getOrderById);
router.put('/:id/status', orderController.updateOrderStatus);
router.put('/:id/accept', orderController.updateOrderStatus); // accepted status
router.put('/:id/prepare', orderController.updateOrderStatus); // preparing status
router.put('/:id/ready', orderController.updateOrderStatus); // ready status
router.put('/:id/out-for-delivery', orderController.updateOrderStatus); // out_for_delivery status
router.put('/:id/delivered', orderController.updateOrderStatus); // delivered status
router.put('/:id/complete', orderController.updateOrderStatus); // completed status
router.put('/:id/cancel', orderController.updateOrderStatus); // canceled status
router.put('/:id/update-preparation-time', orderController.updatePreparationTime);
router.delete('/:id', orderController.deleteOrder);
router.put('/:id/archive', orderController.archiveOrder); // archive status

module.exports = router;
