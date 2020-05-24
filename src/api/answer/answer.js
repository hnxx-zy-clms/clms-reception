import request from '@/utils/request'
var group_name = 'answer'
export default {
  save(answer) { // 添加，保存
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: answer
    })
  },
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete',
      data: id
    })
  },
  update(answer) { // 修改更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: answer
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
  isAdopt(id) { // 已解答
    return request({
      url: `/${group_name}/isAdopt/${id}`,
      method: 'put',
      data: id
    })
  },
  noAdopt(id) { // 未解答
    return request({
      url: `/${group_name}/noAdopt/${id}`,
      method: 'put',
      data: id
    })
  }
}
