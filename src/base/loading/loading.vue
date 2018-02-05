<template>
  <div class="loading">
   <img src="./loading.gif" height="24" width="24">
   <p class="desc">{{title}}</p>
  </div>
</template>

<script>
export default {
  name: 'loading',
  props:{
  	title:{
  		type:String,
  		default:'正在加载...'
  	}
  }
}
</script>

<style scoped>
.loading{
	width: 100%;
	text-align: center;
}
</style>
