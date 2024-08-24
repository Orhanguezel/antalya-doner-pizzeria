import requests

register_url = "http://localhost:5000/api/users/register"

users = [
    {"username": "admin", "email": "admin@example.com", "password": "adminpassword", "role": "admin"},
    {"username": "user1", "email": "user1@example.com", "password": "userpassword", "role": "user"},
    {"username": "user2", "email": "user2@example.com", "password": "userpassword", "role": "user"},
]

def register_user(user):
    response = requests.post(register_url, json=user)
    if response.status_code == 201:
        print(f"User {user['username']} registered successfully.")
    elif response.status_code == 400 and 'Benutzer existiert bereits' in response.text:
        print(f"User {user['username']} already exists.")
    else:
        print(f"Failed to register user {user['username']}. Response: {response.text}")

for user in users:
    register_user(user)

