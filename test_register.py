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
    try:
        response = requests.post(url, json=data)
        if response.status_code == 201:
            print("User registered successfully:", response.json())
        elif response.status_code == 400:
            print("Registration failed: User already exists.")
        else:
            print(f"Failed to register user. Response: {response.status_code} - {response.text}")
    except requests.exceptions.RequestException as e:
        print(f"Error during registration: {e}")

# Kullanıcı Girişi
def login_user(email, password):
    url = f"{BASE_URL}/login"
    data = {"email": email, "password": password}
    try:
        response = requests.post(url, json=data)
        if response.status_code == 200:
            print("User logged in successfully:", response.json())
            return response.json()['token']
        elif response.status_code == 401:
            print("Login failed: Invalid email or password.")
        else:
            print(f"Failed to login user. Response: {response.status_code} - {response.text}")
        return None
    except requests.exceptions.RequestException as e:
        print(f"Error during login: {e}")
        return None

# Örnek kullanım
if __name__ == "__main__":
    # Admin kullanıcısı oluşturma
    print("Attempting to register admin user...")
    register_user("admin", "admin@example.com", "adminpassword", "admin")

    # Admin kullanıcısı ile giriş yapma
    print("Attempting to login admin user...")
    token = login_user("admin@example.com", "adminpassword")

    if token:
        print("Admin giriş başarılı!")
    else:
        print("Admin giriş başarısız.")
