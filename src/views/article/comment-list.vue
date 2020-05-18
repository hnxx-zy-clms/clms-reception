<template>
  <div>
    xx
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
