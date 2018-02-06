<template>
  <div class="music-list">
    <div class="back">
      <i class="back-icon"><</i>
    </div>
    <h1 class="title">{{title}}</h1>
    <div class="bg-image" :style="bgStyle">
    </div>
    <div class="song-list">
    	<div class="song-list-wrapper">
    		<song-list></song-list>
    	</div>
    </div>
  </div>
</template>
<script>
// import loading from 'base/loading/loading'
import SongList from 'base/songList/songList'
export default {
  name: 'musicList',
  props: {
    songs: {
      type: Array,
      default: []
    },
    title: {
      type: String,
      default: ''
    },
    bgImage: {
      type: String,
      default: ''
    }
  },
  computed:{
  	bgStyle(){
  		return `background-image:url(${this.bgImage})`
  	}
  },
  components:{
  	SongList
  }
}

</script>
<style scoped>
@import './musicList.css'

</style>
