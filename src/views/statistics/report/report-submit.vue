<template>
  <div id="c7" />
</template>

<script>
import G2 from '@antv/g2'
import { Chart } from '@antv/g2'
export default {
  data() {
    return {
      data: [
        { city: '第一组', type: '已批阅', value: 0.31 },
        { city: '第一组', type: '未批阅', value: 0.53 },
        { city: '第一组', type: '未提交', value: 0.16 },
        { city: '第二组', type: '已批阅', value: 0.21 },
        { city: '第二组', type: '未批阅', value: 0.6 },
        { city: '第二组', type: '未提交', value: 0.19 },
        { city: '第三组', type: '已批阅', value: 0.02 },
        { city: '第三组', type: '未批阅', value: 0.3 },
        { city: '第三组', type: '未提交', value: 0.68 }
      ]
    }
  },
  watch: {
    data(b, a) {
      //   this.chart.changeData(b);
      //   console.log("改变的小组日报数据", b);
      //   this.chart.render();
    }
  },
  mounted() {
    this.initComponent()
  },
  created() {
    // this.getUserGroup();
    // this.getUserGroupReport();
    // this.userIds = this.userId;
    // console.log('userids:', this.userIds)
  },
  methods: {
    // getUserGroup() {
    //   console.log("userid", this.userId);
    //   userApi
    //     .getUserGroup(this.userId)
    //     .then(res => {
    //       console.log("小组", res);
    //       this.page.params.userGroupId = res;
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    // getUserGroupReport() {
    //   reportApi
    //     .getUserReportInfo(this.page)
    //     .then(res => {
    //       this.data = res.data.list;
    //       console.log("获取组id后的数据", res);
    //     })
    //     .catch(error => {
    //       console.log(error);
    //     });
    // },
    initComponent() {
      const chart = new Chart({
        container: 'c7',
        autoFit: true,
        height: 310,
        width: 400
      })

      chart.data(this.data)

      chart.scale('value', {
        alias: '占比（%）'
      })
      chart.axis('city', {
        tickLine: null,
        line: null
      })
      chart.axis('value', {
        label: null,
        title: {
          style: {
            fontSize: 14,
            fontWeight: 300
          }
        },
        grid: null
      })
      chart.legend({
        position: 'top'
      })
      chart.coordinate('rect').transpose()
      chart.tooltip({
        shared: true,
        showMarkers: false
      })
      chart.interaction('active-region')
      chart
        .interval()
        .adjust('stack')
        .position('city*value')
        .color('type*city', (type, city) => {
          if (type === '已批阅') {
            return '#1890ff'
          }
          if (type === '未批阅') {
            return '#7FC9FE'
          }
          if (type === '未提交') {
            return '#f0f2f3'
          }
          if (type === '已批阅' && city === '第一组') {
            return '#f5222d'
          }
        })
        .size(26)
        .label('value*type', (val, t) => {
          const color = t === '已批阅' ? 'white' : '#47494b'
          if (val < 0.05) {
            return null
          }
          return {
            position: 'middle',
            offset: 0,
            style: {
              fontSize: 12,
              fill: color,
              lineWidth: 0,
              stroke: null,
              shadowBlur: 2,
              shadowColor: 'rgba(0, 0, 0, .45)'
            }
          }
        })
      chart.render()
    }
  }
}
</script>

<style scoped>
</style>
