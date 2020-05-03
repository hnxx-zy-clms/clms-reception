<template>
  <div>
    <!--    报告类型按钮组-->
    <a-radio-group class="editable-add-btn" default-value="0" @change="handleFormLayoutChange">
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
      <!--      操作报告-->
      <span slot="action" slot-scope="scope">
        <a-button v-if=" scope.isEnabled ===0" type="primary" style="margin-bottom: 5px" @click="showModal(scope)">
          修改报告
        </a-button>
        <a-button v-else type="primary" style="margin-bottom: 5px" disabled>
          修改报告
        </a-button>
        <a-popconfirm
          title="你确定要删除这条报告数据吗?"
          ok-text="是的"
          cancel-text="不，我再考虑考虑"
          @confirm="confirm(scope.reportId)"
          @cancel="cancel"
        >
          <a-button v-if=" scope.isEnabled === 0" style="margin-bottom: 5px" type="danger">
            删除报告
          </a-button>
        </a-popconfirm>
        <a-button v-if=" scope.isEnabled === 1" style="margin-bottom: 5px" type="danger" disabled>
          删除报告
        </a-button>
        <a-popover v-if="scope.isChecked ===1" title="批阅信息">
          <template slot="content">
            <marking :report="scope.reportId" />
          </template>
          <a-button type="primary">
            批阅信息
          </a-button>
        </a-popover>
        <a-button v-else type="primary" disabled>
          暂未批阅
        </a-button>
      </span>
    </a-table>
    <!--    底部分页栏-->
    <a-pagination
      v-model="page.currentPage"
      :style="{ marginTop:'20px',marginLeft:'40%' }"
      :show-total="total => `共 ${total} 条`"
      size="small"
      :page-size="page.pageSize"
      :total="page.totalCount"
      show-quick-jumper
      @change="pageChange"
    />
    <!--    更新对话框-->
    <a-modal
      v-model="update"
      :destroy-on-close="true"
      style="top: 20px;"
      width="800px"
      title="修改"
      :footer="null"
    >
      <update-report
        :message="report"
        @hide="hideModalReport"
        @getbypage="getByPage"
      />
    </a-modal>
  </div>
</template>
<script>
import Marking from '../marking/index'
import ReportApi from '@/api/report/report.js'
import updateReport from './updateReport'
const columns = [
  {
    dataIndex: 'createdTime',
    key: 'createdTime',
    slots: { title: 'customTitle' },
    width: '10%',
    align: 'center',
    scopedSlots: { customRender: 'createdTime' }
  },
  {
    title: '工作内容',
    dataIndex: 'workContent',
    width: '16%',
    key: 'workContent'
  },
  {
    title: '遇到的困难',
    width: '16%',
    dataIndex: 'difficulty',
    key: 'difficulty'
  },
  {
    title: '解决方法',
    key: 'solution',
    width: '16%',
    dataIndex: 'solution'
  },
  {
    title: '心得体会',
    key: 'experience',
    width: '16%',
    dataIndex: 'experience'
  },
  {
    title: '后续计划',
    key: 'plan',
    width: '16%',
    dataIndex: 'plan'
  },
  {
    title: '操作',
    key: 'action',
    width: '10%',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  components: {
    updateReport,
    Marking
  },
  data() {
    return {
      update: false,
      columns,
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
  created() {
    this.getByPage()
  },
  methods: {
    // 分页获取数据
    getByPage() {
      ReportApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    },
    // 换报告类型
    handleFormLayoutChange(e) {
      this.page.params.reportType = e.target.value
      this.getByPage()
    },
    // 换页
    pageChange(pageNumber) {
      this.page.currentPage = pageNumber
      this.getByPage()
    },
    // 删除操作
    confirm(id) {
      ReportApi.delete(id).then(res => {
        this.getByPage()
        this.$message.success('删除成功！')
      }).catch(e => {
        this.$message.error('Delete on error : ' + e)
      })
    },
    // 取消删除操作
    cancel() {
      this.$message.error('Click on No')
    },
    // 显示更新框
    showModal(report) {
      this.update = true
      this.report = report
    },
    // 关闭更新框
    hideModalReport() {
      this.update = false
    }
  }
}
</script>
<style scoped>
  .editable-add-btn {
    margin-bottom: 8px;
  }
</style>
