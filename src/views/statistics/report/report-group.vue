<template>
  <!-- <p>用户ID: {{ userId }}</p> -->
  <div id="c3" />
</template>

<script>
import moment from 'moment'
import userApi from '@/api/user/userInfo.js'
import reportApi from '@/api/report/report.js'
import { mapGetters } from 'vuex'
import G2 from '@antv/g2'
import { Chart } from '@antv/g2'
export default {
  data() {
    return {
      userIds: '',
      chart: null,
      // today: new Date(),
      page: {
        pageSize: 20,
        currentPage: 1,
        params: {
          reportType: 0,
          userClassesId: 1,
          userGroupId: 2,
          isClasses: 0,
          time: moment(new Date()).format('YYYY-MM-DD')
        }
      },
      data: [{ type: '', value: 0 }]
    }
  },
  computed: {
    ...mapGetters([
      'userId'
    ])
  },
  watch: {
    data(b, a) {
      this.chart.changeData(b)
      // console.log("wisdom", b)
      this.chart.render()
    }
  },
  mounted() {
    this.initComponent()
  },
  created() {
    // this.getUserGroup()
    // var d = new Date()
    console.log('jintianderiqishi', moment(new Date()).format('YYYY-MM-DD'))
    this.getUserGroupReport()
    this.userIds = this.userId
  },
  methods: {
    // getUserGroup() {
    //   userApi
    //     .getUserGroup(3)
    //     .then(res => {
    //       console.log('小组', res)
    //       this.data.type = res
    //     })
    //     .catch(error => {
    //       console.log(error)
    //     })
    // },
    getUserGroupReport() {
      reportApi
        .getUserReportInfo(this.page)
        .then(res => {
          this.data = res.data.list
          console.log(res.data.list)
        })
        .catch(error => {
          console.log(error)
        })
    },
    initComponent() {
      const chart = new Chart({
        container: 'c3',
        autoFit: true,
        height: 310
      })

      chart.data(this.data)

      chart.legend(false)

      // chart.legend({
      //     position: "center"
      // })

      chart.tooltip({
        showMarkers: false
      })

      // 分面绘制
      chart.facet('rect', {
        fields: ['type'],
        padding: 20,
        showTitle: false, // 不显示图表上方标题
        eachView: (view, facet) => {
          const data = facet.data
          let color = '#99CCFF'
          // console.log("changdushi",this.data.length)

          //   if (data[0].type === "第一组") {
          //     color = "#0a9afe"
          //   }
          //   else if(data[0].type === "第二组"){
          //       color = "lightgreen"
          //   }
          //   else if(data[0].type === "第三组"){
          //       color = "purple"
          //   }
          //   else {
          //     color = "#f0657d"
          //   }

          data.push({ type: '未提交', value: 100 - data[0].value })

          view.data(data)

          view.coordinate('theta', {
            radius: 0.8,
            innerRadius: 0.5
          })

          view
            .interval()
            .adjust('stack')
            .position('value')
            .color('type', [color, '#eceef1'])
            .style({
              opacity: 1
            })

          // hover
          view.annotation().text({
            position: ['50%', '50%'],
            content: data[0].type,
            style: {
              fontSize: 12,
              fill: '#8c8c8c',
              fontWeight: 300,
              textBaseline: 'bottom',
              textAlign: 'center'
            },
            offsetY: -12
          })

          view.annotation().text({
            position: ['50%', '50%'],
            content: data[0].value + '%',
            style: {
              fontSize: 18,
              fill: '#000',
              fontWeight: 500,
              textAlign: 'center'
            },
            offsetY: 10
          })

          view.interaction('element-active')
        }
      })
      this.chart = chart
      chart.render()
    }
  }
}
</script>

<style scoped>
</style>
