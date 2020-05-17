<template>
  <!-- 文章阅读主体容器 -->
  <div class="read-container">
    <!-- 左侧容器,作者信息介绍 -->
    <div class="left-container">
      <article-info />
    </div>
    <!-- 右侧容器,文章内容 -->
    <div class="right-container">
      <!-- 中间区域,放置文章 -->
      <div
        v-loading="loading"
        class="article-container"
        element-loading-text="拼命加载中"
        element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(255, 255, 255, 0.8)"
        style="min-height: 520px"
      >
        <div class="article-title">{{ article.articleTitle }}</div>
        <div class="article-item">
          <div class="created-time">{{ article.createdTime }}</div>
          <div class="article-meta">
            <a-icon type="eye" /> {{ article.articleRead }} 阅读
            <a-icon type="heart" /> {{ article.articleCollection }} 收藏
            <a-icon type="like" /> {{ article.articleGood }} 点赞
          </div>
        </div>
        <div class="article-content" v-html="article.articleContent" />
        <!-- 文章操作 -->
        <div class="article-action">
          <div class="article-good">
            <a-icon type="like" /> 点赞
          </div>
          <div class="article-collection">
            <a-icon type="heart" /> 收藏
          </div>
        </div>
      </div>
      <!-- 底部区域,放置评论 -->
      <div class="comment-container">
        <div class="user-comment">
          <a-textarea v-model="content" placeholder="请输入内容，不超过300字" :rows="4" />
          <div class="comment-button">
            <a-button type="primary" @click="saveComment(content)">发表评论</a-button>
            <div v-show="countShow" class="content-count">
              还能输入 {{ commentContentCount }} 个字符
            </div>
          </div>
        </div>
        <!-- 评论列表组件 -->
        <comment-list :article="article" :page="page" />
      </div>
    </div>
  </div>
</template>

<script>
import CommentList from '@/views/article/comment-list'
import ArticleInfo from './author-info'
import articleApi from '@/api/article/article'
import commentApi from '@/api/article/comment'
export default {
  components: {
    CommentList,
    ArticleInfo
  },
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 5,
        totalCount: 0,
        totalPage: 0,
        params: {},
        sortColumn: 'commentTime',
        sortMethod: 'desc',
        list: []
      },
      comment: {
        commentContent: '',
        commentArticle: '',
        commentType: 0,
        pid: 0
      },
      content: '', // 评论文本内容
      id: '',
      article: {
        articleId: ''
      },
      loading: false,
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
    this.read()
    this.article.articleId = this.$route.params.id
    this.getCommentList()
  },
  methods: {
    read() {
      this.loading = true
      this.id = this.$route.params.id
      articleApi.read(this.id).then(res => {
        this.article = res.data
        this.loading = false
      })
    },
    getCommentList() {
      this.page.params.commentArticle = this.article.articleId
      commentApi.getCommentList(this.page).then(res => {
        this.page = res.data
        console.log(res)
      })
    },
    // 添加文章评论
    saveComment(content) {
      this.comment.commentArticle = this.id
      this.comment.commentContent = this.content
      commentApi.save(this.comment).then(res => {
        this.getCommentList()
        this.$message.info(res.msg)
        this.content = ''
      })
    }
  }
}
</script>

<style scoped>
  .read-container {
    display: flex;
    flex-direction: row;
    min-height: 1200px;
    width: 1200px;
    /* border: 1px solid red; */
    /* 左右自适应 */
    margin: auto;
    margin-top: 10px;
    margin-bottom: 20px;
  }
  .left-container {
    display: flex;
    flex-direction: column;
    width: 350px;
    min-height: 1200px;
    margin-right: 3px;
  }

  .right-container {
    display: flex;
    flex-direction: column;
    width: 850px;
    min-height: 1200px;
    margin-left: 3px;
    /* border: 1px solid green; */
  }
  .article-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 500px;
    background-color: white;
    /* border: 1px solid yellow; */
    background: #fff;
    padding: 40px 25px;
  }
  .article-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    line-height: 70px;
  }

  .article-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    /* margin-bottom: 10px; */
    margin-top: 25px;
  }
  .article-action {
    display: flex;
    flex-direction: row;
    width: 300px;
    margin: auto;
    justify-content: space-evenly;
    font-size: 24px;
  }
  .comment-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 200px;
    /* border: 1px solid blueviolet; */
    margin-top: 5px;
  }
  .user-comment {
    margin-top: 15px;
    background-color: #fff;
    margin-bottom: 10px;
  }
  .comment-button {
    margin: 15px;
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
</style>
