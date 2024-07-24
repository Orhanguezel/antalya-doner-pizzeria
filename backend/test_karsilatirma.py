import requests

BASE_URL = "https://www.antalya-doner-pizzeria.de/api"

def get_item_by_id(item_id):
    response = requests.get(f"{BASE_URL}/items/{item_id}")
    return response

def test_get_item_by_id(item_id):
    # Get item by ID
    item_response = get_item_by_id(item_id)
    print("Get Item by ID Response Status Code:", item_response.status_code)
    print("Get Item by ID Response Content:", item_response.content)

    if item_response.status_code == 200:
        print("Successfully retrieved item")
    else:
        print("Failed to get item")

if __name__ == "__main__":
    test_item_id = "669a56e002466c24138a31f0"
    test_get_item_by_id(test_item_id)
