<template>
    <div class="form-group">
        <div class="input-group clearfix">
            <input v-model="content" @keyup.enter="sendMessage" type="text" id="message" class="form-control" placeholder="Type a message..." >
            <button @click="sendMessage" type="button" class="primary">发送</button>
        </div>
    </div>
</template>

<script>
    // import  chatList from './chat-list'
    export default {
        data() {
            return {
                    sender:'xxxxx',
                    content: '',
                    type:'CHAT',
            }
        },
        methods: {
            sendMessage() {

                 let content = this.content.trim()
                alert(content)

                // if(!content){
                // alert('输入的聊天内容不能为空！！！')
                //     return
                // }
                // const  message={
                //     sender,
                //     content,
                //     type
                // }
                // chatList.sendMessage(message)
                // this.content=''
            }
        }
    }
</script>

<style scoped>
    .form-group {
        margin-bottom: 15px;
        /*width: 660px;*/
        /*margin: 0px auto;*/
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
