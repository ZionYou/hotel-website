<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h2 class="text-center">會員註冊</h2>
            <hr>
            <div class="form-scrollable">
              <form @submit.prevent="register">
                <div class="form-outline mb-4">
                  <label class="form-label" for="name">姓名：</label>
                  <input type="text" id="name" v-model="formData.name" class="form-control" required />
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="title">稱呼：</label>
                  <select id="title" v-model="formData.title" class="form-select" required>
                    <option value="" disabled>請選擇稱呼</option>
                    <option value="先生">先生</option>
                    <option value="女士">女士</option>
                  </select>
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="phone">手機：</label>
                  <input type="tel" id="phone" v-model="formData.phone" class="form-control" required pattern="[0-9]{10}" />
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="email">電子郵件：</label>
                  <input type="email" id="email" v-model="formData.email" class="form-control" required />
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="password">密碼：</label>
                  <input type="password" id="password" v-model="formData.password" class="form-control" required minlength="6" />
                </div>

                <div class="form-outline mb-4">
                  <label class="form-label" for="confirmPassword">確認密碼：</label>
                  <input type="password" id="confirmPassword" v-model="formData.confirmPassword" class="form-control" required @input="checkPasswordsMatch" />
                  <div v-if="passwordMismatch" class="text-danger">密碼不一致</div>
                </div>

                <button type="submit" class="btn btn-primary btn-block mb-4" :disabled="passwordMismatch">
                  確認註冊
                </button>

                <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
                <div class="text-center">
                  <router-link to="/Member/login">已有帳號？點此登入</router-link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth';
import { ref } from 'vue';

export default {
  name: 'RegisterComponent',
  setup() {
    const authStore = useAuthStore();
    const formData = ref({
      title: '',
      name: '',
      phone: '',
      email: '',
      password: '',
      confirmPassword: '',
    });
    const passwordMismatch = ref(false);
    const errorMessage = ref('');

    const checkPasswordsMatch = () => {
      passwordMismatch.value = formData.value.password !== formData.value.confirmPassword;
    };

    const register = async () => {
      if (passwordMismatch.value) return;

      try {
        await authStore.register(formData.value);
        alert('註冊成功！');
      } catch (error) {
        errorMessage.value = error.response?.data || '註冊失敗，請稍後再試。';
        console.error('Registration error:', error);
      }
    };

    return {
      formData,
      passwordMismatch,
      errorMessage,
      register,
      checkPasswordsMatch,
    };
  },
};
</script>

<style scoped>
.container {
  max-width: 600px;
  margin: auto;
}

.form-scrollable {
  max-height: 400px; /* 設定容器最大高度 */
  overflow-y: auto; /* 啟用垂直滾動條 */
  padding: 20px; /* 增加內邊距 */
}
</style>
