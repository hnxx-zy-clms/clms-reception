import request from '@/utils/request'
var group_name = 'classes'
export default {
  getByPage(page, size) { // 分页查询
    return request({
      url: `/${group_name}/all/${page}/${size}/null`,
      method: 'post'
    })
  },
  getClassNum() {
    return request({
      url: `/${group_name}/report`,
      method: 'get'
    })
  },
  getSexPercent() {
    return request({
      url: `/${group_name}/findSexPercent`,
      method: 'get'
    })
  }
}

