import requests

# Order API URL
order_url = "http://localhost:5000/api/orders"

# Test için sipariş verileri
order_data_delivery = {
    "customerInfo": {
        "name": "Test Delivery",
        "surname": "User",
        "phone": "1234567890",
        "address": "123 Delivery Street",
        "region": "Delivery Region",
        "paymentMethod": "cash"
    },
    "items": [
        {
            "nr": "001",
            "name": "Delivery Item",
            "quantity": 2,
            "totalPrice": 20.00
        }
    ],
    "total": 20.00,
    "orderType": "delivery"  # "Lieferung" türünde sipariş
}

order_data_abholung = {
    "customerInfo": {
        "name": "Test Abholung",
        "surname": "User",
        "phone": "1234567890",
        "address": "123 Abholung Street",
        "region": "Abholung Region",
        "paymentMethod": "cash"
    },
    "items": [
        {
            "nr": "002",
            "name": "Abholung Item",
            "quantity": 1,
            "totalPrice": 10.00
        }
    ],
    "total": 10.00,
    "orderType": "pickup"  # "Abholung" türünde sipariş
}

order_data_restaurant = {
    "customerInfo": {
        "name": "Test Restaurant",
        "surname": "User",
        "phone": "1234567890",
        "address": "123 Restaurant Street",
        "region": "Restaurant Region",
        "paymentMethod": "cash"
    },
    "items": [
        {
            "nr": "003",
            "name": "Restaurant Item",
            "quantity": 3,
            "totalPrice": 30.00
        }
    ],
    "total": 30.00,
    "orderType": "dinein"  # "Im Restaurant" türünde sipariş
}

order_types = {
    "Lieferung": order_data_delivery,
    "Abholung": order_data_abholung,
    "Im Restaurant": order_data_restaurant
}

created_order_ids = []

# Her sipariş türü için sipariş oluşturma, statü güncelleme ve arşivleme testi
for order_type, order_data in order_types.items():
    response = requests.post(order_url, json=order_data)
    if response.status_code == 201:
        print(f"{order_type} order created successfully.")
        order_id = response.json()["_id"]
        created_order_ids.append(order_id)

        # Order status güncelleme (Almanca statü kullanıyoruz)
        update_url = f"{order_url}/{order_id}/status"
        update_data = {"status": "Bestellungen in Vorbereitung"}  # "Preparing" yerine Almanca statü
        response = requests.put(update_url, json=update_data)
        if response.status_code == 200:
            print(f"{order_type} order status updated successfully.")
        else:
            print(f"Failed to update {order_type} order status. Response: {response.text}")

       # Order'ı arşivleme
archive_url = f"{order_url}/{order_id}"
archive_data = {"archived": True}
response = requests.patch(archive_url, json=archive_data)
if response.status_code == 200:
    print(f"{order_type} order archived successfully.")
else:
    print(f"Failed to archive {order_type} order. Response: {response.text}")


# Siparişlerin listelenmesi
response = requests.get(f"{order_url}/archived")
if response.status_code == 200:
    orders = response.json()
    print("Archived orders retrieved successfully.")
    for order in orders:
        print(f"Order ID: {order['_id']}, Order Type: {order['orderType']}, Status: {order['status']}")
else:
    print(f"Failed to retrieve archived orders. Response: {response.text}")

# Oluşturulan siparişlerin silinmesi
for order_id in created_order_ids:
    delete_url = f"{order_url}/{order_id}"
    response = requests.delete(delete_url)
    if response.status_code == 200:
        print(f"Order with ID {order_id} deleted successfully.")
    else:
        print(f"Failed to delete order with ID {order_id}. Response: {response.text}")
