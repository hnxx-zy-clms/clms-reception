import request from '@/utils/request'
var group_name = 'task'

export default {
  getUserTask(page, userid) { // 分页查询通知
    return request({
      url: `/${group_name}/getUserTask/${userid}`,
      method: 'post',
      data: page
    })
  },
  getTaskReply(taskid, userid) { // 获取学生任务回复内容
    return request({
      url: `/${group_name}/getTaskReply/${taskid}/${userid}`,
      method: 'get'
    })
  },
  submitReply(reply) { // 提交任务回复
    return request({
      url: `/${group_name}/saveReply`,
      method: 'post',
      data: reply
    })
  }
}
