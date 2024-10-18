import { createRouter, createWebHistory } from 'vue-router';
import HotelInfo from '@/views/HotelInfoComponent.vue';
import Login from '@/views/Member/member/LoginComponent.vue';
import Register from '@/views/Member/member/RegisterComponent.vue';
import Booking from '@/views/Member/booking/BookingComponent.vue';
import BookingResult from '@/views/Member/booking/BookingResultComponent.vue';
import Shop from '@/views/Member/ShopComponent.vue';
import Bulletin from '@/views/Member/BulletinComponent.vue';

import { useAuthStore } from '@/stores/auth'; // 確保路徑正確
import { storeToRefs } from 'pinia';

import HotelInfoEnd from '@/views/Admin/HotelInfoEnd.vue';  // 1007新增測試
import NewsEnd from '@/views/Admin/newsEnd.vue';  // 1009新增測試
import NewsFront_List from '@/views/Member/NewsFront_List.vue';  // 1009新增測試

const routes = [
  { path: '/', name: 'HotelInfo', component: HotelInfo },
  { path: '/Member/login', name: 'Login', component: Login },
  { path: '/Member/register', name: 'Register', component: Register },
  { path: '/Booking', name: 'Booking', component: Booking },
  { path: '/Booking/result', name: 'BookingResult', component: BookingResult },
  { path: '/shop', name: 'Shop', component: Shop },
  { path: '/bulletin', name: 'Bulletin', component: Bulletin },
  { path: '/hotelinfoEnd', name: 'HotelInfoEnd', component: HotelInfoEnd },  // 1007新增測試
  { path: '/NewsEnd', name: 'NewsEnd', component: NewsEnd },  // 1009新增測試
  { path: '/NewsFront_List', name: 'NewsFront_List', component: NewsFront_List }  // 1009新增測試
];

// 定義需要身份驗證的路由
const authRequiredRoutes = ['/booking', '/bulletin']; // 根據需要修改

const router = createRouter({
  history: createWebHistory(),
  routes,
});

// 全局導航守衛
router.beforeEach((to, from, next) => {
  const authStore = useAuthStore();
  const { isLoggedIn } = storeToRefs(authStore); // 使用 storeToRefs 獲取響應式狀態

  if (authRequiredRoutes.includes(to.path) && !isLoggedIn.value) {
    next('/Member/login'); // 如果未登入，重定向到登入頁面
    alert("請先登入會員")
  } else {
    next(); // 允許訪問
  }
});

export default router;
