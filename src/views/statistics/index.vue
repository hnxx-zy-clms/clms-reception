<template>
  <div>
    <el-card class="box-card-main box-card">
      <el-tabs v-model="activeName">
        <el-tab-pane label="班级模块" name="first">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>班级分布统计</span>
                </div>
                <class-classes />
              </el-card>
            </el-col>
            <el-col :span="12">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>班级人员统计</span>
                </div>
                <class-sex />
              </el-card>
            </el-col>
          </el-row>
        </el-tab-pane>
        <el-tab-pane label="文章模块" name="second">
          <el-row :gutter="20">
            <el-col :span="15">
              <el-card class="box-card">
                <div slot="header" class="clearfix">
                  <span>文章类型统计</span>
                </div>
                <article-type class="articletypecount" />
                <!-- <div class="mytable">
                    <el-card class="table-box-card">
                      <el-table :data="tableData" class="ranktable">
                        <el-table-column prop="rank" label="名次" width="130" />
                        <el-table-column prop="name" label="姓名" width="130" />
                        <el-table-column prop="count" label="发表数" />
                      </el-table>
                    </el-card>
                </div> -->
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
        </el-tab-pane>
        <el-tab-pane label="日报模块" name="third">
          <el-carousel trigger="click" height="500px">
            <el-carousel-item>
              <el-row :gutter="20">
                <el-col :span="9">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>本组日(周)报提交统计</span>
                    </div>
                    <report-group />
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
            </el-carousel-item>
            <el-carousel-item>
              <el-row :gutter="20">
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>日(周)报提交情况</span>
                      <el-popover placement="right" width="350" trigger="click" class="myseletor">
                        <div class="namelist">
                          <el-tag v-for="o in notNames" :key="o" type="danger" class="mytab">{{ o }}</el-tag>
                        </div>
                        <el-button slot="reference" type="primary" plain class="mybutton">查看未提交名单</el-button>
                      </el-popover>
                      <el-date-picker
                        v-model="mytime"
                        class="mypicker"
                        align="right"
                        type="date"
                        placeholder="选择日期"
                        :picker-options="pickerOptions"
                        format="yyyy 年 MM 月 dd 日"
                        value-format="yyyy-MM-dd"
                        @change="getNotReport"
                      />
                      <!-- @change="findByDate" -->
                    </div>
                    <report-submit />
                  </el-card>
                </el-col>
                <el-col :span="12">
                  <el-card class="box-card">
                    <div slot="header" class="clearfix">
                      <span>日(周)报提交次数</span>
                      <el-select v-model="value" placeholder="请选择" class="myseletor">
                        <el-option
                          v-for="item in options"
                          :key="item.value"
                          :label="item.label"
                          :value="item.value"
                        />
                      </el-select>
                    </div>
                    <report-count />
                  </el-card>
                </el-col>
              </el-row>
            </el-carousel-item>
          </el-carousel>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script>
import articleApi from '@/api/article/article'
import ReportApi from '@/api/report/report'
import ArticleType from '@/views/statistics/article/article-type'
import ArticlePersonal from '@/views/statistics/article/article-personal'
import ReportGroup from '@/views/statistics/report/report-group'
import ReportScore from '@/views/statistics/report/report-score'
import ClassSex from '@/views/statistics/class/class-sex'
import ClassClasses from '@/views/statistics/class/class-classes'
import ReportSubmit from '@/views/statistics/report/report-submit'
import ReportCount from '@/views/statistics/report/report-count'
import Moment from 'moment'
export default {
  components: {
    ArticleType,
    ArticlePersonal,
    ReportGroup,
    ReportScore,
    ClassSex,
    ClassClasses,
    ReportSubmit,
    ReportCount
  },

  data() {
    return {
      topparam: {
        pageSize: 3,
        currentPage: 1,
        sortColumn: 'articleCounts',
        sortMethod: 'desc'
      },
      dialogVisible: false,
      tableData: [],
      activeName: 'first',
      options: [
        {
          value: '选项1',
          label: '第一组'
        },
        {
          value: '选项2',
          label: '第二组'
        },
        {
          value: '选项3',
          label: '第三组'
        },
        {
          value: '选项4',
          label: '第四组'
        }
      ],
      notNames: [],
      value: '选项1',
      mytime: '2020-06-11',
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
        shortcuts: [
          {
            text: '今天',
            onClick(picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '昨天',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24)
              picker.$emit('pick', date)
            }
          },
          {
            text: '一周前',
            onClick(picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      }
    }
  },
  created() {
    this.mytime = Moment(new Date()).format('YYYY-MM-DD')
    this.getNotReport()
  },
  mounted() {
    this.getTopData()
  },
  methods: {
    getNotReport() {
      ReportApi.getNotReport(0, this.mytime).then(res => {
        this.notNames = res.data
      })
    },
    getTopData() {
      articleApi.getArticleCountInfo(this.topparam).then(res => {
        this.tableData = []
        for (let i = 0; i < res.data.list.length; i++) {
          var articletopdata = {
            rank: i + 1,
            name: res.data.list[i].name,
            count: res.data.list[i].articleCounts
          }
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
  width: 440px;
  height: 250px;
}
/* .articletypecount {
  position: relative;
  float: left;
  margin-right: 50px;
} */
.table-box-card {
  height: 250px;
}
.visit {
  padding-right: 20px;
}
.box-card-main {
  margin-top: 20px;
  margin-right: 50px;
  margin-left: 50px;
  margin-bottom: 20px;
  height: 580px;
}
.box-card {
  margin: 25px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 150px;
  margin: 0;
}
.mybutton,
.myseletor,
.mypicker {
  float: right;
  margin-right: 10px;
  margin-left: 10px;
}
.namelist {
  display: flex;
  flex-wrap: wrap;
  padding: 1%;
}
.mytab {
  margin: 10px;
}
</style>
