import requests

base_url = "http://localhost:5000/api/categories"

# Kategorileri listeleme
def get_categories():
    response = requests.get(base_url)
    if response.status_code == 200:
        print("Categories retrieved successfully.")
        return response.json()
    else:
        print(f"Failed to retrieve categories. Response: {response.text}")
        return None

# Yeni kategori oluşturma
def create_category(data):
    response = requests.post(base_url, json=data)
    if response.status_code == 201:
        print("Category created successfully.")
        return response.json()
    else:
        print(f"Failed to create category. Response: {response.text}")
        return None

if __name__ == "__main__":
    # Kategorileri listeleme testi
    categories = get_categories()
    
    # Yeni bir kategori oluşturma testi
    new_category = {
        "name": "Fast Food",
        "description": "All fast food items."
    }
    created_category = create_category(new_category)
