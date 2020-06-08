import request from '@/utils/request'
var group_name = 'search'
export default {
  baseSearch(searchPage) { // 基础高亮搜索
    return request({
      url: `/${group_name}/baseSearch`,
      method: 'post',
      data: searchPage
    })
  },
  searchHighlightWithFields(searchPage) { // 复杂多字段高亮搜索
    return request({
      url: `/${group_name}/searchHighlightWithFields`,
      method: 'post',
      data: searchPage
    })
  }
}
