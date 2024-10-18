<template>
    <div>
        <p>目前商品分類:</p>  <!-- 顯示當前商品分類標題 -->
        <div v-if="productTypes.length > 0">  <!-- 如果有商品分類則顯示 -->
            <div v-for="n in productTypes" :key="n.ProductTypeID">  <!-- 遍歷商品分類 -->
                <input type="text" v-model="n.productTypeName">  <!-- 編輯商品分類名稱 -->
                <button @click="confirmEdit(n)">修改</button>  <!-- 修改按鈕 -->
                <button @click="confirmDelete(n.ProductTypeID)">刪除</button>  <!-- 刪除按鈕 -->
            </div>
        </div>
        <div v-else>
            <p>暫無商品分類。</p>  <!-- 當沒有數據時顯示 -->
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            productTypes: []  // 存儲從 API 獲取到的商品分類
        };
    },
    mounted() {
        this.fetchProductName();  // 在組件加載時調用獲取數據的方法
    },
    methods: {
        async fetchProductName() {
            try {
                const response = await fetch('https://localhost:7280/ProductTypeInfo', { // 確保 URL 正確
                    method: 'GET',  // 設定請求方法為 GET
                    headers: {
                        'Content-Type': 'application/json'  // 設定請求頭為 JSON
                    },
                });

                if (response.ok) {
                    const data = await response.json();  // 獲取響應的數據
                    this.productTypes = data.length ? data : [];  // 確保數據不為空
                } else {
                    const errorData = await response.json();  // 獲取錯誤信息
                    alert('Error: ' + (errorData.message || 'Unknown error occurred'));  // 顯示錯誤提示
                }
            } catch (error) {
                console.error('Error fetching product types:', error);  // 錯誤處理
                alert('Failed to fetch product types: ' + error.message);  // 提示獲取失敗
            }
        },

        confirmDelete(id) {
            if (confirm('確定要刪除此商品分類嗎？')) {  // 確認刪除
                this.deleteProductType(id);  // 如果用戶確認刪除，調用刪除函數
            }
        },

        confirmEdit(productType) {
            console.log("productType: " + productType);  // 輸出要修改的商品分類
            if (confirm('確定要修改此商品分類嗎？')) {  // 確認修改
                this.editProductType(productType);  // 調用修改函數
            }
        },

        async deleteProductType(id) {
            try {
                const response = await fetch('https://localhost:7280/ProductType', {
                    method: 'DELETE',  // 設定請求方法為 DELETE
                    headers: {
                        'Content-Type': 'application/json'  // 設定請求頭為 JSON
                    },
                    body: JSON.stringify(id)  // 將 ID 傳遞給後端
                });

                if (response.ok) {
                    alert('刪除資料成功');  // 刪除成功提示
                    this.fetchProductName();  // 重新獲取數據以刷新列表
                } else {
                    const errorData = await response.json();  // 獲取錯誤信息
                    alert('Error: ' + (errorData.message || 'Unknown error occurred'));  // 顯示錯誤提示
                }
            } catch (error) {
                console.error('Error deleting product type:', error);  // 錯誤處理
                alert('Failed to delete product type: ' + error.message);  // 提示刪除失敗
            }
        },

        async editProductType(productType) {
            try {
                const response = await fetch('https://localhost:7280/ProductType', {
                    method: 'PUT',  // 設定請求方法為 PUT
                    headers: {
                        'Content-Type': 'application/json'  // 設定請求頭為 JSON
                    },
                    body: JSON.stringify({
                        id: productType.productTypeID,  // 傳遞 ID
                        type: productType.productTypeName  // 傳遞修改後的名稱
                    })
                });

                if (response.ok) {
                    alert('更新資料成功');  // 更新成功提示
                    this.fetchProductName();  // 重新獲取數據以刷新列表
                } else {
                    const errorData = await response.json();  // 獲取錯誤信息
                    alert('Error: ' + (errorData.message || 'Unknown error occurred'));  // 顯示錯誤提示
                }
            } catch (error) {
                console.error('Error updating product type:', error);  // 錯誤處理
                alert('Failed to update product type: ' + error.message);  // 提示更新失敗
            }
        }
    }
};
</script>

<style scoped>
.form-group {
    margin-bottom: 15px;  /* 表單組距 */
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
    margin-left: 5px;  /* 按鈕左側邊距 */
}

button:hover {
    background-color: #0056b3;  /* 鼠標懸停變色 */
}
</style>
