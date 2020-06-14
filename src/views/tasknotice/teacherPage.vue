<template>
  <div style="height: 100%">
    <div class="top">
      <!--顶部左边-->
      <div class="topleft">
        <a-avatar
          :src="imageUrl"
          size="large"
          :style="{ height: '72px', width: '72px' }"
        />
        <div class="content">
          <div class="content-title">
            {{ welcomeText }}<span class="welcome-text">，欢迎</span>
          </div>
          <div style="font-size: 16px">卓越班教师</div>
        </div>
      </div>
      <!--顶部右边-->
      <div class="topright">
        <div class="extra-content">
          <div class="stat-item">
            <a-statistic title="发布任务数" :value="taskNum" />
          </div>
          <div class="stat-item">
            <a-statistic title="发布通知数" :value="noticeNum" />
          </div>
        </div>
      </div>
    </div>

    <div class="bottom">
      <div class="infinite-container">
        <a-card
          style="width:100%"
          :tab-list="tabListNoTitle"
          :active-tab-key="TitleKey"
          @tabChange="key => onTabChange(key, 'TitleKey')"
        >
          <p v-if="TitleKey === 'task'">
            <TaskSituation ref="TaskSituation" @getTaskNum="getTaskNum"/>
          </p>
          <p v-else-if="TitleKey === 'notice'">
            <NoticeSituation ref="NoticeSituation" @getNoticeNum="getNoticeNum"/>
          </p>
          <a v-if="TitleKey === 'task'" slot="tabBarExtraContent" @click="openAddDialog">添加任务</a>
          <a v-if="TitleKey === 'notice'" slot="tabBarExtraContent" @click="openAddDialogNotice">添加通知</a>
        </a-card>
      </div>
    </div>
  </div>
</template>

<script>

import noticeApi from '@/api/tasknotice/notice'
import taskApi from '@/api/tasknotice/task'
import { mapGetters } from 'vuex'
import TaskSituation from './task/task-situation'
import NoticeSituation from './notice/notice-situation'
export default {
  name: 'TeacherPage',
  components: {
    NoticeSituation,
    TaskSituation
  },
  data() {
    return {
      tabListNoTitle: [
        {
          key: 'task',
          tab: '任务'
        },
        {
          key: 'notice',
          tab: '通知'
        }
      ],
      taskNum: 0,
      noticeNum: 0,
      imageUrl: this.$store.getters.userIcon,
      name: this.$store.getters.name,
      headstyle: { 'color': '#0785fd', 'font-weight': 'bold' },
      TitleKey: 'task'
    }
  },
  mounted() {
    this.getTaskNum()
    this.getNoticeNum()
  },
  computed: {
    welcomeText() {
      return this.timeFix() + ',' + this.name
    },
    ...mapGetters([
      'userId'
    ])
  },
  methods: {
    timeFix() {
      const time = new Date()
      const hour = time.getHours()
      return hour < 9 ? '早上好' : hour <= 11 ? '上午好' : hour <= 13 ? '中午好' : hour < 20 ? '下午好' : '晚上好'
    },
    getTaskNum() {
      taskApi.getTaskNum(this.userId).then(res => {
        this.taskNum = res.data
      })
    },
    getNoticeNum() {
      noticeApi.getNoticeNum(this.userId).then(res => {
        this.noticeNum = res.data
      })
    },
    onTabChange(key, type) {
      console.log(key, type)
      this[type] = key
    },
    getByPage() {
      this.loading = true
      taskApi.getByPage(this.page).then(res => {
        this.page.totalCount = res.data.totalCount
        this.taskData = res.data.list
        this.loading = false
      })
    },
    getByPageNotice() {
      this.loading = true
      noticeApi.getByPageTeacher(this.page).then(res => {
        this.noticeData = res.data.list
        this.loading = false
      })
    },
    openAddDialog() {
      // 打开添加弹窗
      this.$refs.TaskSituation.openAddDialog()
    },
    openAddDialogNotice() {
      this.$refs.NoticeSituation.openAddDialogNotice()
    }
  }
}
</script>

<style scoped>
  .infinite-container {
    background-color: white;
    border: 1px solid #e8e8e8;
    border-radius: 4px;
    margin-top: 2%;
    margin-left: 4%;
    width: 100%;
  }
  .infinite-container::-webkit-scrollbar {
    width: 4px; /*height: 4px;*/
  }

  .infinite-container::-webkit-scrollbar-thumb {
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
  .top {
    margin-left: 4%;
    display: flex;
    flex-direction: row;
    background-color: white;
    padding: 20px;
    justify-content: space-between;
  }
  .bottom {
    display: flex;
    width: 100%;
  }
  .topleft{
    display: flex;
    height: min-content;
    margin-top: 2%;
  }
  .topright{
    display: flex;
    height: min-content;
    margin-top: 2%;
  }
  .bottomleft {
    width: 60%;
  }
  .task-container {
    width:33%;
    height: 100px;
    display:flex;
    flex-direction: column;
  }
  .content {
    position: relative;
    top: 4px;
    margin-left: 24px;
    color: rgba(0, 0, 0, 0.45);
    line-height: 22px;
  }
  .content-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, 0.85);
    font-weight: 500;
    font-size: 20px;
    line-height: 28px;
  }
  .stat-item {
    position: relative;
    display: inline-block;
    padding: 0 32px;
    text-align: center;
  }
</style>

