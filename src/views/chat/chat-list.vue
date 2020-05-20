<template>
    <div id="chatList">
        <ul id="messageArea">
            <ChatItem v-for="(item ,index) in itemLists" :key="index" :item="item"/>
        </ul>
    </div>
</template>

<script>
    import ChatItem from './chat-item'
    export default {
        components: {
            ChatItem,
        },
        data() {
            return {
                itemLists: [{sender: 'kang', content: 'xxxxxx', type: 'CHAT'}, {
                    sender: 'long',
                    content: 'zzzz',
                    type: 'CHAT'
                }
                    , {sender: 'kang', content: 'xxxxxxx', type: 'CHAT'}, {
                        sender: 'long',
                        content: 'zzzz',
                        type: 'CHAT'
                    }],

            }
        },
        methods: {
            //添加内容
            addMessage(message) {
                this.itemLists.unshift(message)
            }

        },
        mounted() {
            let messageArea = document.querySelector('#messageArea');
            messageArea.scrollTop = messageArea.scrollHeight
        }


    }
</script>

<style scoped>
    #chatList {
        /*width: 660px;*/
        /*margin: 0px auto;*/
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
</style>
