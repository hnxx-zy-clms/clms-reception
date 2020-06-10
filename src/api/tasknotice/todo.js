import request from '@/utils/request'
var group_name = 'todo'

export default {
  getTodoByIdAndTime(userid, time) { // 获取待办
    return request({
      url: `/${group_name}/getTodoByIdAndTime/${userid}/${time}`,
      method: 'get'
    })
  },
  deleteTodo(todoId) { // 删除待办
    return request({
      url: `/${group_name}/deleteTodo/${todoId}`,
      method: 'delete'
    })
  },
  addTodo(todo) {
    return request({
      url: `/${group_name}/saveTodo`,
      method: 'post',
      data: todo
    })
  },
  setDid(comId) {
    return request({
      url: `/${group_name}/setIsDo/${comId}`,
      method: 'put'
    })
  }
}
