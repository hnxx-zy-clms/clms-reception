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
      temp: {},
      visible: false,
      isLogin: this.$store.getters.token !== undefined,
      userName: '',
      messageCount: 0, // 消息计数
      // 开发环境客户端地址
      // websocketUrlDev: 'ws://localhost:8080/push/websocket',
      // 生产环境客户端地址
      // websocketUrlProd: 'ws://175.24.45.179:8080/push/websocket',
      messageList: []
    }
  },
  watch: {
    '$store.getters.messageCount': function() {
      this.messageCount = this.$store.getters.messageCount
    }
  },
  created() {
    this.userName = this.$store.getters.userName
    if (this.$store.getters.token) {
      this.getMessageList()
    }
  },
  mounted() {
    // WebSocket
    if ('WebSocket' in window) {
      this.websocket = new WebSocket(process.env.VUE_APP_WEBSOCKET_URL)
      // alert('连接浏览器')
      this.initWebSocket()
    } else {
      alert('当前浏览器 不支持')
    }
  },
  beforeDestroy() {
    this.onbeforeunload()
  },
  methods: {
    initWebSocket() {
      // 连接错误
      this.websocket.onerror = this.setErrorMessage

      // 连接成功
      this.websocket.onopen = this.setOnopenMessage

      // 收到消息的回调
      this.websocket.onmessage = this.setOnmessageMessage

      // 连接关闭的回调
      this.websocket.onclose = this.setOncloseMessage

      // 监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
      window.onbeforeunload = this.onbeforeunload
    },
    setErrorMessage() {
      console.log('WebSocket连接发生错误   状态码：' + this.websocket.readyState)
    },
    setOnopenMessage() {
      console.log('WebSocket连接成功    状态码：' + this.websocket.readyState)
    },
    setOnmessageMessage(event) {
      // 根据服务器推送的消息做自己的业务处理
      console.log('服务端返回：' + event.data)
      this.temp = JSON.parse(event.data)
      if (this.temp.receiveUser === this.$store.getters.userName) {
        this.messageCount++
        this.$store.commit('global/SET_MESSAGE_COUNT', this.messageCount)
      }
      if (this.temp.sendUser !== this.$store.getters.userName) {
        switch (this.temp.messageType) {
          case 1:
            this.$message({
              customClass: 'message-model',
              message: `${this.temp.sendUser} 评论了 ${this.temp.receiveUser} 的文章 ${this.temp.messageDesc}`,
              type: 'success'
            })
            break
          case 2:
            this.$message({
              customClass: 'message-model',
              message: `${this.temp.sendUser} 回复了 ${this.temp.receiveUser} 的评论 ${this.temp.messageDesc}`,
              type: 'success'
            })
            break
          case 3:
            this.$message({
              customClass: 'message-model',
              message: `${this.temp.sendUser} 点赞了 ${this.temp.receiveUser} 的文章 ${this.temp.messageDesc}`,
              type: 'success'
            })
            break
          case 4:
            this.$message({
              customClass: 'message-model',
              message: `${this.temp.sendUser} 点赞了 ${this.temp.receiveUser} 的评论 ${this.temp.messageDesc}`,
              type: 'success'
            })
            break
          case 5:
            this.$message({
              customClass: 'message-model',
              message: `${this.temp.sendUser} 点赞了 ${this.temp.receiveUser} 的提问 ${this.temp.messageDesc}`,
              type: 'success'
            })
            break
          case 6:
            this.$message({
              customClass: 'message-model',
              message: `${this.temp.sendUser} 点赞了 ${this.temp.receiveUser} 的答复 ${this.temp.messageDesc}`,
              type: 'success'
            })
            break
          case 7:
            break
          case 8:
            this.$message({
              customClass: 'message-model',
              message: `${this.temp.sendUser} 收藏了 ${this.temp.receiveUser} 的文章 ${this.temp.messageDesc}`,
              type: 'success'
            })
            break
          case 9:
            this.$message({
              customClass: 'message-model',
              message: `${this.temp.sendUser} 收藏了 ${this.temp.receiveUser} 的提问 ${this.temp.messageDesc}`,
              type: 'success'
            })
            break
          case 10:
            this.$message({
              customClass: 'message-model',
              message: `${this.temp.sendUser} 收藏了 ${this.temp.receiveUser} 的答复 ${this.temp.messageDesc}`,
              type: 'success'
            })
            break
          case 12:
            this.$message({
              customClass: 'message-model',
              message: `${this.temp.sendUser} 批阅了 ${this.temp.receiveUser} 的报告 ${this.temp.messageDesc}`,
              type: 'success'
            })
            break
          case 13:
            this.$message({
              customClass: 'message-model',
              message: `${this.temp.sendUser} 答复了 ${this.temp.receiveUser} 的提问 ${this.temp.messageDesc}`,
              type: 'success'
            })
            break
          default:
            this.$message({
              customClass: 'message-model',
              message: `${this.temp.sendUser} 评论了 ${this.temp.receiveUser} 的文章 ${this.temp.messageDesc}`,
              type: 'success'
            })
        }
      }
    },
    setOncloseMessage() {
      console.log('WebSocket连接关闭    状态码：' + this.websocket.readyState)
    },
    onbeforeunload() {
      this.closeWebSocket()
    },
    closeWebSocket() {
      this.websocket.close()
    },
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
        this.$store.commit('global/SET_MESSAGE_COUNT', this.messageCount)
      })
    }
  }
}
</script>

<style scoped>
    .message-model {
      width: 1000px !important;
      overflow: hidden;
    }

    #menu-item{
        float: right;
    }
    #menu-item span {
      margin-bottom: 5px;
    }
</style>
