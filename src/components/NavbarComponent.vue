<template>
  <nav class="navbar navbar-expand-md bg-body-tertiary ">
    <div class="container d-flex flex-md-column align-items-center">
      <!-- navbar-brand 部分 -->
      <router-link class="navbar-brand mt-0 pt-0" to="/">
        健行大飯店<br>
      </router-link>
      <!-- 當前狀態顯示 -->
      <div class="status">
        當前狀態：{{ currentStatus }}
      </div>
      <br>
      <!-- 手機版選單按鈕 -->
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <!-- 導航欄部分 -->
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav flex-column text-center">
          <!-- 會員登入選項 -->
          <template v-if="!authStore.isLoggedIn">
            <li class="nav-item fs-6">
              <router-link class="nav-link" to="/Member/login">會員登入</router-link>
            </li>
          </template>

          <!-- 一般用戶導航選項 -->
          <template v-if="authStore.userRole !== 'employee'">
            <li class="nav-item fs-6">
              <router-link class="nav-link" to="/">飯店介紹</router-link>
            </li>
            <li class="nav-item fs-6">
              <router-link class="nav-link" to="/NewsFront_List">最新資訊</router-link>
            </li>
            <li class="nav-item fs-6">
              <router-link class="nav-link" to="/booking">線上訂房</router-link>
            </li>
            <li class="nav-item fs-6">
              <router-link class="nav-link" to="/shop">線上商城</router-link>
            </li>
            <li class="nav-item fs-6">
              <router-link class="nav-link" to="/bulletin">留言板</router-link>
            </li>
            <li v-if="authStore.isLoggedIn" class="nav-item fs-6">
              <router-link @click="logout" class="nav-link" to="/">會員登出</router-link>
            </li>
            <li v-if="authStore.isLoggedIn" class="nav-item fs-6">
              <router-link class="nav-link" to="/hotelinfoEnd">飯店資訊後台</router-link>
            </li>
            <li v-if="authStore.isLoggedIn" class="nav-item fs-6">
              <router-link class="nav-link" to="/NewsEnd">最新資訊後台</router-link>
            </li>
          </template>

          <!-- 員工用戶導航選項 -->
          <template v-else>
            <li class="nav-item fs-6">
              <router-link class="nav-link" to="/aaa">打卡紀錄</router-link>
            </li>
            <li class="nav-item fs-6">
              <router-link class="nav-link" to="/room-management">房間管理</router-link>
            </li>
            <li class="nav-item fs-6">
              <router-link class="nav-link" to="/booking-management">訂房管理</router-link>
            </li>
            <li class="nav-item fs-6">
              <router-link class="nav-link" to="/shop-management">商城管理</router-link>
            </li>
            <li class="nav-item fs-6">
              <button @click="logout" class="nav-link btn btn-link">員工登出</button>
            </li>
          </template>

        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  name: 'NavbarComponent',
  setup() {
    const authStore = useAuthStore();
    const router = useRouter();

    const inactivityTimeout = ref(null);
    const timeoutDuration = 100 * 60 * 1000; // 10 minutes
    const currentStatus = computed(() => {
      const { isLoggedIn, userRole } = authStore;
      if (!isLoggedIn) return '未登入';
      return userRole === 'employee' ? '登入(員工)' : '登入(客戶)';
    });

    const logout = () => {
      authStore.logout();
    };

    const resetInactivityTimer = () => {
      if (inactivityTimeout.value) clearInterval(inactivityTimeout.value);
      inactivityTimeout.value = setInterval(() => {
        if (authStore.isLoggedIn) {
          authStore.logout();
          alert('您已經超過100分鐘未操作，系統已自動登出。');
          router.push('/');
        }
      }, timeoutDuration);
    };

    const onUserActivity = () => {
      if (authStore.isLoggedIn) resetInactivityTimer();
    };

    onMounted(() => {
      if (authStore.isLoggedIn) resetInactivityTimer();
      window.addEventListener('mousemove', onUserActivity);
      window.addEventListener('keydown', onUserActivity);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('mousemove', onUserActivity);
      window.removeEventListener('keydown', onUserActivity);
      if (inactivityTimeout.value) clearInterval(inactivityTimeout.value);
    });

    return {
      authStore,
      currentStatus,
      logout
    };
  }
};
</script>

<style scoped>
/* 確保 nav 連結靠近上方並左右置中 */
.navbar {
  padding-top: 0; /* 移除上方的額外空間，讓內容緊貼上方 */
  margin: 0 10px; /* 左右保留 0px 間距 */
}
.navbar-nav {
  margin: 0 auto; /* 左右置中 */
}

.status {
  margin-bottom: 10px; /* 可以調整間距 */
  border-top: 1px solid #ccc; /* 或使用 border-bottom 來加下方隔線 */
  padding-top: 10px; /* 或 padding-bottom */
  width: 100%; /* 確保寬度 */
}
</style>
