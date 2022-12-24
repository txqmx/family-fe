import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: false,
    searchState: false,
    memberDetailShow: false,
    memberDetail: '',
    transitionName: 'slide',
    // 图片查看ImgPreview
    imgPreviewShow: false,
    imgPreviewList: []
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
    // 路由切换动画
    setTransitionName (state, data) {
      state.transitionName = data
    },
    // 图片查看
    openPreview (state, val) {
      state.imgPreviewShow = true
      state.imgPreviewList = val || []
    },
    closePreview (state) {
      state.imgPreviewShow = false
      state.imgPreviewList = []
    }
  },
  actions: {
  },
  modules: {
  }
})
