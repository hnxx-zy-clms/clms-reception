<template>
  <div class="good-message-container">
    <!-- 消息顶层操作 -->
    <div class="top-action">
      <span><a @click="confirmMessageByIds()">确认所有消息</a></span>
    </div>
    <!-- 消息中间列表 -->
    <div class="message-list">
      <a-list item-layout="horizontal" :data-source="page.list">
        <a-list-item slot="renderItem" key="item.messageId" slot-scope="item">
          <div v-if="item.messageType === 13">
            <a-tag color="orange">提问</a-tag>
            <a> {{ item.sendUser }} </a><span>{{ item.createdTime }}</span> 答复了您的提问
            <router-link :to="'questionInfo/'+item.messageContent">
              <a>{{ item.messageDesc }}</a>
            </router-link>
          </div>
          <a slot="actions" @click="confirmMessageById(item.messageId)">确认</a>
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
          messageType: [13, 13],
          messageState: 0,
          receiveUser: this.$store.getters.userName
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
        this.messageCount = this.$store.getters.messageCount
        this.messageCount = this.messageCount - 1
        this.$store.commit('global/SET_MESSAGE_COUNT', this.messageCount)
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
