import request from '@/utils/request'
var group_name = 'good'
export default {
  save(good) { // 添加，保存
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: good
    })
  },
  delete(id) { // 取消点赞
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete',
      data: id
    })
  },
  getList() { // 根据用户id查询
    return request({
      url: `/${group_name}/getList`,
      method: 'get'
    })
  },
  getGood(good) { // 获取当前用户点赞情况是否点赞
    return request({
      url: `/${group_name}/getGood`,
      method: 'post',
      data: good
    })
  },
  getByPage(page) { // 分页查询
    return request({
      url: `/${group_name}/getByPage`,
      method: 'post',
      data: page
    })
  }
}
