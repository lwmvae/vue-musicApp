<template>
  <div class="singer-detail">
    <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
  </div>
</template>
<script>
import MusicList from 'components/musicList/musicList'
import { getSingerDetail } from 'api/singer'
import { ERR_OK } from 'api/config'
import { createSong } from 'common/js/song'
import { mapGetters } from 'vuex'
export default {
  name: 'singerDetail',
  data() {
    return {
      songs: []
    }
  },
  computed: {
    title() {
      return this.singer.name
    },
    bgImage() {
      return this.singer.avatar
    },
    ...mapGetters(['singer'])
  },
  created() {
    this._getSingerDetail()
  },
  methods: {
    _getSingerDetail() {
      // if (!this.singer.id) {
      //   this.$router.push('/singer')
      //   return
      // }
      getSingerDetail(this.singer.id).then((res) => {
        if (res.code === ERR_OK) {
          this.songs = this._normalSongs(res.data.list)
        }
      })
    },
    _normalSongs(list) {
      let ret = []
      list.forEach((item) => {
        let musicData = item.musicData
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  components: {
    MusicList
  }
}

</script>
<style scoped>
.singer-detail {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  background-color: #fff;
  z-index: 20;
}

</style>
