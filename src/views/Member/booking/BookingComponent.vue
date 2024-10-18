<template>
  <div class="container mt-5">
    <div class="row">
      <!-- 左側: 訂房系統或搜尋結果 -->
      <div class="col-md-6">
        <div class="card">
          <div class="card-body equal-height p-2">
            <h3 v-if="!searchCompleted">訂房系統</h3>
            <h3 v-else>搜尋結果</h3>

            <!-- 訂房系統表單 -->
            <div v-if="!searchCompleted">
              <div class="form-group">
                <label for="numberOfGuests">人數</label>
                <input type="number" v-model="numberOfGuests" id="numberOfGuests" class="form-control" min="1" />
              </div>

              <div class="form-group">
                <label for="checkInDate">選取入住日期</label>
                <input type="date" v-model="checkInDate" id="checkInDate" class="form-control" />
              </div>

              <div class="form-group">
                <label for="checkOutDate">選取退房日期</label>
                <input type="date" v-model="checkOutDate" id="checkOutDate" class="form-control" />
              </div>

              <p v-if="totalPrice > 0">
                總價格: {{ totalPrice }} 元
              </p>

              <button @click="searchAvailableRooms" class="btn btn-primary">搜尋空房</button>

              <p v-if="isLoading">搜尋中，請稍候...</p>
              <p v-if="!isLoading && availableRooms.length === 0 && searchCompleted" class="text-danger">
                目前無空房，請選擇其他日期。
              </p>
            </div>

            <!-- 搜尋結果 -->
            <div v-else>
              <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>房型</th>
                      <th>剩餘房間數</th>
                      <th>價格</th>
                      <th>照片</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(roomType, index) in roomTypes" :key="index">
                      <td>{{ roomType.typeName }}</td>
                      <td>{{ getAvailableRoomsCount(roomType.roomTypeID) }}</td>
                      <td>{{ roomType.basePrice }} 元/晚</td>
                      <td><img :src="roomType.img" alt="房型圖片" width="100"></td>
                      <td>
                        <button @click="addToCart(roomType)" class="btn btn-success">選擇</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <!-- 返回按鈕 -->
              <button @click="goBackToBookingSystem" class="btn btn-secondary mt-3">返回</button>
            </div>
          </div>
        </div>
      </div>

      <!-- 右側: 購物車 -->
      <div class="col-md-6" v-if="searchCompleted">
        <div class="card">
          <div class="card-body equal-height p-2">
            <h3>購物車</h3>

            <!-- 顯示選擇的房型 -->
            <div v-if="cart.length > 0">
              <div class="table-responsive" style="max-height: 400px; overflow-y: auto;">
                <table class="table table-bordered">
                  <thead>
                    <tr>
                      <th>房型</th>
                      <th>價格</th>
                      <th>操作</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr v-for="(item, index) in cart" :key="index">
                      <td>{{ item.typeName }}</td>
                      <td>{{ item.basePrice * stayNights }} 元</td>
                      <td>
                        <button @click="removeFromCart(index)" class="btn btn-danger">移除</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p>總價格: {{ cartTotalPrice }} 元</p>
            </div>
            <p v-else>尚未選擇房型。</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useAuthStore } from '@/stores/auth'; // 引入 Pinia store
import { ref, onMounted, computed } from 'vue';
import { useRouter } from 'vue-router'; // 引入 router

export default {
  name: 'BookingComponent',
  setup() {
    const router = useRouter(); // 初始化 router
    const roomTypes = ref([]); // 用於儲存房型資訊
    const rooms = ref([]);     // 用於儲存房間資訊
    const numberOfGuests = ref(1);
    const checkInDate = ref('');
    const checkOutDate = ref('');
    const availableRooms = ref([]);
    const searchCompleted = ref(false);
    const isLoading = ref(false);
    const cart = ref([]); // 購物車，儲存選擇的房型

    const authStore = useAuthStore();

    // 計算入住晚數
    const stayNights = computed(() => {
      const checkIn = new Date(checkInDate.value);
      const checkOut = new Date(checkOutDate.value);
      return (checkOut - checkIn) / (1000 * 60 * 60 * 24); // 計算天數
    });

    const getAvailableRoomsCount = (roomTypeID) => {
      return rooms.value.filter(room => room.roomTypeID === roomTypeID && room.status === '空閒').length;
    };

    const addToCart = (roomType) => {
      cart.value.push(roomType);
    };

    const removeFromCart = (index) => {
      cart.value.splice(index, 1);
    };

    const cartTotalPrice = computed(() => {
      return cart.value.reduce((total, item) => total + (item.basePrice * stayNights.value), 0);
    });

    const searchAvailableRooms = async () => {
      if (!numberOfGuests.value || !checkInDate.value || !checkOutDate.value) {
        alert('請填寫完整的人數和日期');
        return;
      }

      // 檢查日期有效性
      if (new Date(checkInDate.value) >= new Date(checkOutDate.value)) {
        alert('退房日期必須晚於入住日期');
        return;
      }

      isLoading.value = true;
      searchCompleted.value = false;

      try {
        rooms.value = await authStore.fetchRooms(); // 獲取可用房間
        availableRooms.value = rooms.value.filter(room =>
          room.status === '空閒' && room.maxOccupancy >= numberOfGuests.value
        );
      } catch (error) {
        console.error('搜尋空房失敗:', error);
        alert('搜尋空房失敗，請稍後再試。');
      } finally {
        isLoading.value = false;
        searchCompleted.value = true;
      }
    };

    const goBackToBookingSystem = () => {
      searchCompleted.value = false;
      cart.value = [];
    };

    onMounted(async () => {
      try {
        roomTypes.value = await authStore.fetchRoomTypes();
        rooms.value = await authStore.fetchRooms();
      } catch (error) {
        console.error('載入數據失敗:', error);
      }
    });

    return {
      numberOfGuests,
      checkInDate,
      checkOutDate,
      roomTypes,
      availableRooms,
      searchCompleted,
      isLoading,
      cart,
      cartTotalPrice,
      stayNights,
      searchAvailableRooms,
      addToCart,
      removeFromCart,
      getAvailableRoomsCount,
      goBackToBookingSystem,
    };
  },
};
</script>

<style scoped>
.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
select {
  padding: 10px;
  width: 100%;
}

button {
  padding: 10px 15px;
}

.card-body.equal-height {
  min-height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
