<template>
  <div
    v-infinite-scroll="handleInfiniteOnLoad"
    class="demo-infinite-container"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
  >
    <a-list :data-source="data">
      <a-card-grid slot="renderItem" slot-scope="item,index" @click="taskreply(index)">
        <div class="title">{{ item.taskTitle }}</div>
        <div class="content" v-html="item.taskContent" />
        <div class="des">
          <span class="nowarp">{{ item.userName + '发布于' + item.pushedTime }}</span>
          <div class="statu">
            <div class="statuitem" :class="[item.taskUser?'finishcolor':'processcolor']" />
            <span class="nowarp" v-if="item.taskUser">已完成</span>
            <span class="nowarp" v-else>未完成</span>
            <template v-for="(level,index) in item.taskUser">
              <div :key="index" class="statuitem" :class="[!level == 0?'finishcolor':'processcolor']" />
              <span class="nowarp" v-if="!level == 0" :key="index+1">已批阅</span>
              <span class="nowarp" v-else :key="index+2">未批阅</span>
            </template>
          </div>
        </div>
      </a-card-grid>
      <div v-if="loading && !busy" class="demo-loading-container">
        <a-spin />
      </div>
    </a-list>
  </div>
</template>

<script>
import taskApi from '@/api/tasknotice/task'
import infiniteScroll from 'vue-infinite-scroll'
import { mapGetters } from 'vuex'

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
          type: 0, // 查询类型  0全部  1 已完成 2未完成
          role: 'student'
        }, // 查询参数对象
        sortColumn: 'created_time', // 排序列
        sortMethod: 'desc' // 排序方式
      },
      data: [],
      dataindex: '', // 数据的序号
      loading: false,
      busy: false,
      visible: false, // 控制弹窗
      isload: true // 是否继续加载
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    handleInfiniteOnLoad() {
      const data = this.data
      this.loading = true
      if (this.isload === false) {
        this.$message.warning('全部加载完毕')
        this.busy = true
        this.loading = false
        return
      }
      taskApi.getUserTask(this.page, this.userId).then(res => {
        if (res.data.list.length === 0) {
          this.isload = false
        }
        this.data = data.concat(res.data.list)
        this.loading = false
        this.page.currentPage++
      })
    },
    taskreply(index) {
      const taskid = this.data[index].taskId
      this.$router.push({ path: 'reply', query: { taskid }})
    }
  }
}
</script>

<style scoped>
  .demo-infinite-container {
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    overflow: auto;
    height: 525px;
    margin-top: 20px;
  }
  .demo-infinite-container::-webkit-scrollbar {
    width: 4px; /*height: 4px;*/
  }

  .demo-infinite-container::-webkit-scrollbar-thumb {
    border-radius: 10px;
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    background: rgba(0, 0, 0, 0.2);
  }
  .demo-loading-container {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
  }
  .demo-infinite-container::-webkit-scrollbar-track {
    -webkit-box-shadow: inset 0 0 5px rgba(0, 0, 0, 0.2);
    border-radius: 0;
    background: rgba(0, 0, 0, 0.1);
  }
  .ant-card-grid {
    background-color: white;
    width: 391px;
    height: 164px;
    margin: 0 5px 10px 0px;
    cursor: pointer;
  }
  .title {
    height: 20px;
    margin-bottom: 8px;
    color: #0366D6;
    font-size: 16px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .content {
    height: 60px;
    font-size: 14px;
    overflow: hidden;
    line-height: 20px;
    font-weight: 600;
  }
  .des {
    margin-top: 15px;
    display: flex;
  }
  .statu{
    display: flex;
    align-items: center;
    width: 150px;
  }
  .statuitem {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    margin-left: 20px;
  }
  .finishcolor {
    background-color: green;
  }
  .processcolor {
    background-color: yellow;
  }
  .nowarp {
    white-space: nowrap;
  }
</style>
