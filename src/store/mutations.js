import * as types from './mutation-types'

const mutations = {
  [types.SET_SINGER](state, singer) {
    state.singer = singer
  },
  [types.SET_SEARCH_HISTORY](state, searchHistory) {
    state.searchHistory = searchHistory
  }
}

export default mutations
