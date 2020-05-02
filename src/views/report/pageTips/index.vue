<template>
  <a-row type="flex">
    <a-col style="width: 33%;" :span="8" :push="0">
      <a-card style="min-width: 480px;height: 100%">
        <a-tag color="blue">批阅通知</a-tag>
        <a-timeline :style="{marginTop: '15px' }" pending="加载中...">
          <a-timeline-item>组长批阅了你的报告 2020-05-01 22:00:00</a-timeline-item>
          <a-timeline-item>班长批阅了你的报告 2020-05-01 22:00:00</a-timeline-item>
          <a-timeline-item>教师批阅了你的报告 2020-05-01 22:00:00</a-timeline-item>
        </a-timeline>
      </a-card>
    </a-col>
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
        </a-row>
      </a-card>
    </a-col>
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

function getWeekDay() {
  const valDate = new Date().getDay()
  const difference = valDate - 7
  return Moment().subtract(difference, 'days').format('YYYY-MM-DD') + ' 22:00:00'
}

function getFullTime() {
  const stamp = new Date()
  const time = Moment(stamp).format('YYYY-MM-DD') + ' 22:00:00'
  return time
}

export default {
  data() {
    return {
      deadline: new Date(getWeekDay()).getTime(),
      today: new Date(getFullTime()).getTime()
    }
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
