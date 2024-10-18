import { defineStore } from 'pinia';
import { ref } from 'vue';
import apiClient from '@/services/authService.js';
import { useRouter } from 'vue-router';

// 管理身分驗證狀態
export const useAuthStore = defineStore('auth', () => {
  // accessToken 和 refreshToken 是響應式變數，初始值從 localStorage 中讀取。
  const accessToken = ref(localStorage.getItem('accessToken'));
  const refreshToken = ref(localStorage.getItem('refreshToken'));
  // isLoggedIn 用來檢查使用者是否已登入，根據是否有 accessToken 來決定。
  const isLoggedIn = ref(!!accessToken.value);
  // router 用來導航頁面。
  const router = useRouter();

  // API區

  // Member個人  Get
  const fetchMemberInfo = async (memberId) => {
    try {
      const response = await apiClient.get(`/Member/${memberId}`);
      return response.data;
    } catch (error) {
      console.error('無法獲取會員資訊:', error);
      throw error;
    }
  };
  // Member註冊  post
  const register = async (memberData) => {
    try {
      const response = await apiClient.post('/Member/register', memberData);
      router.push('/Member/login');
      return response.data;
    } catch (error) {
      console.error('註冊失敗:', error);
      throw error;
    }
  };
  // Member登入  post/login
  const login = async (email, password) => {
    try {
      const response = await apiClient.post('/Member/login', { email, password });
      accessToken.value = response.data.accessToken;
      refreshToken.value = response.data.refreshToken;
      isLoggedIn.value = true;

      localStorage.setItem('accessToken', accessToken.value);
      localStorage.setItem('refreshToken', refreshToken.value);

      alert('登入成功');
      await router.push('/');
    } catch (error) {
      alert('登入失敗，請檢查帳號密碼');
      console.error(error.response?.data || error);
    }
  };
  // Google 登入  post/google-login
  const googleLogin = async (googleToken) => {
    try {
      console.log(googleToken); // 確認 googleToken 正確
      const response = await apiClient.post('/Member/google-login', { IdToken: googleToken });// 改成 IdToken 作為鍵

      console.log("response:", response); // 確認回應
      accessToken.value = response.data.accessToken;
      refreshToken.value = response.data.refreshToken;
      isLoggedIn.value = true;

      // 儲存 token 到本地儲存
      localStorage.setItem('accessToken', accessToken.value);
      localStorage.setItem('refreshToken', refreshToken.value);

      alert('Google 登入成功');
      await router.push('/');
    } catch (error) {
      alert('Google 登入失敗');
      console.error('Google 登入錯誤:', error.response?.data || error.message || error);
    }
  };

  // Member刷新Token  post/refresh-token
  const refreshAccessToken = async () => {
    try {
      const response = await apiClient.post('/Member/refresh-token', { RefreshToken: refreshToken.value });
      
      accessToken.value = response.data.accessToken;
      localStorage.setItem('accessToken', accessToken.value);
    } catch (error) {
      // console.error('Refresh token failed:', error);
      // alert('刷新 token 失敗，請重新登入');
      logout();
    }
  };

  


  const fetchHotelInfo = async () => {
    try {
      const response = await apiClient.get('/HotelInfo');
      return response.data;
    } catch (error) {
      console.error('無法獲取酒店信息:', error);
      throw error;
    }
  };

  const fetchRoomTypes = async () => {
    try {
      const response = await apiClient.get('/RoomType');
      return response.data;
    } catch (error) {
      console.error('無法獲取房型:', error);
      throw error;
    }
  };

  const fetchRooms = async () => {
    try {
      const response = await apiClient.get('/Room');
      return response.data;
    } catch (error) {
      console.error('無法獲取房間:', error);
      throw error;
    }
  };

  

  // Function區
  // 從access token獲取MemberId
  const getMemberIdFromToken = () => {
    if (!accessToken.value) return null;
    const payload = JSON.parse(atob(accessToken.value.split('.')[1]));
    console.log(payload)
    return payload.MemberID; // 假設 payload 中有 MemberID
  };
  // 登出
  const logout = () => {
    accessToken.value = null;
    refreshToken.value = null;
    isLoggedIn.value = false;

    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');

    router.push('/')
    alert('您已成功登出。');
  };
  //載入、檢查Token
  const checkAndLoadAccessToken = async () => {
    // 從 localStorage 載入 token
    const token = localStorage.getItem('accessToken');
    const storedRefreshToken = localStorage.getItem('refreshToken');

    if (token) {
      accessToken.value = token;
      refreshToken.value = storedRefreshToken;
      isLoggedIn.value = true;
    } else {
      return false; // 若未找到 accessToken 則直接返回 false
    }

    // 檢查 token 是否過期
    const payload = JSON.parse(atob(accessToken.value.split('.')[1]));
    const exp = payload.exp * 1000;

    if (Date.now() >= exp) {
      // 若 token 已過期，嘗試刷新 token
      try {
        await refreshAccessToken(); // 嘗試刷新 token
      } catch (error) {
        // console.error('刷新 token 失敗:', error);
        logout(); // 若刷新失敗，登出使用者
        return false;
      }
    }

    return true; // token 有效或已刷新成功
  };

  return {
    accessToken,
    refreshToken,
    isLoggedIn,
    login,
    googleLogin,
    logout,
    refreshAccessToken,
    checkAndLoadAccessToken,
    register,
    fetchHotelInfo,
    fetchRoomTypes,
    fetchRooms,
    fetchMemberInfo,
    getMemberIdFromToken, // 將此方法返回以便在組件中使用
  };
});