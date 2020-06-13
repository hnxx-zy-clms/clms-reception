<template>
    <div id="chatBox">

        <div id="chat-container" v-if="user">
<!--            用户列表-->
            <div style="width:10%;float:left;height:100%;margin: 10px 0px 10px 20px; ">
                <div>
                    <h3 :style="{ margin: '16px 0' }">
                      在线用户列表 {{userList.length}}
                    </h3>
                    <a-list size="small" bordered :data-source="userList" style="height:80%;overflow: auto;">
                        <a-list-item slot="renderItem" slot-scope="item"  id="userElement" >
                            <div   style=" text-align: center;width: 100% ;height: 100%;">{{ item }}</div>
                        </a-list-item>
                    </a-list>
                </div>
            </div>
<!--            聊天界面-->
            <div  style="height: 100% ;float: left  ; width: 80%;  background-color: rgb(167,205,214);" >
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
                        <a-button type="primary" @click="sendMessage">
                            发送
                        </a-button>

<!--                       聊天记录-->
                            <a-button type="primary" @click="clickShowModal" >
                                聊天记录
                            </a-button>
                            <a-modal v-model="visible" title="聊天记录" @ok="handleOk">
                                <ul style=" list-style-type: none;margin: 0; overflow: auto;overflow-y: scroll;padding: 0 20px 0px 20px;height: 600px;" >
                                    <ChatItem v-for="(message ,index) in this.messageRecordList" :key="index" :message="message"/>
                                </ul>
                            </a-modal>

                    </div>
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
    import SockJS from "sockjs-client";
    import Stomp from "stompjs";
    import {isLogin} from '../../api/user.js';

    export default {
        components: {
            ChatItem,
        },
        data() {
            return {
                userList:[],
                messageList: [],
                messageRecordList: [],
                user: this.$store.getters.name,
                roles: this.$store.getters.roles,
                stompClient: '',
                content: '',
                visible: false,
            }
        },
        methods: {
            isLogin() {
                isLogin().then(res => {
                    console.log(res)
                })
            },
            getCurentUser() {
                this.$http.get('http://175.24.45.179:8081/chat/chatUser' ).then(res => {
                    console.log(res.data)
                    this.userList = res.data
                }).catch(e=>{
                    console.log(e)
                })
            },
            getMessageRecordList() {
                let type='';
                if(this.roles===0){
                        type=1
                }else if(this.roles===1 || this.roles===2){
                        type=2
                }else if(this.roles===3){
                    type=3
                }
                this.$http.get('http://175.24.45.179/chat/chatMessage/'+type).then(res => {
                    console.log(res.data)
                    this.messageRecordList = res.data
                }).catch(e=>{
                    console.log(e)
                })
            },
            getStompClient() {
                // let socket = new SockJS('http://127.0.0.1:8081/zyb')
                let socket = new SockJS('http://175.24.45.179:8081/zyb')
                // 获取STOMP子协议的客户端对象
                this.stompClient = Stomp.over(socket)
                return Stomp.over(socket)
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
                        JSON.stringify({sender: this.user, type: 'JOIN', icon: this.$store.getters.userIcon})
                    )  //用户加入接口
                }, (err) => {
                    // 连接发生错误时的处理函数
                    const chatMessage = {sender: '', content: '连接聊天室出错，请重试！！', type: 'ERROR', createdTime: ''}
                    this.messageListAdd(chatMessage)
                });
            },
            messageListAdd(message) {
                let index=this.userList.indexOf(message.sender);
                if(message.type==='JOIN' && index===-1){
                   this.userList.push(message.sender)
                }
                 if(message.type==='LEAVE'&& index!=-1){
                   this.userList.splice(index,1)
                }
                this.messageList.push(message)
            },
            sendMessage() {
                let content = this.content.trim()
                if (content) {
                    let chatMessage = {
                        sender: this.user,
                        content: content,
                        type: 'CHAT',
                        icon: this.$store.getters.userIcon,
                        createdTime: ''
                    }
                    this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(chatMessage));
                    this.content = ''
                } else {
                    alert("发送的消息不能为空噢！！ 快捷发送，回车即可！！")
                }
            },
            // 断开连接
            disconnect() {
                this.stompClient.send("/app/chat.leftUser", {}, JSON.stringify({sender: this.user, type: 'LEAVE'}));
                setTimeout(
                    this.stompClient.disconnect(),
                    1000
                )
            },
            clickShowModal(){
                this.getMessageRecordList()
                this.showModal()
            },
            showModal() {
                this.visible = true;
            },
            handleOk(e) {
                this.visible = false;
            },

        },
        watch: {
            'messageList': function (newVal, oldVal) {
                setTimeout(function () {
                    let messageArea = document.querySelector('#messageArea');
                    messageArea.scrollTop = messageArea.scrollHeight;
                }, 200)
            },
        },
        beforeDestroy: function () {
            this.disconnect()
        },
        // 初始化连接
        mounted() {
            if (this.user) {
                this.initWebSocket();
                this.getCurentUser();
            } else {
                this.isLogin()
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
        margin: auto;
        padding-top: 15px;
        background: url(../../assets/img/chat.jpg) no-repeat;
        background-size: 100% 100%;
        background-position: center;
    }
    #userElement:hover{
        background-color: #fde3cf;
    }

    #chat-container {
        max-width: 80%;
        margin-left: auto;
        margin-right: auto;
        margin-top: 40px;
        background-color: rgb(163,205,200);
        box-shadow: 0 1px 11px rgba(0, 0, 0, 0.27);
        height: 100%;
        max-height: 80%;
        border-radius: 25px;
        position: relative;
    }

    .chat-login {
        margin: auto auto;
        color: red;
        height: 50px;
        width: 300px;
    }

    .chat-login h4 {
        color: red;
    }

    /*头部样式*/
    .chat-header {
        width: 100%;
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
        background-color: rgb(167,205,214);
        margin-top: 20px;
        margin-bottom: 10px;
        height: 80%;
        border-bottom: 1px solid #ececec;
    }

    #messageArea {
        list-style-type: none;
        margin: 0;
        overflow: auto;
        overflow-y: scroll;
        padding: 0 20px 0px 20px;
        height: 90%;
    }

    /*    底部样式*/
    .form-group {
        margin-bottom: 5px;
        height: 10%;
    }

    .input-group input {
        margin-left: 20px;
        height: 40px;
        width: 70%;
    }

    .input-group button {
        margin-left: 20px;
        width: 10%;
        height: 40px;
    }

    .form-control {
        width: 100%;
        min-height: 35px;
        font-size: 15px;
        border: 1px solid #c8c8c8;
    }

    .clearfix:after {
        display: block;
        content: "";
        clear: both;
    }
</style>
