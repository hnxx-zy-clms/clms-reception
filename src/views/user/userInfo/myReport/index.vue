<template>
  <div class="good-message-container">
    <!-- 消息中间列表 -->
    <div class="message-list">
      <a-list item-layout="horizontal" :data-source="page.list">
        <a-list-item slot="renderItem" key="item.messageId" slot-scope="item">
          <div v-if="item.messageType === 1">
            <a-tag color="red">评论</a-tag>
            <span>{{ item.createdTime }}</span> 评论了{{ item.receiveUser }}的文章
            <router-link :to="'articleRead/'+item.messageContent" @click.native="confirmMessageById(item.messageId)">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 2">
            <a-tag color="yellow">回复</a-tag>
            <span>{{ item.createdTime }}</span> 回复了{{ item.receiveUser }}的评论
            <router-link :to="'articleRead/'+item.messageContent" @click.native="confirmMessageById(item.messageId)">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 3">
            <a-tag color="blue">点赞</a-tag>
            <span>{{ item.createdTime }}</span> 点赞了{{ item.receiveUser }}的文章
            <router-link :to="'articleRead/'+item.messageContent" @click.native="confirmMessageById(item.messageId)">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 4">
            <a-tag color="blue">点赞</a-tag>
            <span>{{ item.createdTime }}</span> 点赞了{{ item.receiveUser }}的评论
            <router-link :to="'articleRead/'+item.messageContent" @click.native="confirmMessageById(item.messageId)">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 5">
            <a-tag color="blue">点赞</a-tag>
            <span>{{ item.createdTime }}</span> 点赞了{{ item.receiveUser }}的提问
            <router-link :to="'questionInfo/'+item.messageContent" @click.native="confirmMessageById(item.messageId)">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 6">
            <a-tag color="blue">点赞</a-tag>
            <span>{{ item.createdTime }}</span> 点赞了{{ item.receiveUser }}的答复
            <router-link :to="'questionInfo/'+item.messageContent" @click.native="confirmMessageById(item.messageId)">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 7">
            <a-tag color="blue">点赞</a-tag>
            <span>{{ item.createdTime }}</span>点赞了{{ item.receiveUser }}的视频
            <router-link :to="'questionInfo/'+item.messageContent" @click.native="confirmMessageById(item.messageId)">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 8">
            <a-tag color="cyan">收藏</a-tag>
            <span>{{ item.createdTime }}</span>收藏了{{ item.receiveUser }}的文章
            <router-link :to="'questionInfo/'+item.messageContent" @click.native="confirmMessageById(item.messageId)">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 9">
            <a-tag color="cyan">收藏</a-tag>
            <span>{{ item.createdTime }}</span>收藏了{{ item.receiveUser }}的提问
            <router-link :to="'questionInfo/'+item.messageContent" @click.native="confirmMessageById(item.messageId)">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 10">
            <a-tag color="cyan">收藏</a-tag>
            <span>{{ item.createdTime }}</span>收藏了{{ item.receiveUser }}的答复
            <router-link :to="'questionInfo/'+item.messageContent" @click.native="confirmMessageById(item.messageId)">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <div v-if="item.messageType === 13">
            <a-tag color="yellow">答复</a-tag>
            <span>{{ item.createdTime }}</span>答复了{{ item.receiveUser }}的提问
            <router-link :to="'questionInfo/'+item.messageContent" @click.native="confirmMessageById(item.messageId)">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
        </a-list-item>
      </a-list>
    </div>
    <el-pagination
      v-if="page.list.length < page.totalCount"
      align="center"
      class="question-pagination"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="page.totalCount"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import messageApi from '@/api/article/message'
export default {
  data() {
    return {
      messageCount: '',
      selectMessageId: [],
      page: {
        currentPage: 1,
        pageSize: 15,
        totalCount: 0,
        totalPage: 0,
        params: {
          messageType: [1, 14],
          sendUser: this.$store.getters.userName
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
    },
    confirmMessageById(val) {
      messageApi.confirmMessageById(val).then(res => {
        this.$message.success(res.msg)
        this.getByPage()
        let messageCount = this.$store.getters.messageCount
        messageCount = messageCount - 1
        this.$store.commit('global/SET_MESSAGE_COUNT', messageCount)
      })
    },
    confirmMessageByIds() {
      this.page.list.forEach(item => {
        console.log(item.messageId)
        this.selectMessageId.push(item.messageId)
      })
      messageApi.confirmMessageByIds(this.selectMessageId).then(res => {
        this.$message.success(res.msg)
        this.getByPage()
        this.messageCount = this.$store.getters.messageCount
        this.messageCount = this.messageCount - this.page.list.length
        this.$store.commit('global/SET_MESSAGE_COUNT', this.messageCount)
      })
    },
    // 每页大小改变 参数 value 为每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val
      // 重新请求,刷新页面
      this.getByPage(this.page)
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getByPage(this.page)
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
