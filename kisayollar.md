cd client



cd server

python3 test_register.py

python3 test_login.py

python3 test_blog_api.py

python3 test_category.py

python3 test_blog_delete.py


cd ~/Desktop/personal-website/server
node server.js


cd ~/Desktop/personal-website/client
npm start


mongo
use personal
db.users.find().pretty()

show dbs





db.users.find().pretty()


db.users.deleteMany({})

db.users.deleteOne({ email: 'admin@example.com' });

db.categories.find().pretty()   kategori kontrol etmek icin. 

show collections

Kullaniciyi admin yapma 
db.users.updateOne({ email: 'orhanguzell@gmail.com' }, { $set: { role: 'admin' } })




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
