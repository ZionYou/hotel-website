<template>
    <div>
        <h2>Hotel Information Form</h2>
        <!-- 表單提交時觸發 submitHotelInfo 方法，並阻止默認行為 -->
        <form @submit.prevent="submitHotelInfo">
            <div class="form-group">
                <label for="hotelName">Hotel Name:</label>
                <!-- 酒店名稱輸入框，使用 v-model 雙向綁定 -->
                <input type="text" id="hotelName" v-model="hotelInfo.name" required />
            </div>

            <div class="form-group">
                <label for="address">Address:</label>
                <!-- 地址輸入框 -->
                <input type="text" id="address" v-model="hotelInfo.address" required />
            </div>

            <div class="form-group">
                <label for="phone">Phone:</label>
                <!-- 電話號碼輸入框 -->
                <input type="text" id="phone" v-model="hotelInfo.phone" required />
            </div>

            <div class="form-group">
                <label for="email">Email:</label>
                <!-- 電子郵件輸入框 -->
                <input type="email" id="email" v-model="hotelInfo.email" required />
            </div>

            <div class="form-group">
                <label for="description">Description:</label>
                <!-- 描述文本區 -->
                <textarea id="description" v-model="hotelInfo.desc"></textarea>
            </div>

            <div class="form-group">
                <label for="checkInTime">Check-In Time:</label>
                <!-- 入住時間輸入框 -->
                <input type="time" id="checkInTime" v-model="hotelInfo.checkIn" />
            </div>

            <div class="form-group">
                <label for="checkOutTime">Check-Out Time:</label>
                <!-- 退房時間輸入框 -->
                <input type="time" id="checkOutTime" v-model="hotelInfo.checkOut" />
            </div>

            <!-- 提交按鈕 -->
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
export default {
    data() {
        return {
            // 酒店資訊的初始值
            hotelInfo: {
                name: '',
                address: '',
                phone: '',
                email: '',
                desc: '',
                checkIn: '',
                checkOut: ''
            }
        };
    },
    methods: {
        // 提交酒店資訊的方法
        async submitHotelInfo() {
            try {
                // 發送 PUT 請求到 API 端點
                const response = await fetch('https://localhost:7280/hotelInfo', {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json' // 設定請求的內容類型為 JSON
                    },
                    body: JSON.stringify(this.hotelInfo) // 將酒店資訊轉為 JSON 字串
                });

                // 檢查回應是否成功
                if (response.ok) {
                    alert('Hotel information submitted successfully'); // 顯示成功訊息
                } else {
                    const errorData = await response.json(); // 解析錯誤回應
                    alert('Error: ' + (errorData.message || 'Unknown error occurred')); // 顯示錯誤訊息
                }
            } catch (error) {
                console.error('Error submitting hotel information:', error); // 輸出錯誤到控制台
                alert('Failed to submit hotel information: ' + error.message); // 顯示錯誤訊息
            }
        }
    }
};
</script>

<style scoped>
.form-group {
    margin-bottom: 15px; /* 每個表單項目的底部間距 */
}

label {
    display: block; /* 設定 label 為塊級元素 */
    margin-bottom: 5px; /* 設定 label 底部間距 */
}

input,
textarea {
    width: 100%; /* 設定寬度為 100% */
    padding: 8px; /* 設定內邊距 */
    box-sizing: border-box; /* 包含內邊距和邊框 */
}

button {
    padding: 10px 15px; /* 設定按鈕內邊距 */
    background-color: #007bff; /* 設定按鈕背景顏色 */
    color: white; /* 設定文字顏色 */
    border: none; /* 移除邊框 */
    cursor: pointer; /* 改變鼠標樣式 */
}

button:hover {
    background-color: #0056b3; /* 滑鼠懸停時改變背景顏色 */
}
</style>
