import api from './index'
import request from '@/utils/request'

export function login(data) {
  return request({
    url: api.Login + `?username=` + data.username + '&password=' + data.password,
    method: 'post',
    transformResponse: [function(data) {
      return JSON.parse(data)
    }]
  })
}

export function getSmsCaptcha(parameter) {
  return request({
    url: api.SendSms,
    method: 'post',
    data: parameter
  })
}

export function getInfo(params) {
  return request({
    url: api.UserInfo,
    method: 'get',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    },
    params
  })
}

export function logout() {
  return request({
    url: '/logout',
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
}
