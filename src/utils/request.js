import axios from 'axios'
import store from '../store'
import { router } from '../router'
import { getToken } from '../utils/auth'

import notification from 'ant-design-vue/es/notification'
import message from 'ant-design-vue/es/message'
import modal from 'ant-design-vue/es/modal'

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。'
}

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_API_BASE_URL, // api base_url
  timeout: 6000 // 请求超时时间
})

const err = (error) => {
  const { response } = error

  if (response && response.status) {
    const { status, config } = response
    const { url } = config
    const errorText = codeMessage[response.status] || response.statusText

    if (status === 403) {
      const { code, msg } = response.data
      if (error.response) {
        switch (code) {
          // Token 已过期异常
          case 501: {
            modal.confirm({
              title: 'Notification',
              content: 'Token 已过期，你暂不能操作任何操作，是否续期？',
              onOk() {
                store.dispatch('RefreshToken').then(() => {
                  message.success('登录已续期')
                  setTimeout(() => {
                    window.location.reload()
                  }, 1500)
                })
              }
            })
            break
          }

          // 权限不足
          case 403: {
            message.success(msg)
            router.push({ path: `/exception/403` })
            break
          }

          // 用户未登录
          case 410: {
            document.getElementById('loginR').click()
            break
          }
        }
      }
    } else {
      notification.error({
        message: `请求错误 ${status}: ${url}`,
        description: errorText
      })
    }
  } else if (!response) {
    notification.error({
      message: '网络异常',
      description: '您的网络发生异常，无法连接服务器'
    })
  }
  return Promise.reject(error)
}
// request 拦截器
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = getToken()
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

// response 拦截器
service.interceptors.response.use((response) => {
  const res = response.data
  if (res.code !== 200) {
    message.warning(res.msg)
    return Promise.reject(new Error('error'))
  } else {
    return response.data
  }
}, err)

export default service

