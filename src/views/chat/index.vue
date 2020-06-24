<template>
  <div class="chat-box" style="background-color: #6e6e6e;width:100%;height: 1300px">
    <div v-if="user" style="width:1100px;height: 700px ;margin: auto auto; background-color:rgb(250,250,250) ">
      <div class="chat-user" style="width:20%;height: 100% ;float: left">
        <div class="chat-user-self" style="backgroundColor:rgb(255,72,67);height: 15%;width: 100%">
          <div style="width: 20%;float: left;margin: 10px 20px 10px 10px">
            <a-avatar
              shape="circle"
              :src="userIcon"
              style="color: #f56a00; backgroundColor: #fde3cf;height: 42px;width: 42px;"
            />
          </div>
          <div style="width:60%;float: left;margin-top:15px;"><h2>{{ user }}</h2></div>
          <div>
            <h3>
              在线用户列表 <span style="color:#108ee9">{{ userList.length }}</span>
            </h3>
          </div>
        </div>
        <div class="chat-user-info" style=" overflow: auto;overflow-y: scroll;height: 85%">

          <div
            id="manyChatInit"
            style=" padding:10px; text-align: center;width: 100% ;height: 40px;"
            class="userElement"
            @click="manyChatInit()"
          >多人聊天
          </div>
          <div
            v-for="(item ,index) in userList"
            v-if="user!==item"
            :id="item"
            class="userElement"
            style="padding:5px;margin-bottom: 5px; text-align: center;width: 100% ;height: 30px;"
            @click="pointToPointChatInit(item)"
          >
            {{ item }}
          </div>
        </div>
      </div>
      <div v-if="manyChat" class="chat-message" style="float: left;height: 100%; width:80%;">
        <div class="chat-message-top" style="height: 10%">
          <div style=" padding:10px; text-align: center;width: 100%;">
            <h2>多人聊天室</h2>
            <hr>
          </div>
        </div>
        <div class="chat-message-info" style="height: 70%">
          <ul class="messageArea">
            <ChatItem v-for="(message ,index) in messageList" :key="index" :message="message" />
          </ul>
          <hr>
        </div>
        <div class="chat-message-send" style="height: 20%">
          <div style="float: left;width:80%;margin:0px 10px 0px 10px ">
            <textarea
              v-model="content"
              type="textarea"
              class="send-control"
              placeholder="Type a message..."
              @keyup.enter="sendMessage"
            />
          </div>
          <div style="float: left;width: 10%;margin: 5px 0px 5px 10px">
            <a-button type="primary" style="width: 100px" @click="sendMessage">
              发送
            </a-button>
          </div>
          <!--                       聊天记录-->
          <div style="float: left;width: 10%; margin: 5px 0px 5px 10px">
            <a-button type="primary" style="width: 100px" @click="clickShowModal">
              聊天记录
            </a-button>
          </div>
          <a-modal v-model="visible" title="聊天记录" @ok="handleOk">
            <ul style=" list-style-type: none;margin: 0; overflow: auto;overflow-y: scroll;padding: 0 20px 0px 20px;height: 600px;">
              <ChatItem
                v-for="(message ,index) in messageRecordList"
                :key="index"
                :message="message"
              />
            </ul>
          </a-modal>
        </div>
      </div>
      <div v-if="pointChat" class="chat-message" style="float: left;height: 100%; width:80%;">
        <div class="chat-message-top" style="height: 10%">
          <div style=" padding:10px; text-align: center;width: 100%;">
            <h2>{{ pointUser }}</h2>
            <hr>
          </div>
        </div>
        <div class="chat-message-info" style="height: 70%">
          <ul class="messageArea">
            <ChatItem v-for="(message ,index) in oneToOneMessage" :key="index" :message="message" />
          </ul>
          <hr>
        </div>
        <div class="chat-message-send">
          <div style="float: left;width:80%;margin:0px 10px 0px 10px ">
            <textarea
              v-model="content"
              type="textarea"
              class="send-control"
              placeholder="Type a message..."
              @keyup.enter="sendPointMessage(pointUser)"
            />
          </div>
          <div style="float: left;width: 10%;margin: 5px 0px 5px 10px">
            <a-button type="primary" style="width: 100px" @click="sendPointMessage(pointUser)">
              发送
            </a-button>
          </div>
        </div>
      </div>
    </div>
    <div
      v-else
      class="chat-login"
      style="width:1100px;height: 700px ;margin: auto ;background-color:rgb(250,250,250);text-align: center; "
    >
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
      userList: [],
      messageList: [],
      messageRecordList: [],
      oneToOneMessageList: [],
      oneToOneMessage: [],
      user: this.$store.getters.name,
      roles: this.$store.getters.roles,
      userIcon: this.$store.getters.userIcon,
      manyChat: true,
      pointChat: false,
      pointUser: '',
      stompClient: '',
      content: '',
      visible: false,
      // url: 'http://175.24.45.179:8081'
      url: process.env.VUE_APP_CHAT_URL
    }
  },
  watch: {
    'messageList': function(newVal, oldVal) {
      setTimeout(function() {
        const messageArea = document.querySelector('.messageArea')
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
      this.getCurentUser()
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
    getCurentUser() {
      this.$http.get(this.url + '/chat/chatUser').then(res => {
        console.log(res.data)
        this.userList = res.data
      }).catch(e => {
        console.log(e)
      })
    },
    manyChatInit() {
      this.manyChat = true
      this.pointChat = false
      document.querySelector('#manyChatInit').style.backgroundColor = ''
    },
    pointToPointChatInit(item) {
      this.manyChat = false
      this.pointChat = true
      this.pointUser = item
      document.querySelector('#' + item).style.backgroundColor = ''
      this.oneToOneMessage = this.oneToOneMessageList.filter(e => {
        return (e.sender === this.user && e.receiver === item) || (e.sender === item && e.receiver === this.user)
      })
    },
    getMessageRecordList() {
      let type = 1
      if (this.roles === 0) {
        type = 1
      } else if (this.roles === 1 || this.roles === 2) {
        type = 2
      } else if (this.roles === 3) {
        type = 3
      }
      this.$http.get(this.url + '/chat/chatMessage/' + type).then(res => {
        console.log(res.data)
        this.messageRecordList = res.data
      }).catch(e => {
        console.log(e)
      })
    },
    getStompClient() {
      const socket = new SockJS(this.url + '/zyb')
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
          if (chatMessage.sender !== this.user) {
            document.querySelector('#manyChatInit').style.backgroundColor = 'rgb(255,156,0)'
          }
        }, {})
        // 回调方法，如果消息到达订阅一对一主题，则会调用该方法
        stompClient.subscribe('/chat/point/' + this.user, (msg) => {
          const chatMessage = JSON.parse(msg.body)
          if (this.userList.indexOf(chatMessage.sender) != -1) {
            this.oneToOneMessageList.push(chatMessage)
            this.oneToOneMessage.push(chatMessage)
            document.querySelector('#' + chatMessage.sender).style.backgroundColor = 'rgb(255,156,0)'
          }
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
      const index = this.userList.indexOf(message.sender)
      if (message.type === 'JOIN' && index === -1) {
        this.userList.push(message.sender)
      }
      if (message.type === 'LEAVE' && index != -1) {
        this.userList.splice(index, 1)
      }
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
    sendPointMessage(pointUser) {
      const content = this.content.trim()
      if (content) {
        const chatMessage = {
          sender: this.user,
          receiver: pointUser,
          content: content,
          type: 'CHAT',
          icon: this.$store.getters.userIcon,
          createdTime: ''
        }
        this.stompClient.send('/app/chat.oneToOne', {}, JSON.stringify(chatMessage))
        this.content = ''
        this.oneToOneMessageList.push(chatMessage)
        this.oneToOneMessage.push(chatMessage)
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
    clickShowModal() {
      this.getMessageRecordList()
      this.showModal()
    },
    showModal() {
      this.visible = true
    },
    handleOk(e) {
      this.visible = false
    }

  }

}
</script>

<style scoped>
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
    }

    #chatBox {
        position: relative;
        height: 900px;
        margin: auto;
        padding-top: 15px;
        background: url(../../assets/img/chat.jpg) no-repeat;
        background-size: 100% 100%;
        background-position: center;
    }

    .userElement:hover {
        background-color: #fde3cf;
    }

    .chat-login h4 {
        color: red;
    }

    /*头部样式*/

    /*聊天界面样式*/

    .messageArea {
        list-style-type: none;
        overflow: auto;
        overflow-y: scroll;
        padding: 0px 20px 0px 20px;
        height: 99%;
    }

    /*    底部样式*/

    .send-control {
        width: 100%;
        height: 100px;
        min-height: 35px;
        font-size: 15px;
        border: 1px solid #c8c8c8;
    }

</style>
