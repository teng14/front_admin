import fetch from '@/utils/fetch'
import Api from '@/api/apiConfig'
import Vue from 'vue'
import VueResource from 'vue-resource'
Vue.use(VueResource)
export function login(username, password) {
  return fetch({
    domain: 'base',
    url: '/user/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function getInfo() {
  // return fetch({
  //   domain: 'yaoyi',
  //   url: '/api/user/getUserInfo',
  //   method: 'get'
  // })
  // Vue.http.options.emulateJSON = true
  // return Vue.http.jsonp(Api['base'] + '/Passport/GetAccountList', {
  //   method: 'get',
  //   dataType: 'jsonp'
  // })
  Vue.http.options.emulateJSON = true
  return Vue.http.get(Api['cr'] + '/api/user/basic', {
    credentials: true
  })
}

export function logout() {
  return fetch({
    domain: 'base',
    url: '/user/logout',
    method: 'post'
  })
}
