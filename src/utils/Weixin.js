// import http from './http.js'
import store from '../store/index'
import wx from 'weixin-js-sdk'

// 微信配置方法
// const weixinConfig = async () => {
//   var config = store.state.weixinConfig
//   //   if (config.appId === '' || config.appId == null || config.appId === undefined) {
//   //     var url = location.href
//   //     var index = url.indexOf('#')
//   //     if (index > 0) {
//   //       url = url.substring(0, index)
//   //     }
//   //     url = encodeURIComponent(url)
//   //     // 同步请求接口获取签名
//   //     await http.get('https://www.xxx.com/Wxlogin/getsign', {
//   //       params: {
//   //         url: url
//   //       }
//   //     }).then(data => {
//   //       config = data.data
//   //       store.commit('setWeixinShareConfig', config)
//   //     })
//   //   }
//   // 微信基本配置
//   wx.config({
//     debug: false,
//     appId: 'wx493c1f18b17c429d',
//     timestamp: config.timestamp,
//     nonceStr: config.nonceStr,
//     signature: config.signature,
//     jsApiList: [
//       'checkJsApi',
//       'onMenuShareTimeline',
//       'onMenuShareAppMessage',
//       'onMenuShareQQ',
//       'onMenuShareWeibo'
//     ]
//   })
// }
// weixinConfig()

// 检测是否是小程序环境下打开
const detectMiniprograms = () => {
  wx.miniProgram.getEnv(function (res) {
    if (res.miniprogram) {
      // 将小程序环境状态记录在store中，避免每次打开页面都需要检测一次
      store.commit('setOnMiniPrograms', true)
    }
  })
}

// 封装跳转小程序的方法
const miniProgramNavigateTo = (url) => {
  console.log(111)
  wx.miniProgram.navigateTo({
    url: '/pages/index/index?url=' + encodeURI(url),
    success: function () {
      console.log('success')
    },
    fail: function () {
      console.log('跳转回小程序的页面fail')
    }
  })
}

// 导出
export {
  detectMiniprograms,
  miniProgramNavigateTo
}
