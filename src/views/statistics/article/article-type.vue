<template>
  <!-- <div> -->
  <div id="c1"></div>
  <!-- <div id="c1"></div> -->
  <!-- </div> -->
</template>

<script>
import G2 from "@antv/g2";
import { Chart } from "@antv/g2";
import typeApi from "@/api/article/type";

export default {
  data() {
    return {
      //   chart: null,
      chart1: null,
      typeparam: {
        sortColumn: "type_count",
        sortMethod: "desc"
      },
    
      mydata: [
        // { name: "SpringBoot", typeCounts: 30, percent: 0.4 },
        // { name: "Java", typeCounts: 21, percent: 0.21 },
        // { name: "C", typeCounts: 17, percent: 0.17 },
        // { name: "Python", typeCounts: 13, percent: 0.13 },
        // { name: "MySql", typeCounts: 9, percent: 0.09 }
      ],
      top: []
    };
  },
  watch: {
    mydata(b, a) {
      this.chart1.changeData(b);
      this.chart1.render();
    }
  },
  mounted() {
    this.initComponent();
  },

  created() {
    this.getData();
  },
  methods: {

    getData() {
      typeApi.getArticleTypeCountInfo(this.typeparam).then(res => {
        this.mydata = res.data.list;
        
      });
    },
    
    initComponent() {
      const chart1 = new Chart({
        container: "c1",
        autoFit: true,
        height: 250
      });

      chart1.data(this.mydata);

      chart1.scale("typeCounts", {
        nice: true
      });

      chart1.tooltip({
        showMarkers: false
      });

      chart1.interaction("active-region");

      chart1
        .interval()
        .position("name*typeCounts")
        .color("name");

      this.chart1 = chart1
      chart1.render();
    }
  }
};
</script>

<style scoped>
#c1 {
  position: relative;
  height: 250px;
  width: 450px;
  margin-left: 50px;
  /* border: solid; */
  /* float: left; */
}
/* #c1 {
    position: relative;
  height: 200px;
  width: 300px;
  margin-right: 10px;
  float: right; 
} */
</style>