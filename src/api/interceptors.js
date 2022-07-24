/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
// import { Message } from 'element'
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

export function resError (error) {
  const { response } = error
  const msg = '连接服务器失败, 检查网络'
  if (response && response.data) {
    // Message({
    //   message: response.data.message || response.data.errMsg || msg,
    //   type: 'error',
    //   duration: 3 * 1000
    // })
  }
  return Promise.resolve(error)
}
