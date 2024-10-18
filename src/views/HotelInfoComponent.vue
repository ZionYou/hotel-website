<template>
  <div class="container mt-5">
    <div class="row justify-content-center">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <div class="language-selector-sticky mb-3">
              <label for="language" class="form-label">選擇語言:</label>
              <select v-model="selectedLanguage" class="form-select" @change="loadHotelDescription">
                <option value="zh-TW">正體中文</option>
                <option value="zh-CN">简体中文</option>
                <option value="en">English</option>
                <option value="ja">日本語</option>
              </select>
            </div>

            <div class="scrollable-content">
              <h2 @click="toggleDescription" class="collapsible-header" aria-expanded="isDescriptionVisible" aria-controls="hotel-description">
                {{ descriptionTitle }} <span>{{ isDescriptionVisible ? '-' : '+' }}</span>
              </h2>
              <div v-if="isDescriptionVisible" id="hotel-description">
                <p v-html="hotelDescription"></p>
              </div>

              <div v-if="dataLoaded" class="info-container row">
                <div class="col-md-6">
                  <table class="table table-bordered">
                    <tbody>
                      <tr>
                        <td>飯店名稱:</td>
                        <td>{{ info.hotelName }}</td>
                      </tr>
                      <tr>
                        <td>地址:</td>
                        <td>{{ info.fullAddress }}</td>
                      </tr>
                      <tr>
                        <td>電話:</td>
                        <td>{{ info.phone }}</td>
                      </tr>
                      <tr>
                        <td>電子郵件:</td>
                        <td>{{ info.email }}</td>
                      </tr>
                      <tr>
                        <td>入住時間:</td>
                        <td>{{ info.checkInTime }}</td>
                      </tr>
                      <tr>
                        <td>退房時間:</td>
                        <td>{{ info.checkOutTime }}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                <div class="col-md-6">
                  <div id="map" class="map-container"></div>
                </div>
              </div>
              <div v-else>Loading...</div>
              <div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div> <!-- 錯誤訊息 -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global google */
export default {
  name: 'HotelInfoComponent',
  data() {
    return {
      info: {
        hotelId: '',
        hotelName: '',
        fullAddress: '',
        longitude: '',
        latitude: '',
        phone: '',
        email: '',
        checkInTime: '',
        checkOutTime: ''
      },
      map: null,
      marker: null,
      dataLoaded: false,
      selectedLanguage: 'zh-TW',
      hotelDescription: '',
      isDescriptionVisible: false,
      errorMessage: '' // 新增錯誤訊息變量
    };
  },
  computed: {
    descriptionTitle() {
      const titles = {
        'zh-TW': '飯店簡介',
        'zh-CN': '酒店简介',
        'en': 'Hotel Description',
        'ja': 'ホテルの説明'
      };
      return titles[this.selectedLanguage] || titles['zh-TW'];
    }
  },
  methods: {
    initMap() {
      const lat_num = parseFloat(this.info.latitude);
      const lng_num = parseFloat(this.info.longitude);
      this.map = new google.maps.Map(document.getElementById('map'), {
        center: { lat: lat_num, lng: lng_num },
        zoom: 18
      });
      this.setMarker(lat_num, lng_num);
    },
    setMarker(latitude, longitude) {
      this.marker = new google.maps.Marker({
        position: { lat: latitude, lng: longitude },
        map: this.map
      });
    },
    async fetchHotelInfo() {
      this.errorMessage = ''; // 清空錯誤訊息
      try {
        //const response = await fetch(`${process.env.VUE_APP_API_BASE_URL}/HotelInfo`);
        const response = await fetch('https://35.188.219.147/api/HotelInfo');
        console.log("base: " + `${process.env.VUE_APP_API_BASE_URL}/HotelInfo`);
        // 檢查響應狀態
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json(); // 確保這裡是有效的 JSON

        this.info = {
          hotelId: data[0].hotelInfoID,
          hotelName: data[0].hotelName,
          fullAddress: data[0].fullAddress,
          longitude: data[0].longitude,
          latitude: data[0].latitude,
          phone: data[0].phone,
          email: data[0].email,
          checkInTime: data[0].checkInTime,
          checkOutTime: data[0].checkOutTime
        };
        this.dataLoaded = true;
        this.loadHotelDescription(); // 移到這裡以提高可讀性
        this.$nextTick(() => {
          this.initMap();
        });
      } catch (error) {
        console.error('Failed to fetch hotel information:', error);
        this.errorMessage = '無法加載飯店信息。'; // 顯示錯誤訊息
      }
    },
    async loadHotelDescription() {
      try {
        const response = await fetch(`/hotel_description_${this.selectedLanguage}.txt`);
        this.hotelDescription = await response.text();
      } catch (error) {
        console.error('Failed to load hotel description:', error);
        this.hotelDescription = '無法加載飯店簡介。';
      }
    },
    toggleDescription() {
      this.isDescriptionVisible = !this.isDescriptionVisible;
    }
  },
  mounted() {
    if (typeof google !== 'undefined') {
      this.fetchHotelInfo();
    } else {
      const checkGoogleMapsLoaded = setInterval(() => {
        if (typeof google !== 'undefined') {
          clearInterval(checkGoogleMapsLoaded);
          this.fetchHotelInfo();
        }
      }, 100);
    }
  }
};
</script>

<style scoped>
.language-selector-sticky {
  position: sticky;
  top: 0;
  background-color: white;
  z-index: 100;
  padding: 10px;
  border-bottom: 1px solid #ccc;
}
.scrollable-content {
  max-height: 400px; /* 固定高度 */
  overflow-y: auto; /* 開啟滾動條 */
  overflow-x: hidden; /* 隱藏橫向滾動條 */
}
.map-container {
  height: 300px;
  width: 100%;
  border: 1px solid #f30909;
}
.collapsible-header {
  cursor: pointer;
  color: #E0E0E0;
}
.collapsible-header:hover {
  text-decoration: none;
}
@media (max-width: 768px) {
  .info-container {
    flex-direction: column;
  }
}
</style>
