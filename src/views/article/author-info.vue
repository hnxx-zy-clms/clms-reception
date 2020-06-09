<template>
  <div>
    <!-- 左侧个人信息展示卡片 -->
    <a-card class="my-back-card" title="作者信息" :head-style="headStyle" hoverable>
      <img :src="article.userIcon" class="my-header">
      <div class="my-bottom-container">
        <div class="my-nickname">{{ article.articleAuthor }}</div>
        <div class="my-signature">忍一时越想越气，退一步越想越亏</div>
        <a-divider />
        <div class="social-container">
          <div class="social-text">社交：</div>
          <div class="social-item">
            <a href="#">
              <img src="http://img.fusheng.xyz/clms-csdn-002.png" class="social-icon">
            </a>
            <a href="#">
              <img src="http://img.fusheng.xyz/clms-gitee-003.png" class="social-icon">
            </a>
            <a href="#">
              <img src="http://img.fusheng.xyz/clms-qq-005.png" class="social-icon">
            </a>
            <a href="#">
              <img src="http://img.fusheng.xyz/clms-github-004.png" class="social-icon">
            </a>
          </div>
        </div>
        <a-divider />
      </div>
    </a-card>
    <div class="recom-read">
      <a-card title="推荐阅读" :head-style="headStyle" :body-style="recomStyle">
        <div class="recom-list">
          <a-card v-for="item in page.list" :key="item.articleId" :body-style="recomStyle" class="article-card">
            <div class="article-main">
              <div v-if="item.articleImage" class="article-image">
                <img :src="item.articleImage" class="article-cover">
              </div>
              <router-link :to="{ path: '/articleRead/' + item.articleId}" class="item.articleImage ? 'image-article' : 'no-image-article'">
                <!-- 文章标题 -->
                <div class="article-title">{{ item.articleTitle }}</div>
              </router-link>
            </div>
          </a-card>
        </div>
      </a-card>
    </div>
  </div>
</template>

<script>
import articleApi from '@/api/article/article'
export default {
  props: {
    article: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      recomStyle: {
        padding: '5px'
      },
      headStyle: {
        fontSize: '18px',
        fontWeight: 'bold',
        lineHeight: '15px',
        borderLeft: '5px solid #409eff'
      },
      page: {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        totalPage: 0,
        params: {
          articleAuthor: 'admin'
        },
        sortColumn: 'articleRead',
        sortMethod: 'desc',
        list: []
      }
    }
  },
  created() {
    this.getRecomRead()
    this.page.params.articleAuthor = this.article.articleAuthor
  },
  methods: {
    // 推荐阅读列表 阅读最多
    getRecomRead() {
      this.page.params.articleAuthor = this.author
      articleApi.getByPage(this.page).then(res => {
        this.page = res.data
        console.log(res)
      })
    }
  }
}
</script>

<style scoped>
  .my-back-card .ant-card-body {
    padding: 0 !important;
  }
  .my-back {
    position: absolute;
    align-items: center;
    width: 100%;
    z-index: 1;
    top: 0;
  }
  .my-header {
    position: relative;
    display: block;
    width: 100px;
    height: 100px;
    border: 5px solid #e5e5e5;
    margin: 10px auto 10px;
    border-radius: 50%;
    z-index: 10;
  }
  .my-bottom-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 280px;
    margin: auto;
    margin-bottom: 30px;
  }

  .my-nickname {
    font-size: 22px;
    font-weight: bold;
    line-height: 60px;
  }

  .my-signature {
    font-size: 15px;
    color: #878d99;
  }

  .social-container {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  .social-text {
    font-size: 15px;
    color: #878d99;
  }

  .social-icon {
    width: 40px;
    height: 40px;
  }

  .social-item {
    width: 200px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }
  .recom-list {
    /* max-height: 780px; */
    min-height: 600px;
    width: 338px;
    overflow: auto;
  }
  .article-main {
    width: 100%;
    height: 50px;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .author-img {
    width: 36px;
    height: 36px;
    margin-right: 15px;
  }
  .article-author {
    font-size: 16px;
  }
  .article-title {
    height: 42px;
    max-width: 324px;
    align-self: start;
    font-size: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    /* 强制div文本换行 */
    white-space: normal;
    word-break: break-all;
    word-wrap: break-word;
  }
  .article-image {
    width: 65px;
    height:45px;
    margin-right: 10px;
  }
  .article-cover {
    width: 65px;
    height:45px;
    border-radius: 5px;
  }
  .image-article {
    width: 550px;
    min-height: 45px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .no-image-article {
    width: 100%;
    min-height: 45px;
  }
  /* 滚动条的宽度 */
  ::-webkit-scrollbar {
    width: 2px;
  }
  /* 滚动条滑块样式 */
  ::-webkit-scrollbar-thumb {
    background-color: rgb(226, 243, 247) !important;
  }
</style>
