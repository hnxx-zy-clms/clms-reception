<template>
  <a-layout>
    <a-layout-content :style="{margin:'55px 15%'}">
      <h1>设置报告提交时间</h1>
      <el-select v-model="stape" filterable @change="changeStape">
        <el-option
          v-for="item in dateList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </a-layout-content>
  </a-layout>
</template>
<script>
import ReportApi from '@/api/report/report.js'
export default {
  data() {
    return {
      stape: 21,
      dateList: [{
        value: 22,
        label: '22'
      }, {
        value: 21,
        label: '21'
      }, {
        value: 20,
        label: '20'
      }, {
        value: 19,
        label: '19'
      }, {
        value: 18,
        label: '18'
      }, {
        value: 17,
        label: '17'
      }, {
        value: 16,
        label: '16'
      }, {
        value: 15,
        label: '15'
      }]
    }
  },
  created() {
    ReportApi.getTime().then(res => {
      this.stape = res.data
      this.dateList = this.dateList.filter(d => {
        return d.value > new Date().getHours()
      })
    })
  },
  methods: {
    changeStape(e) {
      ReportApi.setTime(e).then(res => {
        this.$message.success(res.msg)
      })
    }
  }
}
</script>

<style scoped>
</style>
