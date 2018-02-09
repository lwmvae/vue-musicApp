<template>
  <div class="tab">
  	<router-link to="/singer" class="tab-item">歌手</router-link>
  	<router-link to="/search" class="tab-item">搜索</router-link>
  </div>
</template>

<script>
export default {
  name: 'tab'
}
</script>

<style scoped>
.tab{
	display: flex;
	z-index: 20;
	background-color: #fff;
	text-align: center;
	height: 30px;
}
.tab-item{
	flex:1;
	font-size: 16px;
	line-height: 30px;
}
.active{
	color: #3385ff;
}
</style>
