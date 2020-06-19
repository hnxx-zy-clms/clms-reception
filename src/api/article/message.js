import request from '@/utils/request'
var group_name = 'message'
export default {
  getAll() { // 后台查询
    return request({
      url: `/${group_name}/getAll`,
      method: 'get'
    })
  },
  getList() { // 前台查询
    return request({
      url: `/${group_name}/getList`,
      method: 'get'
    })
  },
  getByPage(page) { // 前台查询
    return request({
      url: `/${group_name}/getByPage`,
      method: 'post',
      data: page
    })
  },
  confirmMessageById(id) { // 根据id确认消息
    return request({
      url: `/${group_name}/confirmMessageById/${id}`,
      method: 'put'
    })
  },
  confirmMessageByIds(ids) {
    return request({
      url: `/${group_name}/confirmMessageByIds`,
      method: 'put',
      data: ids
    })
  },
  delete(id) { // 删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete'
    })
  },
  deleteByIds(ids) { // 批量删除
    return request({
      url: `/${group_name}/deleteByIds`,
      method: 'put',
      data: ids
    })
  },
  get(id) { // 根据id查询
    return request({
      url: `/${group_name}/get/${id}`,
      method: 'get'
    })
  }
}
