import request from '@/utils/request'
var group_name = 'registration'

export default {
  save(registration) { // 设置为已读
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: registration
    })
  },
  getRegistration(userId) {
    return request({
      url: `/${group_name}/getListById/${userId}`,
      method: 'get'
    })
  }
}
