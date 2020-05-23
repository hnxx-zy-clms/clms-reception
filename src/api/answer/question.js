import request from '@/utils/request'
var group_name = 'question'
export default {
  save(question) { // 添加，保存
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: question
    })
  },
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete',
      data: id
    })
  },
  update(question) { // 修改更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: question
    })
  },
  get(id) { // 根据id查询
    return request({
      url: `/${group_name}/get/${id}`,
      method: 'get',
      data: id
    })
  },
  getByPage(page) { // 分页查询
    return request({
      url: `/${group_name}/getByPage`,
      method: 'post',
      data: page
    })
  },
  isSolve(id) { // 已解答
    return request({
      url: `/${group_name}/isSolve/${id}`,
      method: 'put',
      data: id
    })
  },
  noSolve(id) { // 未解答
    return request({
      url: `/${group_name}/noSolve/${id}`,
      method: 'put',
      data: id
    })
  }
}
