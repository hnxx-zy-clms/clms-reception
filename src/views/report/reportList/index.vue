<template>
  <div>
    <a-radio-group class="editable-add-btn" default-value="0" @change="handleFormLayoutChange">
      <a-radio-button id="dailyB" value="0">
        日报
      </a-radio-button>
      <a-radio-button value="1">
        周报
      </a-radio-button>
    </a-radio-group>
    <a-table
      :pagination="false"
      :style="{ marginRight:'15px' }"
      :bordered="true"
      :columns="columns"
      :data-source="page.list"
      :row-key="record => record.reportId"
    >
      <span slot="customTitle"><a-icon type="smile-o" /> 日期 </span>
      <span slot="action" slot-scope="scope">
        <a-button v-if=" scope.isEnabled ===0" type="primary" style="margin-bottom: 5px">
          修改
        </a-button>
        <a-button v-else type="primary" style="margin-bottom: 5px" disabled>
          修改
        </a-button>
        <a-button v-if=" scope.isEnabled ===0" type="danger">
          删除
        </a-button>
        <a-button v-else type="danger" disabled>
          删除
        </a-button>
      </span>
    </a-table>
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
  </div>
</template>
<script>
import ReportApi from '@/api/report/report.js'
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
    align: 'center',
    key: 'workContent'
  },
  {
    title: '遇到的困难',
    width: '16%',
    align: 'center',
    dataIndex: 'difficulty',
    key: 'difficulty'
  },
  {
    title: '解决方法',
    key: 'solution',
    width: '16%',
    align: 'center',
    dataIndex: 'solution'
  },
  {
    title: '心得体会',
    key: 'experience',
    width: '16%',
    align: 'center',
    dataIndex: 'experience'
  },
  {
    title: '后续计划',
    key: 'plan',
    width: '16%',
    align: 'center',
    dataIndex: 'plan'
  },
  {
    title: '操作',
    key: 'action',
    align: 'center',
    width: '10%',
    scopedSlots: { customRender: 'action' }
  }
]

export default {
  data() {
    return {
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
      }
    }
  },
  created() {
    this.getByPage()
  },
  methods: {
    getByPage() {
      ReportApi.getByPage(this.page).then(res => {
        this.page = res.data
      })
    },
    handleFormLayoutChange(e) {
      this.page.params.reportType = e.target.value
      this.getByPage()
    },
    pageChange(pageNumber) {
      this.page.currentPage = pageNumber
      this.getByPage()
    }
  }
}
</script>
<style scoped>
  .editable-add-btn {
    margin-bottom: 8px;
  }
</style>
