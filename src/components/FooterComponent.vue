<template>
  <footer class="bg-light py-4">
    <div class="container">
      <div class="row text-center">
        <div class="col-md-4 mb-3">
          <h3 class="h5">飯店電話</h3>
          <span>+ 09 123 456 789</span>
        </div>
        <div class="col-md-4 mb-3">
          <h3 class="h5">追蹤我們</h3>
          <ul class="list-inline">
            <li class="list-inline-item">
              <i class="bi bi-facebook fs-3"></i>
            </li>
            <li class="list-inline-item">
              <i class="bi bi-instagram fs-3"></i>
            </li>
            <li class="list-inline-item">
              <i class="bi bi-threads-fill fs-3"></i>
            </li>
            <li class="list-inline-item">
              <i class="bi bi-twitter-x fs-3"></i>
            </li>
          </ul>
        </div>
        <div class="col-md-4 mb-3">
          <h3 class="h5">消息通知</h3>
          <div class="d-flex justify-content-center">
            <input type="email" class="form-control me-2" placeholder="E-mail">
            <button class="btn btn-primary">訂閱</button>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'FooterComponent',
}
</script>

<style scoped>
.footer h3 {
  font-weight: bold;
  margin-bottom: 10px;
}

.list-inline-item {
  margin: 0 10px;
}

input.form-control {
  width: auto;
}

button {
  white-space: nowrap;
}
</style>
