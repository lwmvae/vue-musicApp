<template>
  <div class="search-box">
    <i class="icon-search"></i>
    <input type="text" v-model="query" class="box" :placeholder="placeholder">
    <i class="icon-dismiss" v-show="query" @click="clear"></i>
  </div>
</template>
<script>
import { debounce } from 'common/js/util'
export default {
  name: 'searchBox',
  data() {
    return {
      query: ''
    }
  },
  props: {
    placeholder: {
      type: String,
      default: '搜索歌曲、歌手'
    }
  },
  created() {
    this.$watch('query', debounce((newQuery) => {
      this.$emit('query', newQuery)
    }, 200))
  },
  methods: {
    clear() {
      this.query = ''
    },
    setQuery(query) {
      this.query = query
    }
  }
}

</script>
<style scoped rel="stylesheet/css">
.search-box {
  display: flex;
  width: 100%;
  align-items: center;
  height: 40px;
  padding: 0 5px;
  box-sizing: border-box;
  border-radius: 4px;
  background-color: #dfdfdf;
}

.icon-search {
  font-size: 24px;
}

.box {
  flex: 1;
  border: none;
  outline: none;
  background-color: #dfdfdf;
  margin: 0 5px;
}

.icon-dismiss {
  font-size: 16px;
}

</style>
