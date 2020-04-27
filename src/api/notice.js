import request from '@/utils/request'
var group_name = 'notice'

export default {
  getByPage(page, userid) { // 分页查询通知
    return request({
      url: `/${group_name}/getByPage/${userid}`,
      method: 'post',
      data: page
    })
  }
}
