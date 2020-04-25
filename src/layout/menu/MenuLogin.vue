<template>
  <div id="menu-item">
    <search-box />
    <a-divider type="vertical" />
    <a v-if="!isLogin" @click="showModal">登录</a>
    <a-divider v-if="!isLogin" type="vertical" />
    <a v-if="!isLogin" href="/register">注册</a>
    <span v-else>
      <login-box />
    </span>
    <a-modal v-model="visible" title="登录" :footer="null">
      <login />
    </a-modal>
  </div>
</template>

<script>
import Login from '@/views/register/login'
import SearchBox from './downBox/SearchBox'
import LoginBox from './downBox/LoginBox'
import { mapGetters } from 'vuex'

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
  computed: {
    ...mapGetters([
      'token'
    ])
  },
  methods: {
    showModal() {
      console.log()
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
