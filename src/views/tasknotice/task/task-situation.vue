<template>
  <a-spin :spinning="loading">
    <a-table :columns="columns" :data-source="taskData" row-key="taskId" :pagination="false">
      <span slot="isEnabled" slot-scope="isEnabled">
        <a-tag
          :color="isEnabled === true ? 'green' : 'orange'"
        >
          {{ isEnabled === true ? '启用' : '保存' }}
        </a-tag>
      </span>
      <span slot="action" slot-scope="text, record">
        <a-button type="link" @click="handleDetails(record.taskId)" :disabled="!record.isEnabled">详情</a-button>
        <a-divider type="vertical" />
        <a-button type="link" @click="handleEdit(record)" :disabled="record.isEnabled">编辑</a-button>
        <a-divider type="vertical" />
        <a-button type="link" @click="savePushed(record.taskId,record.isEnabled)" :disabled="record.isEnabled">发布</a-button>
        <a-divider type="vertical" />
        <a-button type="link" @click="handleDelete(record.taskId)">删除</a-button>
      </span>
    </a-table>
    <a-pagination
      align="center"
      size="large"
      :total="page.totalCount"
      :current="page.currentPage"
      :show-total="total => `共 ${total} 条`"
      style="margin-top: 20px;"
      @change="onChange"
    />
    <el-dialog title="添加" :visible.sync="addDialog">
      <task-add v-if="addDialog" :data="task" @closeAddDialog="closeAddDialog" @getByPage="getByPage" />
    </el-dialog>
  </a-spin>
</template>

<script>
import taskApi from '@/api/tasknotice/task'
import TaskAdd from './task-add'
export default {
  name: 'TaskSituation',
  components: {
    TaskAdd
  },
  data() {
    return {
      columns: [
        {
          title: '任务Id',
          dataIndex: 'taskId',
          key: 'taskId'
        },
        {
          title: '标题',
          dataIndex: 'taskTitle',
          key: 'taskTitle'
        },
        {
          title: '发布时间',
          dataIndex: 'pushedTime',
          key: 'pushedTime'
        },
        {
          title: '状态',
          dataIndex: 'isEnabled',
          key: 'isEnabled',
          scopedSlots: { customRender: 'isEnabled' }
        },
        {
          title: '完成人数',
          key: 'numDid',
          dataIndex: 'numDid'
        },
        {
          title: '操作',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ],
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {
          type: 0, // 查询类型  0全部  1 已完成 2未完成
          role: 'teacher',
          userId: this.$store.getters.userId
        }, // 查询参数对象
        sortColumn: 'created_time', // 排序列
        sortMethod: 'desc' // 排序方式
      },
      loading: false,
      taskData: [],
      task: {},
      addDialog: false
    }
  },
  mounted() {
    this.getByPage()
  },
  methods: {
    getByPage() {
      this.loading = true
      taskApi.getByPage(this.page).then(res => {
        this.page.totalCount = res.data.totalCount
        this.taskData = res.data.list
        this.$emit('getTaskNum')
        this.loading = false
      })
    },
    onChange(current) {
      this.page.currentPage = current
      this.getByPage()
    },
    handleDetails(id) {
      console.log(id)
      this.$router.push({ path: 'details', query: { id }})
    },
    savePushed(id, isEnabled) {
      if (isEnabled === true) {
        this.$message.info('已是发布状态')
        return
      }
      const time = new Date()
      taskApi.saveenable(id, time).then(res => {
        this.$message.success(res.msg)
        this.getByPage()
      })
    },
    handleEdit(row) {
      this.task = Object.assign({}, row)
      this.addDialog = true
    },
    handleDelete(val) {
      this.$confirm('删除将会导致任务回复内容丢失,是否确定删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'error'
      }).then(() => {
        taskApi.delete(val).then(res => {
          this.$message.success(res.msg)
          this.getByPage()
        })
      })
    },
    openAddDialog() {
      // 打开添加弹窗
      this.task = {}
      this.addDialog = true
    },
    closeAddDialog() {
      // 关闭添加弹窗
      this.addDialog = false
    }
  }
}
</script>

<style scoped>

</style>
