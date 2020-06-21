<template>
  <a-layout>
    <a-layout-content :style="{margin:'55px 15%'}">
      <h1>设置报告提交截止时间</h1>
      <el-select v-model="stape" filterable @change="changeStape">
        <el-option
          v-for="item in dateList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </a-layout-content>
    <a-layout-content :style="{margin:'25px 15%'}">
      <div :style="{float:'left'}">
        <h1>日报提交日期</h1>
        <a-tree
          v-model="dailyTime"
          checkable
          :auto-expand-parent="autoExpandParent"
          :tree-data="dailyData"
        />
      </div>
      <div :style="{marginLeft:'200px'}">
        <h1>周报提交日期</h1>
        <a-tree
          v-model="weeklyTime"
          checkable
          :auto-expand-parent="autoExpandParent"
          :tree-data="weeklyData"
        />
      </div>
      <a-button :style="{marginTop:'20px'}" type="primary" @click="reportTime">
        保存更改
      </a-button>
    </a-layout-content>
  </a-layout>
</template>
<script>
import ReportApi from '@/api/report/report.js'

const dailyData = [
  {
    title: '星期一',
    key: '1'
  },
  {
    title: '星期二',
    key: '2'
  },
  {
    title: '星期三',
    key: '3'
  },
  {
    title: '星期四',
    key: '4'
  },
  {
    title: '星期五',
    key: '5'
  },
  {
    title: '星期六',
    key: '6'
  },
  {
    title: '星期天',
    key: '0'
  }
]
const weeklyData = [
  {
    title: '星期一',
    key: '1'
  },
  {
    title: '星期二',
    key: '2'
  },
  {
    title: '星期三',
    key: '3'
  },
  {
    title: '星期四',
    key: '4'
  },
  {
    title: '星期五',
    key: '5'
  },
  {
    title: '星期六',
    key: '6'
  },
  {
    title: '星期天',
    key: '0'
  }
]
export default {
  data() {
    return {
      stape: 21,
      autoExpandParent: true,
      selectedKeys: [],
      dailyData,
      weeklyData,
      dailyTime: [],
      weeklyTime: [],
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
  watch: {
    checkedKeys(val) {
      console.log('onCheck', val)
    }
  },
  created() {
    ReportApi.getReportTime().then(res => {
      const reportTime = res.data
      this.dailyTime = reportTime[0].split(',')
      this.weeklyTime = reportTime[1].split(',')
    })
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
    },
    reportTime() {
      const daily = this.dailyTime.join(',')
      const weekly = this.weeklyTime.join(',')
      const rTime = [daily, weekly]
      ReportApi.setReportTime(rTime).then(res => {
        this.$message.success(res.msg)
      })
    }
  }
}
</script>

<style scoped>
</style>
