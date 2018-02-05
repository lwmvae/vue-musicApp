<template>
  <scroll :data="data" class="list-view">
    <ul>
      <li v-for="group in data" class="list-group">
        <h2>{{group.title}}</h2>
        <ul>
          <li v-for="item in group.items" class="list-item">
            <img v-lazy="item.avatar" class="avatar">
            <span class="name">{{item.name}}</span>
          </li>
        </ul>
      </li>
    </ul>
    <div class="list-aside"
    @touchstart.stop.prevent="onAsideTouchStart"
    @touchmove.stop.prevent="onAsideTouchMove"
    @touchend.stop
    >
      <ul>
        <li v-for="(list,index) in listAside" :data-index="index">{{list}}</li>
      </ul>
    </div>
    <div class="loading-container" v-show="!data.length">
      <loading></loading>
    </div>
  </scroll>
</template>
<script>
import Scroll from 'base/scroll/scroll'
import Loading from 'base/loading/loading'
export default {
  name: 'HelloWorld',
  props: {
    data: {
      type: Array,
      default: []
    }
  },
  methods:{
    onAsideTouchStart(e){
      // let 
    },
    onAsideTouchMove(){}
  },
  computed: {
    listAside() {
      return this.data.map((group) => {
        return group.title.substr(0, 1)
      })
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
