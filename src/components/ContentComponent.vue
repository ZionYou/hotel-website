<template>
  <div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'ContentComponent', // 可以給組件命名
  // 這裡可以添加組件的數據、方法等
};
</script>

<style scoped>
main {
  padding: 20px;
  background-color: #f9f9f9;
  /* 例子背景色 */
}
</style>
