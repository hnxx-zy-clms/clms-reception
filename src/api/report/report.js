import request from '@/utils/request'
var group_name = 'report'

export default {
  getByPage(page) { // 前台用户查询
    return request({
      url: `/${group_name}/getByUserId`,
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
  update(report) { // 修改更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: report
    })
  },
  getMinReportInfo() {
    return request({
      url: `/${group_name}/getMinReportInfo`,
      method: 'post'
    })
  },
  getUserReportInfo(report) {
    return request({
      url: `/${group_name}/getUserReportInfo`,
      method: 'post',
      data: report
    })
  },
  getTime() {
    return request({
      url: `/${group_name}/getTime`,
      method: 'get'
    })
  },
  setTime(i) {
    return request({
      url: `/${group_name}/setTime/${i}`,
      method: 'put'
    })
  },
  getNotReport(group, date) {
    return request({
      url: `/${group_name}/getNotReport/${group}/${date}`,
      method: 'get'
    })
  },
  getReportTime() {
    return request({
      url: `/${group_name}/getReportTime`,
      method: 'get'
    })
  },
  setReportTime(reportTime) {
    return request({
      url: `/${group_name}/setReportTime`,
      method: 'post',
      data: reportTime
    })
  }
}
