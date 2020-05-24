<template>
    <li class="chat-message" v-if="message.type==='CHAT'">
        <i :style="{backgroundColor:rgbColor}">{{message.sender[0]}}</i>
        <span>{{message.sender}}</span>
        <p>{{message.content}}</p>
        <!-- <a-avatar
                 shape="square"
                 :src="userIcon"
                 style="color: #f56a00; backgroundColor: #fde3cf;height: 42px;width: 42px"
         />
         <span>   {{message.sender}}</span>
         <span>   {{message.content}}</span>-->
    </li>
    <li class="event-message-join" v-else-if="message.type==='JOIN'">
        <span>欢迎 {{message.sender}}  进入聊天室</span>
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
                colors: [
                    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
                    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
                ],
                rgbColor: '#2196F3',
                // userIcon: this.$store.getters.userIcon,
            }
        },
        methods: {
            getAvatarColor() {
                let messageSender = message.sender
                console.log(this.rgbColor)
                let hash = 0;
                for (let i = 0; i < messageSender.length; i++) {
                    hash = 31 * hash + messageSender.charCodeAt(i);
                }
                let index = Math.abs(hash % this.colors.length);
                return index

            }
        },
        mounted() {
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
        padding: 10px 20px;
        margin: 0;
        border-bottom: 1px solid #f4f4f4;
        padding-left: 68px;
        position: relative;
    }


    .chat-message i {
        position: absolute;
        width: 42px;
        height: 42px;
        overflow: hidden;
        left: 10px;
        display: inline-block;
        vertical-align: middle;
        font-size: 18px;
        line-height: 42px;
        color: #fff;
        text-align: center;
        border-radius: 50%;
        font-style: normal;
        text-transform: uppercase;
    }

    .chat-message span {
        color: #333;
        font-weight: 600;
    }

    .chat-message p {
        margin: 0;
        color: #43464b;
    }


</style>
