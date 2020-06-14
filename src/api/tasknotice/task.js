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
  save(task) { // 添加，保存
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: task
    })
  },
  saveenable(id, time) { // 保存To发布
    return request({
      url: `/${group_name}/saveTopush/${id}/${time}`,
      method: 'put'
    })
  },
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'put',
      data: id
    })
  },
  getTaskNum(userId) { // 获取教师发布的任务数
    return request({
      url: `/${group_name}/getTeacherTaskNum/${userId}`,
      method: 'get'
    })
  },
  getByPage(page) { // 分页查询
    return request({
      url: `/${group_name}/getByPageAdmin`,
      method: 'post',
      data: page
    })
  },
  getTaskContent(taskid) { // 获取任务内容
    return request({
      url: `/${group_name}/gettask/${taskid}`,
      method: 'get'
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
  },
  update(data) { // 修改更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: data
    })
  },
  deleteFile(fileUrl) { // 删除文件
    return request({
      url: `/upload/deleteFile`,
      method: 'post',
      data: { baseUrl: fileUrl }
    })
  },
  getTaskSituation(page, taskid) { // 获取任务完成情况
    return request({
      url: `/${group_name}/getTaskSituation/${taskid}`,
      method: 'post',
      data: page
    })
  },
  getTask(id) { // 获取任务内容
    return request({
      url: `/${group_name}/gettask/${id}`,
      method: 'get'
    })
  },
  setLevel(id, level) {
    return request({
      url: `/${group_name}/setlevel/${id}/${level}`,
      method: 'put'
    })
  }
}
