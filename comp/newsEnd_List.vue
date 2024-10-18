<template>
    <div class="news-display">
        <h1>最新消息</h1>
        <!-- 如果 news 陣列有內容，顯示消息列表 -->
        <div v-if="news.length">
            <div v-for="item in news" :key="item.id" class="news-container">
                <p>Title: {{ item.subject }}</p>
                <p>发布日期: {{ item.publishDate }}</p>
            </div>
        </div>
        <!-- 如果 news 陣列為空，顯示提示信息 -->
        <p v-else>目前没有资料</p>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: []  // 將 news 定義為空陣列，用於存儲新聞數據
        }
    },
    methods: {
        // 獲取新聞數據的方法
        async fetchNews() {
            try {
                const response = await fetch('https://localhost:7280/AllNewsForEnd'); // 調用 API 獲取數據
                const data = await response.json(); // 解析 JSON 數據
                // 將獲取的數據映射到 news 陣列
                this.news = data.map(item => ({
                    id: item.id,
                    subject: item.subject,
                    publishDate: item.publishDate
                }));
            } catch (error) {
                console.error('获取数据失败:', error); // 捕獲並顯示錯誤信息
            }
        },
    },
    // 組件掛載後自動獲取新聞數據
    mounted() {
        this.fetchNews(); // 確保組件加載時調用 fetchNews 方法
    },
}
</script>

<style scoped>
.news-display {
    display: flex; /* 使用彈性布局*/
    flex-direction: column; /* 垂直排列子元素*/
    align-items: center; /* 子元素水平居中*/
}

.news-container {
    margin-bottom: 20px; /* 每條新聞之間的間距*/
}
</style>
