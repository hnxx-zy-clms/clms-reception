<template>
  <!-- 文章阅读主体容器 -->
  <div class="read-container">
    <!-- 左侧容器,作者信息介绍 -->
    <div class="left-container">
      <author-info />
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
          <div class="created-time">发表时间: {{ article.createdTime }}</div>
          <div class="article-meta">
            <a-icon class="action-icon" type="eye" /><span class="count-num"> {{ article.articleRead }} 阅读</span>
            <a-icon class="action-icon" type="heart" /><span class="count-num"> {{ article.articleCollection }} 收藏</span>
            <a-icon class="action-icon" type="like" /><span class="count-num"> {{ article.articleGood }} 点赞</span>
          </div>
        </div>
        <div class="article-content" v-html="article.articleContent" />
        <!-- 文章操作 -->
        <div class="article-action">
          <div class="article-good">
            <a href="javascript:void(0);" :class="isGood ? 'article-good meta-active' : 'article-good'" @click="saveGoods">
              <a-icon type="like" /> 点赞
            </a>
          </div>
          <div class="article-collection">
            <a href="javascript:void(0);" :class="isCollection ? 'article-collection meta-active' : 'article-collection'" @click="saveCollection">
              <a-icon type="heart" /> 收藏
            </a>
          </div>
        </div>
      </div>
      <!-- 底部区域,放置评论 -->
      <div class="do-comment-container">
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
              <div class="comment-comment"><span>查看回复 </span><a-icon type="message" /> {{ item.commentCount }}</div>
            </div>
          </a-card>
        </div>
        <!-- 一级评论分页 -->
        <el-pagination
          align="center"
          class="comment-pagination"
          :current-page="page.currentPage"
          :page-size="page.pageSize"
          layout="total, prev, pager, next, jumper"
          :total="page.totalCount"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import AuthorInfo from './author-info'
import articleApi from '@/api/article/article'
import commentApi from '@/api/article/comment'
import goodApi from '@/api/article/good'
import collectionApi from '@/api/article/collection'
export default {
  components: {
    AuthorInfo
  },
  data() {
    return {
      user: this.$store.getters.getUser,
      isGood: false, // 判断是否已经点赞
      isCollection: false, // 判断是否已经收藏
      page: {
        currentPage: 1,
        pageSize: 5,
        totalCount: 0,
        totalPage: 0,
        params: {
          articleId: this.$route.params.id
        },
        sortColumn: 'commentTime',
        sortMethod: 'desc',
        list: []
      },
      good: {
        articleId: this.$route.params.id
      },
      collection: {
        articleId: this.$route.params.id
      },
      comment: {
        commentContent: '',
        commentArticle: '',
        commentType: 0,
        pid: 0
      },
      current: ['commentTime'],
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
    this.getGood()
    this.getCollection()
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
    getGood() {
      goodApi.getGood(this.article.articleId).then(res => {
        console.log(res)
        const flag = res.data
        if (flag === 0) {
          this.isGood = false
        } else {
          this.isGood = true
        }
      })
    },
    getCollection() {
      collectionApi.getCollection(this.article.articleId).then(res => {
        console.log(res)
        const flag = res.data
        if (flag === 0) {
          this.isCollection = false
        } else {
          this.isCollection = true
        }
      })
    },
    saveGoods() {
      // 点赞
      if (!this.isGood) {
        goodApi.save(this.good).then(res => {
          this.$message.success(res.msg)
          this.getGood()
        })
      } else {
        this.$message.error('您已点赞，请勿重复点赞')
      }
    },
    saveCollection() {
      // 收藏
      if (!this.isCollection) {
        collectionApi.save(this.collection).then(res => {
          this.$message.success(res.msg)
          this.getCollection()
        })
      } else {
        this.$message.error('您已收藏，请勿重复收藏')
      }
    },
    // 添加文章评论
    saveComment(content) {
      this.comment.commentArticle = this.id
      this.comment.commentContent = this.content
      commentApi.save(this.comment).then(res => {
        this.getCommentList()
        this.$message.success(res.msg)
        this.content = ''
      })
    },
    changeSort(e) {
      this.page.sortColumn = e.key
      this.getCommentList(this.page)
    },
    // 每页大小改变 参数 value 为每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val
      // 重新请求,刷新页面
      this.getCommentList(this.page)
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getCommentList(this.page)
    }
  }
}
</script>

<style scoped>
  .count-num {
    color: #349edf;
    margin-right: 5px;
  }
  .action-icon :hover {
    color: #349edf;
  }
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
    overflow:hidden;
    display: flex;
    flex-direction: column;
    width: 840px;
    min-height: 500px;
    background-color: white;
    /* border: 1px solid yellow; */
    background: #fff;
    padding: 40px 25px 20px 25px;
  }
  .article-content {
    margin-top: 10px;

  }
  .article-content img {
    vertical-align: middle;
    border-style: none;
    width: 700px;
  }
  .article-title {
    text-align: center;
    font-size: 24px;
    font-weight: bold;
    line-height: 70px;
  }
  .created-time {
    font-size: 12px;
    color: #9c9ea8;
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
    min-height: 200px;
    line-height: 200px;
    margin: auto;
    justify-content: space-evenly;
    font-size: 24px;
  }
  .do-comment-container {
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
  .meta-active {
    /* 标识当前是否已点赞，是否已收藏 */
    color: red;
  }
  .meta-active:hover {
    /* 标识当前是否已点赞，是否已收藏 */
    color: red !important;
  }

</style>
