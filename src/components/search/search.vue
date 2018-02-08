<template>
  <div class="search">
    <div class="search-box-wrapper">
      <search-box ref="searchBox" @query="onQueryChange"></search-box>
    </div>
    <div class="search-wrapper" v-show="!query">
      <div class="hot">
        <h1 class="title">热门搜索</h1>
        <ul>
          <li v-for="item in hotKey" class="item" @click="addQuery(item.k)">{{item.k}}</li>
        </ul>
      </div>
      <div class="history" v-show="searchHistory.length">
      	<h1 class="title">
      		<span class="text">搜索历史</span>
      		<i class="icon-clear"></i>
      	</h1>
      	<search-list :searchs="searchHistory" @select="addQuery" @delete="deleteHistory" ></search-list>
      </div>
    </div>
    <div class="search-result" v-show="query">
    	<suggest :query="query" @select="saveSearch"></suggest>
    </div>
  </div>
</template>
<script>
import SearchBox from 'base/searchBox/searchBox'
import SearchList from 'base/searchList/searchList'
import Suggest from 'components/suggest/suggest'
import { ERR_OK } from 'api/config'
import { getHotKey } from 'api/search'
import {searchMixin} from 'common/js/mixin'
export default {
	mixins:[searchMixin],
  name: 'search',
  data() {
    return {
      hotKey: []
    }
  },
  created() {
    this._getHotKey()
  },
  methods: {
    _getHotKey() {
      getHotKey().then((res) => {
        if (res.code === ERR_OK) {
          this.hotKey=res.data.hotkey.slice(0,10)
        }
      })
    }
  },
  components: {
    SearchBox,
    SearchList,
    Suggest
  }
}

</script>
<style scoped>
@import './search.css'

</style>
