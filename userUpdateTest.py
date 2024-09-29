import requests
import json

# API URL
BASE_URL = 'http://localhost:5000/api'

# Auth token (admin kullanıcısının token'ını buraya eklemelisiniz)
TOKEN = 'Bearer YOUR_VALID_ADMIN_TOKEN_HERE'

# Headers (JSON ve yetkilendirme için token ekliyoruz)
HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': TOKEN
}

# Kullanıcı bilgilerini güncelleme
def update_user(user_id, role=None, blocked=None, phoneNumber=None, address=None):
    data = {}
    if role:
        data['role'] = role
    if blocked is not None:
        data['blocked'] = blocked
    if phoneNumber:
        data['phoneNumber'] = phoneNumber
    if address:
        data['address'] = address
    
    response = requests.put(f'{BASE_URL}/users/{user_id}', headers=HEADERS, data=json.dumps(data))
    return response.json()

# Tüm kullanıcıları alma
def get_all_users():
    response = requests.get(f'{BASE_URL}/users', headers=HEADERS)
    return response.json()

# Test işlemleri
if __name__ == '__main__':
    # 1. Tüm kullanıcıları listeleme
    users = get_all_users()
    print('Tüm kullanıcılar:', users)

    # 2. Var olan bir kullanıcının ID'sini seçin
    existing_user = next((user for user in users if user['email'] == 'newtestuser@example.com'), None)
    
    if existing_user:
        print(f"Var olan kullanıcı bulundu: {existing_user}")
        user_id = existing_user['_id']

        # 3. Kullanıcı güncelleme işlemi
        updated_user = update_user(user_id, role='admin', blocked=True, phoneNumber='987654321', address='Yeni Adres')
        print('Güncellenen kullanıcı bilgileri:', updated_user)
    else:
        print("Kullanıcı bulunamadı!")
