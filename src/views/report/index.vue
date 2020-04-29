<template>
  <div>
    <a-layout id="content" :style="{display:'flex'}">
      <a-layout-header :style="{height:'59px', background: '#fff', width: '100%' }">
        <a-date-picker :style="{background: '#fff', marginRight:'15px' }" :default-value="moment(data, dateFormat)" disabled />第十周
      </a-layout-header>
      <a-layout-content :style="{ background: '#fff', marginTop: '5px'}">
        <a-row type="flex">
          <a-col style="width: 33%;" :span="8" :push="0">
            <a-card style="min-width: 480px;height: 100%">
              <a-tag color="blue">批阅通知</a-tag>
              <a-timeline :style="{marginTop: '15px' }" pending="Recording..." :reverse="reverse">
                <a-timeline-item>Create a services site 2015-09-01</a-timeline-item>
                <a-timeline-item>Solve initial network problems 2015-09-01</a-timeline-item>
                <a-timeline-item>Technical testing 2015-09-01</a-timeline-item>
              </a-timeline>
            </a-card>
          </a-col>
          <a-col style="width: 33%;"  :span="6" :pull="-5">
            <a-card style="min-width: 480px;height: 100%">
              <page-tips :style="{ background: '#fff', marginTop: '15px' ,marginRight:'15px',marginBottom:'20px'}" />
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
        <a-divider :style="{ marginTop: '1px' }" />
        <add-report :style="{marginLeft:'15px',marginBottom:'20px' }" />
      </a-layout-content>
      <a-layout-content :style="{ background: '#fff', marginTop: '5px' }">
        <report-list :style="{ background: '#fff', marginTop: '15px',marginLeft:'15px',marginBottom:'20px' }" />
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
    moment
  }
}
</script>
