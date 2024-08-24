import requests

login_url = "http://localhost:5000/api/users/login"
delete_url = "http://localhost:5000/api/users"

admin_user = {"email": "admin@example.com", "password": "adminpassword"}

def login_user(user):
    response = requests.post(login_url, json=user)
    if response.status_code == 200:
        print(f"Admin logged in successfully.")
        return response.json()['token']
    else:
        print(f"Failed to login admin. Response: {response.text}")
        return None

def delete_users(token):
    headers = {'Authorization': f'Bearer {token}'}
    response = requests.get(delete_url, headers=headers)
    if response.status_code == 200:
        users = response.json()
        for user in users:
            if user['role'] != 'admin':  # Admin'i silme
                delete_response = requests.delete(f"{delete_url}/{user['_id']}", headers=headers)
                if delete_response.status_code == 200:
                    print(f"User {user['username']} deleted successfully.")
                else:
                    print(f"Failed to delete user {user['username']}. Response: {delete_response.text}")
        # Check remaining users
        remaining_users_response = requests.get(delete_url, headers=headers)
        if remaining_users_response.status_code == 200:
            remaining_users = remaining_users_response.json()
            print("Remaining users after deletion:")
            for user in remaining_users:
                print(f"- {user['username']} ({user['email']})")
        else:
            print(f"Failed to retrieve remaining users. Response: {remaining_users_response.text}")
    else:
        print(f"Failed to retrieve users. Response: {response.text}")

token = login_user(admin_user)
if token:
    delete_users(token)
