<template>
  <div class="search-list">
    <ul>
      <li v-for="item in searchs" class="item" @click="selectItem(item)">
        <span class="text">{{item}}</span>
        <i class="icon-delete" @click.stop="deleteItem(item)"></i>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  name: 'searchList',
  props: {
    searchs: {
      type: Array,
      default: []
    }
  },
  methods: {
    selectItem(item) {
      this.$emit('select', item)
    },
    deleteItem(item) {
      this.$emit('delete', item)
    }
  }
}

</script>
<style scoped>
.item {
  display: flex;
  height: 30px;
  align-items: center;
}

.text {
  flex: 1;
}

</style>
