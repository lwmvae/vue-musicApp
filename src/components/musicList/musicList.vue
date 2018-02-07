<template>
  <div class="music-list">
    <div class="back" @click="back">
      <i class="back-icon"><</i>
    </div>
    <h1 class="title">{{title}}</h1>
    <div class="bg-image" :style="bgStyle" ref="bgImage">
      <div class="filter"></div>
    </div>
    <scroll :data="songs" @scroll="scroll" :probeType="probeType" :listenScroll="listenScroll" class="song-list" ref="list">
      <div class="song-list-wrapper">
        <song-list :songs="songs"></song-list>
      </div>
      <div class="loading" v-show="!songs.length">
        <loading></loading>
      </div>
    </scroll>
  </div>
</template>
<script>
import SongList from 'base/songList/songList'
import Loading from 'base/loading/loading'
import Scroll from 'base/scroll/scroll'
const IMAGE_MIN_HEIGHT = 40

export default {
  name: 'musicList',
  data() {
    return {
      imageHeight: 0,
      scrollY: 0
    }
  },
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
  created() {
    this.probeType = 3
    this.listenScroll = true
  },
  methods: {
    scroll(pos) {
      this.scrollY = pos.y
    },
    back() {
      this.$router.back()
    }
  },
  watch: {
    scrollY(newVal) {
      if (newVal >= 0) {
        let scale = (newVal + this.imageHeight) / this.imageHeight
        this.$refs.bgImage.style.transform = `scale(${scale})`
      } else {
        let scrollY = (this.imageHeight + newVal < IMAGE_MIN_HEIGHT) ? IMAGE_MIN_HEIGHT : this.imageHeight + newVal
        this.$refs.bgImage.style.paddingTop = `${scrollY}px`
      }
    }
  },
  mounted() {
    this.imageHeight = this.$refs.bgImage.clientHeight
    this.$refs.list.$el.style.top = `${this.imageHeight}px`
  },
  computed: {
    bgStyle() {
      return `background-image:url(${this.bgImage})`
    }
  },
  components: {
    SongList,
    Loading,
    Scroll
  }
}

</script>
<style scoped lang="less">
.music-list {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #fff;
}

.back {
  position: absolute;
  top: 0;
  left: 5px;
  z-index: 15;

  .back-icon {
    display: block;
    width: 40px;
    font-size: 30px;
    color: #ffcd32;
    text-align: center;
  }
}

.title {
  position: absolute;
  top: 0;
  left: 10%;
  width: 80%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  font-size: 18px;
  z-index: 15;
  color: #fff;
}

.bg-image {
  position: relative;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 70%;
  height: 0;
  background-size: cover;
  z-index: 10;
  .filter{
    position: absolute;
    top:0;
    left:0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0,0.3);
  }
}

.song-list {
  position: fixed;
  bottom: 0;
  width: 100%;
}

.song-list-wrapper {
  padding: 20px 30px;
}

.loading {
  position: absolute;
  width: 100%;
  top: 50%;
  transform: translateY(-50%);
}

</style>
