<template>
  <!-- 頁首區塊容器 -->
  <header>
    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
      <div class="carousel-inner">
        <div class="carousel-item active">
          <img src="@/assets/images/banner.jpg" class="d-block w-100 carousel-img" alt="...">
        </div>
        <div class="carousel-item">
          <img src="@/assets/images/banner2.jpg" class="d-block w-100 carousel-img" alt="...">
        </div>
        <div class="carousel-item">
          <img src="@/assets/images/banner3.jpg" class="d-block w-100 carousel-img" alt="...">
        </div>
      </div>

      <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="prev">
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying"
        data-bs-slide="next">
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  </header>
</template>

<script>
export default {
  name: 'HeaderComponent',
}
</script>

<style scoped>
.carousel,
.carousel-item {
  height: 40vh;
  /* 設定輪播及項目的高度佔視窗的 25% */
}

.carousel-img {
  height: 100%;
  object-fit: cover;
  /* 確保圖片符合容器的比例，不會變形 */
}
</style>
