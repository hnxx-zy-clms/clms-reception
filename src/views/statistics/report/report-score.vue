<template>
  <div>
    <!-- <h2>
      <button @click="makeit">查看分数</button>
    </h2> -->
    <div id="c4"></div>
  </div>
</template>

<script>
import G2 from "@antv/g2";
import { Chart } from "@antv/g2";
export default {
  name: "Top3",
  data() {
    return {
      chart: null,
      data: [
        { day: "4-1", name: "平均", score: 7 },
        { day: "4-1", name: "张三", score: 6 },
        { day: "4-2", name: "平均", score: 6 },
        { day: "4-2", name: "张三", score: 7 },
        { day: "4-3", name: "平均", score: 8 },
        { day: "4-3", name: "张三", score: 7.5 },
        { day: "4-4", name: "平均", score: 7.5 },
        { day: "4-4", name: "张三", score: 8.5 },
        { day: "4-5", name: "平均", score: 8.5 },
        { day: "4-5", name: "张三", score: 9 },
        { day: "4-6", name: "平均", score: 8 },
        { day: "4-6", name: "张三", score: 8 },
        { day: "4-7", name: "平均", score: 7.5 },
        { day: "4-7", name: "张三", score: 6 }
      ]
    };
  },
  mounted(){
    this.initComponent()
  },
  methods: {
 
    initComponent() {

      const chart = new Chart({
        container: "c4",
        autoFit: true,
        height: 310
      });

      chart.data(this.data);

      chart.scale({
        day: {
          range: [0, 1]
        },
        score: {
          min: 0,
          max: 10,
          nice: true
        }
      });

      chart.tooltip({
        showCrosshairs: true,
        shared: true
      });

      chart.axis("score", {
        label: {
          formatter: val => {
            return val;
          }
        }
      });

      chart
        .line()
        .position("day*score")
        .color("name")
        .shape("smooth");

      chart
        .point()
        .position("day*score")
        .color("name")
        .shape("circle");

      chart.render();
    }
  }
};
</script>

<style scoped>
/* #c1 {
  height: 1000px;
  width: 1200px;
} */
</style>