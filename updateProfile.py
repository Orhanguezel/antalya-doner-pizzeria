import requests

def update_profile(user_info, token):
    update_url = "http://localhost:5000/api/users/profile"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.put(update_url, json=user_info, headers=headers)
    if response.status_code == 200:
        print("Profile updated successfully.")
    else:
        print(f"Failed to update profile. Response: {response.text}")

# Example usage
login_url = "http://localhost:5000/api/users/login"
login_data = {"email": "admin@example.com", "password": "adminpassword"}
login_response = requests.post(login_url, json=login_data)

if login_response.status_code == 200:
    token = login_response.json()['token']
    updated_user_info = {
        "username": "updateduser",
        "email": "updateduser@example.com",
        "password": "newpassword"
    }
    update_profile(updated_user_info, token)
else:
    print(f"Failed to login admin user. Response: {login_response.text}")
