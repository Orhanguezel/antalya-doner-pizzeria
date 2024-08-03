import requests

# URL'leri ayarlayın
base_url = "https://www.antalya-doner-pizzeria.de/api/auth"
login_url = f"{base_url}/login"
profile_url = f"{base_url}/users/profile"
block_url = f"{base_url}/users/block"
role_url = f"{base_url}/users/role"
delete_all_url = f"{base_url}/users"

# Admin bilgileri
admin_user = {
    "email": "superadmin@example.com",
    "password": "password123"
}

def login_test(user):
    try:
        response = requests.post(login_url, json=user)
        response.raise_for_status()
        print(f"Login: {response.status_code} {response.json()}")
        return response.json().get("token")
    except requests.exceptions.HTTPError as errh:
        print ("Http Error:", errh)
    except requests.exceptions.ConnectionError as errc:
        print ("Error Connecting:", errc)
    except requests.exceptions.Timeout as errt:
        print ("Timeout Error:", errt)
    except requests.exceptions.RequestException as err:
        print ("OOps: Something Else", err)

def update_profile(token, profile_data):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.put(profile_url, json=profile_data, headers=headers)
    print(f"Update profile response text: {response.text}")
    if response.status_code == 200:
        return response.json().get("data")
    else:
        print(f"Error updating profile: {response.status_code} {response.json()}")
        return None

def update_user_role(user_id, token, role):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.put(f"{role_url}/{user_id}", json={"role": role}, headers=headers)
    print(f"Update role response text: {response.text}")
    if response.status_code == 200:
        return response.json().get("data")
    else:
        print(f"Error updating role: {response.status_code} {response.json()}")
        return None

def block_user(user_id, token):
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.put(f"{block_url}/{user_id}", headers=headers)
    print(f"Block user response text: {response.text}")
    if response.status_code == 200:
        return response.json().get("data")
    else:
        print(f"Error blocking user: {response.status_code} {response.json()}")
        return None

print("Admin Login Test")
admin_token = login_test(admin_user)

if admin_token:
    print("Block User Test")
    user_id_to_block = "66a8e643470c6652329f2d68"  # Kullanıcının ID'sini burada belirtin
    block_user(user_id_to_block, admin_token)
    
    print("Update Profile Test")
    profile_data = {
        "username": "updatedUser",
        "email": "updateduser@example.com",
        "password": "newpassword123",
        "profile_image": "updated.jpg"
    }
    update_profile(admin_token, profile_data)
    
    print("Update User Role Test")
    user_id_to_update_role = "66a8e643470c6652329f2d68"  # Kullanıcının ID'sini burada belirtin
    update_user_role(user_id_to_update_role, admin_token, "admin")
