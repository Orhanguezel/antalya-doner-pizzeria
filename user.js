{
    "info": {
      "_postman_id": "your-postman-id",
      "name": "Restaurant Management API",
      "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
    },
    "item": [
      {
        "name": "Register",
        "request": {
          "method": "POST",
          "header": [
            {
              "key": "Content-Type",
              "value": "application/json"
            }
          ],
          "body": {
            "mode": "raw",
            "raw": "{\n    \"username\": \"user1\",\n    \"email\": \"user1@example.com\",\n    \"password\": \"password123\"\n}"
          },
          "url": {
            "raw": "http://localhost:5000/api/auth/register",
            "protocol": "http",
            "host": [
              "localhost"
            ],
            "port": "5000",
            "path": [
              "api",
              "auth",
              "register"
            ]
          }
        },
        "response": []
      },
      {
        "name": "Login",
        "request": {
          "method": "POST",
          "header": [
            {
              "key": "Content-Type",
              "value": "application/json"
            }
          ],
          "body": {
            "mode": "raw",
            "raw": "{\n    \"email\": \"user1@example.com\",\n    \"password\": \"password123\"\n}"
          },
          "url": {
            "raw": "http://localhost:5000/api/auth/login",
            "protocol": "http",
            "host": [
              "localhost"
            ],
            "port": "5000",
            "path": [
              "api",
              "auth",
              "login"
            ]
          }
        },
        "response": []
      },
      {
        "name": "Get All Users",
        "request": {
          "method": "GET",
          "header": [
            {
              "key": "Authorization",
              "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTdiOWY3MWUwZTkzMDhhYTlmMmQ2OSIsImlhdCI6MTcyMjI2ODE3OCwiZXhwIjoxNzIyMjcxNzc4fQ.mQsKMhYLzJL3LFF3O26CHLqOgfeT7cvbjBA4fb2qkBw"
            }
          ],
          "url": {
            "raw": "http://localhost:5000/api/auth/users",
            "protocol": "http",
            "host": [
              "localhost"
            ],
            "port": "5000",
            "path": [
              "api",
              "auth",
              "users"
            ]
          }
        },
        "response": []
      },
      {
        "name": "Delete User",
        "request": {
          "method": "DELETE",
          "header": [
            {
              "key": "Authorization",
              "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTdiOWY3MWUwZTkzMDhhYTlmMmQ2OSIsImlhdCI6MTcyMjI2ODE3OCwiZXhwIjoxNzIyMjcxNzc4fQ.mQsKMhYLzJL3LFF3O26CHLqOgfeT7cvbjBA4fb2qkBw"
            }
          ],
          "url": {
            "raw": "http://localhost:5000/api/auth/user/<USER_ID>",
            "protocol": "http",
            "host": [
              "localhost"
            ],
            "port": "5000",
            "path": [
              "api",
              "auth",
              "user",
              "<USER_ID>"
            ]
          }
        },
        "response": []
      },
      {
        "name": "Update User Role",
        "request": {
          "method": "PUT",
          "header": [
            {
              "key": "Authorization",
              "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTdiOWY3MWUwZTkzMDhhYTlmMmQ2OSIsImlhdCI6MTcyMjI2ODE3OCwiZXhwIjoxNzIyMjcxNzc4fQ.mQsKMhYLzJL3LFF3O26CHLqOgfeT7cvbjBA4fb2qkBw"
            },
            {
              "key": "Content-Type",
              "value": "application/json"
            }
          ],
          "body": {
            "mode": "raw",
            "raw": "{\n    \"role\": \"admin\"\n}"
          },
          "url": {
            "raw": "http://localhost:5000/api/auth/user/<USER_ID>/role",
            "protocol": "http",
            "host": [
              "localhost"
            ],
            "port": "5000",
            "path": [
              "api",
              "auth",
              "user",
              "<USER_ID>",
              "role"
            ]
          }
        },
        "response": []
      },
      {
        "name": "Update Profile",
        "request": {
          "method": "PUT",
          "header": [
            {
              "key": "Authorization",
              "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTdiOWY3MWUwZTkzMDhhYTlmMmQ2OSIsImlhdCI6MTcyMjI2ODE3OCwiZXhwIjoxNzIyMjcxNzc4fQ.mQsKMhYLzJL3LFF3O26CHLqOgfeT7cvbjBA4fb2qkBw"
            },
            {
              "key": "Content-Type",
              "value": "application/json"
            }
          ],
          "body": {
            "mode": "raw",
            "raw": "{\n    \"username\": \"newusername\",\n    \"email\": \"newemail@example.com\",\n    \"password\": \"newpassword\"\n}"
          },
          "url": {
            "raw": "http://localhost:5000/api/auth/profile",
            "protocol": "http",
            "host": [
              "localhost"
            ],
            "port": "5000",
            "path": [
              "api",
              "auth",
              "profile"
            ]
          }
        },
        "response": []
      },
      {
        "name": "Forgot Password",
        "request": {
          "method": "POST",
          "header": [
            {
              "key": "Content-Type",
              "value": "application/json"
            }
          ],
          "body": {
            "mode": "raw",
            "raw": "{\n    \"email\": \"user1@example.com\"\n}"
          },
          "url": {
            "raw": "http://localhost:5000/api/auth/forgot-password",
            "protocol": "http",
            "host": [
              "localhost"
            ],
            "port": "5000",
            "path": [
              "api",
              "auth",
              "forgot-password"
            ]
          }
        },
        "response": []
      },
      {
        "name": "Reset Password",
        "request": {
          "method": "PUT",
          "header": [
            {
              "key": "Content-Type",
              "value": "application/json"
            }
          ],
          "body": {
            "mode": "raw",
            "raw": "{\n    \"password\": \"newpassword123\"\n}"
          },
          "url": {
            "raw": "http://localhost:5000/api/auth/reset-password/<RESET_TOKEN>",
            "protocol": "http",
            "host": [
              "localhost"
            ],
            "port": "5000",
            "path": [
              "api",
              "auth",
              "reset-password",
              "<RESET_TOKEN>"
            ]
          }
        },
        "response": []
      },
      {
        "name": "Logout",
        "request": {
          "method": "POST",
          "header": [
            {
              "key": "Authorization",
              "value": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2YTdiOWY3MWUwZTkzMDhhYTlmMmQ2OSIsImlhdCI6MTcyMjI2ODE3OCwiZXhwIjoxNzIyMjcxNzc4fQ.mQsKMhYLzJL3LFF3O26CHLqOgfeT7cvbjBA4fb2qkBw"
            }
          ],
          "url": {
            "raw": "http://localhost:5000/api/auth/logout",
            "protocol": "http",
            "host": [
              "localhost"
            ],
            "port": "5000",
            "path": [
              "api",
              "auth",
              "logout"
            ]
          }
        },
        "response": []
      }
    ]
  }
  