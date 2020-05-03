<template>
  <div>
    <a-layout id="content" :style="{display:'flex'}">
      <!--      头部-->
      <a-layout-header :style="{height:'59px', background: '#fff', width: '100%' }">
        <a-date-picker :style="{background: '#fff', marginRight:'15px' }" :default-value="moment(data, dateFormat)" disabled />第十周
      </a-layout-header>
      <!--      中间Tips-->
      <a-layout-content :style="{ background: '#fff', marginTop: '5px'}">
        <page-tips />
        <a-divider :style="{ marginTop: '1px' }" />
        <add-report :style="{marginLeft:'15px',marginBottom:'20px' }" @getpage=" getaddpage" />
      </a-layout-content>
      <!--      中间报告内容-->
      <a-layout-content :style="{ background: '#fff', marginTop: '5px' }">
        <report-list ref="child" :style="{ background: '#fff', marginTop: '15px',marginLeft:'15px',marginBottom:'20px' }" />
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import moment from 'moment'
import AddReport from './addReport'
import ReportList from './reportList'
import PageTips from './pageTips'
export default {
  components: {
    AddReport,
    ReportList,
    PageTips
  },
  data() {
    this.dateFormat = 'YYYY-MM-DD'
    return {
      data: new Date()
    }
  },
  methods: {
    moment,
    getaddpage() {
      this.$refs.child.getByPage()
    }
  }
}
</script>
