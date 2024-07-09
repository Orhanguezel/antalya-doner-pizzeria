import requests

BASE_URL = "http://localhost:5000/api"

def get_all_categories():
    response = requests.get(f"{BASE_URL}/categories")
    return response

def get_all_items():
    response = requests.get(f"{BASE_URL}/items")
    return response

def test_get_categories_and_items():
    # Get all categories
    categories_response = get_all_categories()
    print("Get All Categories Response Status Code:", categories_response.status_code)
    print("Get All Categories Response Content:", categories_response.content)

    if categories_response.status_code != 200:
        print("Failed to get categories")
        return

    # Get all items
    items_response = get_all_items()
    print("Get All Items Response Status Code:", items_response.status_code)
    print("Get All Items Response Content:", items_response.content)

    if items_response.status_code != 200:
        print("Failed to get items")
        return

if __name__ == "__main__":
    test_get_categories_and_items()
