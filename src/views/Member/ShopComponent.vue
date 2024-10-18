<template>
    <div class="shop">
      <h1>歡迎來到商城</h1>
      <p>這裡有各種商品可供選購。</p>
      <ul>
        <li v-for="item in items" :key="item.id">
          <h2>{{ item.name }}</h2>
          <p>{{ item.description }}</p>
          <p>價格: ${{ item.price }}</p>
  
          <!-- 新增: 數量輸入框 -->
          <label for="quantity">數量:</label>
          <input type="number" v-model.number="item.quantity" min="1" max="20" @input="validateQuantity(item)" />
  
          <!-- 新增: 訂購按鈕 -->
          <button @click="orderItem(item)">訂購</button>
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'ShopComponent',
    data() {
      return {
        items: [
          { id: 1, name: '商品 1', description: '這是商品 1 的描述', price: 100, quantity: 1 },
          { id: 2, name: '商品 2', description: '這是商品 2 的描述', price: 200, quantity: 1 },
          { id: 3, name: '商品 3', description: '這是商品 3 的描述', price: 300, quantity: 1 },
        ],
      };
    },
    methods: {
      // 驗證數量是否超過限制
      validateQuantity(item) {
        if (item.quantity > 20) {
          alert('數量不能超過 20');
          item.quantity = 20;
        } else if (item.quantity < 1) {
          item.quantity = 1;
        }
      },
      // 處理訂購的函數
      orderItem(item) {
        if (item.quantity <= 20 && item.quantity >= 1) {
          alert(`你已成功訂購 ${item.quantity} 個 ${item.name}。`);
        }
      },
    },
  };
  </script>
  
  <style scoped>
  .shop {
    padding: 20px;
    background-color: #000000;
  }
  
  h1 {
    margin-bottom: 20px;
  }
  
  ul {
    list-style-type: none;
    padding: 0;
  }
  
  li {
    margin-bottom: 20px;
    border: 1px solid #ddd;
    padding: 10px;
    border-radius: 5px;
  }
  
  input[type="number"] {
    margin-left: 10px;
    width: 50px;
  }
  
  button {
    margin-left: 10px;
    padding: 5px 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #0056b3;
  }
  </style>
  