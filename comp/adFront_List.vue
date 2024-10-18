<template>
    <div class="image-display">
        <h1>廣告列表</h1>
        <!-- 如果 images 陣列有資料則顯示圖片 -->
        <div v-if="images.length">
            <!-- 使用 v-for 循環顯示每個圖片資訊 -->
            <div v-for="image in images" :key="image.advertisementID" class="image-container">
                <p>Title: {{ image.Title }}</p>
                <!-- 顯示圖片，只有在 imageBase64 存在時才渲染 -->
                <img :src="`data:image/png;base64,${image.imageBase64}`" alt="Advertisement Image" v-if="image.imageBase64" />
                <p v-if="image.Adpriority">Priority: {{ image.Adpriority }}</p>
                <p>StartDate: {{ image.StartDate }}</p>
                <p>EndDate: {{ image.EndDate }}</p>
                <p>URL: {{ image.URL }}</p>
            </div>
        </div>
        <!-- 當沒有資料時顯示提示 -->
        <p v-else>目前沒有資料</p>
    </div>
</template>

<script>
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
                    advertisementID: item.advertisementID,
                    ImageID: item.imageID,
                    Title: item.title,
                    Adpriority: item.adpriority,
                    StartDate: item.startDate,
                    EndDate: item.endDate,
                    URL: item.uRL,
                    imageBase64: item.imageBase64,
                }));
            } catch (error) {
                console.error('獲取資料失敗:', error); // 錯誤處理
            }
        },
    },
    // 當組件掛載後獲取圖片
    mounted() {
        this.fetchImages();
    },
};
</script>

<style scoped>
.image-display {
    display: flex; /* 使用 flexbox 佈局 */
    flex-direction: column; /* 設定為垂直排列 */
    align-items: center; /* 置中對齊 */
}

.image-container {
    margin-bottom: 20px; /* 每個圖片區域的底部間距 */
}

img {
    max-width: 300px; /* 設定圖片最大寬度 */
    border: 1px solid #ccc; /* 設定邊框 */
    padding: 10px; /* 設定內邊距 */
    border-radius: 8px; /* 設定圓角 */
}
</style>
