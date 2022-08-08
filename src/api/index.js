/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { resSuccess, resError } from './interceptors'

// import userTree from './userTree.json'
const baseUrl = ''
// const baseUrl = 'http://huanglf.zongxintang.com'

const request = axios.create({
  timeout: 1000 * 30 // 超时设置
})
request.interceptors.response.use(resSuccess, resError)
const axiosCus = {
  get: (path, data, options) => {
    return request.get(path, Object.assign({}, { params: data }, options))
  },
  post: (path, data, options) => {
    return request.post(path, data, options)
  }
}

export default {
  getMemberList: (data) => axiosCus.get(`${baseUrl}/api/member/queryList`, data),
  getMemberTree: (data) => axiosCus.get(`${baseUrl}/api/member/queryTree`, data),
  getMemberDetail: (data) => axiosCus.get(`${baseUrl}/api/member/query`, data)
}
