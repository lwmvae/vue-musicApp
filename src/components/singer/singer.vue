<template>
  <div class="singer">
    <singer-list :data="singers"></singer-list>
  </div>
</template>
<script>
import singerList from 'base/singerList/singerList'
import { getSingerList } from 'api/singer'
import Singer from 'common/js/singer'
import { ERR_OK } from 'api/config'

const HOT_SINGER_LEN = 10
const HOT_NAME = '热门'

export default {
  name: 'HelloWorld',
  data() {
    return {
      singers: []
    }
  },
  methods: {
    _getSingerList() {
      getSingerList().then((res) => {
        if (res.code === ERR_OK) {
          this.singers = this._nomalList(res.data.list)
          // console.log(this.singers);
        }
      })
    },
    _nomalList(list) {
      let map = {
        hot: {
          title: HOT_NAME,
          items: []
        }
      }
      list.forEach((item, index) => {
        if (index < HOT_SINGER_LEN) {
          map.hot.items.push(new Singer({
            name: item.Fsinger_name,
            id: item.Fsinger_mid
          }))
        }
        const key = item.Findex
        if (!map[key]) {
          map[key] = {
            title: key,
            items: []
          }
        }
        map[key].items.push(new Singer({
          name: item.Fsinger_name,
          id: item.Fsinger_mid
        }))
      })
      let ret = []
      let hot = []
      for (let key in map) {
        let val = map[key]
        if (val.title.match(/[a-zA-Z]/)) {
          ret.push(val)
        } else if (val.title === HOT_NAME) {
          hot.push(val)
        }
      }
      ret.sort((a, b) => {
        return a.title.charCodeAt(0) - b.title.charCodeAt(0)
      })
      return hot.concat(ret)
    }
  },
  created() {
    this._getSingerList()
  },
  components: {
    singerList
  }
}

</script>
<style scoped>
.singer{
  position: fixed;
  top:30px;
  left:0;
  bottom:0;
  width: 100%;
}

</style>
