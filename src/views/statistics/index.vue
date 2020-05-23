<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span class="visit">网站访问量</span>
            <el-button type="success" plain>今日访问量：666</el-button>
            <el-button type="warning">总访问量：6666</el-button>
          </div>
          <!-- <el-button type="success" plain>今日访问量：666</el-button>
          <el-button type="warning">总访问量：6666</el-button> -->
          <web-visits />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>班级分布统计</span>
          </div>
          <class-classes />
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>班级人员统计</span>
          </div>
          <class-sex />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="15">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>文章类型统计</span>
          </div>
          <div class="grid-content bg-purple">
            <article-type class="articletypecount" />
            <div class="mytable">
              <el-card class="table-box-card">
                <el-table :data="tableData" class="ranktable">
                  <el-table-column prop="rank" label="名次" width="130" />
                  <el-table-column prop="name" label="姓名" width="130" />
                  <el-table-column prop="count" label="发表数" />
                </el-table>
              </el-card>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="9">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人文章发表统计</span>
          </div>

          <article-personal />
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20">
      <el-col :span="9">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>本组日(周)报提交统计</span>
          </div>
          <report-group />
          <!-- </div> -->
        </el-card>
      </el-col>
      <el-col :span="15">
        <el-card class="box-card">
          <div slot="header" class="clearfix">
            <span>个人日(周)报分数统计</span>
          </div>
          <report-score />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import articleApi from '@/api/article/article'
import ArticleType from '@/views/statistics/article/article-type'
import ArticlePersonal from '@/views/statistics/article/article-personal'
import ReportGroup from '@/views/statistics/report/report-group'
import ReportScore from '@/views/statistics/report/report-score'
import ClassSex from '@/views/statistics/class/class-sex'
import ClassClasses from '@/views/statistics/class/class-classes'
import WebVisits from '@/views/statistics/visits/web-visits'
export default {
  components: {
    ArticleType,
    ArticlePersonal,
    ReportGroup,
    ReportScore,
    ClassSex,
    ClassClasses,
    WebVisits
  },

  data() {
    return {
      topparam: {
        pageSize: 3,
        currentPage: 1,
        sortColumn: 'articleCounts',
        sortMethod: 'desc'
      },
      tableData: []
    }
  },
  mounted() {
    this.getTopData()
  },
  methods: {
    getTopData() {
      articleApi.getArticleCountInfo(this.topparam).then(res => {
        this.tableData = []
        for (let i = 0; i < res.data.list.length; i++) {
          var articletopdata = { rank: i + 1, name: res.data.list[i].name, count: res.data.list[i].articleCounts }
          this.tableData.push(articletopdata)
        }
      })
    }
  }
}
</script>

<style>
.bg-purple {
  padding-top: 30px;
  padding-bottom: 30px;
  background: white;
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.text {
  font-size: 14px;
}
.item {
  margin-bottom: 18px;
}
.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}
.ranktable {
  width: 430px;
  height: 250px;
}
.articletypecount {
  position: relative;
  float: left;
  margin-right: 50px;
}
.table-box-card {
  height: 250px;
}
.visit{
  padding-right: 20px;
}
</style>
