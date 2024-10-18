<template>
  <div id="app" class="container-fluid p-0 d-flex flex-column">
    <HeaderApp />

    <div class="d-flex flex-column flex-md-row min-vh-md-100">
      <NavbarApp class="p-0 border" />
      <ContentApp class="flex-fill pb-5 pb-md-2" />
    </div>

    <FooterApp class="min-vw-100 p-5 d-flex flex-column flex-md-row justify-content-around"/>
  </div>
</template>

<script>
// 保留必要的元件引入
import HeaderApp from '@/components/HeaderComponent.vue';
import NavbarApp from '@/components/NavbarComponent.vue';
import ContentApp from '@/components/ContentComponent.vue';
import FooterApp from '@/components/FooterComponent.vue';
import { onMounted, onBeforeUnmount } from 'vue';
import { useAuthStore } from '@/stores/auth'; // 確保引入 auth store

// 如果使用路由管理，將不再需要其他的組件引入

export default {
  name: 'App',
  components: {
    HeaderApp,
    NavbarApp,
    ContentApp,
    FooterApp
  },
  setup() {
    const authStore = useAuthStore();

    // 監聽滑鼠移動和鍵盤按鍵事件以檢查 token
    onMounted(() => {
      window.addEventListener('mousemove', authStore.checkAndLoadAccessToken);
      window.addEventListener('keydown', authStore.checkAndLoadAccessToken);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('mousemove', authStore.checkAndLoadAccessToken);
      window.removeEventListener('keydown', authStore.checkAndLoadAccessToken);
    });
  },
};
</script>

<style>
@import '~normalize.css/normalize.css';
/* 引入 normalize.css */

/* 全域樣式或其他樣式可以放到這裡，或移到一個單獨的樣式檔案 */
@media (min-width: 768px) {
  .min-vh-md-100 {
    min-height: 100vh;
  }
}
</style>
