const mongoose = require('mongoose');

// Sipariş şeması tanımı
const orderSchema = new mongoose.Schema({
  customerInfo: { // Müşteri bilgileri
    name: { type: String, required: true }, // Müşteri adı
    surname: { type: String, required: true }, // Müşteri soyadı
    email: { type: String, required: false }, // Müşteri e-posta adresi (isteğe bağlı)
    address: {
      type: String,
      required: function() { return this.parent().orderType === 'delivery'; } // Sadece eve teslimat siparişlerinde gerekli
    },
    phone: {
      type: String,
      required: function() { return this.parent().orderType !== 'dinein'; } // Eve teslimat ve paket siparişlerinde gerekli
    },
    region: {
      type: String,
      required: function() { return this.parent().orderType === 'delivery'; } // Sadece eve teslimat siparişlerinde gerekli
    },
    paymentMethod: {
      type: String,
      required: function() { return this.parent().orderType === 'delivery'; } // Sadece eve teslimat siparişlerinde gerekli
    },
    specialRequest: { type: String, required: false, default: '' } // Özel istekler (isteğe bağlı)
  },
  items: [{ // Sipariş edilen ürünler
    nr: { type: String, required: true }, // Ürün numarası
    name: { type: String, required: true }, // Ürün adı
    quantity: { type: Number, required: true }, // Ürün miktarı
    totalPrice: { type: Number, required: true }, // Toplam fiyat
    selectedPrice: {
      key: { type: String, required: false, default: 'default' }, // Seçilen fiyat anahtarı
      value: { type: Number, required: false, default: 0 } // Seçilen fiyat değeri
    },
    extras: [{ // Ekstralar
      name: { type: String, required: false, default: null }, // Ekstra adı
      price: { type: Number, required: false, default: 0 } // Ekstra fiyatı
    }]
  }],
  total: { type: Number, required: true }, // Toplam sipariş tutarı
  status: { type: String, enum: ['Gelen Siparişler', 'Hazırlanan Siparişler', 'Taşınan Siparişler', 'Teslim Edilen Siparişler', 'Completed'], default: 'Gelen Siparişler' }, // Sipariş durumu
  orderType: { type: String, required: true }, // Sipariş türü (delivery, pickup, dinein)
  deliveryFee: { type: Number, required: false, default: 0 }, // Teslimat ücreti
  archived: { type: Boolean, default: false } // Arşiv durumu
}, { timestamps: true }); // Zaman damgaları (createdAt ve updatedAt)

module.exports = mongoose.model('Order', orderSchema);
