import axios from 'axios';

// Axios örneğini oluşturuyoruz
const instance = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api',
});

// İstek öncesi her seferinde, localStorage'den token alıp, varsa Authorization başlığına ekliyoruz
instance.interceptors.request.use(
  (config) => {
    const userInfo = localStorage.getItem('userInfo');

    if (userInfo) {
      try {
        const { token } = JSON.parse(userInfo);
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error('Error parsing userInfo from localStorage:', error);
      }
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Oluşturduğumuz Axios örneğini `instance` olarak export ediyoruz
export default instance;
