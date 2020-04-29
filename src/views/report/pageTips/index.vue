<template>
  <a-row :gutter="16">
    <a-col :span="12">
      <a-statistic-countdown
        title="Countdown"
        :value="deadline"
        style="margin-right: 50px"
        @finish="onFinish"
      />
    </a-col>
    <a-col :span="12">
      <a-statistic-countdown
        title="今日日报截止时间"
        :value="today"
        format="HH:mm:ss:SSS"
        style="margin-right: 50px"
      />
    </a-col>
    <a-col :span="24" style="margin-top: 32px;">
      <a-statistic-countdown title="本周周报截止时间" :value="deadline" format="D 天 H 时 m 分 s 秒" />
    </a-col>
  </a-row>
</template>
<script>
export default {
  data() {
    return {
      deadline: Date.now() + 1000 * 60 * 60 * 24 * 4 + 1000 * 60 * 60 * 22,
      today: Date.now() + 1000 * 60 * 60 * 22
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
