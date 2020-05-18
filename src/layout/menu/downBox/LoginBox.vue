<template>
  <a-dropdown placement="bottomCenter">
      <a-avatar
        shape="square"
        :src="userIcon"
        style="margin-bottom:5px;color: #f56a00; backgroundColor: #fde3cf"
      />
    <a-menu slot="overlay" :style="{marginTop:'5px'}">
      <a-menu-item>
        <a href="/userInfo">
          个人主页
        </a>
      </a-menu-item>
      <a-menu-item>
        <a href="/profile">账号管理</a>
      </a-menu-item>
      <a-menu-item>
        <a @click="logout">退出登录</a>
      </a-menu-item>
    </a-menu>
  </a-dropdown>
</template>

<script>
import notification from 'ant-design-vue/lib/notification'
import { mapGetters } from 'vuex'
export default {
  name: 'LoginBox',
  computed: {
    ...mapGetters([
      'name', 'userIcon'
    ])
  },
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
