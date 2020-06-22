<template>
  <div>
    <a-layout id="content" :style="{margin:'10px 35px 35px 35px',display:'flex'}">
      <!--      头部-->
      <a-layout-content :style="{height:'48px',background: '#F0F2F5', width: '100%' }">
        <p v-if="roles === 3" :style="{float:'left',fontSize:'20px',marginRight:'10px'}">教师批阅报告</p>
        <p v-if="roles === 1" :style="{float:'left',fontSize:'20px',marginRight:'10px'}">组长批阅报告</p>
        <p v-if="roles === 2" :style="{float:'left',fontSize:'20px',marginRight:'10px'}">班长批阅报告</p>
        <div :style="{marginTop:'5px'}">
          <a-tag v-if="day < stape" color="blue">
            今日日报提交中
          </a-tag>
          <a-tag v-else color="red">
            今日日报提交截止
          </a-tag>
          <a-tag v-show="weekly()" color="red">
            本周周报提交截止
          </a-tag>
          <a-tag v-show="!weekly()" color="blue">
            本周周报提交中
          </a-tag>
          <a-tooltip placement="bottom">
            <template slot="title">
              <span>刷新</span>
            </template>
            <a-icon type="reload" fill="blue" :style="{color:'#1890FF'}" @click="refresh" />
          </a-tooltip>
          <a-button v-if="roles !== 3" :style="{ float: 'right',fontSize:'15px',marginBottom:'15px'}" type="link" @click="goback">
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
          <a v-if="roles === 2" style="margin: 10px 10px 10px 10px;color: #8c939d">组长未批阅提交报告暂不显示</a>
          <a v-if="roles === 3" style="margin: 10px 10px 10px 10px;color: #8c939d">组长/班长未批阅提交报告暂不显示</a>
        </p>
      </a-layout-content>
      <!--      中间报告内容-->
      <a-layout-content :style="{ background: '#fff', marginTop: '5px' }">
        <a-spin tip="Loading..." :spinning="spinning">
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
            <router-link v-if="roles === 3" :to="'/reportSetting'">
              <a-button :style="{marginLeft:'5px'}"> <a-icon type="setting" />报告设置 </a-button>
            </router-link>
            <div v-if="!markingState" style="margin-bottom: 16px">
              <a-button type="primary" :disabled="!hasSelected" :loading="spinning" @click="start">
                <a-icon type="check-square" />
                批量批阅
              </a-button>
              <span style="margin-left: 8px">
                <template v-if="hasSelected">
                  {{ `选中 ${selectedRowKeys.length} 条数据` }}
                </template>
              </span>
            </div>
            <a-modal
              title="批阅"
              :visible="visible"
              :confirm-loading="confirmLoading"
              ok-text="提交"
              cancel-text="取消"
              @ok="handleOk"
              @cancel="handleCancel"
            >
              <a-rate v-model="marking.groupLeaderScore" :allow-clear="false" :count="10" />
              <a-divider />
              <a-textarea
                v-model="marking.groupLeaderComment"
                placeholder="请输入评语"
                :rows="4"
              />
            </a-modal>
            <!--   :row-selection="!markingState?rowSelection:null" 显示报告表格-->
            <a-table
              :pagination="false"
              :style="{ marginRight:'15px' }"
              :bordered="true"
              :columns="columns"
              :data-source="page.list"
              :row-selection="!markingState?{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }:null"
              :row-key="record => record.reportId"
            >
              <span slot="customTitle"><a-icon type="smile-o" /> 日期 </span>
              <!--      操作报告-->
              <span slot="action" slot-scope="scope">
                <a-button v-if=" !markingState" :style="{background:'#87d068',color:'#fff',marginBottom: '5px'}" @click="showModal(scope.reportId)">
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
        </a-spin>
      </a-layout-content>
    </a-layout>
  </div>
</template>

<script>
import Moment from 'moment'
import ReportApi from '@/api/report/report'
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
      notSelected: false,
      visible: false,
      confirmLoading: false,
      selectedRowKeys: [],
      spinning: false,
      markingState: false,
      current: ['login'],
      columns,
      week: new Date().getDay(),
      day: new Date().getHours(),
      stape: 22,
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
      report: {},
      marking: { groupLeaderScore: 5 },
      markings: []
    }
  },
  computed: {
    hasSelected() {
      return this.selectedRowKeys.length > 0
    },
    ...mapGetters([
      'roles', 'name'
    ])
  },
  created() {
    this.spinning = true
    this.getByPage()
    ReportApi.getTime().then(res => {
      this.stape = res.data
    })
  },
  methods: {
    weekly() {
      return this.day > this.stape && this.week === 0
    },
    // 分页获取数据
    getByPage() {
      MarkingApi.getNotMarkingReport(this.page).then(res => {
        this.page = res.data
        this.spinning = false
      })
    },
    getMarkingByPage() {
      MarkingApi.getMarkingReport(this.page).then(res => {
        this.page = res.data
        this.spinning = false
      })
    },
    // 换报告类型
    handleFormLayoutChange(e) {
      this.spinning = true
      this.page.params.reportType = e.target.value
      if (this.markingState) {
        this.getMarkingByPage()
      } else {
        this.getByPage()
      }
    },
    // 换页
    pageChange(pageNumber) {
      this.spinning = true
      this.page.currentPage = pageNumber
      if (this.markingState) {
        this.getMarkingByPage()
      } else {
        this.getByPage()
      }
      this.spinning = false
    },
    notMarkingInfo() {
      this.spinning = true
      this.markingState = false
      this.getByPage()
    },
    markingInfo() {
      this.spinning = true
      this.markingState = true
      this.getMarkingByPage()
    },
    start() {
      this.visible = true
      this.notSelected = true
      this.showModal(this.selectedRowKeys[0])
    },
    onSelectChange(selectedRowKeys) {
      this.selectedRowKeys = selectedRowKeys
    },
    showModal(id) {
      this.visible = true
      this.marking.groupName = this.name
      this.marking.groupTime = Moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
      this.marking.reportId = id
    },
    handleOk(e) {
      this.confirmLoading = true
      if (this.notSelected) {
        for (let i = 0; i < this.selectedRowKeys.length; i++) {
          this.markings[i] = JSON.parse(JSON.stringify(this.marking))
          this.markings[i].reportId = this.selectedRowKeys[i]
        }
      }
      this.markings[0] = JSON.parse(JSON.stringify(this.marking))
      console.log(this.markings)
      MarkingApi.setGroupMarkings(this.markings).then(res => {
        this.visible = false
        this.notSelected = false
        this.visible = false
        this.confirmLoading = false
        this.marking.groupLeaderScore = 5
        this.marking.groupLeaderComment = ''
        this.spinning = false
        this.selectedRowKeys = []
        this.markings = []
        this.$message.success(res.msg)
        this.getByPage()
      })
    },
    handleCancel(e) {
      this.visible = false
    },
    goback() {
      this.$router.go(-1)
    },
    refresh() {
      this.$router.go(0)
    }
  }
}
</script>

<style scoped>

</style>
