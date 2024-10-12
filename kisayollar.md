

python3 test_menu.py

python3 category_api_test.py

python3 test_total_price.py


node -e "console.log(require('bcryptjs').hashSync('adminpassword', 10));"
hash olusturma


mongo
use personal
db.users.find().pretty()

show dbs





db.users.find().pretty()


db.users.deleteMany({})

db.users.deleteOne({ email: 'admin@example.com' });

db.categories.find().pretty()   kategori kontrol etmek icin. 



mongosh -u admin -p adminpassword --authenticationDatabase admin
use antalya_doner_pizzeria
npm run build
cp -r /root/antalya-doner-pizzeria/frontend/dist/* /var/www/antalya-doner-pizzeria/
pm2 restart frontend --update-env
pm2 restart api-server --update-env
pm2 logs api-server


show dbs

use antalya_doner_pizzeria
show collections

mongosh "mongodb://admin:adminpassword@141.136.36.40:27017/antalya-doner-pizzeria?authSource=admin"
cp -r /root/antalya-doner-pizzeria/frontend/dist/* /var/www/antalya-doner-pizzeria/