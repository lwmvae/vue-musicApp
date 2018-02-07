<template>
  <div >
    <ul>
      <li v-for="song in songs" class="listGroup">
        <div class="list">
          <h2 class="name">{{song.name}}</h2>
          <p class="desc">{{getDesc(song)}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'songList',
  props: {
    songs: {
      type: Array,
      default: function () {
      	return []
      }
    }
  },
  methods: {
    getDesc(song) {
      return `${song.singer} · ${song.album}`
    }
  }
}

</script>
<style scoped lang="less">
.listGroup{
	padding: 10px 0;
}
.list{
	.desc{
		margin-top: 5px;
		color: #999;
	}
}

</style>
