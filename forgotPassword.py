import requests

def forgot_password(email):
    forgot_password_url = "http://localhost:5000/api/users/forgot-password"
    response = requests.post(forgot_password_url, json={"email": email})
    if response.status_code == 200:
        print("Password reset link sent.")
    else:
        print(f"Failed to send password reset link. Response: {response.text}")

# Example usage
email = "user@example.com"
forgot_password(email)
