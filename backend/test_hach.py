import requests
import bcrypt

# Şifre Hash'leme ve Karşılaştırma Kontrolü
original_password = "password123"
hashed_password = bcrypt.hashpw(original_password.encode('utf-8'), bcrypt.gensalt())
print(f"Original Password: {original_password}")
print(f"Hashed Password: {hashed_password.decode('utf-8')}")

is_match = bcrypt.checkpw(original_password.encode('utf-8'), hashed_password)
print(f"Password match result: {is_match}")

# Kayıt ve Giriş İşlemleri
base_url = "https://www.antalya-doner-pizzeria.de/api/auth"

# Kayıt
register_payload = {
    "username": "testuser2",
    "email": "testuser2@example.com",
    "password": "password123"
}

response = requests.post(f"{base_url}/register", json=register_payload)
if response.status_code == 201:
    print("User registered successfully.")
else:
    print("User registration failed.")
    print(response.json())

# Giriş
login_payload = {
    "email": "testuser2@example.com",
    "password": "password123"
}

response = requests.post(f"{base_url}/login", json=login_payload)
if response.status_code == 200:
    print("User logged in successfully.")
    print(response.json())
else:
    print("User login failed.")
    print(response.json())
