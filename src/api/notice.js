import request from '@/utils/request'
var group_name = 'notice'
export default {
  getByPage(page) { // 分页查询
    return request({
      url: `/${group_name}/getByPage/1`,
      method: 'post',
      data: page
    })
  }
}
