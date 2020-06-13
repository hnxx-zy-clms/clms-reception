<template>
  <div id="menu-item">
    <search-box />
    <a-divider type="vertical" />
    <a v-if="!isLogin" id="loginR" @click="showModal">登录</a>
    <a-divider v-if="!isLogin" type="vertical" />
    <a v-if="!isLogin" href="/register">注册</a>
    <span v-else>
      <a-badge :count="messageCount">
        <a href="/remind">
          <a-icon type="bell" :style="{color:'#fff',fontSize:'20px'}" />
        </a>
      </a-badge>
      <a-divider type="vertical" />
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
import messageApi from '@/api/article/message'
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
      isLogin: this.$store.getters.token !== undefined,
      messageCount: 0, // 消息计数
      messageList: []
    }
  },
  created() {
    this.getMessageList()
  },
  methods: {
    showModal() {
      this.visible = true
    },
    getMessageList() {
      messageApi.getList().then(res => {
        this.messageList = res.data
        this.messageList.forEach(element => {
          if (element.messageState === 0) {
            this.messageCount++
          }
        })
      })
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
