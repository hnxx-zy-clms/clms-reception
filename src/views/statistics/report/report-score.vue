<template>
  <div>
    <!-- <h2>
      <button @click="makeit">查看分数</button>
    </h2> -->
    <div id="c4" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import G2 from '@antv/g2'
import { Chart } from '@antv/g2'
import reportApi from '@/api/report/marking'
export default {
  name: 'Top3',
  data() {
    return {
      chart: null,
      scorepage: {
        pageSize: 20,
        currentPage: 1,
        params: {
          userName: ''
        }
      },
      data: [
        // { day: '4-1', name: '平均', score: 7 },
        // { day: '4-1', name: '张三', score: 6 },
        // { day: '4-2', name: '平均', score: 6 },
        // { day: '4-2', name: '张三', score: 7 },
        // { day: '4-3', name: '平均', score: 8 },
        // { day: '4-3', name: '张三', score: 7.5 },
        // { day: '4-4', name: '平均', score: 7.5 },
        // { day: '4-4', name: '张三', score: 8.5 },
        // { day: '4-5', name: '平均', score: 8.5 },
        // { day: '4-5', name: '张三', score: 9 },
        // { day: '4-6', name: '平均', score: 8 },
        // { day: '4-6', name: '张三', score: 8 },
        // { day: '4-7', name: '平均', score: 7.5 },
        // { day: '4-7', name: '张三', score: 6 }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  watch: {
    data(b, a) {
      this.chart.changeData(b)
      this.chart.render()
    }
  },
  mounted() {
    this.initComponent()
  },
  created() {
    this.getMarkingScore()
    this.scorepage.params.userName = this.name
  },
  methods: {
    getMarkingScore() {
      reportApi
        .getMarkingScore(this.scorepage)
        .then(res => {
          this.data = res.data.list
          // console.log(res.data.list)
        })
        .catch(error => {
          console.log(error)
        })
    },
    initComponent() {
      const chart = new Chart({
        container: 'c4',
        autoFit: true,
        height: 310
      })

      chart.data(this.data)

      chart.scale({
        type: {
          range: [0, 1]
        },
        value: {
          min: 0,
          max: 10,
          nice: true
        }
      })

      chart.tooltip({
        showCrosshairs: true,
        shared: true
      })

      chart.axis('value', {
        label: {
          formatter: val => {
            return val
          }
        }
      })

      chart
        .line()
        .position('type*value')
        .color('state')
        .shape('smooth')

      chart
        .point()
        .position('type*value')
        .color('state')
        .shape('circle')

      chart.render()
      this.chart = chart
    }
  }
}
</script>

<style scoped>
/* #c1 {
  height: 1000px;
  width: 1200px;
} */
</style>
