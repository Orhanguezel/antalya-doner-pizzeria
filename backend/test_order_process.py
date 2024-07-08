import requests

BASE_URL = "http://localhost:5000/api/orders"

def create_order(order_data):
    response = requests.post(BASE_URL, json=order_data)
    print("Create Order Response Status Code:", response.status_code)
    print("Create Order Response Content:", response.content)
    response.raise_for_status()  # Raise an exception for HTTP errors
    return response.json()["_id"]

def update_order_status(order_id, new_status):
    url = f"{BASE_URL}/{order_id}/status"
    response = requests.put(url, json={"status": new_status})
    print(f"Update Order Status to {new_status} Response Status Code:", response.status_code)
    print(f"Update Order Status to {new_status} Response Content:", response.content)
    response.raise_for_status()  # Raise an exception for HTTP errors

def delete_order(order_id):
    url = f"{BASE_URL}/{order_id}"
    response = requests.delete(url)
    print("Delete Order Response Status Code:", response.status_code)
    print("Delete Order Response Content:", response.content)
    response.raise_for_status()  # Raise an exception for HTTP errors

def main():
    order_data = {
        "customerInfo": {
            "name": "John",
            "surname": "Doe",
            "address": "123 Main St",
            "phone": "1234567890",
            "region": "Aldenhoven",
            "paymentMethod": "Kreditkarte",
            "email": "john.doe@example.com"
        },
        "items": [
            {"name": "Pizza", "quantity": 2, "totalPrice": 20},
            {"name": "Pasta", "quantity": 1, "totalPrice": 5}
        ],
        "total": 25,
        "orderType": "delivery",
        "status": "Gelen Siparişler"
    }

    try:
        # Create Order
        order_id = create_order(order_data)

        # Update Order Status to 'Hazırlanan Siparişler'
        update_order_status(order_id, "Hazırlanan Siparişler")

        # Update Order Status to 'Taşınan Siparişler'
        update_order_status(order_id, "Taşınan Siparişler")

        # Update Order Status to 'Teslim Edilen Siparişler'
        update_order_status(order_id, "Teslim Edilen Siparişler")

        # Delete Order
        delete_order(order_id)

    except requests.exceptions.HTTPError as err:
        print("HTTP error occurred:", err)

if __name__ == "__main__":
    main()
