import request from '@/utils/request'
var group_name = 'articleType'
export default {
  save(type) { // 添加
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: type
    })
  },
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
  update(type) { // 更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: type
    })
  },
  enable(id) { // 启用
    return request({
      url: `/${group_name}/enable/${id}`,
      method: 'put'
    })
  },
  disable(id) { // 弃用
    return request({
      url: `/${group_name}/disable/${id}`,
      method: 'put'
    })
  },
  delete(id) { // 删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete'
    })
  },
  get(id) { // 根据id查询
    return request({
      url: `/${group_name}/get/${id}`,
      method: 'get'
    })
  },
  getArticleTypeCountInfo(page) {
    return request({
      url: `/${group_name}/getArticleTypeCountInfo`,
      method: 'post',
      data: page
    })
  }
}
