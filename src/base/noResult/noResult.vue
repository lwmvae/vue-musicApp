<template>
  <div class="no-result">
    <img src="../../common/img/logo.jpg" class="image">
    <h3 class="title">{{title}}</h3>
  </div>
</template>
<script>
export default {
  name: 'noResult',
  props: {
    title: {
      type: String,
      default: '暂无搜索结果'
    }
  }
}

</script>
<style scoped>
.no-result {
  text-align: center;
}

.image {
  width: 120px;
  height: 120px;
}

</style>
