import Vue from 'vue'
import VueRouter from 'vue-router'
import { constantRouterMap } from '@/config/router.config'

/**
 * 重写路由的push方法
 * 解决，相同路由跳转时，报错
 * 添加，相同路由跳转时，触发watch (针对el-menu，仅限string方式传参，形如"view?id=5")
 */
const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location, onResolve, onReject) {
  if (onResolve || onReject) return originalPush.call(this, location, onResolve, onReject)
  return originalPush.call(this, location).catch(err => err)
}

Vue.use(VueRouter)

const routes = constantRouterMap

const router = new VueRouter({
  base: process.env.BASE_URL,
  mode: 'history',
  routes
})

export { router, routes }
