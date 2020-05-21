import request from '@/utils/request'
const group_name = 'reportMarking'

export default {
  getUserMarkingById(id) { // 前台用户根据报告ID查询
    return request({
      url: `/${group_name}/getUserMarkingById/${id}`,
      method: 'get'
    })
  },
  getNotMarkingReport(page) { // 查询当前用户未批阅报告
    return request({
      url: `/${group_name}/getNotMarkingReport`,
      method: 'post',
      data: page
    })
  },
  getMarkingReport(page) { // 查询当前用户已批阅报告
    return request({
      url: `/${group_name}/getMarkingReport`,
      method: 'post',
      data: page
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
  update(marking) { // 修改更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: marking
    })
  }
}
