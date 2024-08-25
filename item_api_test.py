import requests

base_url = "http://localhost:5000/api/items"

# Ürünleri listeleme
def get_items():
    response = requests.get(base_url)
    if response.status_code == 200:
        print("Items retrieved successfully.")
        return response.json()
    else:
        print(f"Failed to retrieve items. Response: {response.text}")
        return None

# Yeni ürün oluşturma
def create_item(data):
    response = requests.post(base_url, json=data)
    if response.status_code == 201:
        print("Item created successfully.")
        return response.json()
    else:
        print(f"Failed to create item. Response: {response.text}")
        return None

# Ürünü güncelleme
def update_item(item_id, data):
    response = requests.put(f"{base_url}/{item_id}", json=data)
    if response.status_code == 200:
        print("Item updated successfully.")
        return response.json()
    else:
        print(f"Failed to update item. Response: {response.text}")
        return None

# Ürünü silme
def delete_item(item_id):
    response = requests.delete(f"{base_url}/{item_id}")
    if response.status_code == 200:
        print("Item deleted successfully.")
    else:
        print(f"Failed to delete item. Response: {response.text}")

if __name__ == "__main__":
    # Ürünleri listeleme testi
    items = get_items()
    
    # Yeni bir ürün oluşturma testi
    new_item = {
        "nr": "001",
        "type": "Burger",
        "name": "Cheeseburger",
        "prices": {"default": 5.99}
    }
    created_item = create_item(new_item)
    
    # Ürünü güncelleme testi
    if created_item:
        update_item(created_item['_id'], {"name": "Double Cheeseburger"})
    
    # Ürünü silme testi
    if created_item:
        delete_item(created_item['_id'])
