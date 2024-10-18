<template>
    <div class="news-form">
        <h1>最新消息</h1>
        <form @submit.prevent="submitForm" ref="form">
            <div class="form-group">
                <label for="subject">主旨:</label>
                <input type="text"
                       id="subject"
                       v-model="news.subject"
                       placeholder="请输入主旨"
                       :class="{ 'is-invalid': errors.subject }" />
                <div v-if="errors.subject" class="invalid-feedback">{{ errors.subject }}</div>
            </div>

            <div class="form-group">
                <label for="content">内容:</label>
                <textarea id="content"
                          v-model="news.content"
                          placeholder="请输入内容"
                          :class="{ 'is-invalid': errors.content }"></textarea>
                <div v-if="errors.content" class="invalid-feedback">{{ errors.content }}</div>
            </div>

            <div class="form-group">
                <label for="publishDate">发布日期:</label>
                <input type="date"
                       id="publishDate"
                       v-model="news.publishDate"
                       :class="{ 'is-invalid': errors.publishDate }"
                       :min="today" />
                <div v-if="errors.publishDate" class="invalid-feedback">{{ errors.publishDate }}</div>
            </div>

            <div class="form-group">
                <label for="visable">是否可见:</label>
                <div>
                    <label for="visable">{{ news.visable ? "可見" : "不可見" }}</label>
                    <input type="checkbox"
                           id="visable"
                           v-model="news.visable" />
                </div>
            </div>

            <button type="submit" :disabled="loading">
                {{ loading ? '提交中...' : '提交' }}
            </button>
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
            errors: {},
            today: new Date().toISOString().split('T')[0], // 获取今天的日期
            loading: false,
        }
    },
    methods: {
        validateForm() {
            this.errors = {}; // 清除之前的错误

            if (!this.news.subject) {
                this.errors.subject = '主旨不能为空';
            }
            if (!this.news.content) {
                this.errors.content = '内容不能为空';
            }
            if (!this.news.publishDate) {
                this.errors.publishDate = '发布日期不能为空';
            } else if (new Date(this.news.publishDate) < new Date(this.today)) {
                this.errors.publishDate = '发布日期不可小于今天';
            }

            return Object.keys(this.errors).length === 0;
        },
        async submitForm() {
            if (!this.validateForm()) {
                return;
            }

            this.loading = true; // 开始加载状态

            // 準備 FormData 物件，包含新聞的主題、內容、發布日期和是否可見
            const newsData = {
            subject: this.news.subject,      // 新聞主題，來自 this.news.subject
            content: this.news.content,      // 新聞內容，來自 this.news.content
            publishDate: this.news.publishDate,  // 發布日期，來自 this.news.publishDate
            visable: this.news.visable     // 是否可見 (可能拼錯，應該是 visible)，來自 this.news.visiable
            };

            try {
            // 發送 POST 請求到後端 API 以保存新聞資料
            const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/News`, {  
            method: 'POST',  // 使用 POST 方法提交資料
            headers: {
            'Content-Type': 'application/json'  // 告訴伺服器資料類型是 JSON 格式
            },
            body: JSON.stringify(newsData)  // 將 newsData 物件轉成 JSON 格式作為請求的 body 內容
            });

                if (response.ok) {
                    const result = await response.json();
                    alert("新闻新增成功！");
                    console.log(result);
                    this.resetForm(); // 成功后重置表单
                } else {
                    const errorData = await response.json();
                    alert(`新增新闻失败：${errorData.message || '未知错误'}`);
                }
            } catch (error) {
                console.error('提交表单失败:', error);
                alert("提交表单失败！");
            } finally {
                this.loading = false; // 结束加载状态
            }
        },
        resetForm() {
            this.news = {
                subject: '',
                content: '',
                publishDate: '',
                visable: true,
            };
            this.errors = {};
            this.$refs.form.reset(); // 使用 ref 重置表单
        }
    }
}
</script>

<style scoped>
.news-form {
    max-width: 600px;
    margin: 0 auto;
}

.form-group {
    margin-bottom: 1rem;
}

label {
    display: block;
    margin-bottom: .5rem;
}

input[type="text"],
input[type="date"],
textarea {
    width: 100%;
    padding: .5rem;
    box-sizing: border-box;
}

textarea {
    height: 100px;
}

button {
    padding: .5rem 1rem;
    background-color: #007bff;
    color: #fff;
    border: none;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

.invalid-feedback {
    color: red;
    font-size: 0.875em;
}

.is-invalid {
    border-color: red;
}
</style>
