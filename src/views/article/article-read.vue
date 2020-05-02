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
      <div class="article-container">
        <div class="article-title">{{ article.articleTitle }}</div>
        <div class="article-item">
          <div class="created-time">{{ article.createdTime }}</div>
          <div class="article-meta">
            <a-icon type="eye">{{ article.articleRead }}阅读</a-icon>
            <a-icon type="heart">{{ article.articleCollection }}收藏</a-icon>
            <a-icon type="like">{{ article.articleGood }}点赞</a-icon>
          </div>
        </div>
        <div class="article-content" v-html="article.articleContent" />
      </div>
      <!-- 底部区域,放置评论 -->
      <div class="comment-container">
        <comment-list />
      </div>
    </div>
  </div>
</template>

<script>
import CommentList from '@/views/article/comment-list'
import ArticleInfo from './author-info'
import articleApi from '@/api/article/article'
export default {
  components: {
    CommentList,
    ArticleInfo
  },
  data() {
    return {
      id: 15,
      article: {}
    }
  },
  created() {
    this.read()
  },
  methods: {
    read() {
      articleApi.read(this.id).then(res => {
        this.article = res.data
        console.log(res)
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
    margin-bottom: 30px;
    margin-top: 10px;
  }
  .comment-container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 200px;
    border: 1px solid blueviolet;
    margin-top: 5px;
  }
</style>
