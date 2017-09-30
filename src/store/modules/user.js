import { login, logout, getInfo } from '@/api/login'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { MessageBox } from 'element-ui'
import Api from '@/api/apiConfig'
const user = {
  state: {
    token: getToken(),
    name: '',
    phone: '',
    avatar: '',
    roles: []
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, name) => {
      state.name = name
    },
    SET_PHONE: (state, phone) => {
      state.phone = phone
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_ROLES: (state, roles) => {
      state.roles = roles
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      // const username = userInfo.username.trim()
      return new Promise((resolve, reject) => {
        setToken('admin')
        commit('SET_TOKEN', 'admin')
        resolve()
        // window.location.href = Api['passport'] + '/login?returnUrl=' + Api['cr']
        // login(username, userInfo.password).then(response => {
        //   const data = response.data
        //   setToken(data.token)
        //   commit('SET_TOKEN', data.token)
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          if (response.data.code === 0) {
            const data = response.data.data
            if (data === null) {
              MessageBox.confirm('登录异常请重新登录', '确定登出', {
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
            } else {
              commit('SET_ROLES', 'admin')
              commit('SET_NAME', data.realName)
              commit('SET_PHONE', data.phone)
              commit('SET_AVATAR', '')
              response.data.data.role = ['admin']
              resolve(response.data)
            }
          } else {
            MessageBox.confirm('登录异常请重新登录', '确定登出', {
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
            // alert(9)
            // window.location.href = Api['passport'] + '/login?returnUrl=' + Api['cr']
            // Message.confirm('你已被登出，可以取消继续留在该页面，或者重新登录', '确定登出', {
            //   confirmButtonText: '重新登录',
            //   cancelButtonText: '取消',
            //   type: 'warning'
            // }).then(() => {
            //   window.location.href = Api['passport'] + '?returnUrl=' + window.location.href
            //   // store.dispatch('FedLogOut').then(() => {
            //   //   location.reload()// 为了重新实例化vue-router对象 避免bug
            //   // })
            // })
          }
        }).catch(error => {
          reject(error)
        })

        // const data = {
        //   'role': [
        //     'admin'
        //   ],
        //   'name': 'admin',
        //   'avatar': 'https://static3.ypzdw.com/shop_v1.0/images/base/logo.png?v=1.1'
        // }
        // commit('SET_ROLES', data.role)
        // commit('SET_NAME', data.name)
        // commit('SET_AVATAR', data.avatar)
        // resolve({
        //   code: 0,
        //   data: {
        //     'role': [
        //       'admin'
        //     ],
        //     'name': 'admin',
        //     'avatar': 'https://static3.ypzdw.com/shop_v1.0/images/base/logo.png?v=1.1'
        //   }
        // })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        // commit('SET_TOKEN', '')
        // commit('SET_ROLES', [])
        // removeToken()
        resolve()
        window.location.href = Api['passport'] + '/login?returnUrl=' + Api['cr']
        // logout(state.token).then(() => {
        //   commit('SET_TOKEN', '')
        //   commit('SET_ROLES', [])
        //   removeToken()
        //   resolve()
        // }).catch(error => {
        //   reject(error)
        // })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        // commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
