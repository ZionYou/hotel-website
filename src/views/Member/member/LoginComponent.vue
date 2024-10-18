<template>
  <div class="container">
    <div class="row justify-content-center">
      <div class="col-md-6">
        <div class="card mt-5">
          <div class="card-body">
            <h2 class="card-title text-center mb-4">會員登入</h2>
            <form @submit.prevent="login">
              <!-- Existing Login Form -->
              <div class="mb-3">
                <label for="email" class="form-label">帳號：</label>
                <input 
                  v-model="email" 
                  type="email" 
                  class="form-control" 
                  id="email" 
                  required 
                  placeholder="您的電子信箱"
                  :class="{ 'is-invalid': emailError }" 
                />
                <div class="invalid-feedback" v-if="emailError">{{ emailError }}</div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label">密碼：</label>
                <div class="input-group">
                  <input 
                    v-model="password" 
                    :type="showPassword ? 'text' : 'password'" 
                    class="form-control"
                    id="password" 
                    required 
                    placeholder="********" 
                    :class="{ 'is-invalid': passwordError }" 
                  />
                  <button class="btn btn-outline-secondary" type="button" @click="togglePasswordVisibility">
                    <i :class="showPassword ? 'bi bi-eye-slash' : 'bi bi-eye'"></i>
                  </button>
                  <div class="invalid-feedback" v-if="passwordError">{{ passwordError }}</div>
                </div>
              </div>
              <div class="mb-3 form-check">
                <input type="checkbox" class="form-check-input" id="rememberMe" v-model="rememberMe">
                <label class="form-check-label" for="rememberMe">記住我</label>
              </div>
              <button type="submit" class="btn btn-primary w-100" :disabled="isLoading">
                <span class="spinner-border spinner-border-sm" role="status" aria-hidden="true" v-if="isLoading"></span>
                {{ isLoading ? '登入中...' : '登入' }}
              </button>
            </form>

            <div class="text-center mt-4">
              <p>或使用 Google 登入：</p>
              <GoogleLogin
                :client-id="googleClientId"
                buttonText="Login with Google"
                :callback="googleLoginCallback"
                class="w-100"
              />
            </div>

            <div v-if="error" class="alert alert-danger mt-3" role="alert">{{ error }}</div>
            <div v-if="isLoggedIn" class="mt-3">
              <div class="alert alert-success" role="alert">登入成功</div>
              <!-- <button @click="logout" class="btn btn-secondary w-100">登出</button> -->
            </div>
            <div class="mt-3 text-center">
              <p class="mb-0">不是會員？
                <router-link to="/Member/register" class="btn btn-link">註冊</router-link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useAuthStore } from '@/stores/auth';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { GoogleLogin } from 'vue3-google-login';

export default {
  name: 'LoginComponent',
  components: {
    GoogleLogin,
  },
  setup() {
    const authStore = useAuthStore();
    const { isLoggedIn } = storeToRefs(authStore);
    const router = useRouter();

    const email = ref('');
    const password = ref('');
    const rememberMe = ref(false);
    const showPassword = ref(false);
    const isLoading = ref(false);
    const error = ref('');
    const emailError = ref('');
    const passwordError = ref('');
    const jwtData = ref(null); // 用來儲存 JWT 資料

    const googleClientId = '366569231888-e7fpmjpktbc2di1lqk5if22li2dlq080.apps.googleusercontent.com';

    onMounted(() => {
      if (isLoggedIn.value) {
        router.push('/');
      }
    });

    const validateForm = () => {
      emailError.value = '';
      passwordError.value = '';

      if (!email.value) {
        emailError.value = '電子信箱是必填的。';
      } else if (!/\S+@\S+\.\S+/.test(email.value)) {
        emailError.value = '請輸入有效的電子郵件地址。';
      }

      if (!password.value) {
        passwordError.value = '密碼是必填的。';
      } else if (password.value.length < 6) {
        passwordError.value = '密碼至少需要 6 個字符。';
      }

      return !emailError.value && !passwordError.value;
    };

    const login = async () => {
      error.value = '';
      if (!validateForm()) {
        return;
      }

      isLoading.value = true;
      try {
        await authStore.login(email.value, password.value);
        router.push('/');
      } catch (err) {
        error.value = '登入失敗，請檢查您的帳號和密碼。';
      } finally {
        isLoading.value = false;
      }
    };

    const logout = () => {
      jwtData.value = null; // 清空 JWT 資料
      authStore.logout();
    };

    const togglePasswordVisibility = () => {
      showPassword.value = !showPassword.value;
    };

    const googleLoginCallback = async (response) => {
      const idToken = response.credential;
      try {
        await authStore.googleLogin(idToken);
        console.log("Login success:", jwtData.value);
        router.push('/'); // 登入成功後跳轉
      } catch (error) {
        console.error('登入失敗:', error);
        if (error.response) {
            console.error('後端錯誤響應:', error.response.data);
        } else {
            console.error('錯誤:', error.message);
        }
      }
    };

    return {
      email,
      password,
      rememberMe,
      isLoggedIn,
      showPassword,
      isLoading,
      error,
      emailError,
      passwordError,
      jwtData, // 回傳 jwtData 以便在 template 中使用
      login,
      logout,
      togglePasswordVisibility,
      googleLoginCallback,
      googleClientId,
    };
  },
};
</script>

<style scoped>
@import url("https://cdn.jsdelivr.net/npm/bootstrap-icons@1.7.2/font/bootstrap-icons.css");
</style>
