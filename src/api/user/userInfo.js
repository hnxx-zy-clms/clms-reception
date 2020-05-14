import request from '@/utils/request'
var group_name = 'uxer'

export default {
  updateUserIconById(user) { // 更新用户头像
    return request({
      url: `/updateUserIconById`,
      method: 'put',
      data: user
    })
  }
}
