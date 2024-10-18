<template>
  <div>
      <h1>產品列表</h1>  <!-- 頁面標題 -->
      <div v-if="products.length > 0">  <!-- 如果有產品 -->
          <div v-for="product in products" :key="product.ProductID" class="product-item">
              <img :src="product.Image" alt="Product Image" v-if="product.Image" />  <!-- 產品圖片 -->
              <h2>{{ product.ProductName }}</h2>  <!-- 產品名稱 -->
              <p>價格: {{ product.Price | currency }}</p>  <!-- 產品價格 -->
          </div>
      </div>
      <div v-else>
          <p>目前沒有產品</p>  <!-- 如果沒有產品 -->
      </div>
  </div>
</template>

<script>
export default {
data() {
  return {
    products: []  // 儲存從 API 獲取的產品資料
  };
},
mounted() {
  this.fetchProducts();  // 當組件掛載時獲取資料
},
methods: {
  // 獲取產品資料
  async fetchProducts() {
    try {
      const response = await fetch('https://localhost:7280/AllProduct'); // 產品 API
      if (response.ok) {
        this.products = await response.json();  // 將獲取的資料存儲到 products
      } else {
        alert('無法獲取產品列表');
      }
    } catch (error) {
      console.error('Error fetching products:', error);  // 錯誤處理
      alert('獲取產品時發生錯誤');
    }
  }
},
filters: {
  // 格式化價格為貨幣
  currency(value) {
    return 'NT$' + parseFloat(value).toFixed(2);  // 返回格式化後的價格
  }
}
};
</script>

<style scoped>
  /** 
   * 產品項目的樣式 
   */
  .product-item {
      border: 1px solid #ccc;  /* 边框样式 */
      padding: 15px;  /* 内边距 */
      margin-bottom: 20px;  /* 底部外边距 */
      border-radius: 8px;  /* 圆角 */
      text-align: center;  /* 文字居中 */
  }

  .product-item img {
      max-width: 100%;  /* 最大宽度为100% */
      height: auto;  /* 高度自适应 */
      margin-bottom: 15px;  /* 底部外边距 */
  }
</style>
