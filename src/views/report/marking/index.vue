<template>
  <div>
    <a-layout id="content" :style="{margin:'10px 35px 35px 35px',display:'flex'}">
      <!--      头部-->
      <a-layout-content :style="{height:'48px',background: '#F0F2F5', width: '100%' }">
        <p v-if="roles === 1" :style="{float:'left',fontSize:'20px',marginRight:'10px'}">组长报告批阅</p>
        <p v-else :style="{float:'left',fontSize:'20px',marginRight:'10px'}">班长报告批阅</p>
        <div :style="{marginTop:'5px'}">
          <a-tag v-if="day < 22" color="blue">
            今日日报提交中
          </a-tag>
          <a-tag v-else color="red">
            今日日报提交截止
          </a-tag>
          <a-tag v-if="week !== 6 && day < 22" color="blue">
            本周周报提交中
          </a-tag>
          <a-tag v-else color="red">
            本周周报提交截止
          </a-tag>
          <a-button :style="{ float: 'right',fontSize:'15px',marginBottom:'15px'}" type="link" @click="goback">
            返回
          </a-button>
        </div>
      </a-layout-content>
      <!--      中间Tips-->
      <a-layout-content :style="{ background: '#fff', marginTop: '5px'}">
        <a-menu v-model="current" mode="horizontal">
          <a-menu-item key="login" @click="notMarkingInfo">待批报告</a-menu-item>
          <a-menu-item key="register" @click="markingInfo">已批报告</a-menu-item>
        </a-menu>
        <p style="margin: 10px 10px 10px 10px;color: #8c939d">截止时间前，当天报告暂不显示
          <a v-if="roles === 2" style="margin: 10px 10px 10px 10px;color: #8c939d">组长未批阅提交报告暂不显示</a></p>
      </a-layout-content>
      <!--      中间报告内容-->
      <a-layout-content :style="{ background: '#fff', marginTop: '5px' }">
        <div :style="{ background: '#fff', margin: '15px 15px 15px 15px' }">
          <!--    报告类型按钮组-->
          <a-radio-group
            class="editable-add-btn"
            :style="{ background: '#fff', marginBottom: '15px' }"
            default-value="0"
            @change="handleFormLayoutChange"
          >
            <a-radio-button id="dailyB" value="0">
              日报
            </a-radio-button>
            <a-radio-button value="1">
              周报
            </a-radio-button>
          </a-radio-group>
          <!--    显示报告表格-->
          <a-table
            :pagination="false"
            :style="{ marginRight:'15px' }"
            :bordered="true"
            :columns="columns"
            :data-source="page.list"
            :row-key="record => record.reportId"
          >
            <span slot="customTitle"><a-icon type="smile-o" /> 日期 </span>
            <p slot="expandedRowRender" slot-scope="record" style="margin: 0">
             报告ID： {{ record.reportId }}
            </p>
            <!--      操作报告-->
            <span slot="action" slot-scope="scope">
              <a-button v-if=" !markingState" type="primary" :style="{background:'#87d068',color:'#fff',marginBottom: '5px'}" @click="showModal(scope)">
                批阅
              </a-button>
              <a-popover v-else placement="leftTop" title="批阅信息">
                <template slot="content">
                  <marking :report="scope.reportId" />
                </template>
                <a-button type="primary">
                  批阅信息
                </a-button>
              </a-popover>
            </span>
          </a-table>
          <!--    底部分页栏-->
          <a-pagination
            v-model="page.currentPage"
            :style="{ marginTop:'20px',marginLeft:'45%' }"
            :show-total="total => `共 ${total} 条`"
            size="small"
            :page-size="page.pageSize"
            :total="page.totalCount"
            show-quick-jumper
            @change="pageChange"
          />
        </div>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import MarkingApi from '@/api/report/marking'
import Marking from '../reportList/marking'
import { mapGetters } from 'vuex'
const columns = [
  {
    dataIndex: 'createdTime',
    key: 'createdTime',
    slots: { title: 'customTitle' },
    width: '8%',
    align: 'center',
    scopedSlots: { customRender: 'createdTime' }
  },
  {
    title: '姓名',
    dataIndex: 'name',
    width: '7%',
    align: 'center',
    key: 'name'
  },
  {
    title: '组名',
    dataIndex: 'userGroupId',
    width: '6%',
    align: 'center',
    key: 'userGroupId'
  },
  {
    title: '工作内容',
    dataIndex: 'workContent',
    width: '14%',
    align: 'center',
    key: 'workContent'
  },
  {
    title: '遇到的困难',
    width: '15%',
    align: 'center',
    dataIndex: 'difficulty',
    key: 'difficulty'
  },
  {
    title: '解决方法',
    key: 'solution',
    width: '15%',
    align: 'center',
    dataIndex: 'solution'
  },
  {
    title: '心得体会',
    key: 'experience',
    width: '15%',
    align: 'center',
    dataIndex: 'experience'
  },
  {
    title: '后续计划',
    key: 'plan',
    width: '15%',
    align: 'center',
    dataIndex: 'plan'
  },
  {
    title: '操作',
    key: 'action',
    width: '5%',
    scopedSlots: { customRender: 'action' }
  }
]
export default {
  name: 'Index',
  components: {
    Marking
  },
  data() {
    return {
      markingState: false,
      current: ['login'],
      columns,
      week: new Date().getDay(),
      day: new Date().getHours(),
      page: {
        currentPage: 1,
        pageSize: 5,
        totalCount: 0,
        totalPage: 0,
        params: { reportType: 0 },
        sortColumn: 'created_time',
        sortMethod: 'desc',
        list: []
      },
      report: {}
    }
  },
  computed: {
    ...mapGetters([
      'roles'
    ])
  },
  created() {
    this.getByPage()
  },
  methods: {
    // 分页获取数据
    getByPage() {
      MarkingApi.getNotMarkingReport(this.page).then(res => {
        this.page = res.data
      })
    },
    getMarkingByPage() {
      MarkingApi.getMarkingReport(this.page).then(res => {
        this.page = res.data
      })
    },
    // 换报告类型
    handleFormLayoutChange(e) {
      this.page.params.reportType = e.target.value
      if (this.markingState) {
        this.getMarkingByPage()
      } else {
        this.getByPage()
      }
    },
    // 换页
    pageChange(pageNumber) {
      this.page.currentPage = pageNumber
      if (this.markingState) {
        this.getMarkingByPage()
      } else {
        this.getByPage()
      }
    },
    notMarkingInfo() {
      this.markingState = false
      this.getByPage()
    },
    markingInfo() {
      this.markingState = true
      this.getMarkingByPage()
    },
    goback() {
      this.$router.go(-1)
    }
  }
}
</script>

<style scoped>

</style>
