import fetch from '@/utils/fetch'

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

export function getInfo(token) {
  return fetch({
    domain: 'base',
    url: '/user/info',
    method: 'get',
    dataTyp: 'jsop',
    params: { token }
  })
}

export function logout() {
  return fetch({
    domain: 'base',
    url: '/user/logout',
    method: 'post'
  })
}
