<template>
  <div class="good-collection-container">
    <!-- 消息中间列表 -->
    <div class="collection-list">
      <a-list item-layout="horizontal" :data-source="page.list">
        <a-list-item slot="renderItem" key="item.collectionId" slot-scope="item">
          <div v-if="item.collectionType === 1">
            <a-tag color="red">文章</a-tag>
            <span>{{ item.collectionTime }}</span> 收藏了文章
            <router-link :to="'articleRead/'+item.articleId">
              <a>{{ item.articleTitle }}</a>
            </router-link>
          </div>
          <div v-if="item.collectionType === 2">
            <a-tag color="green">提问</a-tag>
            <span>{{ item.collectionTime }}</span> 收藏了提问
            <router-link :to="'questionInfo/'+item.questionId">
              <a>{{ item.questionDescription }}</a>
            </router-link>
          </div>
        </a-list-item>
      </a-list>
    </div>
    <el-pagination
      v-if="page.list.length < page.totalCount"
      align="center"
      class="question-pagination"
      :current-page="page.currentPage"
      :page-size="page.pageSize"
      layout="total, prev, pager, next, jumper"
      :total="page.totalCount"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import collectionApi from '@/api/article/collection'
export default {
  data() {
    return {
      page: {
        currentPage: 1,
        pageSize: 15,
        totalCount: 0,
        totalPage: 0,
        params: {
          userId: this.$store.getters.userId
        },
        sortColumn: 'collectionTime',
        sortMethod: 'desc',
        list: []
      }
    }
  },
  created() {
    this.getByPage()
  },
  methods: {
    getByPage() {
      collectionApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    },
    // 每页大小改变 参数 value 为每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val
      // 重新请求,刷新页面
      this.getByPage(this.page)
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getByPage(this.page)
    }
  }
}
</script>

<style scoped>
  .good-collection-container {
    margin-top: 24px;
    margin-right: 24px;
    min-height: 830px;
  }
  .top-action {
    width: 100%;
    height: 60px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
  }
  .top-action span{
    margin-left: 20px;
    margin-right: 6px;
  }
  .collection-list {
    padding: 0 0 0 15px;
  }
</style>
