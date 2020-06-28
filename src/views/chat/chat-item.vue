<template>
    <li class="chat-message" v-if="message.type==='CHAT'">
        <div v-if="user===message.sender">
            <a-avatar
                    shape="circle"
                    :src="message.icon"
                    style="color: #f56a00; backgroundColor: #fde3cf;height: 42px;width: 42px;float: left;"
            />
            <div style="">
                <span>   {{message.sender}}</span>
                <p> {{message.content}}</p>
            </div>
        </div>
        <div class="mesage" v-else>
            <a-avatar
                    @click="addUser(message.sender)"
                    shape="circle"
                    :src="message.icon"
                    style="color: #f56a00; backgroundColor: #fde3cf;height: 42px;width: 42px;float: right;"
            />
            <div>
                <span>   {{message.sender}}</span>
                <p> {{message.content}}</p>
            </div>
        </div>

    </li>
    <li class="event-message-join" v-else-if="message.type==='JOIN'">
        <span>欢迎 {{message.sender}}  进入聊天室 {{ this.getTime()}}</span>
    </li>
    <li class="event-message-leave" v-else-if="message.type==='LEAVE'">
        <span>{{message.sender}} 离开聊天室</span>
    </li>
    <li class="event-message-error" v-else="item.type==='ERROR'">
        <span>{{message.sender}}</span>
        <span>     {{message.content}}</span>
    </li>
</template>

<script>
  export default {
    props: {
      message: Object

    },
    data() {
      return {
        user: this.$store.getters.name
      }
    },
    methods: {
      addUser(name) {
        this.$parent.addUserList(name)
      },
      getTime(dataStart) {
        let d = ''
        if (dataStart) {
          d = new Date(dataStart)
        } else {
          d = new Date()
        }
        let m = (d.getMonth() + 1).toString().padStart(2, '0') // 月份
        let r = d.getDate().toString().padStart(2, '0') // 日子
        let h = d.getHours().toString().padStart(2, '0') // 小时
        let mm = d.getMinutes().toString().padStart(2, '0') // 分钟
        let ss = d.getSeconds().toString().padStart(2, '0') // 秒
        return `${m}-${r}  ${h}:${mm}:${ss}`
      }
    }
  }
</script>

<style scoped>
    .event-message-join {
        width: 100%;
        text-align: center;
        clear: both;
        color: #108ee9;
    }

    .event-message-leave {
        width: 100%;
        text-align: center;
        clear: both;
        color: #878d99;
    }

    .event-message-error {
        width: 100%;
        text-align: center;
        clear: both;
        color: red;
    }

    .chat-message {
        line-height: 1.5rem;
        margin: 0;
        position: relative;
        padding-bottom: 10px;
    }

    .mesage {
        text-align: right;
    }

    .chat-message div span {
        color: #333;
        font-weight: 600;
    }

    .chat-message div p {
        margin: 0;
        color: #43464b;
    }


</style>
