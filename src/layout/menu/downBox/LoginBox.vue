<template>
  <a-dropdown placement="bottomCenter">
    <a-badge :count="1"><a-avatar shape="square" icon="user" /></a-badge>
    <a-menu slot="overlay">
      <a-menu-item>
        <a href="#">个人主页</a>
      </a-menu-item>
      <a-menu-item>
        <a href="#">账号管理</a>
      </a-menu-item>
      <a-menu-item>
        <a @click="logout">退出登录</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import notification from 'ant-design-vue/lib/notification'

export default {
  name: 'LoginBox',
  methods: {
    logout(e) {
      e.preventDefault()
      this.$store.dispatch('user/logout').then(() => {
        location.assign('/')
      }).catch(() => {
        notification.error({
          message: '登出失败'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
