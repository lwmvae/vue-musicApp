<template>
  <div class="tab">
  	<router-link to="/singer" class="tab-item">歌手</router-link>
  </div>
</template>

<script>
export default {
  name: 'tab'
}
</script>

<style scoped>
.tab{
	text-align: center;
	height: 30px;
	line-height: 30px;	
}
.tab-item{
	font-size: 16px;
}
</style>
