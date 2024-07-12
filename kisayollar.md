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

python3 test_api.py 

python3 test_beilagen.py

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

Alle Dosen Getränke + 0,25€ Pfand  sepette, eve sipariste bu ilave edilecek.








cd ~/frontend
pm2 start npm --name frontend -- run start

cd ~/backend
pm2 start npm --name frontend -- run start


sudo nano /etc/nginx/sites-available/default

ssh root@141.136.36.40


mongosh
use antalya-doner-pizzeria
db.users.find().pretty()


db.users.deleteMany({})

db.users.deleteOne({ email: 'admin@example.com' });

db.categories.find().pretty()   kategori kontrol etmek icin. 

show collections




cd ~/backend/controllers
nano authController.js

$2b$10$Us.ZWMmnLyoFqY751qu7/.rXVJSvNXoI5NDNdmUsubNxotvAwlEea


node testPassword.js
nano testPassword.js

cd ~/frontend/src/pages/


projeyi kaatma.

pm2 stop all
pm2 delete all


