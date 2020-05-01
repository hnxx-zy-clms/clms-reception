import request from '@/utils/request'
var group_name = 'comment'
export default {
  save(comment) { // 添加，保存
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: comment
    })
  },
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete',
      data: id
    })
  },
  deleteByIds(ids) { // 批量删除
    return request({
      url: `/${group_name}/deleteByIds`,
      method: 'put',
      data: ids
    })
  },
  update(comment) { // 修改更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: comment
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
  list() { // 查询所有
    return request({
      url: `/${group_name}/list`,
      method: 'get'
    })
  },
  enable(id) { // 根据id启用
    return request({
      url: `/${group_name}/enable/${id}`,
      method: 'put',
      data: id
    })
  },
  disable(id) { // 根据id弃用
    return request({
      url: `/${group_name}/disable/${id}`,
      method: 'put',
      data: id
    })
  }
}
