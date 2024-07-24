import requests
from pymongo import MongoClient

# API base URL
BASE_URL = "https://www.antalya-doner-pizzeria.de/api"

# MongoDB bağlantısı
client = MongoClient('mongodb://localhost:27017')  # MongoDB bağlantı URI'nizi gerektiği gibi değiştirin
db = client['antalya-doner-pizzeria']
items_collection = db['items']

def get_item_by_id_from_api(item_id):
    response = requests.get(f"{BASE_URL}/items/{item_id}")
    return response

def get_item_by_id_from_db(item_id):
    return items_collection.find_one({"_id": item_id})

def test_get_item_by_id(item_id):
    # API'den item'ı al
    api_response = get_item_by_id_from_api(item_id)
    print("API Response Status Code:", api_response.status_code)
    print("API Response Content:", api_response.json())

    if api_response.status_code != 200:
        print("Failed to get item from API")
        return

    # Veritabanından item'ı al
    db_item = get_item_by_id_from_db(item_id)
    print("Database Item:", db_item)

    # ID'leri karşılaştır
    api_item = api_response.json()
    if api_item['_id'] == str(db_item['_id']):
        print("ID'ler eşleşiyor.")
    else:
        print("ID'ler eşleşmiyor.")

    # Diğer alanları karşılaştır
    if api_item == db_item:
        print("API ve veritabanı item'ları eşleşiyor.")
    else:
        print("API ve veritabanı item'ları eşleşmiyor.")

if __name__ == "__main__":
    test_item_id = "669a56e002466c24138a31f0"  # Test etmek istediğiniz item ID'sini buraya girin
    test_get_item_by_id(test_item_id)
