import bcrypt
import requests

# Giriş işlemi için kullanılacak veriler
email = "testuser@example.com"
password = "password123"

# Giriş isteği fonksiyonu
def login_user(email, password):
    try:
        response = requests.post("https://www.antalya-doner-pizzeria.de/api/auth/login", json={
            "email": email,
            "password": password
        })
        if response.status_code == 200:
            print("User login successful.")
            print(response.json())
        else:
            print("User login failed.")
            print(response.json())
    except Exception as e:
        print("An error occurred:", e)

# Giriş işlemi yap
login_user(email, password)
