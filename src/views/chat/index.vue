<template>
    <div id="chat">
        <div id="chat-container">
            <chat-header/>
            <chat-list />
            <chat-send/>
        </div>
    </div>
</template>

<script>
    import chatHeader from './chat-header';
    import chatList from './chat-list';
    import chatSend from './chat-send';

    export default {
        components: {
            chatHeader,
            chatList,
            chatSend
        }
    }
</script>

<style scoped>
    * {
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
    }

    #chat {
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
        /*margin-top: 30px;*/
        height: calc(100% - 50px);
        max-height: 550px;
        border-radius: 25px;
        position: relative;
    }
</style>
