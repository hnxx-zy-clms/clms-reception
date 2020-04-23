// import { login, logout, getInfo } from '@/api/user'
// import { getToken, setToken, removeToken, getName, setName, setUserId, getUserId } from '@/utils/auth'
// import { resetRouter } from '@/router'

const getDefaultState = () => {
  return {
    // token: getToken(),
    // name: getName(),
    // avatar: '',
    // userid: getUserId()
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_USERID: (state, userid) => {
    state.userid = userid
  }
}

const actions = {
  // // 用户登录
  // login({ commit }, userInfo) {
  //   // const { username, password } = userInfo
  //   return new Promise((resolve, reject) => {
  //     login(true).then(res => {
  //       commit('SET_TOKEN', res.msg)
  //       commit('SET_NAME', res.data.userName)
  //       commit('SET_USERID', res.data.userId)
  //       setUserId(res.data.userId)
  //       setName(res.data.userName)
  //       setToken(res.msg)
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  //
  // // 获取用户信息
  // getInfo({ commit }) {
  //   return new Promise((resolve, reject) => {
  //     getInfo().then(res => {
  //       const { data } = res
  //       const { name, header } = data
  //       commit('SET_NAME', name)
  //       commit('SET_AVATAR', header)
  //       resolve(data)
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },
  //
  // // 退出登录
  // logout({ commit, state }) {
  //   return new Promise((resolve, reject) => {
  //     logout(state.token).then(() => {
  //       removeToken() // must remove  token  first
  //       resetRouter()
  //       commit('RESET_STATE')
  //       resolve()
  //     }).catch(error => {
  //       reject(error)
  //     })
  //   })
  // },

  // 刷新token
  resetToken({ commit }) {
    return new Promise(resolve => {
      removeToken() // must remove  token  first
      commit('RESET_STATE')
      resolve()
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

