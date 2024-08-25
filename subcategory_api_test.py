import requests

base_url = "http://localhost:5000/api/subcategories"

# Alt kategorileri listeleme
def get_subcategories():
    response = requests.get(base_url)
    if response.status_code == 200:
        print("Subcategories retrieved successfully.")
        return response.json()
    else:
        print(f"Failed to retrieve subcategories. Response: {response.text}")
        return None

# Yeni alt kategori oluşturma
def create_subcategory(data):
    response = requests.post(base_url, json=data)
    if response.status_code == 201:
        print("Subcategory created successfully.")
        return response.json()
    else:
        print(f"Failed to create subcategory. Response: {response.text}")
        return None

if __name__ == "__main__":
    # Alt kategorileri listeleme testi
    subcategories = get_subcategories()
    
    # Yeni bir alt kategori oluşturma testi
    new_subcategory = {
        "name": "Burgers",
        "description": "All kinds of burgers"
    }
    created_subcategory = create_subcategory(new_subcategory)
