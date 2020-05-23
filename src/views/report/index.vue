<template>
  <div>
    <a-layout id="content" :style="{display:'flex'}">
      <!--      头部-->
      <a-layout-content :style="{height:'250px', background: '#fff', width: '100%' }">
        <img
          :style="{height:'250px',width: '100%' }"
          src="http://175.24.45.179/group1/M00/00/00/rBEABV7ClwOAItYoAAv3qZuHQAQ354.png"
        >
      </a-layout-content>
      <!--      中间Tips-->
      <a-layout-content v-if="roles !==3 " :style="{margin: '0 25px', background: '#fff', marginTop: '10px'}">
        <page-tips />
        <a-divider :style="{ marginTop: '1px' }" />
        <add-report :style="{marginLeft:'15px',marginBottom:'20px' }" @getpage=" getaddpage" />
      </a-layout-content>
      <!--      中间报告内容-->
      <a-layout-content v-if="roles !==3 " :style="{margin: '0 25px 25px 25px', background: '#fff', marginTop: '5px' }">
        <report-list ref="child" :style="{ background: '#fff', marginTop: '15px',marginLeft:'15px',marginBottom:'20px' }" />
      </a-layout-content>
      <a-layout-content v-else :style="{margin: '5px 15px 15px 15px'}">
        <marking />
      </a-layout-content>
    </a-layout>
  </div>
</template>
<script>
import moment from 'moment'
import AddReport from './addReport'
import ReportList from './reportList'
import PageTips from './pageTips'
import { mapGetters } from 'vuex'
import Marking from './marking'
export default {
  components: {
    AddReport,
    ReportList,
    PageTips,
    Marking
  },
  data() {
    this.dateFormat = 'YYYY-MM-DD'
    return {
      data: new Date()
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  methods: {
    moment,
    getaddpage() {
      this.$refs.child.getByPage()
    }
  }
}
</script>
