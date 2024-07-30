import requests

# URL'leri ayarlayın
base_url = "http://localhost:5000/api/auth"
login_url = f"{base_url}/login"
users_url = f"{base_url}/users"

# Admin bilgileri
admin_user = {
    "email": "superadmin@example.com",
    "password": "password123"
}

def login_test(user):
    response = requests.post(login_url, json=user)
    print(f"Login: {response.status_code} {response.json()}")
    return response.json().get("token")

def get_all_users(token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(users_url, headers=headers)
    print(f"Get all users response text: {response.text}")
    if response.status_code == 200:
        return response.json().get("data", [])
    else:
        print(f"Error getting users: {response.status_code} {response.json()}")
        return []

print("Admin Login Test")
admin_token = login_test(admin_user)

if admin_token:
    print("Get All Users Test")
    users = get_all_users(admin_token)
    for user in users:
        print(f"User: {user}")
