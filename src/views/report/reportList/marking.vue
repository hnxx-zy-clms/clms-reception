<template>
  <a-skeleton :style="{minWidth:'225px'}" :paragraph="{ rows: 4}" :loading="loading" active>
    <a-comment>
      <a slot="author">{{ reportMarking.groupName }} {{ reportMarking.groupLeaderScore }} 分</a>
      <a-avatar slot="avatar" style="color: #f56a00; backgroundColor: #fde3cf">
        组长
      </a-avatar>
      <p slot="content">{{ reportMarking.groupLeaderComment }}</p>
      <a-tooltip slot="datetime">
        <span>{{ reportMarking.groupTime }}</span>
      </a-tooltip>
    </a-comment>
    <a-comment v-if="reportMarking.monitorName !==null">
      <a slot="author">{{ reportMarking.monitorName }} {{ reportMarking.monitorScore }} 分</a>
      <a-avatar slot="avatar" style="color: #fff; backgroundColor: #52c41a">
        班长
      </a-avatar>
      <p slot="content">{{ reportMarking.monitorComment }}</p>
      <a-tooltip slot="datetime">
        <span>{{ reportMarking.monitorTime }}</span>
      </a-tooltip>
    </a-comment>
    <a-comment v-if="reportMarking.teacherName!==null">
      <a slot="author">{{ reportMarking.teacherName }}  {{ reportMarking.teacherScore }} 分</a>
      <a-avatar slot="avatar" style="color: #fff; backgroundColor: #108ee9">
        教师
      </a-avatar>
      <p slot="content">{{ reportMarking.teacherComment }}</p>
      <a-tooltip slot="datetime">
        <span>{{ reportMarking.teacherTime }}</span>
      </a-tooltip>
    </a-comment>
  </a-skeleton>
</template>

<script>
import MarkingApi from '@/api/report/marking'
export default {
  props: {
    report: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      loading: true,
      reportMarking: {}
    }
  },
  created() {
    this.getUserMarkingById(this.report)
  },
  methods: {
    getUserMarkingById(reportId) {
      MarkingApi.getUserMarkingById(reportId).then(res => {
        this.reportMarking = res.data
        this.loading = false
      })
    }
  }
}
</script>

<style scoped>

</style>
