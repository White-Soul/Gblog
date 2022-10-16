<template>
  <!-- 将section-title中的标签插入到这里设置格式 -->
  <h1 class="section-title"><slot></slot></h1>
</template>

<script>
export default {
  name: "section-title",
};
</script>

<style scoped>
h1.section-title {
  color: #757575;
  font-size: 16px;
  font-weight: 400;
  padding-bottom: 15px;
  border-bottom: 1px dashed #ececec;
}
</style>
