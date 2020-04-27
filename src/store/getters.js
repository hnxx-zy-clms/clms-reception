const getters = {
  token: state => state.user.token,
  name: state => state.user.name,
  roles: state => state.user.roles,
  userId: state => state.user.userId
}
export default getters
