<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" v-model="query" class="box" :placeholder="placeholder">
    <i class="icon-dismiss"></i>
  </div>
</template>
<script>
export default {
  name: 'searchBox',
  data(){
  	return {
  		query:''
  	}
  },
  props:{
  	placeholder:{
  		type:String,
  		default:'搜索歌曲、歌手'
  	}
  }
}

</script>
<style scoped rel="stylesheet/css">
.search-box{
	display: flex;
	width: 100%;
	align-items: center;
	height: 40px;
	padding: 0 5px;
	border-radius: 4px;
	background-color: #dfdfdf;
}
.icon-search{
	font-size: 24px;
}
.box{
	flex: 1;
	border: none;
	/*outline: none;*/
	background-color: #dfdfdf;
	margin: 0 5px;
}
.icon-dismiss{
	font-size: 16px;
}
</style>