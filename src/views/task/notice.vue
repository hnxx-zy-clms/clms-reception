<template>
  <div
      class="demo-infinite-container"
      v-infinite-scroll="handleInfiniteOnLoad"
      :infinite-scroll-disabled="busy"
      :infinite-scroll-distance="10"
  >
    <a-list :dataSource="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <a-list-item-meta :description="item.noticeContent">
          <a slot="title" :href="item.noticeTitle">{{ item.noticeTitle }}</a>
        </a-list-item-meta>
        <div>Content</div>
      </a-list-item>
      <div v-if="loading && !busy" class="demo-loading-container">
        <a-spin />
      </div>
    </a-list>
  </div>
</template>

<script>
import noticeApi from '@/api/notice'
import infiniteScroll from 'vue-infinite-scroll'

export default {
  directives: { infiniteScroll },
  data() {
    return {
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {
          role: 'student'
        }, // 查询参数对象
        list: [], // 数据
        sortColumn: 'created_time', // 排序列
        sortMethod: 'desc' // 排序方式
      },
      data: [],
      loading: false,
      busy: false
    }
  },
  beforeCreated() {
    this.getNoticeList()
  },
  methods: {
    getNoticeList() {
      noticeApi.getByPage(this.page).then(res => {
        this.data = res.data.list
        console.log(this.data)
      })
    },
    handleInfiniteOnLoad() {
      const data = this.data
      this.loading = true
      if (data.length > 100) {
        this.$message.warning('Infinite List loaded all')
        this.busy = true
        this.loading = false
        return
      }
      noticeApi.getByPage(this.page).then(res => {
        this.data = data.concat(res.data.list)
        this.loading = false
        console.log(this.data)
      })
    }
  }
}
</script>

<style scoped>
  .demo-infinite-container {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    padding: 8px 24px;
    height: 300px;
  }
  .demo-loading-container {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
  }
</style>
