import requests

def reset_password(token, new_password):
    reset_password_url = "http://localhost:5000/api/users/reset-password"
    response = requests.post(reset_password_url, json={"token": token, "newPassword": new_password})
    if response.status_code == 200:
        print("Password reset successfully.")
    else:
        print(f"Failed to reset password. Response: {response.text}")

# Example usage
reset_token = "your_reset_token_here"
new_password = "newpassword"
reset_password(reset_token, new_password)
