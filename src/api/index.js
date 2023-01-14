/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import axios from 'axios'
import { resSuccess, resError } from './interceptors'

// import userTree from './userTree.json'
const baseUrl = 'http://huanglf.zongxintang.com'
// const baseUrl = 'http://localhost:7001'

const request = axios.create({
  timeout: 1000 * 30 // 超时设置
})
request.interceptors.response.use(resSuccess, resError)
export const axiosCus = {
  get: (path, data, options) => {
    return request.get(path, Object.assign({}, { params: data }, options))
  },
  post: (path, data, options) => {
    return request.post(path, data, options)
  }
}

export default {
  axios: (dataSource) => axiosCus[dataSource.method](`${baseUrl}${dataSource.url}`, dataSource.data),
  login: (data) => axiosCus.post(`${baseUrl}/api/user/login`, data),
  getMemberList: (data) => axiosCus.get(`${baseUrl}/api/member/queryList`, data),
  queryMaxLevel: (data) => axiosCus.get(`${baseUrl}/api/member/queryMaxLevel`, data),
  getMemberTree: (data) => axiosCus.get(`${baseUrl}/api/member/queryTree`, data),
  getMemberDetail: (data) => axiosCus.get(`${baseUrl}/api/member/query`, data),
  getPageDetail: (data) => axiosCus.get(`${baseUrl}/api/page/query`, data),
  getArticlesList: (data) => axiosCus.get(`${baseUrl}/api/articles/queryList`, data),
  getPhptpList: (data) => axiosCus.get(`${baseUrl}/api/resourceType/queryList?dataType=img`, data),
  getResourceType: (data) => axiosCus.get(`${baseUrl}/api/resourceType/queryList`, data),
  getVideoList: (data) => axiosCus.get(`${baseUrl}/api/articles/queryList?dataType=video`, data),
  getImgList: (data) => axiosCus.get(`${baseUrl}/api/articles/queryList`, data),
  getArticlesDetail: (data) => axiosCus.get(`${baseUrl}/api/articles/query`, data)
}
