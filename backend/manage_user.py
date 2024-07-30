import requests

# URL'leri ayarlayın
base_url = "http://localhost:5000/api/auth"
login_url = f"{base_url}/login"

# Admin ve kullanıcı bilgileri
admin_user = {
    "email": "superadmin@example.com",
    "password": "password123"
}

user = {
    "email": "user1@example.com",
    "password": "password123"
}

def login_test(user):
    response = requests.post(login_url, json=user)
    print(f"Login: {response.status_code} {response.json()}")

print("Admin Login Test")
login_test(admin_user)

print("User Login Test")
login_test(user)
