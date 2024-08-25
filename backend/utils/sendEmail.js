const sendEmail = require('../utils/sendEmail');

await sendEmail({
  email: user.email,
  subject: 'Welcome!',
  message: 'Thank you for signing up!'
});
