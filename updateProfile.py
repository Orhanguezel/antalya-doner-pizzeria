import requests

BASE_URL = "http://localhost:5000/api/users"

# Kullanıcı Kaydı
def register_user(username, email, password, role):
    url = f"{BASE_URL}/register"
    data = {
        "username": username,
        "email": email,
        "password": password,
        "role": role
    }
    response = requests.post(url, json=data)
    if response.status_code == 201:
        print("User registered successfully:", response.json())
    else:
        print(f"Failed to register user. Response: {response.status_code} - {response.text}")

# Kullanıcı Girişi
def login_user(email, password):
    url = f"{BASE_URL}/login"
    data = {"email": email, "password": password}
    response = requests.post(url, json=data)
    if response.status_code == 200:
        print("User logged in successfully:", response.json())
        return response.json()['token']
    else:
        print(f"Failed to login user. Response: {response.status_code} - {response.text}")
        return None

# Kullanıcıları Listeleme
def get_all_users(token):
    url = BASE_URL
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        users = response.json()
        print("All users:", users)
        return users
    else:
        print(f"Failed to get users. Response: {response.status_code} - {response.text}")
        return []

# Kullanıcı Bloklama
def block_user(user_id, token):
    url = f"{BASE_URL}/block/{user_id}"  # Eğer API endpoint bu şekildeyse güncelleyebilirsiniz
    headers = {"Authorization": f"Bearer {token}"}
    response = requests.put(url, headers=headers)
    if response.status_code == 200:
        print("User blocked successfully")
    else:
        print(f"Failed to block user. Response: {response.status_code} - {response.text}")

# Profil Güncelleme
def update_profile(updated_user_info, token, profile_image_path=None):
    url = f"{BASE_URL}/profile"
    headers = {"Authorization": f"Bearer {token}"}
    
    # Multipart form-data oluşturuyoruz
    form_data = {
        "username": updated_user_info.get("username"),
        "email": updated_user_info.get("email"),
        "address": updated_user_info.get("address"),
        "phoneNumber": updated_user_info.get("phoneNumber"),
        "password": updated_user_info.get("password")
    }
    
    # Eğer profil fotoğrafı varsa, multipart veriye ekliyoruz
    files = {}
    if profile_image_path:
        files['profileImage'] = open(profile_image_path, 'rb')  # Dosya yolu doğru olmalı.
    
    response = requests.put(url, data=form_data, headers=headers, files=files)
    
    if response.status_code == 200:
        print("Profile updated successfully:", response.json())
    else:
        print(f"Failed to update profile. Response: {response.status_code} - {response.text}")

# Kullanıcı Rolü Güncelleme
def update_user_role(user_id, new_role, token):
    url = f"{BASE_URL}/{user_id}/role"
    headers = {"Authorization": f"Bearer {token}"}
    data = {"role": new_role}
    response = requests.put(url, json=data, headers=headers)
    if response.status_code == 200:
        print("User role updated successfully")
    else:
        print(f"Failed to update user role. Response: {response.status_code} - {response.text}")

# Örnek kullanım
if __name__ == "__main__":
    # Yeni bir kullanıcı kaydı yapın
    register_user("xxxxnewtestuser", "xxxxnewtestuser@example.com", "newtestpassword", "user")

    # Admin kullanıcısı ile giriş yapın
    token = login_user("admin@example.com", "adminpassword")
    
    if token:
        # Tüm kullanıcıları listeleyin
        users = get_all_users(token)
        
        if users:
            # İlk kullanıcıyı bloklayın
            user_id = users[0]['_id']
            block_user(user_id, token)

            # İlk kullanıcının rolünü güncelleyin
            update_user_role(user_id, "admin", token)

        # Profil güncelleme işlemi
        updated_user_info = {
            "username": "asdnewusername",
            "email": "asdnewemail@example.com",
            "password": "newpassword",
            "address": "New Address",
            "phoneNumber": "123456789"
        }
        
        # Profil fotoğrafı yolunu da ekleyin
        profile_image_path = "/home/dci-admin/Documents/restaurant/antalya-doner-pizzeria/frontend/src/assets/uploads/defaultProfileImage.png"
        
        update_profile(updated_user_info, token, profile_image_path=profile_image_path)
