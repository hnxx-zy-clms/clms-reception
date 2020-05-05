<template>
  <div id="menu-item">
    <search-box />
    <a-divider type="vertical" />
    <a v-if="!isLogin" @click="showModal" id="loginR">登录</a>
    <a-divider v-if="!isLogin" type="vertical" />
    <a v-if="!isLogin" href="/register">注册</a>
    <span v-else>
      <login-box />
    </span>
    <a-modal v-model="visible" title="登录" :footer="null">
      <login />
      Or <a href="/register">去注册</a>
    </a-modal>
  </div>
</template>

<script>
import Login from '@/views/register/login'
import SearchBox from './downBox/SearchBox'
import LoginBox from './downBox/LoginBox'

export default {
  name: 'MenuLogin',
  components: {
    LoginBox,
    SearchBox,
    Login
  },
  data() {
    return {
      visible: false,
      isLogin: this.$store.getters.token !== undefined
    }
  },
  methods: {
    showModal() {
      this.visible = true
    }
  }
}
</script>

<style scoped>
    #menu-item{
        float: right;
    }
    #menu-item span {
      margin-bottom: 5px;
    }
</style>
