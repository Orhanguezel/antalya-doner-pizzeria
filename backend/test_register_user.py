import requests
from datetime import datetime

def test_register_and_login_user():
    url_register = "${process.env.REACT_APP_API_URL}/api/auth/register"
    url_login = "${process.env.REACT_APP_API_URL}/api/auth/login"
    current_time = datetime.now().strftime("%Y%m%d%H%M%S")
    
    username = f"testuser_{current_time}"
    email = f"test_{current_time}@example.com"
    
    payload_register = {
        "username": username,
        "email": email,
        "password": "password123"
    }
    
    response_register = requests.post(url_register, json=payload_register)
    
    print("Register Response Status Code:", response_register.status_code)
    print("Register Response Content:", response_register.json())
    print("Payload:", payload_register)

    assert response_register.status_code == 201, f"Beklenen 201, ancak {response_register.status_code} bulundu"
    
    payload_login = {
        "email": email,
        "password": "password123"
    }
    
    response_login = requests.post(url_login, json=payload_login)
    
    print("Login Response Status Code:", response_login.status_code)
    print("Login Response Content:", response_login.json())
    print("Login Payload:", payload_login)

    assert response_login.status_code == 200, f"Beklenen 200, ancak {response_login.status_code} bulundu"
    data = response_login.json()
    assert "token" in data, "'token' anahtarı bulunamadı"

    print("Test başarılı: Kullanıcı başarıyla giriş yaptı.")
    print(f"Kullanıcı Adı: {username}")
    print(f"E-posta: {email}")

if __name__ == "__main__":
    test_register_and_login_user()
