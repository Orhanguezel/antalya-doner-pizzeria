import pymongo
import bcrypt

# MongoDB bağlantısı
client = pymongo.MongoClient("mongodb://dbUser:dbPassword@127.0.0.1:27017/")
db = client['antalya_doner_pizzeria']
users_collection = db['users']

# Hashlenmiş şifre
hashed_password = "$2a$10$ecTdDPZ4scUzCPPLUGLckOQ9s7vAz4AG7qFgLGwaT3TV4JmIBvjai"

# Admin şifresini güncelleme fonksiyonu
def update_admin_password():
    try:
        result = users_collection.update_one(
            {"email": "admin@example.com"},
            {"$set": {"password": hashed_password}}
        )
        if result.modified_count > 0:
            print("Admin password updated successfully.")
        else:
            print("Admin password update failed or no changes made.")
    except Exception as e:
        print("Error updating admin password:", e)
    finally:
        client.close()

update_admin_password()
