// 全局变量设置
const state = {
  typeList: [] // 分类列表
}

const mutations = {
  SET_TYPE: (state, typeList) => {
    state.typeList = typeList
  }
}

export default {
  namespaced: true,
  state,
  mutations
}

