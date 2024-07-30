import requests

# URL'leri ayarlayın
base_url = "http://localhost:5000/api/auth"
login_url = f"{base_url}/login"
block_url = f"{base_url}/users/block"

# Admin bilgileri
admin_user = {
    "email": "superadmin@example.com",
    "password": "password123"
}

def login_test(user):
    response = requests.post(login_url, json=user)
    print(f"Login: {response.status_code} {response.json()}")
    return response.json().get("token")

def block_user(user_id, token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.put(f"{block_url}/{user_id}", headers=headers)
    print(f"Block user response text: {response.text}")
    if response.status_code == 200:
        print(f"Blocked user {user_id}: {response.status_code} {response.json()}")
    else:
        print(f"Error blocking user {user_id}: {response.status_code} {response.text}")

print("Admin Login Test")
admin_token = login_test(admin_user)

if admin_token:
    # Kullanıcı kimlik numarasını buraya elle ekleyin
    user_id_to_block = '66a8e643470c6652329f2d68'  # Örneğin 'user1' kimlik numarası

    print("Block User Test")
    block_user(user_id_to_block, admin_token)
