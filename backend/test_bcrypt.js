const bcrypt = require('bcryptjs');

// Hashlenecek şifre
const plainPassword = 'password123';

// Veritabanında depolanan hash
const adminHashedPassword = '$2a$10$pUWCJ114v1JqQMz8hVEPoOZs583aU3VZGSPu.NKGRfpiV3aQlSx1q';
const userHashedPassword = '$2a$10$ksiYt1tW86tW/naP/i7c1.LjsGbpehCe1FEU3elqB6ckRfp1X4/IG';

// Şifre doğrulama işlemi
async function testPasswords() {
  const adminMatch = await bcrypt.compare(plainPassword, adminHashedPassword);
  const userMatch = await bcrypt.compare(plainPassword, userHashedPassword);

  console.log('Admin password matches:', adminMatch);
  console.log('User password matches:', userMatch);
}

testPasswords();
