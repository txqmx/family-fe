import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: false
  },
  mutations: {
    setLoading (state, val) {
      state.loading = val
    }
  },
  actions: {
  },
  modules: {
  }
})
