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
  },
  getVideoCommentParentById(id) { // 查询视频评论
    return request({
      url: `/videoComment/getVideoCommentParentById/${id}`,
      method: 'get'
    })
  },
  setVideoComment(videoComment) { // 添加视频评论
    return request({
      url: `/videoComment/setVideoComment`,
      method: 'post',
      data: videoComment
    })
  },
  recommendVideo(id, type) { // 获取推荐视频
    return request({
      url: `/video/recommendVideo/${id}/${type}`,
      method: 'get'
    })
  }
}
