import request from '@/utils/request'
var group_name = 'user'

export default {
  updateUserIconById(user) { // 更新用户头像
    return request({
      url: `/updateUserIconById`,
      method: 'put',
      data: user
    })
  },
  getUserGroup(userId) { // 分页查询
    return request({
      url: `/user/selectByGroup/${userId}`,
      method: 'post'
    })
  }
}
