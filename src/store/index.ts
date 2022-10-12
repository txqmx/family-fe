import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: false,
    searchState: false
  },
  mutations: {
    setLoading (state, val) {
      state.loading = val
    },
    setSearchState (state, val) {
      state.searchState = val
    }
  },
  actions: {
  },
  modules: {
  }
})
