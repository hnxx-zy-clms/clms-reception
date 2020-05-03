<template>
  <div>
    <!-- 筛选栏容器 -->
    <div class="scree-container">
      <!-- 条件列 -->
      <div class="scree-menu">
        <a-menu v-model="current" mode="horizontal">
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
          <div class="comment-good"><a-icon type="like" /> {{ item.commentGood }} 点赞</div>
          <div class="comment-comment"><a-icon type="message" /> {{ item.commentCount }} 评论</div>
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
            <!-- 二级评论分页 -->
            <div class="comment-pagination">
              <a-pagination show-quick-jumper :default-current="1" align="center" />
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
    }
  },
  data() {
    return {
      current: ['commentTime'],
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
      commentChildList: []
    }
  },
  created() {
    this.getCommentList(this.page)
    console.log('初始化')
  },
  methods: {
    getCommentList() {
      // this.page.params.commentArticle = this.article.articleId
      this.page.params.commentArticle = this.article.articleId
      commentApi.getCommentList(this.page).then(res => {
        this.page = res.data
        console.log(res)
      })
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
  .author-img {
    width: 60px;
    height: 60px;
    border: 5px solid #e5e5e5;
    border-radius: 50%;
  }
  .comment-pagination {
    margin-top: 5px;
  }
  .ant-card-bordered {
    margin: auto;
    padding: 0;
  }
</style>
