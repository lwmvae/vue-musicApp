<template>
  <scroll :data="data" @scroll="scroll" :listen-scroll="listenScroll" :probe-type="probeType" class="list-view" ref="listView">
    <ul>
      <li v-for="group in data" class="list-group" ref="listGroup">
        <h2>{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" @click="selectItem(item)" class="list-item">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-aside" @touchstart.stop.prevent="onAsideTouchStart" @touchmove.stop.prevent="onAsideTouchMove" @touchend.stop>
      <ul>
        <li v-for="(list,index) in listAside" :data-index="index" class="list" :class="{'active':currentIndex===index}">{{list}}</li>
      </ul>
    </div>
    <div class="list-fixed" ref="fixed" v-show="fixedTitle">
      <p class="fixed-title">{{fixedTitle}}</p>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
import { getData } from 'common/js/dom'

const ANCHOR_HEIGHT = 19
const TITLE_HEIGHT = 30

export default {
  name: 'HelloWorld',
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      scrollY: -1,
      currentIndex: 0,
      diff: -1
    }
  },
  created() {
    //监听滚动位置
    this.probeType = 3
    // 是否监听
    this.listenScroll = true
    // 保存触摸的位置
    this.touch = {}
    // 歌手列表的高度
    this.listHeight = []
  },
  methods: {
    onAsideTouchStart(e) {
      let anchorIndex = getData(e.target, 'index')
      let firstTouch = e.touches[0]
      this.touch.y1 = firstTouch.pageY
      this.touch.anchorIndex = anchorIndex

      this._scrollTo(anchorIndex)
    },
    onAsideTouchMove(e) {
      let firstTouch = e.touches[0]
      this.touch.y2 = firstTouch.pageY
      let delta = (this.touch.y2 - this.touch.y1) / ANCHOR_HEIGHT | 0
      let anchorIndex = parseInt(this.touch.anchorIndex) + delta
      
      this._scrollTo(anchorIndex)
    },
    // 滚动事件使右侧高亮对应
    scroll(pos) {
      this.scrollY = pos.y
    },
    selectItem(item){
      this.$emit('select',item)
    },
    //计算歌手列表高度
    _calculateHeight() {
      this.listHeight = []
      const list = this.$refs.listGroup
      let height = 0
      this.listHeight.push(height)
      for (let i = 0; i < list.length; i++) {
        let item = list[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    // 滚动事件
    _scrollTo(index) {
      if (!index && index == 0) {
        return
      }
      if (index < 0) {
        index = 0
      } else if (index > this.listHeight.length - 2) {
        index = this.listHeight.length - 2
      }
      this.scrollY = -this.listHeight[index]
      this.$refs.listView.scrollToElement(this.$refs.listGroup[index], 0)
    }
  },
  watch: {
    data() {
      setTimeout(() => {
        this._calculateHeight()
      }, 20)
    },
    scrollY(newY) {
      const listHeight = this.listHeight
      if (newY > 0) {
        this.currentIndex = 0
        return
      }
      for (let i = 0, l = listHeight.length - 1; i < l; i++) {
        let height1 = listHeight[i]
        let height2 = listHeight[i + 1]
        if (-newY >= height1 && -newY < height2) {
          this.currentIndex = i
          this.diff = height2 + newY
          return
        }
      }
      this.currentIndex = listHeight.length - 2
    },
    diff(newVal) {
      let fixedTop = (newVal > 0 && newVal < TITLE_HEIGHT) ? newVal - TITLE_HEIGHT : 0
      if(this.fixedTop===fixedTop){
        return
      }
      this.fixedTop=fixedTop
      this.$refs.fixed.style.transform=`translate3d(0,${fixedTop}px,0)`
    }
  },
  computed: {
    listAside() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
    },
    fixedTitle() {
      if (this.scrollY > 0) {
        return ''
      }
      return this.data[this.currentIndex] ? this.data[this.currentIndex].title : ''
    }
  },
  components: {
    Scroll,
    Loading
  }
}

</script>
<style scoped>
@import 'singerList.css'

</style>
