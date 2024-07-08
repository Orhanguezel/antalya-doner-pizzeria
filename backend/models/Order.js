const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: false }, // Zorunlu değil
    address: { type: String, required: true },
    phone: { type: String, required: true },
    region: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    specialRequest: { type: String, required: false, default: '' } // Özel İstek
  },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['Gelen Siparişler', 'Hazırlanan Siparişler', 'Taşınan Siparişler', 'Teslim Edilen Siparişler', 'Completed'], default: 'Gelen Siparişler' },
  orderType: { type: String, required: true }, // Dine-in, Pickup, Delivery
  archived: { type: Boolean, default: false } // Arşiv Durumu
});

module.exports = mongoose.model('Order', orderSchema);
