cd ~/Desktop/antalya-doner-pizzeria/frontend
npm start

cd ~/Desktop/antalya-doner-pizzeria/backend
npm start


cd ~/Desktop/antalya-doner-pizzeria/backend
node testData.js



cd ~/Desktop/antalya-doner-pizzeria/backend
node clearDatabase.js
node insertData1.js
node insertData2.js
node insertData3.js
node insertData4.js
node insertData5.js
node insertData6.js



python3 test_api.py

python3 test_register_user.py


python3 test_create_order.py


cd ~/Desktop/antalya-doner-pizzeria/backend
python3 test_get_categories_and_items.py


cd ~/Desktop/antalya-doner-pizzeria/backend
python3 test_order_process.py

mongo
use antalya-doner-pizzeria
db.categories.find().pretty()



siparis olustururken musteri notu eklenecek. 



username": admin
email: admin@example.com
pasword: adminpassword

15 euro alti siparis icin uyari gerekiyor. 

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  type: { type: String, required: true },
  prices: {
    default: { type: Number, required: true },
    klein: { type: Number },
    groß: { type: Number },
    kleineSchale: { type: Number },
    großeSchale: { type: Number }
  },
  extras: {
    type: Map,
    of: Number
  },
  image: { type: String },
  categories: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Category' }]
});

module.exports = mongoose.model('Item', itemSchema);
