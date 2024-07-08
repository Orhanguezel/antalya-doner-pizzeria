import requests

def test_create_order(order_type, payment_method):
    url = "http://localhost:5000/api/orders"
    payload = {
        "customerInfo": {
            "name": "John",
            "surname": "Doe",
            "email": "john.doe@example.com",  # Email alanını ekleyelim
            "address": "123 Main St",
            "phone": "1234567890",
            "region": "Aldenhoven",
            "paymentMethod": payment_method
        },
        "items": [
            {"name": "Pizza", "quantity": 2, "totalPrice": 20},
            {"name": "Pasta", "quantity": 1, "totalPrice": 5}
        ],
        "total": 25,
        "orderType": order_type,
        "status": "Gelen Siparişler"
    }
    headers = {
        "Content-Type": "application/json"
    }

    response = requests.post(url, json=payload, headers=headers)
    print("Response Status Code:", response.status_code)
    print("Response Content:", response.content)

    assert response.status_code == 201, f"Beklenen 201, ancak {response.status_code} bulundu"
    data = response.json()
    assert "_id" in data, "'_id' anahtarı bulunamadı"

    print("Test başarılı: Sipariş başarıyla oluşturuldu.")
    return data["_id"]

if __name__ == "__main__":
    order_types = ["dine_in", "takeaway", "delivery"]
    payment_methods = ["Kreditkarte", "Barzahlung"]

    for order_type in order_types:
        for payment_method in payment_methods:
            print(f"Testing orderType: {order_type}, paymentMethod: {payment_method}")
            test_create_order(order_type, payment_method)
