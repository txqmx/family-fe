import { createStore } from 'vuex'

export default createStore({
  state: {
    loading: false,
    searchState: false,
    memberDetailShow: false,
    memberDetail: '',
    transitionName: 'border',
    // 图片查看ImgPreview
    imgPreviewShow: false,
    imgPreviewList: [],
    // 微信配置相关
    weixinConfig: {}, // 微信配置
    onWeixin: navigator.userAgent.toLowerCase().indexOf('micromessenger') !== -1, // 微信环境
    onMiniPrograms: false // 微信小程序环境
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
    },
    // 微信配置相关
    setWeixinShareConfig (state, config) {
      state.weixinConfig = config
    },
    setOnMiniPrograms (state, status) {
      state.onMiniPrograms = status
    }
  },
  actions: {
  },
  modules: {
  }
})
