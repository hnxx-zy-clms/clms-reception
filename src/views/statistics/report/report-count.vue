<template>
  <div id="c8" />
</template>

<script>
import G2 from '@antv/g2'
import { Chart } from '@antv/g2'
export default {
  data() {
    return {
      data: [
        { name: '张浩', value: 16 },
        { name: '彭向文', value: 13 },
        { name: '彭方', value: 15 },
        { name: '陈利辉', value: 9 },
        { name: '邓腾飞', value: 8 },
        { name: '包鋆宣', value: 10 },
        { name: '谢厚康', value: 11 }
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
        container: 'c8',
        autoFit: true,
        height: 310,
        width: 600,
        padding: [20, 20, 50, 30]
      })

      chart.data(this.data)

      chart.scale('value', {
        alias: '提交次数'
      })
      chart.axis('name', {
        tickLine: null
      })
      chart.axis('value', {
        label: null,
        title: {
          offset: 20,
          style: {
            fill: '#aaa'
          }
        }
      })
      chart.tooltip({
        showMarkers: false
      })
      chart
        .interval()
        .position('name*value')
        .color('name')
        .label('value', {
          offset: 10,
          style: {
            fill: '#595959',
            fontSize: 12
          }
        })
      chart.interaction('element-highlight')
      chart.render()
    }
  }
}
</script>

<style scoped>
</style>
