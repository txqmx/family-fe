/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { resSuccess, resError } from './interceptors'

// import userTree from './userTree.json'
// const baseUrl = 'http://test.zongxintang.com'
const baseUrl = 'http://127.0.0.1:7001'

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
  login: (data) => axiosCus.post(`${baseUrl}/api/user/login`, data),
  getMemberList: (data) => axiosCus.get(`${baseUrl}/api/member/queryList`, data),
  queryMaxLevel: (data) => axiosCus.get(`${baseUrl}/api/member/queryMaxLevel`, data),
  getMemberTree: (data) => axiosCus.get(`${baseUrl}/api/member/queryTree`, data),
  getMemberDetail: (data) => axiosCus.get(`${baseUrl}/api/member/query`, data),
  getPageDetail: (data) => axiosCus.get(`${baseUrl}/api/page/query`, data),
  getArticlesList: (data) => axiosCus.get(`${baseUrl}/api/articles/queryList`, data),
  getImgList: (data) => axiosCus.get(`${baseUrl}/api/resourceType/queryList?dataType=img`, data),
  getArticlesDetail: (data) => axiosCus.get(`${baseUrl}/api/articles/query`, data)
}
