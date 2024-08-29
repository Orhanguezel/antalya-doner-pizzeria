import requests

# API base URL
base_url = "http://localhost:5000/api"

# Kategorileri getirme
def get_categories():
    response = requests.get(f"{base_url}/categories")
    if response.status_code == 200:
        categories = response.json()
        print(f"Categories retrieved successfully. Total Categories: {len(categories)}")
        return categories
    else:
        print(f"Failed to retrieve categories. Response: {response.text}")
        return []

# Alt kategorileri ve ürünleri getirme
def get_subcategories_and_items(category_id):
    # Alt kategorileri getirme
    subcategories_response = requests.get(f"{base_url}/subcategories?categoryId={category_id}")
    if subcategories_response.status_code == 200:
        subcategories = subcategories_response.json()
        print(f"Subcategories retrieved successfully for category '{category_id}'. Total Subcategories: {len(subcategories)}")
        
        for subcategory in subcategories:
            print(f"  - Subcategory: {subcategory['name']}")
            # Alt kategorideki ürünleri getirme
            items_response = requests.get(f"{base_url}/items?subcategoryId={subcategory['_id']}")
            if items_response.status_code == 200:
                items = items_response.json()
                if len(items) > 0:
                    first_item = items[0]
                    print(f"    * First Item: {first_item['name']} (Price: {first_item['prices']})")
                else:
                    print("    * No items found in this subcategory.")
            else:
                print(f"Failed to retrieve items for subcategory '{subcategory['_id']}'. Response: {items_response.text}")
    else:
        print(f"Failed to retrieve subcategories. Response: {subcategories_response.text}")

if __name__ == "__main__":
    # Tüm kategorileri listeleme
    categories = get_categories()
    
    # Her kategorideki alt kategorileri ve öğeleri listeleme
    if categories:
        for category in categories:
            get_subcategories_and_items(category['_id'])
