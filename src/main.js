// src/main.js
import { createApp } from 'vue';
import { createPinia } from 'pinia';
import App from './App.vue';
import router from './router';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';
import { useAuthStore } from '@/stores/auth';

const app = createApp(App);
const pinia = createPinia();
app.use(router);
app.use(pinia); // 確保 Pinia 被使用

// 載入 auth store 並初始化
const authStore = useAuthStore();
authStore.checkAndLoadAccessToken(); // 檢查以及載入 access token

app.mount('#app');

