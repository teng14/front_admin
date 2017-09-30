
import axios from 'axios'
import qs from 'qs'
import { Message, MessageBox } from 'element-ui'
import store from '../store'
import { getToken } from '@/utils/auth'
import Api from '@/api/apiConfig'
// 创建axios实例
const service = axios.create({
  // baseURL: process.env.BASE_API, // api的base_url
  timeout: 15000                  // 请求超时时间
  // withCredentials: true // 是否允许带cookie这些
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'

// request拦截器
service.interceptors.request.use(config => {
  if (config.domain) {
    config.url = Api[config.domain] + config.url
  }
  if (config.method === 'post') {
    config.data = qs.stringify({
      ...config.data
    })
  }
  if (config.domain === 'cr' || config.domain === 'yaoyi') {
    config.headers['Accept'] = 'application/json'
    config.withCredentials = true // 是否允许带cookie这些
  }
  return config
}, error => {
  // Do something with request error
  console.log(error) // for debug
  Promise.reject(error)
})

// status
// service.interceptors.validateStatus.use(status => {
//   console.log(status)
// })

// respone拦截器
service.interceptors.response.use(
  response => {
  /**
  * code为非20000是抛错 可结合自己业务进行修改
  */
    const res = response.data
    if (res.code === 0 || res.Status === 'Success' || res.oper === 0 || res.status === 1 || res.STATUS === 1) {
      return response.data
    } else {
      Message({
        message: res.message || res.Message || res.errorMessage,
        type: 'error',
        duration: 5 * 1000
      })

      // 50008:非法的token; 50012:其他客户端登录了;  50014:Token 过期了;
      if (parseInt(res.code) === 3) {
        // window.location.href = Api['passport'] + '/login?returnUrl=' + Api['cr']
        MessageBox.confirm('你的登录已过期或者已登出，请重新登录', '确定登出', {
          confirmButtonText: '重新登录',
          cancelButtonText: '取消',
          showCancelButton: false,
          closeOnClickModal: false,
          type: 'warning'
        }).then(() => {
          window.location.href = Api['passport'] + '/login?returnUrl=' + Api['cr']
          // store.dispatch('FedLogOut').then(() => {
          //   location.reload()// 为了重新实例化vue-router对象 避免bug
          // })
        })
      }
      // if (res.code === 3) {
      //   MessageBox.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
      //     confirmButtonText: '重新登录',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //     window.location.href = Api['passport'] + '?returnUrl=' + window.location.href
      //     // store.dispatch('FedLogOut').then(() => {
      //     //   location.reload()// 为了重新实例化vue-router对象 避免bug
      //     // })
      //   })
      // }
      return Promise.reject('error')
    }
  },
  error => {
    console.log('err' + error)// for debug
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
