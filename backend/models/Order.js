const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String, required: false },
    address: {
      type: String,
      required: function() { return this.parent().orderType === 'delivery'; }
    },
    phone: {
      type: String,
      required: function() { return this.parent().orderType !== 'dinein'; }
    },
    region: {
      type: String,
      required: function() { return this.parent().orderType === 'delivery'; }
    },
    paymentMethod: {
      type: String,
      required: function() { return this.parent().orderType === 'delivery'; }
    },
    specialRequest: { type: String, required: false, default: '' }
  },
  items: [{
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true }
  }],
  total: { type: Number, required: true },
  status: { type: String, enum: ['Gelen Siparişler', 'Hazırlanan Siparişler', 'Taşınan Siparişler', 'Teslim Edilen Siparişler', 'Completed'], default: 'Gelen Siparişler' },
  orderType: { type: String, required: true },
  deliveryFee: { type: Number, required: false, default: 0 },
  archived: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
