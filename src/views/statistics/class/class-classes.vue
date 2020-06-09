<template>
  <div>
    <div id="c5" />
  </div>
</template>

<script>
import classApi from '@/api/classes/classes.js'
import G2 from '@antv/g2'
import { Chart } from '@antv/g2'
export default {
  data() {
    return {
      chart: null,
      data: [
        // { item: '17软件工程1班', count: 40, percent: 0.4 },
        // { item: '17软件工程2班', count: 21, percent: 0.21 },
        // { item: '17网络工程1班', count: 17, percent: 0.17 },
        // { item: '17物联网1班', count: 13, percent: 0.13 },
        // { item: '18软件技术4班', count: 9, percent: 0.09 }
      ]
    }
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
    this.getData()
  },
  methods: {
    getData() {
      classApi.getClassNum().then(res => {
        this.data = res.data
        // console.log('class:', this.data)
      })
    },
    initComponent() {
      const chart = new Chart({
        container: 'c5',
        autoFit: true,
        height: 310
      })

      chart.data(this.data)

      chart.coordinate('theta', {
        radius: 0.85
      })

      chart.scale('percent', {
        formatter: val => {
          val = val * 100 + '%'
          return val
        }
      })
      chart.tooltip({
        showTitle: false,
        showMarkers: false
      })
      chart.axis(false)// 关闭坐标轴
      const interval = chart
        .interval()
        .adjust('stack')
        .position('percent')
        .color('item')
        .label('percent', {
          offset: -40,
          style: {
            textAlign: 'center',
            shadowBlur: 2,
            shadowColor: 'rgba(0, 0, 0, .45)',
            fill: '#fff'
          }
        })
        .tooltip('item*percent', (item, percent) => {
          percent = percent * 100 + '%'
          return {
            name: item,
            value: percent
          }
        })
        .style({
          lineWidth: 1,
          stroke: '#fff'
        })
      chart.interaction('element-single-selected')
      this.chart = chart
      chart.render()

      // 默认选择
      // interval.elements[0].setState("selected", true);
    }
  }
}
</script>
