import requests

BASE_URL = "http://localhost:5000/api/users"

# Kullanıcı Kaydı
def register_user(username, email, password, role):
    url = f"{BASE_URL}/register"
    data = {
        "username": username,
        "email": email,
        "password": password,
        "role": role
    }
    response = requests.post(url, json=data)
    if response.status_code == 201:
        print("User registered successfully:", response.json())
    else:
        print(f"Failed to register user. Response: {response.status_code} - {response.text}")

# Kullanıcı Girişi
def login_user(email, password):
    url = f"{BASE_URL}/login"
    data = {"email": email, "password": password}
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("User logged in successfully:", response.json())
        return response.json()['token']
    else:
        print(f"Failed to login user. Response: {response.status_code} - {response.text}")
        return None

# Örnek kullanım
if __name__ == "__main__":
    # Admin kullanıcısı oluşturma
    register_user("admin", "admin@example.com", "adminpassword", "admin")

    # Admin kullanıcısı ile giriş yapma
    token = login_user("admin@example.com", "adminpassword")

    if token:
        print("Admin giriş başarılı!")
    else:
        print("Admin giriş başarısız.")
