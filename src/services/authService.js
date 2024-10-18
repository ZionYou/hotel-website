// src/apiClient.js
import axios from 'axios';

// 創建 axios 實例
//API客戶端
const apiClient = axios.create({
  baseURL: `${process.env.VUE_APP_API_BASE_URL}`,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 添加請求攔截器
apiClient.interceptors.request.use(config => {
  const token = localStorage.getItem('accessToken'); // 獲取 token
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // 設置 Authorization 標頭
  }
  return config;
}, error => {
  return Promise.reject(error);
});

// 處理 API 響應
const handleResponse = (response) => {
  return {
    accessToken: response.data.accessToken,
    refreshToken: response.data.refreshToken,
  };
};

// 登入功能
export async function loginWithCredentials(email, password) {
  try {
    const response = await apiClient.post('/Member/login', { email, password });
    return handleResponse(response);
  } catch (error) {
    console.error('Login error', error.response?.data || error);
    throw error.response?.data || 'Login failed';
  }
}

export default apiClient;
