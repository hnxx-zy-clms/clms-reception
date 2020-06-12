<template>
  <!-- 文章阅读主体容器 -->
  <div class="read-container">
    <!-- 左侧容器,作者信息介绍 -->
    <div class="left-container">
      <author-info :article="article" />
    </div>
    <!-- 右侧容器,文章内容 -->
    <div class="right-container">
      <a-button class="go-back top-action" @click="goBack()">返回</a-button>
      <!-- 中间区域,放置文章 -->
      <div class="article-container">
        <a-spin :spinning="loading" style="min-height: 400px">
          <div class="article-title">{{ article.articleTitle }}</div>
          <div class="article-item">
            <div class="created-time">发表时间: {{ article.createdTime }}</div>
            <div class="article-meta">
              <a-icon class="action-icon" type="eye" /><span class="count-num"> {{ article.articleRead }} 阅读</span>
              <a-icon class="action-icon" type="heart" /><span class="count-num"> {{ article.articleCollection }} 收藏</span>
              <a-icon class="action-icon" type="like" /><span class="count-num"> {{ article.articleGood }} 点赞</span>
              <a href="javascript:void(0);"><span class="do-editer" @click="toUpdate(article.articleId)">编辑</span></a>
            </div>
          </div>
          <div class="article-content" v-html="article.articleContent" />
          <!-- 文章操作 -->
          <div class="article-action">
            <div class="article-good">
              <a href="javascript:void(0);" :class="isGoodArticle ? 'article-good meta-active' : 'article-good'" @click="saveGoodForArticle">
                <a-icon type="like" /> 点赞
              </a>
            </div>
            <div class="article-collection">
              <a href="javascript:void(0);" :class="isCollection ? 'article-collection meta-active' : 'article-collection'" @click="saveCollection">
                <a-icon type="heart" /> 收藏
              </a>
            </div>
          </div>
        </a-spin>
      </div>
      <!-- 底部区域,放置评论 -->
      <div class="do-comment-container">
        <div class="user-comment">
          <a-textarea v-model="content" placeholder="请输入内容，不超过300字" :rows="3" />
          <div class="comment-button">
            <a-button type="primary" @click="saveComment(content)">发表评论</a-button>
            <div v-show="countShow" class="content-count">
              还能输入 {{ commentContentCount }} 个字符
            </div>
          </div>
        </div>
        <!-- 评论列表组件 -->
        <!-- 筛选栏容器 -->
        <div v-if="page.list.length > 0" class="scree-container">
          <!-- 条件列 -->
          <div class="scree-menu">
            <a-menu v-model="current" mode="horizontal" @click="changeSort">
              <a-menu-item key="commentTime">最新</a-menu-item>
              <a-menu-item key="commentGood">点赞最多</a-menu-item>
              <a-menu-item key="commentCount">评论最多</a-menu-item>
            </a-menu>
          </div>
        </div>
        <!-- 评论列表容器 -->
        <div class="comment-list-container">
          <div v-for="item in page.list" :key="item.commentId">
            <a-comment>
              <span slot="actions">
                <a-icon
                  type="like"
                  :class=" item.goodCommentFlag ? 'meta-active' : ''"
                  @click="saveGoodForComment(item.commentId)"
                /> {{ item.commentGood }}
              </span>
              <span v-if="(userName === item.commentUser) || (userName === article.articleAuthor)" slot="actions" @click="deleteComment(item)">删除</span>
              <span slot="actions" key="comment-nested-reply-to" @click="doSaveChildComment(item)">回复</span>
              <span slot="actions" :style="{ margin:'20px 50px'}">共{{ item.commentCount }}条回复
                <a v-if=" (showChildComment != item.commentId) && (item.commentCount !== 0) " @click="getCommentChildList(item.commentId)">点击查看</a>
                <a v-if="showChildComment === item.commentId" @click="hiddenCommentChildList(item.commentId)">收起</a>
              </span>
              <span slot="author">
                <a-tag v-if=" article.articleAuthor === item.commentUser " :style="{ float:'left'}" color="orange">
                  作者
                </a-tag>
                <a>{{ item.commentUser }}</a>
              </span>
              <a-avatar
                slot="avatar"
                :size="32"
                :src="item.userIcon"
              />
              <span slot="content">
                {{ item.commentContent }}
              </span>
              <a-tooltip slot="datetime">
                <span>{{ item.commentTime }}</span>
              </a-tooltip>
              <!-- 二级评论 -->
              <div v-if="showChildComment === item.commentId" class="child-comment-list" @scroll="scrollLoadMore($event, item)">
                <a-comment v-for="item1 in commentChildList" :key="item1.commentId">
                  <span slot="actions">
                    <a-icon
                      type="like"
                      :class=" item1.goodCommentFlag ? 'meta-active' : ''"
                      @click="saveGoodForChildComment(item1.commentId, item.commentId)"
                    /> {{ item1.commentGood }}
                  </span>
                  <span v-if="(userName === item1.commentUser) || (userName === article.articleAuthor)" slot="actions" @click="deleteChildComment(item1)">删除</span>
                  <span slot="actions" @click="doSaveChildCommentWithParent(item1,item)">回复</span>
                  <span slot="author">
                    <a-tag v-if=" article.articleAuthor === item1.commentUser " :style="{ float:'left'}" color="orange">
                      作者
                    </a-tag>
                    <a>{{ item1.commentUser }}</a></span>
                  <a-avatar
                    slot="avatar"
                    :src="item1.userIcon"
                  />
                  <span slot="content">
                    <p v-if="item1.parentCommentUser !== undefined ">回复 @{{ item1.parentCommentUser }}</p>
                    {{ item1.commentContent }}
                  </span>
                  <a-tooltip slot="datetime">
                    <span>{{ item1.commentTime }}</span>
                  </a-tooltip>
                </a-comment>
                <!-- 二级评论分页 -->
                <el-pagination
                  class="child-comment-pagination"
                  :current-page="childPage.currentPage"
                  :page-size="childPage.pageSize"
                  layout="total, prev, pager, next"
                  :total="childPage.totalCount"
                  @current-change="handleCurrentChangeChild"
                />
              </div>
              <!-- 二级评论 -->
              <div v-if="commentParentUser !== '' && item.commentId === doCommentFlag" id="childCommentContent" class="user-comment">
                <div class="comment-top">
                  <a-avatar
                    slot="avatar"
                    :size="72.4"
                    :src="userIcon"
                  />
                  <a-textarea v-model="childContent" :placeholder="'回复@' + commentParentUser" :rows="3" :style="{maxWidth: '90%'}" />
                </div>
                <div class="comment-button">
                  <a-button type="primary" @click="saveChildComment(item.commentId)">发表评论</a-button>
                  <div v-show="childCountShow" class="content-count">
                    还能输入 {{ commentContentCount }} 个字符
                  </div>
                </div>
              </div>
            </a-comment>
          </div>
        </div>
        <!-- 一级评论分页 -->
        <el-pagination
          v-if="page.list.length < page.totalCount"
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
    <!--
      修改弹窗
      :article="article" 用于传递参数对象
    -->
    <el-dialog title="修改" :visible.sync="updateDialog" width="80%">
      <article-update :article="article" @closeUpdateDialog="closeUpdateDialog" @read="read" />
    </el-dialog>

  </div>
</template>

<script>
import AuthorInfo from './author-info'
import articleApi from '@/api/article/article'
import commentApi from '@/api/article/comment'
import goodApi from '@/api/article/good'
import collectionApi from '@/api/article/collection'
import ArticleUpdate from './article-update'
export default {
  components: {
    AuthorInfo,
    ArticleUpdate
  },
  data() {
    return {
      refrehFlag: false,
      focusCtrl: 0,
      currentIndex: 0,
      userName: this.$store.getters.userName,
      userIcon: this.$store.getters.userIcon,
      commentStyle: {
        padding: '10px'
      },
      isGoodArticle: false, // 判断是否已经点赞文章
      isGoodComment: false, // 判断评论是否已经点赞
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
      childPage: {
        currentPage: 1,
        pageSize: 5,
        totalCount: 0,
        totalPage: 0,
        params: {
          pid: ''
        },
        sortColumn: 'commentTime',
        sortMethod: 'desc',
        list: []
      },
      good: {
        articleId: '',
        commentId: ''
      },
      goodList: [],
      collection: {
        articleId: this.$route.params.id,
        collectionType: 1
      },
      comment: {
        commentContent: '',
        commentArticle: '',
        commentType: 0,
        pid: 0
      },
      current: ['commentTime'],
      content: '', // 评论文本内容
      childContent: '', // 评论评论文本内容
      id: '',
      article: {
        articleId: '',
        articleAuthor: ''
      },
      loadingMore: false,
      noMore: false,
      doCommentFlag: null,
      updateDialog: false, // 控制修改弹窗显示
      commentParentUser: '',
      showChildComment: true, // 控制二级评论的显示
      commentChildList: [],
      loading: false,
      countShow: false, // 控制是否显示字符个数提示
      childCountShow: false,
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
    },
    'childContent': function(newVal, oldVal) {
      if (this.childContent.length > 300) {
        this.childContent = this.childContent.substring(0, 300)
      }
      if (this.childContent.length > 0) {
        this.childCountShow = true
      } else {
        this.childCountShow = false
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
    this.getGoodForArticle()
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
    // 修改
    toUpdate(id) {
      articleApi.get(id).then(res => {
        this.article = res.data
        this.updateDialog = true
      })
    },
    getList() {
      goodApi.getList().then(res => {
        this.goodList = res.data
      })
    },
    closeUpdateDialog() {
      // 关闭修改弹窗
      this.updateDialog = false
    },
    // 分页查询一级评论
    getCommentList() {
      this.page.params.commentArticle = this.article.articleId
      commentApi.getCommentList(this.page).then(res => {
        this.page = res.data
        this.page.list = res.data.list
      })
    },
    scrollLoadMore(e, val) {
      // !this.moreLoading 没有在加载状态，触发加载更多时，把this.moreLoading置未true
      // !this.noMore 没有更多的状态为false，当我们取到的数据长度小于1页的数量时，就没有更多了数据了，把 this.noMore置为true，这样就不会触发无意义的加载更多了
      if (e.srcElement.scrollTop + e.srcElement.offsetHeight > e.srcElement.scrollHeight && !this.loadingMore && !this.noMore) {
        this.loadMore(val)
      }
    },
    loadMore(val) {
    },
    // 查询二级评论
    getCommentChildList(val) {
      this.childPage.currentPage = 1
      this.showChildComment = val
      this.childPage.params.pid = val
      this.getByPage(this.childPage)
    },
    hiddenCommentChildList(val) {
      this.showChildComment = 0
    },
    // 分页查询二级评论
    getByPage() {
      this.commentChildList = null
      this.childPage.sortColumn = 'commentTime'
      commentApi.getByPage(this.childPage).then(res => {
        console.log(this.childPage)
        this.childPage = res.data
        this.commentChildList = res.data.list
      })
    },
    getGoodForArticle() {
      this.good.articleId = this.$route.params.id
      goodApi.getGood(this.good).then(res => {
        const flag = res.data
        if (flag === 0) {
          this.isGoodArticle = false
        } else {
          this.isGoodArticle = true
        }
      })
    },
    // 查询文章是否收藏
    getCollection() {
      this.collection.articleId = this.$route.params.id
      collectionApi.getCollection(this.collection).then(res => {
        const flag = res.data
        if (flag === 0) {
          this.isCollection = false
        } else {
          this.isCollection = true
        }
      })
    },
    saveGoodForArticle() {
      // 点赞
      if (!this.isGoodArticle) {
        this.good = {}
        this.good.articleId = this.$route.params.id
        goodApi.save(this.good).then(res => {
          this.$message.success(res.msg)
          this.getGoodForArticle()
        })
      } else {
        this.$message.error('您已点赞，请勿重复点赞')
      }
    },
    // 点赞评论
    saveGoodForComment(val) {
      this.good = {}
      this.good.commentId = val
      goodApi.save(this.good).then(res => {
        this.$message.success(res.msg)
        this.getCommentList()
      })
    },
    saveGoodForChildComment(val1, val) {
      this.good = {}
      this.good.commentId = val1
      goodApi.save(this.good).then(res => {
        this.$message.success(res.msg)
        this.getCommentChildList(val)
      })
    },
    // 添加文章收藏
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
      this.comment.parentCommentUser = null
      this.comment.commentArticle = this.id
      this.comment.commentContent = this.content
      this.comment.commentType = 0
      commentApi.save(this.comment).then(res => {
        this.getCommentList()
        this.$message.success(res.msg)
        this.content = ''
      })
    },
    // 点击回复，定位到二级评论输入框
    doSaveChildComment(val) {
      this.doCommentFlag = val.commentId
      this.commentParentUser = val.commentUser
      this.comment.pid = val.commentId
    },
    doSaveChildCommentWithParent(val1, val) {
      this.doCommentFlag = val.commentId
      this.commentParentUser = val1.commentUser
      this.comment.pid = val.commentId
      this.comment.parentCommentUser = val1.commentUser
      // document.getElementById('childCommentContent').scrollIntoView()
      // document.getElementById('childCommentContent').focus()
    },
    // 添加评论评论
    saveChildComment(val) {
      this.comment.commentArticle = this.id
      this.comment.commentContent = this.childContent
      this.comment.commentType = 1
      commentApi.save(this.comment).then(res => {
        this.getCommentList()
        this.getCommentChildList(val)
        this.$message.success(res.msg)
        this.childContent = ''
      })
      this.doCommentFlag = null
    },
    // 删除评论 一级、二级
    deleteComment(val) {
      const commentId = val.commentId
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        commentApi.delete(commentId).then(res => {
          this.$message.success(res.msg)
          this.getCommentList()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
    deleteChildComment(val) {
      const commentId = val.commentId
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        commentApi.delete(commentId).then(res => {
          this.$message.success(res.msg)
          this.getCommentChildList(val.pid)
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
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
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChangeChild(val) {
      this.childPage.currentPage = val
      this.getByPage(this.childPage)
    },
    goBack() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity .5s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
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
    min-height: 900px;
    width: 1200px;
    /* border: 1px solid red; */
    /* 左右自适应 */
    margin: auto;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  .left-container {
    display: flex;
    flex-direction: column;
    width: 350px;
    min-height: 900px;
    margin-right: 3px;
    background-color: white;
  }
  .right-container {
    display: flex;
    flex-direction: column;
    width: 850px;
    min-height: 900px;
    margin-left: 3px;
    background-color: white;
    /* border: 1px solid green; */
  }
  .article-container {
    overflow:hidden;
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 500px;
    background-color: white;
    /* border: 1px solid yellow; */
    background: #fff;
    padding: 40px 25px 20px 25px;
  }
  .article-content {
    margin-top: 10px;
    max-height: 1000px;
    overflow: auto;
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
    background-color: #fff;
  }
  .comment-top {
    display: flex;
    flex-direction: row;
    justify-content: center;
    justify-content: space-between;
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
    margin-bottom: 5px;
  }
  .meta-active {
    /* 标识当前是否已点赞，是否已收藏 */
    color: red;
  }
  .meta-active:hover {
    /* 标识当前是否已点赞，是否已收藏 */
    color: red !important;
  }
  .do-article {
    width: 100%;
    height: 40px;
    /* border: 1px solid blue; */
    line-height: 40px;
    background-color: #ca0c16;
    border-radius: 5px;
    text-align: center;
    font-size: 14px;
    color: #fff;
  }
  /* 输入文本域 */
  .ant-input {
    border-radius: 0px !important;
  }
  /* 滚动条的宽度 */
  ::-webkit-scrollbar {
    width: 2px;
    height: 10px;
  }
  /* 滚动条滑块样式 */
  ::-webkit-scrollbar-thumb {
    background-color: rgb(121, 216, 240);
    border-radius: 3px;
  }
  .child-comment-list {
    max-height: 420px;
    overflow: auto;
  }
</style>
