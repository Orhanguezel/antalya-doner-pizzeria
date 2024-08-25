import requests

# Order API URL
order_url = "http://localhost:5000/api/orders"

# Test için bir sipariş oluşturma
order_data = {
    "customerInfo": {
        "name": "Test",
        "surname": "User",
        "phone": "1234567890",
        "address": "123 Test Street",
        "region": "Test Region",
        "paymentMethod": "cash"
    },
    "items": [
        {
            "nr": "001",
            "name": "Test Item",
            "quantity": 2,
            "totalPrice": 20.00
        }
    ],
    "total": 20.00,
    "orderType": "delivery"
}

response = requests.post(order_url, json=order_data)
if response.status_code == 201:
    print("Order created successfully.")
    order_id = response.json()["_id"]
else:
    print(f"Failed to create order. Response: {response.text}")
    order_id = None

# Order status güncelleme (Almanca statü kullanıyoruz)
if order_id:
    update_url = f"{order_url}/{order_id}/status"
    update_data = {"status": "Bestellungen in Vorbereitung"}  # "Preparing" yerine Almanca statü
    response = requests.put(update_url, json=update_data)
    if response.status_code == 200:
        print("Order status updated successfully.")
    else:
        print(f"Failed to update order status. Response: {response.text}")

    # Order silme
    delete_url = f"{order_url}/{order_id}"
    response = requests.delete(delete_url)
    if response.status_code == 200:
        print("Order deleted successfully.")
    else:
        print(f"Failed to delete order. Response: {response.text}")
