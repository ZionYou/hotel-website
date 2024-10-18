<template>
    <div class="add-product-form">
        <h1>新增商品</h1>  <!-- 表单标题 -->

        <form @submit.prevent="submitForm">
            <div class="form-group">
                <label for="name">商品名稱:</label>
                <input type="text" v-model="form.name" id="name" required />  <!-- 商品名稱輸入框 -->
            </div>

            <div class="form-group">
                <label for="price">價格:</label>
                <input type="number" v-model="form.price" id="price" required />  <!-- 商品價格輸入框 -->
            </div>

            <div class="form-group">
                <label for="status">狀態:</label>
                <input type="text" v-model="form.status" id="status" required />  <!-- 商品狀態輸入框 -->
            </div>

            <div class="form-group">
                <label for="typeId">商品分類:</label>
                <select v-model="form.typeId" id="typeId" required>
                    <option v-for="type in productTypes" :key="type.ProductTypeID" :value="type.ProductTypeID">
                        {{ type.ProductTypeName }}  <!-- 商品分類選項 -->
                    </option>
                </select>
            </div>

            <div class="form-group">
                <label for="img">商品圖片:</label>
                <input type="file" @change="handleFileUpload" accept="image/*" required />  <!-- 商品圖片上傳 -->
            </div>

            <button type="submit">提交</button>  <!-- 提交按鈕 -->
        </form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: {
                    name: '',
                    price: 0,
                    status: '',
                    typeId: null,
                    img: null  // 存儲上傳的圖片
                },
                productTypes: []  // 存儲從後端獲取到的商品分類
            };
        },
        mounted() {
            //this.fetchProductTypes();  // 獲取商品分類選項
        },
        methods: {
            // 獲取商品分類
            async fetchProductTypes() {
                try {
                    const response = await fetch('https://localhost:7280/ProductTypeInfo');  // 獲取商品分類的API
                    if (response.ok) {
                        this.productTypes = await response.json();  // 將分類數據存儲到productTypes
                    } else {
                        alert('無法獲取商品分類');
                    }
                } catch (error) {
                    console.error('Error fetching product types:', error);  // 錯誤處理
                    alert('獲取商品分類時出錯');
                }
            },
            // 處理文件上傳
            handleFileUpload(event) {
                const file = event.target.files[0];
                this.form.img = file;  // 將文件保存到form對象
            },
            // 提交表單
            async submitForm() {
                try {
                    const formData = new FormData();
                    formData.append('name', this.form.name);  // 添加商品名稱
                    formData.append('price', this.form.price);  // 添加商品價格
                    formData.append('status', this.form.status);  // 添加商品狀態
                    formData.append('typeId', this.form.typeId);  // 添加商品類別ID
                    formData.append('img', this.form.img);  // 上傳的圖片
                    formData.append('ImageFileExtension', this.form.img.name.split('.').pop());  // 提取文件擴展名

                    const response = await fetch('https://localhost:7280/AddProduct', {
                        method: 'POST',
                        body: formData  // 提交的表單數據
                    });

                    if (response.ok) {
                        alert('商品新增成功');  // 成功提示
                        this.resetForm();  // 重置表單
                    } else {
                        alert('提交失敗');
                    }
                } catch (error) {
                    console.error('Error submitting product:', error);  // 錯誤處理
                    alert('提交商品時發生錯誤');
                }
            },
            // 重置表單
            resetForm() {
                this.form = {
                    name: '',
                    price: 0,
                    status: '',
                    typeId: null,
                    img: null
                };
                this.$refs.fileInput.value = '';  // 清空文件輸入框
            }
        }
    };
</script>

<style scoped>
    /** 
     * 新增商品表單樣式 
     */
    .add-product-form {
        max-width: 600px;  /* 最大寬度 */
        margin: auto;  /* 自動邊距 */
    }

    .form-group {
        margin-bottom: 20px;  /* 每個表單組的底部邊距 */
    }

    label {
        display: block;  /* 標籤顯示為塊級元素 */
        margin-bottom: 5px;  /* 標籤底部邊距 */
    }

    input, select, button {
        width: 100%;  /* 寬度100% */
        padding: 10px;  /* 內邊距 */
        margin-bottom: 10px;  /* 底部邊距 */
    }

    button {
        background-color: #007bff;  /* 按鈕背景顏色 */
        color: white;  /* 按鈕文字顏色 */
        border: none;  /* 無邊框 */
        cursor: pointer;  /* 鼠標指針 */
    }

    button:hover {
        background-color: #0056b3;  /* 按鈕懸停顏色 */
    }
</style>
