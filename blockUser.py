import requests

def block_user(user_id, token):
    block_url = f"http://localhost:5000/api/users/{user_id}/block"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.put(block_url, headers=headers)
    if response.status_code == 200:
        print(f"User {user_id} blocked successfully.")
    else:
        print(f"Failed to block user {user_id}. Response: {response.text}")

# Example usage
login_url = "http://localhost:5000/api/users/login"
login_data = {"email": "admin@example.com", "password": "adminpassword"}
login_response = requests.post(login_url, json=login_data)

if login_response.status_code == 200:
    token = login_response.json()['token']
    user_id_to_block = "user_id_here"  # Engellenecek kullanıcının ID'sini buraya ekleyin
    block_user(user_id_to_block, token)
else:
    print(f"Failed to login admin user. Response: {login_response.text}")
