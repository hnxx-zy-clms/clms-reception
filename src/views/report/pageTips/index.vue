<template>
  <a-row type="flex">
    <!--    左侧批阅信息-->
    <a-col style="width: 33%;" :span="8" :push="0">
      <a-card style="min-width: 480px;height: 100%">
        <a-tag color="blue">批阅通知</a-tag>
        <a-timeline :style="{marginTop: '15px' }">
          <a-timeline-item v-for="item in minReportInfo" :key="item.reportId">
            {{ item.updatedTime }} : {{ item.isChecked }} 批阅了 {{ item.createdTime }} 的{{ item.reportType }}</a-timeline-item>
        </a-timeline>
      </a-card>
    </a-col>
    <!--    中间倒计时-->
    <a-col style="width: 33%;" :span="6" :pull="-5">
      <a-card style="min-width: 480px;height: 100%">
        <a-row :gutter="16" :style="{ background: '#fff', marginTop: '15px' ,marginRight:'15px',marginBottom:'20px'}">
          <a-col v-if="daily" :span="12">
            <a-statistic-countdown
              title="距今日日报截止时间"
              :value="getFullTime()"
              format="HH:mm:ss"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col v-else :span="12">
            <h2>日报提交未开启</h2>
          </a-col>
          <a-col v-if="weekly" :span="24" style="margin-top: 32px;">
            <a-statistic-countdown title="距本周周报截止时间" :value="getWeekDay()" format="D 天 H 时 m 分 s 秒" />
          </a-col>
          <a-col v-else :span="24" style="margin-top: 32px;">
            <h2>周报提交未开启</h2>
          </a-col>
          <a-col :span="36">
            <a-tag color="orange" style="margin-top: 16px;height: 36px;">
              <p style="margin-top: 5px;">时间截止后，不可提交、修改和删除今日报告！</p>
            </a-tag>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
    <!--    右侧提示-->
    <a-col style="width: 34%;" :span="6" :push="0">
      <a-card style="min-width: 410px;height: 100%;">
        <img
          slot="cover"
          alt="example"
          style="height: 200px"
          src="http://175.24.45.179/group1/M00/00/00/rBEABV7CWTCAI9VvAAKrM0mh1YI537.jpg"
        >
        <a-card-meta title="每日一句" description="路在脚下，更在心中。" />
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import Moment from 'moment'
import ReportApi from '@/api/report/report.js'

export default {
  data() {
    return {
      minReportInfo: {},
      stape: '22',
      daily: false,
      weekly: false
    }
  },
  created() {
    ReportApi.getReportTime().then(res => {
      const reportTime = res.data
      const dailyTime = reportTime[0].split(',')
      const weeklyTime = reportTime[1].split(',')
      const valDate = new Date().getDay()
      for (const value of dailyTime) {
        if (parseInt(value) === valDate) {
          this.daily = true
          break
        }
      }
      for (const value of weeklyTime) {
        if (parseInt(value) === valDate) {
          this.weekly = true
          break
        }
      }
    })
    ReportApi.getTime().then(res => {
      this.stape = res.data
    })
    ReportApi.getMinReportInfo().then(res => {
      this.minReportInfo = res.data
      this.minReportInfo.forEach(function(element) {
        element.reportType = element.reportType === 0 ? '日报' : '周报'
        element.isChecked = element.isChecked === 1 ? '组长' : element.isChecked === 2 ? '班长' : '教师'
      })
    })
  },
  methods: {
    getFullTime() {
      const parse = 'YYYY-MM-DD '
      const stamp = new Date()
      const time1 = Moment(stamp).format(parse.concat(this.stape, ':00:00'))
      // .replace(/-/g, '/') 解决ios端获取不到时间戳的问题
      return new Date(time1.replace(/-/g, '/')).getTime()
    },
    getWeekDay() {
      const parse = 'YYYY-MM-DD '
      const valDate = new Date().getDay()
      if (valDate === 0) {
        return this.getFullTime()
      } else {
        const difference = valDate - 7
        return new Date(Moment().subtract(difference, 'days').format(parse.concat(this.stape, ':00:00')).replace(/-/g, '/')).getTime()
      }
    },
    onFinish() {
      console.log('finished!')
    }
  }
}

</script>

<style scoped>
</style>
