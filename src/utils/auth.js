import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function getToken() {
  // return Cookies.get(TokenKey)
  return true
}

export function setToken(token) {
  return Cookies.set(TokenKey, TokenKey)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
