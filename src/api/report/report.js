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
  }
}
