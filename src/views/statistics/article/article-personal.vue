<template>
  <div>
    <div id="c2" />
  </div>
</template>

<script>
import G2 from '@antv/g2'
import DataSet from '@antv/data-set'
import { Chart } from '@antv/g2'
import articleApi from '@/api/article/article'
export default {
  data() {
    return {
      chart: null,
      userparam: {
        params: {
          articleAuthor: 'admin'
        },
        sortColumn: 'article_type',
        sortMethod: 'desc'
      },
      data: [
        // { name: "c", articleCounts: 7 },
        // { name: "springboot", articleCounts: 12 },
        // { name: "java", articleCounts: 5 },
        // { item: "python", 发表篇数: 4 },
        // { item: "php", 发表篇数: 6 },
        // { item: "软件测试", 发表篇数: 7 },
        // { item: "数据挖掘", 发表篇数: 5 },
        // { item: "go", 发表篇数: 3 },
        // { item: "c++", 发表篇数: 6 },
        // { name: "linux", articleCounts: 5 }
      ]
    }
  },
  watch: {
    data(b, a) {
      // this.chart.changeData(b);
      this.initComponent()
      // this.chart.render();
    }
  },
  mounted() {
    // this.initComponent();
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      articleApi.getUserArticleCountInfo(this.userparam).then(res => {
        console.log('before', this.data)
        this.data = res.data.list
        console.log(this.data)
      })
    },
    initComponent() {
      const { DataView } = DataSet

      const dv = new DataView().source(this.data)

      dv.transform({
        type: 'fold',
        fields: ['articleCounts'], // 展开字段集
        key: 'user', // key字段
        value: 'score' // value字段
      })

      const chart = new Chart({
        container: 'c2',
        autoFit: true,
        height: 310
      })

      chart.data(dv.rows)

      chart.scale('score', {
        min: 0,
        nice: true
      })

      chart.coordinate('polar', {
        radius: 0.8
      })

      chart.tooltip({
        shared: true,
        showCrosshairs: true, // 显示辅助虚线
        crosshairs: {
          line: {
            style: {
              lineDash: [4, 4], // 一组描述交替绘制线段和间距长度的数字
              stroke: '#333' // 虚线颜色
            }
          }
        }
      })

      // 坐标轴设置
      chart.axis('name', {
        line: null,
        tickLine: null,
        grid: {
          line: {
            style: {
              lineDash: null
            }
          }
        }
      })

      chart.axis('score', {
        line: null,
        tickLine: null,
        grid: {
          line: {
            type: 'line',
            style: {
              lineDash: null
            }
          }
        }
      })

      // 设置蓝线的粗细
      chart
        .line()
        .position('name*score')
        .color('user')
        .size(1)

      // 设置点的大小
      chart
        .point()
        .position('name*score')
        .color('user')
        .shape('circle')
        .size(3)
        .style({
          stroke: '#fff',
          lineWidth: 1,
          fillOpacity: 1
        })

      chart
        .area()
        .position('name*score')
        .color('user')

      this.chart = chart
      chart.render()
    }
  }
}
</script>

<style scoped>
</style>
