import request from '@/utils/request'
var group_name = 'notice'

export default {
  save(notice) { // 添加，保存
    return request({
      url: `/${group_name}/save`,
      method: 'post',
      data: notice
    })
  },
  getByPage(page, userid) { // 分页查询通知
    return request({
      url: `/${group_name}/getByPage/${userid}`,
      method: 'post',
      data: page
    })
  },
  delete(id) { // 根据id删除
    return request({
      url: `/${group_name}/delete/${id}`,
      method: 'put',
      data: id
    })
  },
  saveenable(id, time) { // 保存To发布
    return request({
      url: `/${group_name}/saveTopush/${id}/${time}`,
      method: 'put'
    })
  },
  setRead(noticeId, userId) { // 设置为已读
    return request({
      url: `/${group_name}/changeRead/${noticeId}/${userId}`,
      method: 'post'
    })
  },
  getByPageTeacher(page) { // 分页查询
    return request({
      url: `/${group_name}/getByPageAdmin`,
      method: 'post',
      data: page
    })
  },
  update(data) { // 修改更新
    return request({
      url: `/${group_name}/update`,
      method: 'put',
      data: data
    })
  },
  getNoticeNum(userId) { // 获取教师发布通知数
    return request({
      url: `/${group_name}/getTeacherNoticeNum/${userId}`,
      method: 'get'
    })
  }
}
