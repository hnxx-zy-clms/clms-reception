<template>
  <div id="c7" />
</template>

<script>
import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'
export default {
  data() {
    return {
      chart: null,
      data: [
        { Date: '1-1', 总访问量: 500, 单日访问量: 125 },
        { Date: '1-2', 总访问量: 600, 单日访问量: 150 },
        { Date: '1-3', 总访问量: 1000, 单日访问量: 250 },
        { Date: '1-4', 总访问量: 2000, 单日访问量: 500 },
        { Date: '1-5', 总访问量: 2500, 单日访问量: 625 },
        { Date: '1-6', 总访问量: 2600, 单日访问量: 525 }
      ]
    }
  },
  mounted() {
    this.initComponent()
  },
  methods: {
    initComponent() {
      const chart = new Chart({
        container: 'c7',
        autoFit: true,
        height: 290,
        padding: 0
      })
      chart.scale('Date', {
        range: [0, 1],
        tickCount: 10,
        type: 'timeCat',
        mask: 'MM-DD'
      })
      chart.scale({
        range: {
          nice: true,
          sync: true
        },
        value: {
          nice: true,
          sync: true
        }
      })
      chart.axis('value', {
        label: {
          formatter: (text) => {
            return text.replace(/(\d)(?=(?:\d{3})+$)/g, '$1,')
          }
        }
      })
      chart.tooltip({
        showCrosshairs: true,
        shared: true
      })

      const ds = new DataSet()

      // view1
      const dv = ds
        .createView()
        .source(this.data)
        .transform({
          type: 'map',
          callback(row) {
            row.range = [row.总访问量, row.单日访问量]
            return row
          }
        })
      const view1 = chart.createView({
        padding: [8, 8, 48, 64]
      })
      view1.data(dv.rows)
      view1.axis(false)
      view1.tooltip(false)
      view1
        .area()
        .position('Date*range')
        .color('#8d8d8d')
        .style({
          fillOpacity: 0.1
        })

      // view2
      const dv2 = ds
        .createView()
        .source(this.data)
        .transform({
          type: 'fold',
          fields: ['总访问量', '单日访问量'],
          key: 'type',
          value: 'value',
          retains: ['Date']
        })
      const view2 = chart.createView({
        padding: [8, 8, 48, 64]
      })
      view2.data(dv2.rows)
      view2
        .line()
        .position('Date*value')
        .color('type')
      view2
        .point()
        .position('Date*value')
        .color('type')
        .shape('circle')

      chart.removeInteraction('legend-filter') // 关闭图例过滤交互

      chart.render()
    }
  }
}
</script>

<style scoped>
  /* #c7{
      margin-left: -20px;
  } */
</style>
