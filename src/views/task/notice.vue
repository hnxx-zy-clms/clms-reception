<template>
  <div
    v-infinite-scroll="handleInfiniteOnLoad"
    class="demo-infinite-container"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
  >
    <a-list :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item">
        <div class="ifRead">
          <a-tag color="#108ee9" style="height: 40px;text-align: center;line-height: 40px;" v-if=item.ifRead>已读</a-tag>
          <a-tag color="orange" style="height: 40px;text-align: center;line-height: 40px;" v-else>未读</a-tag>
        </div>
        <div class="single-left">
          <div class="noticeTitle">{{item.noticeTitle}}</div>
          <div class="nameTime">
            <div style="margin-right: 20px;">
              {{item.userName}}
            </div>
            <div>
              {{item.createdTime}}
            </div>
          </div>
        </div>
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
import Cookies from 'js-cookie'

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
          type: 0 // 查询类型  0全部  1 已读 2未读
        }, // 查询参数对象
        sortColumn: 'created_time', // 排序列
        sortMethod: 'desc' // 排序方式
      },
      data: [],
      loading: false,
      busy: false,
      userid: ''
    }
  },
  mounted() {
    this.userid = Cookies.get('userid')
  },
  methods: {
    handleInfiniteOnLoad() {
      const data = this.data
      this.loading = true
      if (data.length > 100) {
        this.$message.warning('Infinite List loaded all')
        this.busy = true
        this.loading = false
        return
      }
      noticeApi.getByPage(this.page, this.userid).then(res => {
        this.data = data.concat(res.data.list)
        this.loading = false
        this.page.currentPage++
      })
    }
  }
}
</script>

<style scoped>
  .demo-infinite-container {
    background-color: white;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    padding: 8px 24px;
    height: 480px;
    margin-top: 20px;
  }

  .demo-loading-container {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
  }

  .demo-infinite-container::-webkit-scrollbar {
    width: 4px; /*height: 4px;*/
  }

  .demo-infinite-container::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }

  .demo-infinite-container::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  .ant-list-item {
    justify-content: flex-start;
    align-items: flex-start;
  }
  .single-left {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    width: 100%;
    overflow: hidden
  }
  .ifRead {

  }
  .noticeTitle {
    color: #333;
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .nameTime {
    font-size: 13px;
    color: #C2C5CD;
    display: flex;
    padding-left: 10px;
  }
</style>
