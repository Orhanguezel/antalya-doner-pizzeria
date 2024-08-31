import requests

def get_users(token):
    users_url = "http://localhost:5000/api/users"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(users_url, headers=headers)
    if response.status_code == 200:
        users = response.json()
        print("Users retrieved successfully:")
        for user in users:
            print(f"Username: {user['username']}, Email: {user['email']}, Role: {user['role']}")
    else:
        print(f"Failed to retrieve users. Response: {response.text}")

# Example usage
login_url = "http://localhost:5000/api/users/login"
login_data = {"email": "superadmin@example.com", "password": "adminpassword"}
login_response = requests.post(login_url, json=login_data)

if login_response.status_code == 200:
    token = login_response.json()['token']
    get_users(token)
else:
    print(f"Giriş işlemi başarısız oldu. Response: {login_response.text}")
