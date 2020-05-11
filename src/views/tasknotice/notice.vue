<template>
  <div
    v-infinite-scroll="handleInfiniteOnLoad"
    class="demo-infinite-container"
    :infinite-scroll-disabled="busy"
    :infinite-scroll-distance="10"
  >
    <a-list :data-source="data">
      <a-list-item slot="renderItem" slot-scope="item,index" @click="showModal(item,index)">
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
    <a-modal title="通知详情" v-model="visible" @ok="hideModal" okText="确认" cancelText="取消">
      <a-spin :spinning="spinning"/>
      <pre style="white-space: pre-wrap;">{{notice.noticeContent}}</pre>
    </a-modal>
  </div>
</template>

<script>
import noticeApi from '@/api/tasknotice/notice'
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
          type: 0 // 查询类型  0全部  1 已读 2未读
        }, // 查询参数对象
        sortColumn: 'created_time', // 排序列
        sortMethod: 'desc' // 排序方式
      },
      data: [],
      notice: [],
      dataindex: '',
      loading: false,
      busy: false,
      spinning: false,
      visible: false, // 控制弹窗
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
      noticeApi.getByPage(this.page, this.userId).then(res => {
        this.data = data.concat(res.data.list)
        this.loading = false
        this.page.currentPage++
      })
    },
    hideModal() {
      if (this.notice.ifRead === true) {
        this.visible = false
        return
      } else {
        this.spinning = true
        noticeApi.setRead(this.notice.noticeId, this.userId).then(res => {
          this.data[this.dataindex].ifRead = true
          this.spinning = false
          this.visible = false
        })
      }
      this.notice = ''
      this.index = ''
    },
    showModal(item, index) {
      this.dataindex = index
      this.notice = item
      this.visible = true
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
    height: 525px;
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
    cursor: pointer;
  }
  .single-left {
    display: flex;
    flex-direction: column;
    margin-left: 10px;
    width: 100%;
    overflow: hidden
  }
  .noticeTitle {
    color: #333;
    font-size: 15px;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-left: 10px;
  }
  .nameTime {
    font-size: 13px;
    color: #C2C5CD;
    display: flex;
    padding-left: 10px;
  }
</style>
