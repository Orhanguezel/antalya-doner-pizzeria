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

python3 test_hach.py

python3 test_your_script_name.py

python3 test_karsilatirma.py

python3 manage_user.py

python3 test_auth.py


cd ~/Desktop/antalya-doner-pizzeria/backend
python3 test_get_categories_and_items.py


cd ~/Desktop/antalya-doner-pizzeria/backend
python3 test_order_process.py

systemctl status nginx
systemctl status apache2
ssh root@141.136.36.40



siparis olustururken musteri notu eklenecek. 



username": admin
email: admin@example.com
pasword: adminpassword

15 euro alti siparis icin uyari gerekiyor. 

Alle Dosen Getränke + 0,25€ Pfand  sepette, eve sipariste bu ilave edilecek.


curl http://127.0.0.1:5000/api/categories


sudo nano /etc/nginx/sites-enabled/antalya-doner-pizzeria.de



pm2 stop all
pm2 start all

sudo lsof -i :5000




cd ~/frontend
pm2 start npm --name frontend -- run start



pm2 start npm --name frontend -- run start


sudo nano /etc/nginx/sites-available/default





mongosh
use antalya_doner_pizzeria
db.users.find().pretty()


db.users.deleteMany({})

db.users.deleteOne({ email: 'admin@example.com' });

db.categories.find().pretty()   kategori kontrol etmek icin. 

show collections

Kullaniciyi admin yapma 
db.users.updateOne({ email: 'orhanguzell@gmail.com' }, { $set: { role: 'admin' } })

ssh root@141.136.36.40


cd ~/backend/controllers
nano authController.js


cd ~/backend/routes
nano auth.js

cd ~/backend
nano server.js


cd ~/frontend/src/pages/
nano AuthPage.js

cd ~/frontend/src/context
nano AuthContext.js




node testPassword.js
nano testPassword.js

cd ~/frontend/src/pages/


projeyi kaatma.

pm2 stop all
pm2 delete all


Yukarıdaki adımları izleyerek admin kullanıcısını oluşturmuş oldunuz. Artık MongoDB'ye bu admin kullanıcısı ile bağlanabilirsiniz. Admin kullanıcısı için belirlediğiniz giriş bilgileri şu şekildedir:

Kullanıcı Adı: admin
Şifre: adminpassword

 mongodb giris.
mongosh -u admin -p adminpassword --authenticationDatabase admin

mongosh --host 141.136.36.40 -u admin -p adminpassword --authenticationDatabase admin


sudo systemctl restart nginx

pm2 restart api-server --update-env
pm2 restart frontend --update-env
pm2 save


cd antalya-doner-pizzeria


use antalya-doner-pizzeria






