const bcrypt = require('bcryptjs');

const password = 'adminpassword';
const hash = '$2a$10$JfZ53OiBcKVhb5aIXstbM.rRlz1u4BKIi.FGmbG2CUm9KuPshfRte'; // Yeni hashlenmiş şifre

bcrypt.compare(password, hash, (err, isMatch) => {
  if (err) throw err;
  console.log('Password match:', isMatch); // true veya false döner
});
