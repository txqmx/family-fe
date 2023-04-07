/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import { Message } from 'element'
import { Toast } from 'vant'
import { getUrlParam } from '@/utils/Url'
export function resSuccess (response) {
  /**
     * code非0返回出错，统一提示处理
     */
  return new Promise((resolve, reject) => {
    if (response.data.status === 200) {
      resolve(response.data.data)
    } else {
      reject(response.data)
    }
  })
}

export function reqSuccess (config) {
  config.headers.family = getUrlParam('family') || localStorage.getItem('family')
  return config
}

export function resError (error) {
  const { response } = error
  const msg = '连接服务器失败, 检查网络'
  if (response && response.data) {
    Toast(msg)
  }
  return Promise.resolve(error)
}
