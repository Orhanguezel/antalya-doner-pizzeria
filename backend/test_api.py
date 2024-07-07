import requests

def test_register_user():
    url = "http://localhost:5000/api/auth/register"  # Doğru URL
    payload = {
        "username": "testuser",
        "email": "test@example.com",
        "password": "password123"
    }
    response = requests.post(url, json=payload)

    assert response.status_code == 201, f"Beklenen 201, ancak {response.status_code} bulundu"
    data = response.json()
    assert "token" in data, "'token' anahtarı bulunamadı"

    print("Test başarılı: Kullanıcı başarıyla kayıt oldu.")

if __name__ == "__main__":
    test_register_user()
