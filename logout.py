import requests

def logout(token):
    logout_url = "http://localhost:5000/api/users/logout"
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.post(logout_url, headers=headers)
    if response.status_code == 200:
        print("Logged out successfully.")
    else:
        print(f"Failed to logout. Response: {response.text}")

# Example usage
login_url = "http://localhost:5000/api/users/login"
login_data = {"email": "admin@example.com", "password": "adminpassword"}
login_response = requests.post(login_url, json=login_data)

if login_response.status_code == 200:
    token = login_response.json()['token']
    logout(token)
else:
    print(f"Failed to login admin user. Response: {login_response.text}")
