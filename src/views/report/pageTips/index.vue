<template>
  <a-row type="flex">
    <!--    左侧批阅信息-->
    <a-col style="width: 33%;" :span="8" :push="0">
      <a-card style="min-width: 480px;height: 100%">
        <a-tag color="blue">批阅通知</a-tag>
        <a-timeline :style="{marginTop: '15px' }" pending="更多...">
          <a-timeline-item v-for="(item,i) in minReportInfo" :key="item.reportId">
            {{ item.updatedTime }} : {{ item.isChecked }} 批阅了 {{ item.createdTime }} 的{{ item.reportType }}</a-timeline-item>
        </a-timeline>
      </a-card>
    </a-col>
    <!--    中间倒计时-->
    <a-col style="width: 33%;" :span="6" :pull="-5">
      <a-card style="min-width: 480px;height: 100%">
        <a-row :gutter="16" :style="{ background: '#fff', marginTop: '15px' ,marginRight:'15px',marginBottom:'20px'}">
          <a-col :span="12">
            <a-statistic-countdown
              title="距今日日报截止时间"
              :value="today"
              format="HH:mm:ss:SSS"
              style="margin-right: 50px"
            />
          </a-col>
          <a-col :span="24" style="margin-top: 32px;">
            <a-statistic-countdown title="距本周周报截止时间" :value="deadline" format="D 天 H 时 m 分 s 秒" />
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
      <a-card style="min-width: 410px;height: 100%">
        <img
          slot="cover"
          alt="example"
          style="height: 200px"
          src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
        >
        <a-card-meta title="每日一句" description="路在脚下，更在心中。" />
      </a-card>
    </a-col>
  </a-row>
</template>
<script>
import Moment from 'moment'
import ReportApi from '@/api/report/report.js'
function getWeekDay() {
  const valDate = new Date().getDay()
  if (valDate === 0) {
    return getFullTime()
  } else {
    const difference = valDate - 7
    return Moment().subtract(difference, 'days').format('YYYY-MM-DD') + ' 22:00:00'
  }
}

function getFullTime() {
  const stamp = new Date()
  const time = Moment(stamp).format('YYYY-MM-DD') + ' 22:00:00'
  return time
}

export default {
  data() {
    return {
      minReportInfo: {},
      // .replace(/-/g, '/') 解决ios端获取不到时间戳的问题
      deadline: new Date(getWeekDay().replace(/-/g, '/')).getTime(),
      today: new Date(getFullTime().replace(/-/g, '/')).getTime()
    }
  },
  created() {
    ReportApi.getMinReportInfo().then(res => {
      this.minReportInfo = res.data
      for (var i = 0; i < 3; i++) {
        this.minReportInfo[i].reportType = this.minReportInfo[i].reportType === 0 ? '日报' : '周报'
        this.minReportInfo[i].isChecked = this.minReportInfo[i].isChecked === 1 ? '组长' : this.minReportInfo[i].isChecked === 2 ? '班长' : '教师'
      }
    })
  },
  methods: {
    onFinish() {
      console.log('finished!')
    }
  }
}

</script>

<style scoped>

</style>
