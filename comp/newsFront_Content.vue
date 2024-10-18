<template>
    <div class="news-detail">
        <h1>{{ news.subject }}</h1>  <!-- 新闻主旨 -->
        <p>發布日期: {{ news.publishDate }}</p>  <!-- 发布日期 -->
        <p>內容: {{ news.content }}</p>  <!-- 新闻内容 -->
    </div>
</template>

<script>
    export default {
        props: ['id'],  // 接收从路由传来的 id
        data() {
            return {
                news: {}  // 存储新闻详情
            }
        },
        methods: {
            // 获取新闻详细信息
            async fetchNewsDetail() {
                try {
                    const response = await fetch(`https://localhost:7280/GetNewsContentById/${this.id}`);
                    const data = await response.json();
                    this.news = {
                        subject: data.subject,  // 新闻主旨
                        publishDate: data.publishDate,  // 发布日期
                        content: data.content,  // 新闻内容
                    };
                } catch (error) {
                    console.error('獲取資料失敗:', error);  // 错误处理
                }
            }
        },
        mounted() {
            this.fetchNewsDetail();  // 组件加载时获取新闻详情
        }
    }
</script>

<style scoped>
    .news-detail {
        text-align: center;  /* 内容居中 */
    }

    /** 
     * 新闻详情中的图片样式 
     */
    .news-detail img {
        max-width: 100%;  /* 图片最大宽度100% */
        height: auto;  /* 高度自动调整 */
    }
</style>
