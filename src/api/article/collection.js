import request from '@/utils/request'
var group_name = 'collection'
export default {
  save(collection) { // 添加，保存
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: collection
    })
  },
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete',
      data: id
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
  getList() { // 查询用户收藏列表
    return request({
      url: `/${group_name}/getList`,
      method: 'get'
    })
  },
  getCollection(aid) { // 获取当前用户点赞情况是否收藏
    return request({
      url: `/${group_name}/getCollection/${aid}`,
      method: 'get'
    })
  }
}
