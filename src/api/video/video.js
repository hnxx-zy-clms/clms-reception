import request from '@/utils/request'
const group_name = 'video'

export default {
  getVideo(id) { // 前台用户根据ID查询
    return request({
      url: `/${group_name}/getVideo/${id}`,
      method: 'get'
    })
  },
  getVideoCommentById(page) { // 查询视频评论
    return request({
      url: `/videoComment/getVideoCommentById`,
      method: 'post',
      data: page
    })
  }
}
