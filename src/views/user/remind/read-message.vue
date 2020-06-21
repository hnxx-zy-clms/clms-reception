<template>
  <div class="good-message-container">
    <!-- 消息顶层操作 -->
    <div class="top-action" />
    <!-- 消息中间列表 -->
    <div class="message-list">
      <a-list item-layout="horizontal" />
    </div>
  </div>
</template>

<style scoped>
    .good-message-container {
        margin-top: 24px;
        margin-right: 24px;
        min-height: 830px;
    }
    .top-action {
        width: 100%;
        height: 60px;
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
    }
    .top-action span{
        margin-left: 20px;
        margin-right: 6px;
    }
    .message-list {
        padding: 0 0 0 15px;
    }
</style>
