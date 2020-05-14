const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userId: state => state.user.userId,
  routers: state => state.settings.routers,
  addRouters: state => state.settings.addRouters,
  userIcon: state => state.user.userIcon
}
export default getters
