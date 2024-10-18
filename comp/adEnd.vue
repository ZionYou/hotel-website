<template>
    <div class="advertisement-form">
        <h1>新增廣告</h1>

        <!-- 表單提交時觸發 submitForm 方法，並阻止默認行為 -->
        <form @submit.prevent="submitForm">
            <div>
                <!-- 標題輸入框 -->
                <label for="title">標題:</label>
                <input type="text" id="title" v-model="form.title" required />
            </div>

            <div>
                <!-- 開始日期輸入框 -->
                <label for="start-date">開始日期:</label>
                <input type="date" id="start-date" v-model="form.startDate" required />
            </div>
            
            <div>
                <!-- 結束日期輸入框 -->
                <label for="end-date">結束日期:</label>
                <input type="date" id="end-date" v-model="form.endDate" required />
            </div>
            
            <div>
                <!-- 廣告優先級輸入框，為數字型 -->
                <label for="ad-priority">廣告優先級(由小至大):</label>
                <input type="number" id="ad-priority" v-model.number="form.adPriority" required />
            </div>
            
            <div>
                <!-- 網址輸入框 -->
                <label for="url">網址:</label>
                <input type="url" id="url" v-model="form.url" required />
            </div>
            
            <div>
                <!-- 選擇圖片的檔案輸入框 -->
                <label for="img">選擇圖片:</label>
                <input type="file" id="img" @change="onFileChange" required />
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
            // 表單資料的初始值
            form: {
                title: '',
                description: '',
                startDate: '',
                endDate: '',
                adPriority: 1,
                status: '',
                url: ''
            },
            // 儲存選擇的檔案
            selectedFile: null
        };
    },
    methods: {
        // 當選擇檔案時，更新 selectedFile
        onFileChange(event) {
            const file = event.target.files[0]; // 取得選擇的檔案
            if (file) {
                this.selectedFile = file; // 設定 selectedFile
            }
        },

        // 提交表單的函式
        async submitForm() {
            // 檢查是否選擇圖片檔案
            if (!this.selectedFile) {
                alert("請選擇圖片檔案！"); // 顯示警告
                return; // 中止函式
            }

            // 準備 FormData 物件，方便傳送表單資料
            const formData = new FormData();
            formData.append('title', this.form.title);
            formData.append('description', this.form.description);
            formData.append('StartDate', this.form.startDate);
            formData.append('EndDate', this.form.endDate);
            formData.append('Adpriority', this.form.adPriority);
            formData.append('status', this.form.status);
            formData.append('URL', this.form.url);
            formData.append('img', this.selectedFile); // 添加圖片檔案

            try {
                // 使用 fetch API 發送 POST 請求
                const response = await fetch('https://localhost:7280/Advertisement', {
                    method: 'POST',
                    body: formData // 傳送的資料
                });

                // 檢查回應是否成功
                if (response.ok) {
                    const result = await response.json(); // 解析 JSON 回應
                    alert("廣告新增成功！"); // 顯示成功訊息
                    console.log(result); // 在控制台輸出結果
                } else {
                    alert("新增廣告失敗！"); // 顯示失敗訊息
                }
            } catch (error) {
                // 捕獲任何錯誤並顯示
                console.error('提交表單失敗:', error);
                alert("提交表單失敗！");
            }
        }
    }
};
</script>

<style scoped>
.advertisement-form {
    max-width: 600px; /* 設定最大寬度 */
    margin: auto; /* 置中 */
}

form div {
    margin-bottom: 15px; /* 每個輸入區域的底部間距 */
}

input, textarea {
    width: 100%; /* 設定寬度為100% */
    padding: 8px; /* 設定內邊距 */
    box-sizing: border-box; /* 包含內邊距和邊框 */
}

button {
    padding: 10px 20px; /* 設定按鈕的內邊距 */
    background-color: #007bff; /* 設定按鈕背景顏色 */
    color: white; /* 設定文字顏色 */
    border: none; /* 移除邊框 */
    border-radius: 4px; /* 設定圓角 */
    cursor: pointer; /* 改變鼠標樣式 */
}

button:hover {
    background-color: #0056b3; /* 滑鼠懸停時變更顏色 */
}
</style>
