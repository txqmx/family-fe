/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
export const getUrlParams = (url) => {
  const urlStr = url.split('?')[1] || ''
  const obj = {}
  const paramsArr = urlStr.split('&')
  for (let i = 0, len = paramsArr.length; i < len; i++) {
    const arr = paramsArr[i].split('=')
    obj[arr[0]] = arr[1]
  }
  return obj
}

export const getUrlParam = (name) => {
  return getUrlParams(window.location.href)[name]
}
