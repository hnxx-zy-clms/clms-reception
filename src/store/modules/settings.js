import { Components } from '@/config/componentConfigs'
import { constantRouterMap } from '@/config/router.config'

const state = {
  routers: constantRouterMap,
  addRouters: []
}

const mutations = {
  SET_ROUTERS: (state, routers) => {
    state.addRouters = routers
    state.routers = constantRouterMap.concat(routers)
  }
}

const actions = {
  GenerateRoutes({ commit }, menus) {
    return new Promise(resolve => {
      const accessedRouters = filterAsyncRouter(menus)
      const notFoundRouter = {
        path: '*', redirect: '/exception/404', hidden: true
      }
      accessedRouters.push(notFoundRouter)
      commit('SET_ROUTERS', accessedRouters)
      resolve()
    })
  }
}

function filterAsyncRouter(routerMap) {
  let components = {}
  for (const type in Components) {
    components = { ...Components[type], ...components }
  }
  const accessedRouters = routerMap.filter(route => {
    route.component = components[route.component]
    return true
  })
  return accessedRouters
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

