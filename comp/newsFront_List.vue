<template>
    <div class="news-display">
        <h1>最新消息</h1>  <!-- 主标题 -->
        <div v-if="news.length">
            <div v-for="item in news" :key="item.id" class="news-container">
                <p>Title: {{ item.subject }}</p>  <!-- 新闻标题 -->
                <p>发布日期: {{ item.publishDate }}</p>  <!-- 新闻发布日期 -->
                <!-- 新增路由跳转 -->
                <button @click="viewNewsDetail(item.id)">查看内容</button>  <!-- 查看详细内容按钮 -->
            </div>
        </div>
        <p v-else>目前没有资料</p>  <!-- 当没有数据时显示的提示 -->
    </div>
</template>

<script>
    export default {
        data() {
            return {
                news: []  // 存储新闻数据的数组
            }
        },
        methods: {
            // 获取新闻数据
            async fetchNews() {
                try {
                    const response = await fetch('https://localhost:7280/AllNews');  // 请求新闻数据的API
                    const data = await response.json();  // 将响应数据转换为JSON格式
                    this.news = data.map(item => ({
                        id: item.id,  // 新闻的ID
                        subject: item.subject,  // 新闻的主旨
                        publishDate: item.publishDate  // 新闻的发布日期
                    }));
                } catch (error) {
                    console.error('获取数据失败:', error);  // 捕获并输出错误信息
                }
            },
            // 跳转到新闻详情页面
            viewNewsDetail(id) {
                console.log("push: " + `/news/${id}`);  // 输出跳转路径
                this.$router.push(`/news/${id}`);  // 使用路由跳转到新闻详情页
            }
        },
        mounted() {
            this.fetchNews();  // 组件加载时获取新闻数据
        }
    }
</script>

<style scoped>
    /** 
     * 新闻显示区域样式 
     */
    .news-display {
        padding: 20px;  /* 内边距 */
    }

    .news-container {
        margin-bottom: 15px;  /* 每个新闻条目的下边距 */
    }
</style>
