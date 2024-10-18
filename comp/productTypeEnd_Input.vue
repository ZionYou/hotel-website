<template>
    <div>
        <h2>新增商品分類</h2>  <!-- 表單標題 -->
        <form @submit.prevent="submitProductType">  <!-- 提交表單時調用 submitProductType 方法 -->
            <div class="form-group">
                <label for="productTypeName">分類名稱:</label>  <!-- 輸入框標籤 -->
                <input type="text" id="productTypeName" v-model="productType.ProductTypeName" required />  <!-- 商品分類名稱輸入框 -->
            </div>
            <button type="submit">確認</button>  <!-- 提交按鈕 -->
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            productType: {
                ProductTypeName: ''  // 儲存商品分類名稱
            }
        };
    },
    methods: {
        // 提交商品分類
        async submitProductType() {
            try {
                const response = await fetch('https://localhost:7280/ProductType', { // 確保 URL 正確
                    method: 'POST',  // 設定請求方法為 POST
                    headers: {
                        'Content-Type': 'application/json'  // 設定請求頭為 JSON
                    },
                    body: JSON.stringify({ type: this.productType.ProductTypeName }) // 將商品分類名稱轉換為 JSON 格式
                });

                if (response.ok) {
                    alert('Product type submitted successfully');  // 提交成功提示
                    this.productType.ProductTypeName = '';  // 重置輸入框
                } else {
                    const errorData = await response.json();  // 獲取錯誤信息
                    alert('Error: ' + (errorData.message || 'Unknown error occurred'));  // 顯示錯誤提示
                }
            } catch (error) {
                console.error('Error submitting product type:', error);  // 錯誤處理
                alert('Failed to submit product type: ' + error.message);  // 提示提交失敗
            }
        }
    }
};
</script>

<style scoped>
.form-group {
    margin-bottom: 15px;  /* 表單組距 */
}

label {
    display: block;  /* 標籤塊顯示 */
    margin-bottom: 5px;  /* 標籤底部距離 */
}

input {
    width: 100%;  /* 輸入框寬度 */
    padding: 8px;  /* 輸入框內邊距 */
    box-sizing: border-box;  /* 包含內邊距和邊框的寬度計算 */
}

button {
    padding: 10px 15px;  /* 按鈕內邊距 */
    background-color: #007bff;  /* 按鈕背景色 */
    color: white;  /* 按鈕文字顏色 */
    border: none;  /* 去掉邊框 */
    cursor: pointer;  /* 鼠標懸停顯示手型 */
}

button:hover {
    background-color: #0056b3;  /* 鼠標懸停變色 */
}
</style>
