import requests

BASE_URL = "http://localhost:5000/api/orders"

def create_order():
    order_data = {
        "customerInfo": {
            "name": "John",
            "surname": "Doe",
            "address": "123 Main St",
            "phone": "1234567890",
            "region": "Aldenhoven",
            "email": "john.doe@example.com",
            "paymentMethod": "Kreditkarte"
        },
        "items": [
            {"name": "Pizza", "quantity": 2, "totalPrice": 20},
            {"name": "Pasta", "quantity": 1, "totalPrice": 5}
        ],
        "total": 25,
        "orderType": "delivery"
    }
    response = requests.post(BASE_URL, json=order_data)
    return response

def update_order_status(order_id, status):
    response = requests.put(f"{BASE_URL}/{order_id}/status", json={"status": status})
    return response

def archive_order(order_id):
    response = requests.put(f"{BASE_URL}/{order_id}/archive")
    return response

def delete_order(order_id):
    response = requests.delete(f"{BASE_URL}/{order_id}")
    return response

def test_order_process():
    # Create order
    create_response = create_order()
    print("Create Order Response Status Code:", create_response.status_code)
    print("Create Order Response Content:", create_response.content)

    if create_response.status_code != 201:
        print("Failed to create order")
        return

    order_id = create_response.json()["_id"]

    # Update order status to 'Hazırlanan Siparişler'
    update_response = update_order_status(order_id, "Hazırlanan Siparişler")
    print("Update Order Status to Hazırlanan Siparişler Response Status Code:", update_response.status_code)
    print("Update Order Status to Hazırlanan Siparişler Response Content:", update_response.content)

    # Update order status to 'Taşınan Siparişler'
    update_response = update_order_status(order_id, "Taşınan Siparişler")
    print("Update Order Status to Taşınan Siparişler Response Status Code:", update_response.status_code)
    print("Update Order Status to Taşınan Siparişler Response Content:", update_response.content)

    # Update order status to 'Teslim Edilen Siparişler'
    update_response = update_order_status(order_id, "Teslim Edilen Siparişler")
    print("Update Order Status to Teslim Edilen Siparişler Response Status Code:", update_response.status_code)
    print("Update Order Status to Teslim Edilen Siparişler Response Content:", update_response.content)

    # Archive the order
    archive_response = archive_order(order_id)
    print("Archive Order Response Status Code:", archive_response.status_code)
    print("Archive Order Response Content:", archive_response.content)

    # Delete the order
    delete_response = delete_order(order_id)
    print("Delete Order Response Status Code:", delete_response.status_code)
    print("Delete Order Response Content:", delete_response.content)

if __name__ == "__main__":
    test_order_process()
