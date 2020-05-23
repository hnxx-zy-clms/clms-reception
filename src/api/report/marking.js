import request from '@/utils/request'
const group_name = 'reportMarking'

export default {
  getUserMarkingById(id) { // 前台用户根据报告ID查询
    return request({
      url: `/${group_name}/getUserMarkingById/${id}`,
      method: 'get'
    })
  },
  save(report) { // 保存添加
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: report
    })
  },
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'delete'
    })
  },
  update(report) { // 修改更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: report
    })
  },
  getMarkingScore(page) {
    return request({
      url: `/${group_name}/getMarkingScore`,
      method: 'post',
      data: page
    })
  }
}
