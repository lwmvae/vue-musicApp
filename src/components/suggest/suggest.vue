<template>
  <scroll class="suggest" ref="suggest" :pullup="pullup" @scrollToEnd="searchMore" :data="result">
    <ul class="suggest-wrapper">
      <li v-for="item in result" class="item" @click="selectItem(item)">
        <div class="icon">
          <i :class="getIconClass(item)"></i>
        </div>
        <div class="name">
          <p class="text">{{getDisplayName(item)}}</p>
        </div>
      </li>
      <loading v-show="hasMore"></loading>
    </ul>
    <div class="no-result" v-show="!result.length&&!hasMore">
      <no-result></no-result>
    </div>
  </scroll>
</template>
<script>
import NoResult from 'base/noResult/noResult'
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { ERR_OK } from 'api/config'
import { search } from 'api/search'
import { createSong } from 'common/js/song'

const perpage = 20
const TYPE_SINGER = 'singer'

export default {
  name: 'suggest',
  props: {
    showSinger: {
      type: Boolean,
      default: true
    },
    query: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      page: 1,
      hasMore: true,
      pullup: true,
      result: []
    }
  },
  methods: {
    refresh() {
      this.$refs.suggest.refresh()
    },
    selectItem(item) {
      this.$emit('select', item)
    },
    getIconClass(item) {
      if (item.type === TYPE_SINGER) {
        return 'icon-mine'
      } else {
        return 'icon-music'
      }
    },
    getDisplayName(item) {
      if (item.type === TYPE_SINGER) {
        return item.singername
      } else {
        return `${item.name} - ${item.singer}`
      }
    },
    searchMore() {
      if (!this.hasMore) {
        return
      }
      this.page++;
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(res.data))
          this._checkMore(res.data)
        }
      })
    },
    _search() {
      this.page = 1;
      this.hasMore = true;
      search(this.query, this.page, this.showSinger, perpage).then((res) => {
        if (res.code === ERR_OK) {
          this.result = this.result.concat(this._genResult(res.data))
          this._checkMore(res.data)
        }
      })
    },
    _genResult(data) {
      let ret = []
      if (data.zhida && data.zhida.singerid) {
        ret.push({
          ...data.zhida,
          ...{
            type: TYPE_SINGER
          }
        })
      }
      if (data.song) {
        ret = ret.concat(this._normalizeSongs(data.song.list))
      }
      return ret
    },
    _checkMore(data) {
      const song = data.song
      if (!song.list.length || (song.curnum + song.curpage * perpage) > song.totalnum) {
        this.hasMore = false
      }
    },
    _normalizeSongs(list) {
      let ret = []
      list.forEach((musicData) => {
        if (musicData.songid && musicData.albummid) {
          ret.push(createSong(musicData))
        }
      })
      return ret
    }
  },
  watch: {
    query(newQuery) {
      this.result=[]
      this._search(newQuery)
    }
  },
  components: {
    NoResult,
    Scroll,
    Loading
  }
}

</script>
<style scoped>
.suggest {
  position: relative;
  height: 100%;
  overflow: hidden;
}

.item {
  padding-bottom: 20px;
  display: flex;
  align-items: center;
}

.icon {
  flex: 0 0 20px;
}

.name {
  flex: 1;
  height: 19px;
  overflow: hidden;
}

.text {
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
}

.suggest-wrapper {
  padding: 0 30px;
}

.no-result {
  width: 100%;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
}

</style>
