import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: false,
    searchState: false,
    memberDetailShow: false,
    memberDetail: '',
    transitionName: 'slide-l'
  },
  mutations: {
    setLoading (state, val) {
      state.loading = val
    },
    setSearchState (state, val) {
      state.searchState = val
    },
    setMemberDetailShow (state, val) {
      state.memberDetailShow = val
    },
    setMemberDetail (state, val) {
      state.memberDetail = val
    },
    setTransitionName (state, data) {
      state.transitionName = data
    }
  },
  actions: {
  },
  modules: {
  }
})
