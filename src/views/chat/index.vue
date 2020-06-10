<template>
  <div id="chatBox">
    <div v-if="user" id="chat-container">
      <div class="chat-header">
        <h2>聊天窗口</h2>
      </div>
      <div id="chatList">
        <ul id="messageArea">
          <ChatItem v-for="(message ,index) in messageList" :key="index" :message="message" />
        </ul>
      </div>
      <div class="form-group">
        <div class="input-group clearfix">
          <input
            v-model="content"
            type="text"
            class="form-control"
            placeholder="Type a message..."
            @keyup.enter="sendMessage"
          >
          <a-button type="primary" @click="sendMessage">
            发送
          </a-button>
        </div>
      </div>
    </div>
    <div v-else class="chat-login">
      <h4>请先进行账号登录！！</h4>
    </div>
  </div>
</template>

<script>
import ChatItem from './chat-item'
import SockJS from 'sockjs-client'
import Stomp from 'stompjs'
import { isLogin } from '../../api/user.js'
export default {
  components: {
    ChatItem
  },
  data() {
    return {
      messageList: [],
      user: this.$store.getters.name,
      stompClient: '',
      content: ''
    }
  },
  watch: {
    'messageList': function(newVal, oldVal) {
      setTimeout(function() {
        const messageArea = document.querySelector('#messageArea')
        messageArea.scrollTop = messageArea.scrollHeight
      }, 200)
    }
  },
  beforeDestroy: function() {
    this.disconnect()
  },
  // 初始化连接
  mounted() {
    if (this.user) {
      this.initWebSocket()
    } else {
      this.isLogin()
    }
  },
  methods: {
    isLogin() {
      isLogin().then(res => {
        console.log(res)
      })
    },
    getStompClient() {
      const socket = new SockJS('http://175.24.45.179:8081/zyb')
      // 获取STOMP子协议的客户端对象
      this.stompClient = Stomp.over(socket)
      return Stomp.over(socket)
    },
    initWebSocket() {
      // 建立连接对象
      const stompClient = this.getStompClient()
      stompClient.connect({}, () => {
        // 回调方法，如果消息到达订阅主题，则会调用该方法
        stompClient.subscribe('/topic/public', (msg) => {
          const chatMessage = JSON.parse(msg.body)
          this.messageListAdd(chatMessage)
        }, {})
        // 向/app/chat.addUser发送消息将该用户的名称告知服务器
        stompClient.send('/app/chat.addUser',
          {},
          JSON.stringify({ sender: this.user, type: 'JOIN', icon: this.$store.getters.userIcon })
        ) // 用户加入接口
      }, (err) => {
        // 连接发生错误时的处理函数
        const chatMessage = { sender: '', content: '连接聊天室出错，请重试！！', type: 'ERROR', createdTime: '' }
        this.messageListAdd(chatMessage)
      })
    },
    messageListAdd(message) {
      this.messageList.push(message)
    },
    sendMessage() {
      const content = this.content.trim()
      if (content) {
        const chatMessage = {
          sender: this.user,
          content: content,
          type: 'CHAT',
          icon: this.$store.getters.userIcon,
          createdTime: ''
        }
        this.stompClient.send('/app/chat.sendMessage', {}, JSON.stringify(chatMessage))
        this.content = ''
      } else {
        alert('发送的消息不能为空噢！！ 快捷发送，回车即可！！')
      }
    },
    // 断开连接
    disconnect() {
      this.stompClient.send('/app/chat.leftUser', {}, JSON.stringify({ sender: this.user, type: 'LEAVE' }))
      setTimeout(
        this.stompClient.disconnect(),
        1000
      )
    },
    getMessageArea() {
      return document.querySelector('#messageArea')
    }
  }

}
</script>

<style scoped>
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    #chatBox {
        position: relative;
        height: 900px;
        margin: 0;
        padding-top: 15px;
        background: url(../../assets/img/chat.jpg) no-repeat;
        background-size: 100% 100%;
        background-position: center;
    }

    #chat-container {
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
        /*background-color: #fff;*/
        background: url(../../assets/img/chat1.jpg) no-repeat;
        box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
        height: calc(100% - 50px);
        max-height: 550px;
        border-radius: 25px;
        position: relative;
    }

    .chat-login {
        margin: auto auto;
        color: red;
        height: 50px;
        width: 300px;

    }
    .chat-login h4{
        color: red;
    }

    /*头部样式*/
    .chat-header {
        width: 660px;
        margin: 0px auto;
        text-align: center;
        padding: 15px;
        border-bottom: 1px solid #ececec;
    }

    .chat-header h2 {
        margin: 0;
        font-weight: 500;
    }

    /*聊天界面样式*/
    #chatList {
        height: 400px;
    }

    #messageArea {
        list-style-type: none;
        /*background-color: #FFF;*/
        margin: 0;
        overflow: auto;
        overflow-y: scroll;
        padding: 0 20px 0px 20px;
        height: calc(100% - 30px);
    }

    /*    底部样式*/
    .form-group {
        margin-bottom: 15px;
    }

    .input-group input {
        margin-left: 20px;
        float: left;
        width: calc(100% - 120px);
    }

    .input-group button {
        float: left;
        width: 80px;
        height: 38px;
        margin-left: 5px;
    }

    .form-control {
        width: 100%;
        min-height: 35px;
        font-size: 15px;
        border: 1px solid #c8c8c8;
    }

    .primary {
        background-color: #128ff2;
        box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.12);
        color: #fff;
    }

    .clearfix:after {
        display: block;
        content: "";
        clear: both;
    }
</style>
