import { mapGetters, mapActions } from 'vuex'

export const searchMixin = {
  data() {
    return {
      query: ''
    }
  },
  computed: {
    ...mapGetters(['searchHistory'])
  },
  methods: {
    onQueryChange(query) {
      this.query = query.trim()
    },
    addQuery(query) {
      this.$refs.searchBox.setQuery(query)
    },
    saveSearch() {
      this.saveSearchHistory(this.query)
    },
    ...mapActions(['saveSearchHistory', 'deleteSearchHistory','clearSearchHistory'])
  }
}
