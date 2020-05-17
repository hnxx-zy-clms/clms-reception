<template>
  <div>
    <!-- 筛选栏容器 -->
    <div class="scree-container">
      <!-- 条件列 -->
      <div class="scree-menu">
        <a-menu v-model="current" mode="horizontal" @click="changeSort">
          <a-menu-item key="commentTime">最新</a-menu-item>
          <a-menu-item key="commentGood">点赞最多</a-menu-item>
          <a-menu-item key="commentComment">评论最多</a-menu-item>
        </a-menu>
      </div>
    </div>
    <!-- 评论列表容器 -->
    <div class="comment-list-container">
      <a-card v-for="item in page.list" :key="item.commentId" style="width: 100%">
        <div class="comment-main">
          <div class="comment-header">
            <img class="author-img" src="http://img.fusheng.xyz/code-fusheng.jpg" alt="">
          </div>
          <div class="comment-container">
            <div class="comment-user">{{ item.commentUser }}</div>
            <div class="comment-time">发表于 {{ item.commentTime }}</div>
            <div class="comment-content">{{ item.commentContent }}</div>
          </div>
          <div class="comment-good"><a-icon type="like" /> {{ item.commentGood }}</div>
          <div class="comment-comment"><a-icon type="message" /> {{ item.commentCount }}</div>
        </div>
        <a-collapse key="item.commentId" class="comment-show" :bordered="false" expand-icon-position="right" @change="getCommentChildList(item.commentId)">
          <a-collapse-panel key="item.commentId" :bordered="false">
            <a-card v-for="item2 in commentChildList" :key="item2.commentId" style="width: 90%">
              <div class="comment-main">
                <div class="comment-header">
                  <img class="author-img" src="http://img.fusheng.xyz/code-fusheng.jpg" alt="">
                </div>
                <div class="comment-container">
                  <div class="comment-user">{{ item2.commentUser }}</div>
                  <div class="comment-time">发表于 {{ item2.commentTime }}</div>
                  <div class="comment-content">{{ item2.commentContent }}</div>
                </div>
              </div>
            </a-card>
            <!-- 二级评论评论区域 -->
            <div class="comment-container">
              <div class="user-comment">
                <a-textarea v-model="content" placeholder="请输入内容，不超过300字" :rows="1" />
                <div class="comment-button">
                  <a-button type="primary" @click="saveComment(item.commentId)">发表评论</a-button>
                  <div v-show="countShow" class="content-count">
                    还能输入 {{ commentContentCount }} 个字符
                  </div>
                </div>
              </div>
            </div>
          </a-collapse-panel>
        </a-collapse>
      </a-card>

    </div>
    <!-- 一级评论分页 -->
    <div class="comment-pagination">
      <a-pagination :show-total="total => `共 ${total} 条`" show-quick-jumper :default-current="1" :total="page.totalCount" align="center" />
    </div>
  </div>
</template>

<script>
import commentApi from '@/api/article/comment'
export default {
  props: {
    article: {
      type: Object,
      default: null
    },
    page: {
      type: Object,
      pageSize: 5,
      default: null
    }
  },
  data() {
    return {
      comment: {
        commentContent: '',
        commentArticle: '',
        commentType: 1,
        pid: ''
      },
      content: '',
      current: ['commentTime'],
      commentChildList: [],
      countShow: false, // 控制是否显示字符个数提示
      commentContentCount: 300 // 显示还能输入的字符数量
    }
  },
  watch: {
    'content': function(newVal, oldVal) {
      if (this.content.length > 300) {
        this.content = this.content.substring(0, 300)
      }
      if (this.content.length > 0) {
        this.countShow = true
      } else {
        this.countShow = false
      }
      const newValLength = newVal ? newVal.length : 0
      const oldValLength = oldVal ? oldVal.length : 0
      this.commentContentCount = this.commentContentCount - (newValLength - oldValLength)
    }
  },
  created() {
    this.$emit('getCommentList(this.page)')
  },
  methods: {
    pageChange(pageNumber) {
      this.page.currentPage = pageNumber
      this.$emit('getCommentList(this.page)')
    },
    changeSort(e) {
      this.page.sortColumn = e.key
      this.$emit('getCommentList(this.page)')
    },
    // 分页查询二级评论
    getByPage() {
      this.commentChildList = null
      this.page.pageSize = 2
      commentApi.getByPage(this.page).then(res => {
        this.commentChildList = res.data.list
      })
    },
    getCommentChildList(val) {
      this.page.params.pid = val
      this.getByPage(this.page)
    },
    saveComment(pid) {
      this.comment.pid = pid
      this.comment.commentArticle = this.$route.params.id
      this.comment.commentContent = this.content
      commentApi.save(this.comment).then(res => {
        this.getCommentChildList()
        this.$message.info(res.msg)
        this.content = ''
        this.$emit('getCommentList')
      })
    }
  }

}
</script>

<style scoped>
  .scree-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;
    background-color:white;
    border: 1px solid #e8e8e8;
  }
  .comment-list-container {
    display: flex;
    flex-direction: column;
    padding: 10px 10px;
    background-color: #fff;
  }
  .comment-show {
    background-color: #fff !important;
  }
  .comment-list-container-child {
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-self: end;
    margin-top: 5px;
    padding: 10px 10px;
    background-color: #fff;
  }
  .comment-main {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .comment-container {
    width: 530px;
    display: flex;
    flex-direction: column;
    margin-left: 10px;
  }
  .comment-user {
    font-weight: bold;
  }
  .comment-time {
    font-size: 12px;
    color: #9c9ea8;
  }
  .comment-good {
    width: 60px;
  }
  .comment-comment {
    width: 120px;
  }
  .author-img {
    width: 60px;
    height: 60px;
    border: 5px solid #e5e5e5;
    border-radius: 50%;
    margin-top: 5px;
  }
  .comment-pagination {
    margin-top: 5px;
  }
  .ant-card-bordered {
    margin: auto;
    padding: 0;
  }
  .comment-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    /* border: 1px solid blueviolet; */
    margin-top: 5px;
  }
  .user-comment {
    margin-top: 15px;
    background-color: #fff;
    margin-bottom: 10px;
  }
  .comment-button {
    margin-top: 15px;
    display: flex;
    flex-direction: row-reverse;
    align-items: center;
  }
  .content-count {
    margin-right: 15px;
  }
  .ant-divider-horizontal {
    margin: 2px 0 5px 0 !important;
  }
  .ant-collapse-content {
    padding: 4px 16px 4px 16px;
  }
</style>
