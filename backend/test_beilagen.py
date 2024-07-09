import requests

BASE_URL = "http://localhost:5000/api"

def get_category_by_name(name):
    response = requests.get(f"{BASE_URL}/categories")
    if response.status_code == 200:
        categories = response.json()
        for category in categories:
            if category['name'].lower() == name.lower():
                return category
    return None

def get_subcategory_by_id(subcategory_id):
    response = requests.get(f"{BASE_URL}/subcategories/{subcategory_id}")
    return response

def get_item_by_id(item_id):
    response = requests.get(f"{BASE_URL}/items/{item_id}")
    return response

def test_beilagen_category():
    category_name = "beilagen"
    print(f"Testing category: {category_name}")

    category = get_category_by_name(category_name)
    if not category:
        print(f"Category '{category_name}' not found")
        return

    for subcategory_id in category['subcategories']:
        subcategory_response = get_subcategory_by_id(subcategory_id)
        if subcategory_response.status_code != 200:
            print(f"Failed to get subcategory with ID {subcategory_id} in category '{category_name}': {subcategory_response.status_code}")
            continue
        subcategory_data = subcategory_response.json()
        for item_id in subcategory_data['items']:
            item_response = get_item_by_id(item_id)
            if item_response.status_code != 200:
                print(f"Failed to get item with ID {item_id} in subcategory '{subcategory_data['name']}' of category '{category_name}': {item_response.status_code}")
                continue
            item_data = item_response.json()
            # Check if the item is missing required fields
            if 'extras' not in item_data:
                print(f"Item '{item_data['name']}' (ID: {item_data['_id']}) has no 'extras' field in subcategory '{subcategory_data['name']}' of category '{category_name}'")

if __name__ == "__main__":
    test_beilagen_category()
