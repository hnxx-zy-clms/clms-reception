<template>
  <div class="good-message-container">
    <!-- 消息顶层操作 -->
    <div class="top-action">
      <span><a>清空所有消息</a></span>
      <span><a>确认所有消息</a></span>
    </div>
    <!-- 消息中间列表 -->
    <div class="message-list">
      <a-list item-layout="horizontal" :data-source="page.list">
        <a-list-item slot="renderItem" key="item.messageId" slot-scope="item">
          <div v-if="item.messageType === 3">
            <a-tag color="green">文章</a-tag>
            <a> {{ item.sendUser }} </a><span>{{ item.createdTime }}</span> 点赞了您的文章
            <router-link :to="'articleRead/'+item.messageContent">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 4">
            <a-tag color="red">评论</a-tag>
            <a> {{ item.sendUser }} </a><span>{{ item.createdTime }}</span> 点赞了您的评论
            <router-link :to="'articleRead/'+item.messageContent">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 5">
            <a-tag color="orange">提问</a-tag>
            <a> {{ item.sendUser }} </a><span>{{ item.createdTime }}</span> 点赞了您的提问
            <router-link :to="'questionInfo/'+item.messageContent">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 6">
            <a-tag color="purple">答复</a-tag>
            <a> {{ item.sendUser }} </a><span>{{ item.createdTime }}</span> 点赞了您的答复
            <router-link :to="'questionInfo/'+item.messageContent">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 7">
            <a-tag color="cyan">视频</a-tag>
            <a> {{ item.sendUser }} </a> <span>{{ item.createdTime }}</span>点赞了您的视频
            <router-link :to="'questionInfo/'+item.messageContent">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <a slot="actions">确认</a>
          <a slot="actions">删除</a>
        </a-list-item>
      </a-list>
    </div>
  </div>
</template>

<script>
import messageApi from '@/api/article/message'
export default {
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        totalPage: 0,
        params: {
          messageType: [3, 7],
          messageState: 0
        },
        sortColumn: 'createdTime',
        sortMethod: 'desc',
        list: []
      }
    }
  },
  created() {
    this.getByPage()
  },
  methods: {
    getByPage() {
      messageApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    }
  }
}
</script>

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
