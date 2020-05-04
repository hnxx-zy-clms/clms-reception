import Cookies from 'js-cookie'

const TokenKey = 'vue_reception_token'
const userId = 'userId'

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token, remember) {
  if (remember) {
    return Cookies.set(TokenKey, token, { expires: 7 })
  }
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}

export function getUserId() {
  return Cookies.get(userId)
}

export function setUserId(userid, remember) {
  if (remember) {
    return Cookies.set(userId, userid, { expires: 7 })
  }
  return Cookies.set(userId, userid)
}

export function removeUserId() {
  return Cookies.remove(userId)
}
