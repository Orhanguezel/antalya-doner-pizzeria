import requests

login_url = "http://localhost:5000/api/users/login"

# Giriş yapacak kullanıcılar
users = [
    {"email": "admin@example.com", "password": "adminpassword"},
    {"email": "user1@example.com", "password": "userpassword"},
    {"email": "user2@example.com", "password": "userpassword"},
]

def login_user(user):
    response = requests.post(login_url, json=user)
    if response.status_code == 200:
        print(f"User {user['email']} logged in successfully.")
        return response.json()  # Başarılı girişte kullanıcı bilgilerini döndürür
    else:
        print(f"Failed to login user {user['email']}. Response: {response.text}")
        return None

# Her kullanıcı için giriş yapmayı dene
for user in users:
    login_user(user)
