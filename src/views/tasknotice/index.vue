<template>
  <div class="container">
    <div class="noticetodo">
      <a-card :body-style="bodystyle">
        <a-icon
          v-if="leftTitle==='通知'?1:0"
          type="notification"
          style="font-size: 24px;line-height: inherit; margin: 5px 12px 0 4.8px;"
        />
        <a-icon
          v-else-if="leftTitle==='待办'?1:0"
          type="highlight"
          style="font-size: 24px;line-height: inherit; margin: 5px 12px 0 4.8px;"
        />
        <div class="title">{{ leftTitle }}</div>
        <div class="selector">
          <a-dropdown v-if="leftselected" :trigger="['click']">
            <a-menu slot="overlay" @click="lefthandleMenuClick">
              <a-menu-item key="全部">全部</a-menu-item>
              <a-menu-item key="已读">已读</a-menu-item>
              <a-menu-item key="未读">未读</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> {{ leftselectTitle }}
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
          <a-date-picker v-else style="width: 50%" :placeholder="date" :format="format" @change="onChange">
            <a-icon slot="suffixIcon" type="smile" />
          </a-date-picker>
        </div>
        <div class="orderselector">
          <a-button type="link" :style="{ 'opacity': leftselected ? .8 : .3 } " @click="changeSelect(1,'通知')">通知
          </a-button>
          <a-button type="link" :style="{ 'opacity': !leftselected ? .8 : .3 }" @click="changeSelect(1,'待办')">待办
          </a-button>
        </div>
      </a-card>
      <notice v-if="leftTitle==='通知'?1:0" ref="notice" />
      <todo v-else ref="todo" />
    </div>

    <div class="tasksign">
      <a-card :body-style="bodystyle">
        <svg
          t="1587898805458"
          class="icon"
          style="margin-left: 10px;"
          viewBox="0 0 1024 1024"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          p-id="1242"
          width="32"
          height="32"
        >
          <path
            d="M896 21.333333H128C91.733333 21.333333 64 49.066667 64 85.333333v853.333334c0 36.266667 27.733333 64 64 64h768c36.266667 0 64-27.733333 64-64V85.333333c0-36.266667-27.733333-64-64-64z m21.333333 917.333334c0 12.8-8.533333 21.333333-21.333333 21.333333H128c-12.8 0-21.333333-8.533333-21.333333-21.333333V85.333333c0-12.8 8.533333-21.333333 21.333333-21.333333h768c12.8 0 21.333333 8.533333 21.333333 21.333333v853.333334z"
            fill="#666767"
            p-id="1243"
          />
          <path
            d="M258.133333 275.2m-44.8 0a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 1 0-89.6 0Z"
            fill="#666767"
            p-id="1244"
          />
          <path
            d="M258.133333 490.666667m-44.8 0a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 1 0-89.6 0Z"
            fill="#666767"
            p-id="1245"
          />
          <path
            d="M258.133333 706.133333m-44.8 0a44.8 44.8 0 1 0 89.6 0 44.8 44.8 0 1 0-89.6 0Z"
            fill="#666767"
            p-id="1246"
          />
          <path
            d="M789.333333 251.733333H384c-12.8 0-21.333333 10.666667-21.333333 21.333334s10.666667 21.333333 21.333333 21.333333h405.333333c12.8 0 21.333333-10.666667 21.333334-21.333333s-10.666667-21.333333-21.333334-21.333334zM789.333333 469.333333H384c-12.8 0-21.333333 10.666667-21.333333 21.333334s10.666667 21.333333 21.333333 21.333333h405.333333c12.8 0 21.333333-10.666667 21.333334-21.333333s-10.666667-21.333333-21.333334-21.333334zM789.333333 684.8H384c-12.8 0-21.333333 10.666667-21.333333 21.333333s10.666667 21.333333 21.333333 21.333334h405.333333c12.8 0 21.333333-10.666667 21.333334-21.333334s-10.666667-21.333333-21.333334-21.333333z"
            fill="#666767"
            p-id="1247"
          />
        </svg>
        <div class="title">{{ rightTitle }}</div>
        <div class="selector">
          <a-dropdown :trigger="['click']">
            <a-menu slot="overlay" @click="righthandleMenuClick">
              <a-menu-item key="全部">全部</a-menu-item>
              <a-menu-item key="已完成">已完成</a-menu-item>
              <a-menu-item key="未完成">未完成</a-menu-item>
            </a-menu>
            <a-button style="margin-left: 8px"> {{ rightselectTitle }}
              <a-icon type="down" />
            </a-button>
          </a-dropdown>
        </div>
        <div class="orderselector">
          <a-button type="link" :style="{ 'opacity': rightselected ? .8 : .3 } " @click="changeSelect(2,'任务')">任务
          </a-button>
          <a-button type="link" :style="{ 'opacity': !rightselected ? .8 : .3 }" @click="changeSelect(2,'签到')">签到
          </a-button>
        </div>
      </a-card>
      <div>
        <Task v-if="rightTitle==='任务'?1:0" ref="task"></Task>
        <Registration v-else></Registration>
      </div>
    </div>
  </div>
</template>

<script>
import Notice from './notice'
import Todo from './todo'
import Task from './task'
import Registration from './registration'

export default {
  components: {
    Notice,
    Todo,
    Task,
    Registration
  },
  data() {
    return {
      leftselectTitle: '全部',
      rightselectTitle: '全部',
      tasksigntitle: '全部',
      leftTitle: '通知',
      rightTitle: '任务',
      leftselected: true,
      rightselected: true,
      format: 'YYYY-MM-DD',
      bodystyle: {
        padding: '0px',
        display: 'flex',
        alignItems: 'center',
        height: '42px',
        width: '100%'
      }
    }
  },
  computed: {
    date() {
      return this.dateFilter()
    }
  },
  methods: {
    lefthandleMenuClick(key) { // 左边菜单选择框
      this.leftselectTitle = key.key
      if (key.key === '全部') {
        this.$refs.notice.page.params.type = 0
      }
      if (key.key === '已读') {
        this.$refs.notice.page.params.type = 1
      }
      if (key.key === '未读') {
        this.$refs.notice.page.params.type = 2
      }
      this.$refs.notice.page.currentPage = 1
      this.$refs.notice.data = []
      this.$refs.notice.handleInfiniteOnLoad()
    },
    righthandleMenuClick(key) {
      this.rightselectTitle = key.key
      if (key.key === '全部') {
        this.$refs.task.page.params.type = 0
      }
      if (key.key === '已完成') {
        this.$refs.task.page.params.type = 1
      }
      if (key.key === '未完成') {
        this.$refs.task.page.params.type = 2
      }
      this.$refs.task.isload = true
      this.$refs.task.page.currentPage = 1
      this.$refs.task.data = []
      this.$refs.task.handleInfiniteOnLoad()
    },
    tasksigMenuClick(key) {
      this.selecttitle = key.key
    },
    changeSelect(which, data) { // 标题切换
      if (which === 1) {
        if (this.leftTitle === data) {
          return false
        } else {
          this.leftTitle = data
          this.leftselected = !this.leftselected
        }
      } else {
        if (this.rightTitle === data) {
          return false
        } else {
          this.rightTitle = data
          this.rightselected = !this.rightselected
        }
      }
    },
    onChange(date, dateString) { // 更改日期时获取该日期的待办
      this.$refs.todo.handleInfiniteOnLoad(dateString)
    },
    dateFilter() { // 格式化时间
      var d = new Date()
      var year = d.getFullYear()
      var month = d.getMonth() < 9 ? '0' + (d.getMonth() + 1) : '' + (d.getMonth() + 1)
      var day = d.getDate() < 10 ? '0' + d.getDate() : '' + d.getDate()
      return (year + '-' + month + '-' + day)
    }
  }
}
</script>
<style scoped>
  .container {
    display: flex;
    position: relative;
    justify-content: flex-start;
  }

  .noticetodo {
    height: 550px;
    flex-direction: column;
    width: 408px;
    margin-left: 30px;
  }
  .tasksign {
    width: 808px;
    height: 550px;
    margin-left: 60px;
    display: flex;
    flex-direction: column;
  }

  .title {
    font-size: 16px;
    width: 35px;
    margin: 0 12px 0 10px;
    font-family: Verdana, Geneva, Microsoft YaHei, Microsoft JhengHei, Helvetica Neue, sans-serif;
  }
  .orderselector {
    width: 90px;
  }

  .selector {
    width: 220px;
    flex-grow: 1;
  }

  .ant-btn-link {
    color: #646c7b;
    padding: 0px;
    width: 43px;
    font-size: 15px;
    opacity: .3;
  }

  .ant-btn-link:hover {
    opacity: 1 !important;
  }

  .ant-card {
    display: flex;
    justify-content: flex-start;
    height: auto;
    width: 100%;
  }
  .ant-calendar-picker {
    margin-left: 20px;
  }

</style>
