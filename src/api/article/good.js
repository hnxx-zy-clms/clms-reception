import request from '@/utils/request'
var group_name = 'good'
export default {
  save(good) { // 添加，保存
    return request({
      url: `/${group_name}/doGood`,
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
  }
}
