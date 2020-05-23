<template>
  <div id="c6" />
</template>

<script>
import { Chart, getEngine } from '@antv/g2'
const G = getEngine('canvas')
export default {
  data() {
    return {
      chart: null,
      data: [
        { sex: '男', percent: 0.76 },
        { sex: '女', percent: 0.24 }
      ]
    }
  },
  mounted() {
    this.initComponent()
  },
  methods: {
    initComponent() {
      const chart = new Chart({
        container: 'c6',
        autoFit: true,
        height: 310,
        padding: [20, 30, 30, 20]
      })

      chart.coordinate('theta', {
        radius: 0.8
      })

      chart.data(this.data)

      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })

      chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('sex', ['#1890ff', '#f04864'])
        .label('percent', {
          content: obj => {
            const group = new G.Group({})
            group.addShape({
              type: 'image',
              attrs: {
                x: 0,
                y: 0,
                width: 40,
                height: 50,
                img:
                  obj.sex === '男'
                    ? 'https://gw.alipayobjects.com/zos/rmsportal/oeCxrAewtedMBYOETCln.png'
                    : 'https://gw.alipayobjects.com/zos/rmsportal/mweUsJpBWucJRixSfWVP.png'
              }
            })

            group.addShape({
              type: 'text',
              attrs: {
                x: 20,
                y: 54,
                text: obj.sex,
                textAlign: 'center',
                textBaseline: 'top',
                fill: obj.sex === "男" ? '#1890ff' : '#f04864'
              }
            })
            return group
          }
        })

      chart.interaction('element-active')

      chart.render()
    }
  }
}
</script>

<style scoped>
</style>
