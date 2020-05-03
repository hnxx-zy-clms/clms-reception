<template>
  <div>
    <!-- 筛选栏容器 -->
    <div class="scree-container">
      <!-- 分类标签 -->
      <div class="type-text">
        <span v-if="type!=null">分类 : <a-tag color="green">
          {{ type.typeName }}
        </a-tag></span>
      </div>
      <!-- 条件列 -->
      <div class="scree-menu">
        <a-menu v-model="current" mode="horizontal" @click="changeSort">
          <a-menu-item key="createdTime">最新</a-menu-item>
          <a-menu-item key="articleGood">点赞最多</a-menu-item>
          <a-menu-item key="articleComment">评论最多</a-menu-item>
          <a-menu-item key="articleRead">阅读最多</a-menu-item>
          <a-menu-item key="articleCollection">收藏最多</a-menu-item>
        </a-menu>
      </div>
    </div>
    <!-- 文案列表容器 -->
    <div class="article-list-container">
      <!-- 文章卡片 -->
      <a-card v-for="item in page.list" :key="item.articleId">
        <div class="article-main">
          <router-link :to="'/articleRead/'+item.articleId" class="article-container">
            <!-- 文章标题 -->
            <div class="article-title">{{ item.articleTitle }}</div>
            <div class="article-desc">{{ item.articleDesc }}</div>
            <div class="article-bottom">
              <div class="author-container">
                <div class="author-header">
                  <img class="author-img" src="http://img.fusheng.xyz/code-fusheng.jpg" alt="">
                </div>
                <div class="article-author">作者：{{ item.articleAuthor }}</div>
              </div>
              <!-- 文章标签 -->
              <div class="article-meta">
                <div class="created-time">{{ item.createdTime }}</div>
                <div class="article-other">
                  <a-icon type="eye" /> {{ item.articleRead }}
                  <a-icon type="heart" /> {{ item.articleCollection }}
                  <a-icon type="like" /> {{ item.articleGood }}
                  <a-icon type="message" /> {{ item.articleComment }}
                </div>
              </div>
            </div>
          </router-link>
        </div>
      </a-card>
    </div>
    <div class="article-pagination">
      <a-pagination :show-total="total => `共 ${total} 条`" show-quick-jumper :default-current="1" :total="page.totalCount" align="center" @change="pageChange" />
    </div>
  </div>
</template>

<script>
import articleApi from '@/api/article/article'
export default {
  props: {
    type: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      current: ['createdTime'],
      page: {
        currentPage: 1,
        pageSize: 5,
        totalCount: 0,
        totalPage: 0,
        params: {},
        sortColumn: 'createdTime',
        sortMethod: 'desc',
        list: []
      }
    }
  },
  watch: {
    type: function() {
      this.page.params.articleType = this.type.typeId
      this.getByPage(this.page)
    }
  },
  created() {
    this.getByPage()
  },
  methods: {
    pageChange(pageNumber) {
      this.page.currentPage = pageNumber
      this.getByPage()
    },
    getByPage() {
      articleApi.getByPage(this.page).then(res => {
        this.page = res.data
        console.log(res)
      })
    },
    changeSort(e) {
      this.page.sortColumn = e.key
      this.getByPage()
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
  .type-text {
    margin-left: 15px;
    font-size: 16px;
  }
  .ant-menu-horizontal {
    border-bottom: none !important;
  }
  .ant-menu {
    background: none !important;
  }
  .article-main {
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .article-container {
    width: 100%;
    min-height: 70px;
  }
  .article-title {
    align-self: start;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 10px;
  }
  .article-title :hover {
    color: red;
  }
  .article-desc {
    align-self: start;
    margin-bottom: 10px;
    font-size: 14px;
    color: #9c9ea8;
    line-height: 22px;
    max-height: 90px;
    /* 超出隐藏 */
    overflow: hidden;
    /* 超出部分省略号 */
    text-overflow: ellipsis;
  }
  .article-bottom {
    width: 100%;
    display: flex;
    flex-direction: row;
    flex-wrap: nowrap;
    justify-content: space-between;
    align-items: center;
  }
  .article-meta {
    font-size: 12px;
    color: #9c9ea8;
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
  .author-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
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
  .article-other i{
    margin-left: 10px;
  }
  .article-pagination {
    margin-top: 15px;
  }
</style>
