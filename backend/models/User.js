const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, default: 'user', enum: ['user', 'admin'] },
  profileImage: { type: String },
  address: { type: String },   // Adres bilgisi
  phoneNumber: { type: String },  // Telefon numarası
  resetPasswordToken: String,  // Şifre sıfırlama tokeni
  resetPasswordExpire: Date,   // Token süresi
}, {
  timestamps: true,
});

// Şifreyi hash'ler
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Şifre karşılaştırma fonksiyonu
UserSchema.methods.matchPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

// Şifre sıfırlama tokeni oluşturma
UserSchema.methods.getResetPasswordToken = function() {
  const resetToken = crypto.randomBytes(20).toString('hex');

  // Token oluşturma ve expiration date ayarlama
  this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.resetPasswordExpire = Date.now() + 10 * 60 * 1000; // 10 dakika geçerli

  return resetToken;
};

module.exports = mongoose.model('User', UserSchema);
