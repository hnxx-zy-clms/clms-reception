<template>
    <div id="chatBox">
        <div id="chat-container">
            <div class="chat-header">
                <h2>聊天窗口</h2>
            </div>
            <div id="chatList">
                <ul id="messageArea">
                    <ChatItem v-for="(message ,index) in messageList" :key="index" :message="message"/>
                </ul>
            </div>
            <div class="form-group">
                <div class="input-group clearfix">
                    <input v-model="content" @keyup.enter="sendMessage" type="text" class="form-control"
                           placeholder="Type a message...">
                    <button @click="sendMessage" type="button" class="primary">发送</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import ChatItem from './chat-item'
    import SockJS from "sockjs-client";
    import Stomp from "stompjs";

    export default {
        components: {
            ChatItem,
        },
        data() {
            return {
                messageList: [],
                user: this.$store.getters.name,
                stompClient: '',
                content: '',
            }
        },
        computed: {},
        methods: {
            getStompClient() {
                let socket = new SockJS('http://127.0.0.1:8081/zyb')
                // 获取STOMP子协议的客户端对象
                this.stompClient = Stomp.over(socket)
                return Stomp.over(socket)
            },
            currentUser() {
                console.log(this.user)
                console.log(this.headers)

            },
            initWebSocket() {
                // 建立连接对象
                let stompClient = this.getStompClient()
                stompClient.connect({}, () => {
                    // 回调方法，如果消息到达订阅主题，则会调用该方法
                    stompClient.subscribe('/topic/public', (msg) => {
                        let chatMessage = JSON.parse(msg.body);
                        this.messageListAdd(chatMessage)
                    }, {});
                    // 向/app/chat.addUser发送消息将该用户的名称告知服务器
                    stompClient.send("/app/chat.addUser",
                        {},
                        JSON.stringify({sender: this.user, type: 'JOIN'})
                    )  //用户加入接口
                }, (err) => {
                    // 连接发生错误时的处理函数
                    const chatMessage = {sender: '', content: '连接聊天室出错，请重试！！', type: 'ERROR', createdTime: ''}
                    this.messageListAdd(chatMessage)
                });
            },
            messageListAdd(message) {
                this.messageList.push(message)
            },
            sendMessage() {
                let content = this.content.trim()
                if (content) {
                    let chatMessage = {
                        sender: this.user,
                        content: content,
                        type: 'CHAT',
                        createdTime: ''
                    }
                    this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
                    this.content = ''
                } else {
                    alert("发送的消息不能为空！！")
                }
            },
            // 断开连接
            disconnect() {
                this.stompClient.send("/app/chat.leftUser", {}, JSON.stringify({sender: this.user, type: 'LEAVE'}));
                setTimeout(
                    this.stompClient.disconnect(),
                    1000
                )

            }
        },
        beforeDestroy: function () {
            this.disconnect()
            // 页面离开时断开连接,清除定时器
            // clearInterval(this.timer);
        },
        // 初始化连接
        mounted() {
            this.currentUser();
            this.initWebSocket();
            let messageArea = document.querySelector('#messageArea');
            messageArea.scrollTop = messageArea.scrollHeight;
        },
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
        background: url(../../assets/img/background.png) no-repeat;
        background-size: 100% 100%;
        /*background-position: center;*/
    }

    #chat-container {
        max-width: 900px;
        margin-left: auto;
        margin-right: auto;
        background-color: #fff;
        box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
        height: calc(100% - 50px);
        max-height: 550px;
        border-radius: 25px;
        position: relative;
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
        background-color: #FFF;
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
