<template>
    <div v-if="dataLoaded">
        <!-- 如果資料已加載，顯示酒店資訊 -->
        <div class="hotelInfo-detail">
            <p>hotelId: {{ info.hotelId }}</p>
            <p>HotelName: {{ info.hotelName }}</p>
            <p>FullAddress: {{ info.fullAddress }}</p>
            <p>Longitude: {{ info.longitude }}</p>
            <p>Latitude: {{ info.latitude }}</p>
            <p>Phone: {{ info.phone }}</p>
            <p>Email: {{ info.email }}</p>
            <p>Description: {{ info.description }}</p>
            <p>CheckInTime: {{ info.checkInTime }}</p>
            <p>CheckOutTime: {{ info.checkOutTime }}</p>
        </div>
        <!-- 地圖顯示區域 -->
        <div id="map"></div>
    </div>
    <!-- 若資料尚未加載，顯示加載中提示 -->
    <div v-else>Loading...</div>
</template>

<script>
export default {
    data() {
        return {
            // 酒店資訊的初始值
            info: {
                hotelId: '',
                hotelName: '',
                fullAddress: '',
                longitude: 0,
                latitude: 0,
                phone: '',
                email: '',
                description: '',
                checkInTime: '',
                checkOutTime: ''
            },
            map: null, // 地圖實例
            marker: null, // 標記實例
            dataLoaded: false // 標記資料是否已加載
        };
    },
    methods: {
        // 初始化地圖
        initMap() {
            try {
                const lat_num = parseFloat(this.info.latitude);
                const lng_num = parseFloat(this.info.longitude);

                // 檢查緯度和經度是否有效
                if (isNaN(lat_num) || isNaN(lng_num)) {
                    throw new Error('Invalid latitude or longitude');
                }

                // 創建新的地圖實例
                this.map = new google.maps.Map(document.getElementById("map"), {
                    center: {
                        lat: this.info.latitude,
                        lng: this.info.longitude 
                    },
                    zoom: 15, // 設定縮放級別
                });

                // 在地圖上設置標記
                this.setMarker(lat_num, lng_num);
            } catch (error) {
                console.error('Error initializing map:', error);
                // 可以在此處設置錯誤狀態或顯示用戶提示
            }
        },
        // 設置地圖標記
        setMarker(latitude, longitude) {
            this.marker = new google.maps.Marker({
                position: { lat: latitude, lng: longitude },
                map: this.map
            });
        },
        // 獲取酒店資訊
        async fetchHotelInfo() {
            try {
                const response = await fetch(`https://localhost:7280/hotelInfo`);
                const data = await response.json();
                // 將獲取的數據賦值給 info
                this.info = {
                    hotelId: data[0].hotelInfoID,
                    hotelName: data[0].hotelName,
                    fullAddress: data[0].fullAddress,
                    longitude: data[0].longitude,
                    latitude: data[0].latitude,
                    phone: data[0].phone,
                    email: data[0].email,
                    description: data[0].description,
                    checkInTime: data[0].checkInTime,
                    checkOutTime: data[0].checkOutTime
                };
                this.dataLoaded = true; // 更新資料加載狀態
                this.$nextTick(() => {
                    this.initMap(); // 確保 DOM 更新後初始化地圖
                });
            } catch (error) {
                console.error('Failed to fetch hotel information:', error);
                // 可以在此處設置錯誤狀態或顯示用戶提示
            }
        }
    },
    // 組件掛載後獲取酒店資訊
    mounted() {
        this.fetchHotelInfo();
    }
};
</script>

<style scoped>
.hotelInfo-detail {
    text-align: center; /* 酒店資訊區域文字置中 */
}

#map {
    height: 400px; /* 設定地圖高度 */
    width: 100%; /* 設定地圖寬度 */
    margin-top: 20px; /* 設定地圖上方間距 */
}

html, body {
    height: 100%; /* 設定 html 和 body 高度為 100% */
    margin: 0; /* 移除默認邊距 */
    padding: 0; /* 移除默認內邊距 */
}
</style>
