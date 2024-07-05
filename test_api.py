import requests

def test_get_categories():
    url = "http://localhost:5000/api/categories"  # Doğru URL'yi kontrol edin
    response = requests.get(url)

    # Durum kodunu kontrol et
    assert response.status_code == 200, f"Beklenen 200, ancak {response.status_code} bulundu"

    # Yanıtın JSON formatında olduğunu kontrol et
    assert response.headers["Content-Type"] == "application/json; charset=utf-8"

    data = response.json()

    # Verinin boş olmadığını kontrol et
    assert len(data) > 0, "Kategori listesi boş"

    # İlk kategorinin beklenen anahtarlara sahip olduğunu kontrol et
    first_category = data[0]
    assert "name" in first_category, "'name' anahtarı bulunamadı"
    assert "description" in first_category, "'description' anahtarı bulunamadı"
    assert "subcategories" in first_category, "'subcategories' anahtarı bulunamadı"

    print("Test başarılı: Kategoriler doğru bir şekilde alındı ve doğrulandı.")

if __name__ == "__main__":
    test_get_categories()
