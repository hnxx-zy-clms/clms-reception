import { router } from './router'
import store from './store'

import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css'
import notification from 'ant-design-vue/es/notification'
import appConfig from './app.config'

NProgress.configure({ showSpinner: false }) // NProgress配置


const defaultRoutePath = '/'

router.beforeEach((to, from, next) => {
  NProgress.start() // 开始进度条
  document.title = to.name + ' - ' + appConfig.title
  if (store.getters.token) {
    /* 有令牌 */
    if (to.path === '/register') {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters.roles.length === 0) {
        store
          .dispatch('user/getInfo')
          .then(res => {
            const menus = res.data.menus
            store.dispatch('settings/GenerateRoutes', menus).then(() => {
              console.log(store.getters.addRouters)
              // 动态添加可访问路由表
              router.addRoutes(store.getters.addRouters)

              if (to.path === redirect) {
                // hack方法 确保addRoutes已完成 ,将replace:true设置为使导航不会留下历史记录
                next({ ...to, replace: true })
              } else {
                // 跳转到目的路由
                next({ path: redirect })
              }
            })
            const redirect = decodeURIComponent(from.query.redirect || to.path)
            next({ path: redirect })
          })
          .catch(() => {
            notification.error({
              message: '错误',
              description: '请求用户信息失败，请重试'
            })
            NProgress.done()
          })
      } else {
        next()
      }
    }
  } else {
    next()
    NProgress.done() // 如果当前页面是登录的，则不会在每个钩子之后触发，因此请手动处理它
  }
})

router.afterEach(() => {
  NProgress.done() // 完成进度条
})
