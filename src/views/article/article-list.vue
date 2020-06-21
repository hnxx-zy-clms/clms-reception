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
    <div class="article-list-container" @scroll="scrollLoadMore($event)">
      <a-spin :spinning="loading">
        <div class="spin-content">
          <!-- 文章卡片 -->
          <a-card v-for="item in page.list" :key="item.articleId" :body-style="articleBodyStyle" class="article-card">
            <div class="article-main">
              <div v-if="item.articleImage" class="article-image">
                <img :src="item.articleImage" class="article-cover">
              </div>
              <router-link :to="'articleRead/'+item.articleId" :class="item.articleImage ? 'image-article' : 'article-container'">
                <!-- 文章标题 -->
                <div class="article-title">{{ item.articleTitle }}</div>
                <div class="article-desc">{{ item.articleDesc }}</div>
                <div class="article-bottom">
                  <div class="author-container">
                    <div class="author-header">
                      <img class="author-img" :src="item.userIcon" alt="">
                    </div>
                    <div class="article-author">作者：{{ item.articleAuthor }}</div>
                  </div>
                  <!-- 文章标签 -->
                  <div class="article-meta">
                    <div class="created-time">{{ item.createdTime }}</div>
                    <div class="article-other">
                      <a-icon class="action-icon" type="eye" /><span class="count-num"> {{ item.articleRead }}</span>
                      <a-icon class="action-icon" type="heart" /><span class="count-num"> {{ item.articleCollection }}</span>
                      <a-icon :class=" item.goodArticleFlag ? 'action-icon meta-active' : 'action-icon'" type="like" /><span class="count-num"> {{ item.articleGood }}</span>
                      <a-icon class="action-icon" type="message" /><span class="count-num"> {{ item.articleComment }}</span>
                    </div>
                  </div>
                </div>
              </router-link>
            </div>
          </a-card>
        </div>
      </a-spin>
    </div>
    <a-button v-if="page.list.length < page.totalCount && page.list.length !== 0 && noMore !== true" style="width: 100%" :loading="loadingMore" @click="loadMore()">
      加载更多
    </a-button>
    <a-button v-else-if="page.list.length != 0" style="width: 100%" :loading="loadingMore">
      到底了
    </a-button>
    <!-- <el-pagination
      align="center"
      class="pagination"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="page.totalCount"
      @current-change="handleCurrentChange"
    /> -->
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
      isGood: false, // 判断是否已经点赞
      isCollection: false, // 判断是否已经收藏
      current: ['createdTime'],
      articleBodyStyle: {
        padding: '18px'
      },
      page: {
        currentPage: 1,
        pageSize: 10,
        totalCount: 0,
        totalPage: 0,
        params: {},
        sortColumn: 'createdTime',
        sortMethod: 'desc',
        list: []
      },
      loading: false,
      loadingMore: false,
      noMore: false,
      pageShow: false
    }
  },
  watch: {
    type: function() {
      this.page.currentPage = 1
      this.page.params.articleType = this.type.typeId
      this.getByPage(this.page)
    }
  },
  created() {
    this.getByPage()
  },
  methods: {
    getByPage() {
      this.loading = true
      articleApi.getByPage(this.page).then(res => {
        this.page = res.data
        this.loading = false
      })
    },
    scrollLoadMore(e) {
      // !this.moreLoading 没有在加载状态，触发加载更多时，把this.moreLoading置未true
      // !this.noMore 没有更多的状态为false，当我们取到的数据长度小于1页的数量时，就没有更多了数据了，把 this.noMore置为true，这样就不会触发无意义的加载更多了
      if (e.srcElement.scrollTop + e.srcElement.offsetHeight > e.srcElement.scrollHeight - 100 && !this.loadingMore && !this.noMore) {
        this.loadMore()
      }
    },
    loadMore() {
      if (this.noMore === false) {
        this.loadingMore = true
        this.page.currentPage += 1
        this.page.pageSize = 10
        articleApi.getByPage(this.page).then(res => {
          if (res.data.list.length < this.page.pageSize) {
            this.$message.warning('当前是最后一页了!')
            this.noMore = true
          }
          const dataList = res.data.list
          dataList.forEach(item => {
            this.page.list.push(item)
          })
          this.loadingMore = false
        })
      } else {
        this.$message.warning('当前是最后一页了!')
      }
    },
    // 每页大小改变 参数 value 为每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val
      // 重新请求,刷新页面
      this.getByPage()
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getByPage()
    },
    // 条件排序 e 和 val 都行
    changeSort(e) {
      this.page.sortColumn = e.key
      if (this.page.list.length >= 30) {
        this.page.pageSize = 10
      } else {
        this.page.pageSize = this.page.list.length
      }
      this.page.currentPage = 1
      this.getByPage(this.page)
    }
  }
}
</script>

<style scoped>
  .count-num {
    color: #349edf;
  }
  .scree-container {
    width: 850px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    line-height: 50px;
    background-color:white;
    border: 1px solid #e8e8e8;
  }
  .span-content {
    max-height: 1200px;
    overflow: auto;
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
  .article-list-container {
    max-height: 1250px;
    overflow: auto;
  }
  .article-main {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .article-container {
    width: 100%;
    min-height: 100px;
  }
  .action-icon :hover {
    color: #349edf;
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
    width: 100%;
    align-self: start;
    margin-bottom: 10px;
    font-size: 14px;
    color: #9c9ea8;
    line-height: 22px;
    /* max-height: 90px; */
    /* 超出隐藏 */
    white-space: nowrap;
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
  .article-image {
    width: 230px;
    height:110px;
    margin-right: 20px;
  }
  .article-cover {
    width: 100%;
    height:110px;
    border-radius: 5px;
  }
  .author-container {
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .image-article {
    width: 562px;
    min-height: 100px;
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
  }
  .article-container {
    min-width: 812px;
    min-height: 110px;
  }
  .author-img {
    width: 36px;
    height: 36px;
    margin-right: 15px;
    border-radius: 50%;
  }
  .article-author {
    font-size: 16px;
  }
  .article-other i{
    margin-left: 10px;
  }
  .pagination {
    margin-top: 25px;
  }
  .article-card {
    margin-bottom: 1px;
    border-radius: 5px;
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
