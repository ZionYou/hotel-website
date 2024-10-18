<template>
  <div class="container mt-5">
    <h3>訂房結果</h3>
    <div v-if="roomNumber">
      <div class="mb-4">
        <h4>會員資訊</h4>
        <p><strong>姓名:</strong> {{ memberName }}</p>
        <p><strong>電話:</strong> {{ memberPhone }}</p>
        <p><strong>電子郵件:</strong> {{ memberEmail }}</p>
      </div>

      <div class="mb-4">
        <h4>訂房資訊</h4>
        <p><strong>房型:</strong> {{ roomType }}</p>
        <p><strong>房號:</strong> {{ roomNumber }}</p>
        <p><strong>價格:</strong> {{ price }} 元</p>
        <p><strong>入住時間:</strong> {{ checkInDate }}</p>
        <p><strong>退房時間:</strong> {{ checkOutDate }}</p>
      </div>

      <div class="mb-4">
        <h4>付款資訊</h4>
        <label for="paymentMethod">付款方式:</label>
        <select v-model="paymentMethod" id="paymentMethod" class="form-select" @change="updatePaymentStatus">
          <option value="線上付款">線上付款</option>
          <option value="信用卡">信用卡</option>
          <option value="現金">現金</option>
          <option value="轉帳">轉帳</option>
        </select>
        <p><strong>付款狀態:</strong> {{ paymentStatus }}</p>
      </div>

      <button @click="confirmBooking" class="btn btn-primary">確認訂房</button>
    </div>
    <div v-else>
      <p>無訂房資訊。</p>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router'; // 引入 useRoute

export default {
  name: 'BookingResultComponent',
  setup() {
    const route = useRoute(); // 使用 useRoute 來獲取路由資訊
    const roomNumber = ref(route.query.roomNumber || '');
    const floor = ref(route.query.floor || '');
    const price = ref(route.query.price || '');
    const memberName = ref(route.query.memberName || '');
    const memberEmail = ref(route.query.memberEmail || '');
    const memberPhone = ref(route.query.memberPhone || ''); // 新增會員電話
    const roomType = ref(route.query.roomType || ''); // 新增房型
    const checkInDate = ref(route.query.checkInDate || ''); // 新增入住時間
    const checkOutDate = ref(route.query.checkOutDate || ''); // 新增退房時間
    const paymentMethod = ref(route.query.paymentMethod || '線上付款'); // 假設付款方式
    const paymentStatus = ref('已付款'); // 預設付款狀態為已付款

    // 根據付款方式更新付款狀態
    const updatePaymentStatus = () => {
      paymentStatus.value = (paymentMethod.value === '現金') ? '未付款' : '已付款';
    };

    // 確保資訊存在
    if (!roomNumber.value) {
      console.error('無法獲取訂房資訊');
    }

    const confirmBooking = () => {
      // 在這裡處理確認訂房的邏輯
      alert('訂房已確認！');
    };

    return {
      roomNumber,
      floor,
      price,
      memberName,
      memberEmail,
      memberPhone,
      roomType,
      checkInDate,
      checkOutDate,
      paymentMethod,
      paymentStatus,
      confirmBooking,
      updatePaymentStatus,
    };
  },
};
</script>

<style scoped>
/* 在這裡添加你的樣式 */
.mb-4 {
  margin-bottom: 1.5rem;
}
</style>
