const axios = require('axios');

const testLoginUser = async () => {
  const loginPayload = {
    email: 'admin@example.com',
    password: 'adminpassword'
  };

  try {
    const response = await axios.post('${process.env.REACT_APP_API_URL}/api/auth/login', loginPayload);
    console.log('Login Response Status Code:', response.status);
    console.log('Login Response Data:', response.data);
  } catch (error) {
    if (error.response) {
      console.error('Login Error Status Code:', error.response.status);
      console.error('Login Error Data:', error.response.data);
    } else {
      console.error('Login Error:', error.message);
    }
  }
};

testLoginUser();
