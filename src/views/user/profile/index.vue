<template>
  <div>
    <h1>账号管理</h1>
    <p>用户名: {{ name }}</p>
    <p>用户ID: {{ userId }}</p>
    <p>角色: {{ roles }}</p>
    <p>令牌: {{ token }}</p>
    <p>角色拥有路由: {{ addRouters }}</p>
    <p>所有路由: {{ routers }}</p>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {

  name: 'Index',
  computed: {
    ...mapGetters([
      'token',
      'name',
      'roles',
      'userId',
      'routers',
      'addRouters'
    ])
  }
}
</script>

<style scoped>

</style>
