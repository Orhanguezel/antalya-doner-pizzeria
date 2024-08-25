const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  customerInfo: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    email: { type: String },
    address: {
      type: String,
      required: function() { return this.orderType === 'delivery'; }
    },
    phone: {
      type: String,
      required: function() { return this.orderType !== 'dinein'; }
    },
    region: {
      type: String,
      required: function() { return this.orderType === 'delivery'; }
    },
    paymentMethod: {
      type: String,
      required: function() { return this.orderType === 'delivery'; }
    },
    specialRequest: { type: String, default: '' }
  },
  items: [{
    nr: { type: String, required: true },
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    selectedPrice: {
      key: { type: String, default: 'default' },
      value: { type: Number, default: 0 }
    },
    extras: [{
      name: { type: String, default: null },
      price: { type: Number, default: 0 }
    }]
  }],
  total: { type: Number, required: true },
  status: {
    type: String,
    enum: [
      'Eingehende Bestellungen', 
      'Bestellungen in Vorbereitung', // 'Preparing' in German
      'Bestellungen werden geliefert', // 'Out for Delivery' in German
      'Gelieferte Bestellungen', // 'Delivered' in German
      'Abgeschlossen' // 'Completed' in German
    ],
    default: 'Eingehende Bestellungen'
  },
  orderType: { type: String, required: true },
  deliveryFee: { type: Number, default: 0 },
  archived: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = mongoose.model('Order', orderSchema);
