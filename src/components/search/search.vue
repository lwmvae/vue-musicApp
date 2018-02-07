<template>
  <div class="search">
    <div class="search-box-wrapper">
    	<search-box></search-box>
    </div>
    <div class="search-wrapper">
    	1
    </div>
  </div>
</template>
<script>
import SearchBox from 'base/searchBox/searchBox'
export default {
  name: 'search',
  components:{
  	SearchBox
  }
}

</script>
<style scoped lang="less">
.search-box-wrapper{
	margin: 20px;
}

</style>
