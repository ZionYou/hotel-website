<template>
    <div class="news-display">
        <h1>最新消息</h1>
        <!-- 判斷 news 是否有資料，有資料則渲染列表，否則顯示「目前沒有資料」 -->
        <div v-if="news.length">
            <!-- 使用 v-for 循環渲染 sortedNews 中的每個項目 -->
            <div v-for="item in sortedNews" :key="item.id" class="news-container">
                <!-- 顯示新聞標題 -->
                <p>Title: {{ item.subject }}</p>
                <!-- 顯示新聞的發布日期 -->
                <p>發布日期: {{ item.publishDate }}</p>
                <!-- 新增按鈕，點擊後跳轉到新聞詳細頁面 -->
                <button @click="viewNewsDetail(item.id)">查看內容</button>
            </div>
        </div>
        <!-- 如果 news 為空，則顯示「目前沒有資料」 -->
        <p v-else>目前沒有資料</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 用來存儲新聞資料的陣列
            news: []
        }
    },
    computed: {
        // 計算屬性，將新聞按照 id 從大到小排序
        sortedNews() {
            return this.news.sort((a, b) => b.id - a.id);
        }
    },
    methods: {
        // 從後端 API 獲取新聞資料
        async fetchNews() {
            console.log(`${process.env.VUE_APP_API_BASE_URL}/News`);
            try {
                const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/News`);
                const data = await response.json();
                
                // 將獲取到的資料映射到 news 陣列
                this.news = data.map(item => ({
                    id: item.id,
                    subject: item.subject,
                    publishDate: item.publishDate
                }));
            } catch (error) {
                // 如果獲取資料失敗，輸出錯誤信息
                console.error('獲取資料失敗:', error);
            }
        },
        // 點擊按鈕後，跳轉到新聞的詳細頁面
        viewNewsDetail(id) {
            console.log("push: " + `/news/${id}`);
            this.$router.push(`/news/${id}`);
        }
    },
    // 元件掛載時自動調用 fetchNews 方法獲取資料
    mounted() {
        this.fetchNews();
    }
}
</script>

<!-- 加入框線和 10px 邊距樣式 -->
<style scoped>
.news-display {
    margin: 10px;
}

.news-container {
    border: 1px solid #ccc; /* 加入框線 */
    padding: 10px; /* 加入內邊距 */
    margin-bottom: 10px; /* 每個新聞項目之間的間距 */
    border-radius: 5px; /* 可選：讓邊角圓潤一點 */
}
</style>
