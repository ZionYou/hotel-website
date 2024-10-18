<template>
    <div class="news-form">
        <h1>最新消息</h1>
        <form @submit.prevent="submitForm">
            <!-- 主旨輸入欄位 -->
            <div class="form-group">
                <label for="subject">主旨:</label>
                <input type="text"
                       id="subject"
                       v-model="news.subject"  <!-- 雙向綁定 -->
                       placeholder="请输入主旨"
                       :class="{ 'is-invalid': errors.subject }" />  <!-- 當有錯誤時添加 CSS 類 -->
                <div v-if="errors.subject" class="invalid-feedback">{{ errors.subject }}</div> <!-- 顯示錯誤信息 -->
            </div>

            <!-- 內容輸入欄位 -->
            <div class="form-group">
                <label for="content">内容:</label>
                <textarea id="content"
                          v-model="news.content"  <!-- 雙向綁定 -->
                          placeholder="请输入内容"
                          :class="{ 'is-invalid': errors.content }"></textarea>
                <div v-if="errors.content" class="invalid-feedback">{{ errors.content }}</div> <!-- 顯示錯誤信息 -->
            </div>

            <!-- 發布日期輸入欄位 -->
            <div class="form-group">
                <label for="publishDate">发布日期:</label>
                <input type="date"
                       id="publishDate"
                       v-model="news.publishDate"  <!-- 雙向綁定 -->
                       :class="{ 'is-invalid': errors.publishDate }"
                       :min="today" />  <!-- 限制最小日期為今天 -->
                <div v-if="errors.publishDate" class="invalid-feedback">{{ errors.publishDate }}</div> <!-- 顯示錯誤信息 -->
            </div>

            <!-- 可見性選項 -->
            <div class="form-group">
                <label for="visable">是否可见:</label>
                <div>
                    <label for="visable">{{ news.visable ? "可见" : "不可见" }}</label>
                    <input type="checkbox"
                           id="visable"
                           v-model="news.visable" />  <!-- 雙向綁定 -->
                </div>
            </div>

            <!-- 提交按鈕 -->
            <button type="submit">提交</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            news: {
                subject: '',
                content: '',
                publishDate: '',
                visable: true,
            },
            errors: {},  // 用於存儲驗證錯誤
            today: new Date().toISOString().split('T')[0], // 獲取今天的日期
        }
    },
    methods: {
        // 驗證表單
        validateForm() {
            this.errors = {}; // 清除之前的錯誤

            // 檢查主旨是否為空
            if (!this.news.subject) {
                this.errors.subject = '主旨不能为空';
            }
            // 檢查內容是否為空
            if (!this.news.content) {
                this.errors.content = '内容不能为空';
            }
            // 檢查發布日期是否為空
            if (!this.news.publishDate) {
                this.errors.publishDate = '发布日期不能为空';
            } else if (new Date(this.news.publishDate) < new Date(this.today)) {
                this.errors.publishDate = '发布日期不可小于今天'; // 檢查日期是否小於今天
            }

            // 返回是否有錯誤
            return Object.keys(this.errors).length === 0;
        },
        // 提交表單的方法
        async submitForm() {
            if (!this.validateForm()) { // 如果驗證不通過，直接返回
                return;
            }

            // 準備 FormData 物件
            const formData = new FormData();
            formData.append('subject', this.news.subject);
            formData.append('content', this.news.content);
            formData.append('publishDate', this.news.publishDate);
            formData.append('visable', this.news.visable);

            try {
                // 發送請求到指定的 API 端點
                const response = await fetch('https://localhost:7280/News', {
                    method: 'POST',
                    body: formData
                });

                if (response.ok) {
                    const result = await response.json();
                    alert("新闻新增成功！"); // 成功提示
                    console.log(result); // 輸出結果
                } else {
                    alert("新增新闻失败！"); // 失敗提示
                }
            } catch (error) {
                console.error('提交表单失败:', error); // 錯誤處理
                alert("提交表单失败！"); // 失敗提示
            }
        }
    }
}
</script>

<style scoped>
.news-form {
    max-width: 600px; /* 設置表單最大寬度*/
    margin: 0 auto; /* 自動邊距以居中*/
}

.form-group {
    margin-bottom: 1rem; /* 每個表單組的底部邊距*/
}

label {
    display: block; /* 將標籤設置為區塊元素*/
    margin-bottom: .5rem; /* 標籤底部邊距*/
}

input[type="text"],
input[type="date"],
textarea {
    width: 100%; /* 設置輸入框寬度為100%*/
    padding: .5rem; /* 輸入框內部填充*/
    box-sizing: border-box; /* 包含邊框和填充在內*/
}

textarea {
    height: 100px; /* 設置文本區域的高度*/
}

button {
    padding: .5rem 1rem; /* 按鈕填充*/
    background-color: #007bff; /* 按鈕背景顏色*/
    color: #fff; /* 按鈕文字顏色*/
    border: none; /* 無邊框*/
    cursor: pointer; /* 鼠標懸停時顯示為手型*/
}

button:hover {
    background-color: #0056b3; /* 懸停時按鈕顏色變化*/
}

.invalid-feedback {
    color: red; /* 錯誤信息顏色*/
    font-size: 0.875em; /* 錯誤信息字體大小*/
}

.is-invalid {
    border-color: red; /* 錯誤輸入框的邊框顏色*/
}
</style>
