<template>
    <swiper :spaceBetween="30"
            :centeredSlides="true"
            :autoplay="{
                delay: 1500,
                disableOnInteraction: false,
            }"
            :pagination="{
                clickable: true,
            }"
            :loop="true"
            :navigation="true"
            :modules="modules"
            class="mySwiper">

        <!-- 使用 v-for 循環顯示圖片 -->
        <swiper-slide v-for="image in images" :key="image.imageBase64">
            <!-- 顯示圖片，只有在 imageBase64 存在時才渲染 -->
            <img :src="`data:image/png;base64,${image.imageBase64}`" alt="Advertisement Image" v-if="image.imageBase64" />
        </swiper-slide>
    </swiper>
</template>

<script>
// 引入 Swiper 的 Vue 組件
import { Swiper, SwiperSlide } from 'swiper/vue';

// 引入 Swiper 的樣式
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

// 引入所需的模組
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

export default {
    data() {
        return {
            images: [],  // 存儲從 API 獲取的圖片資料
        };
    },
    methods: {
        // 從 API 獲取圖片資料
        async fetchImages() {
            try {
                const response = await fetch('https://localhost:7280/AdvertisementInfo'); // API 端點
                const data = await response.json();
                // 將 API 回傳的資料映射到 images 陣列中
                this.images = data.map(item => ({
                    imageBase64: item.imageBase64,  // API 回傳的 Base64 字串
                }));
            } catch (error) {
                console.error('獲取圖片失敗:', error); // 錯誤處理
            }
        },
    },
    // 當組件掛載後獲取圖片
    mounted() {
        this.fetchImages();
    },
    components: {
        Swiper,
        SwiperSlide,
    },
    setup() {
        return {
            // 設定 Swiper 使用的模組
            modules: [Autoplay, Pagination, Navigation],
        };
    },
};
</script>

<style scoped>
#app {
    height: 100%; /* 設定應用程式高度 */
}

html,
body {
    position: relative;
    height: 100%; /* 設定 HTML 和 body 高度 */
}

body {
    background: #eee; /* 設定背景顏色 */
    font-family: Helvetica Neue, Helvetica, Arial, sans-serif; /* 設定字型 */
    font-size: 14px; /* 設定字型大小 */
    color: #000; /* 設定文字顏色 */
    margin: 0; /* 移除邊距 */
    padding: 0; /* 移除內邊距 */
}

.swiper {
    width: 100%; /* 設定 Swiper 寬度 */
    height: 100%; /* 設定 Swiper 高度 */
}

.swiper-slide {
    text-align: center; /* 文字置中 */
    font-size: 18px; /* 設定字型大小 */
    background: #fff; /* 設定滑塊背景顏色 */
    display: flex; /* 使用 flexbox 排版 */
    justify-content: center; /* 置中內容 */
    align-items: center; /* 置中內容 */
}

.swiper-slide img {
    display: block; /* 使圖片為塊級元素 */
    width: 100%; /* 設定圖片寬度 */
    height: 100%; /* 設定圖片高度 */
    object-fit: cover; /* 確保圖片覆蓋整個容器 */
}

.swiper {
    margin-left: auto; /* 自動左右邊距 */
    margin-right: auto;
}

.mySwiper {
    height: 21.875rem; /* 設定 Swiper 高度 */
    width: 56.25rem; /* 設定 Swiper 寬度 */
}
</style>
