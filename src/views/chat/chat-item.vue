<template>
    <li class="chat-message">
        <i :style="{backgroundColor:rgbColor}">{{item.sender[0]}}</i>
        <span>{{item.sender}}</span>
        <p>{{item.content}}</p>
    </li>
</template>

<script>
    export default {
        props: {
            item: {
                type: Object,
                default: null
            },
        },
        data() {
            return {
                colors: [
                    '#2196F3', '#32c787', '#00BCD4', '#ff5652',
                    '#ffc107', '#ff85af', '#FF9800', '#39bbb0'
                ],
                rgbColor: '#ff85af'
            }
        },
        methods: {
            getAvatarColor(messageSender) {
                var hash = 0;
                for (var i = 0; i < messageSender.length; i++) {
                    hash = 31 * hash + messageSender.charCodeAt(i);
                }

                var index = Math.abs(hash % this.colors.length);
                rgbColor = this.colors[index];
            }
        },
        mounted() {

        }


    }
</script>

<style scoped>
    .event-message {
        width: 100%;
        text-align: center;
        clear: both;
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
