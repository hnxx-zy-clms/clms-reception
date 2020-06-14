<template>
  <div v-loading="loading" class="details" style="padding: 40px">
    <el-card class="box-card" shadow="hover">
      <div slot="header" class="clearfix">
        <span style="font-size: 22px">{{ task.taskTitle }}</span>
        <el-button style="float: right; padding: 3px 0" type="text" @click="goback">返回</el-button>
      </div>
      <div class="taskContent" v-html="task.taskContent" />
      <div v-if="task.fileName" class="taskFile">
        <a :href="task.fileUrl+'?filename='+task.fileName"><el-button type="primary">下载附件<i class="el-icon-upload el-icon--right" /></el-button></a>
      </div>
    </el-card>

    <el-divider content-position="left">已完成{{ numDid.numdid }}人,未完成{{ numDid.numnotdid }}人</el-divider>
    <el-table
      ref="singleTable"
      :data="situation"
      style="width: 100%"
    >
      <el-table-column prop="userId" label="用户Id" align="center" />
      <el-table-column prop="name" label="用户姓名" align="center" />
      <el-table-column prop="isDid" label="任务状态" align="center">
        <template scope="scope">
          <span v-if="scope.row.isDid === true " style="color: rgb(41, 189, 139)">已完成</span>
          <span v-else-if="scope.row.isDid === false" style="color:rgb(221, 23, 23)">未完成</span>
        </template>
      </el-table-column>
      <el-table-column prop="didTime" label="完成时间" align="center" />
      <el-table-column prop="level" label="任务评分" align="center">
        <template scope="scope">
          <span v-if="scope.row.level === 1 " style="color: rgb(41, 189, 139)">优秀</span>
          <span v-if="scope.row.level === 2" style="color:rgb(246, 151, 7)">良好</span>
          <span v-if="scope.row.level === 3 " style="color: rgb(255, 104, 0)">及格</span>
          <span v-if="scope.row.level === 4 " style="color: rgb(221, 23, 23)">不及格</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template scope="scope">
          <el-link type="success" :disabled="!scope.row.isDid" @click="read(taskId,scope.row.userId)">查看</el-link>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      style="background-color: white;padding: 12px 5px"
      align="center"
      class="pagination"
      :current-page="page.currentPage"
      :page-sizes="[10,20,50,100]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>
import taskApi from '@/api/tasknotice/task'
export default {
  data() {
    return {
      // 定义page对象
      page: {
        currentPage: 1, // 当前页
        pageSize: 10, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {
          role: 'teacher'
        }, // 查询参数对象
        list: [], // 数据
        sortColumn: 'created_time', // 排序列
        sortMethod: 'desc' // 排序方式
      },
      loading: false, // 控制是否显示加载效果
      selectTask: [], // 被选中的模版列
      addDialog: false, // 控制添加弹窗显示
      taskId: this.$route.query.id,
      task: {}, // 任务内容
      situation: [] // 任务完成情况
    }
  },
  computed: {
    numDid() {
      const num = {
        numdid: 0,
        numnotdid: 0
      }
      for (const i of this.situation) {
        if (i.isDid === true) {
          num.numdid++
        } else {
          num.numnotdid++
        }
      }
      return num
    }
  },
  created() {
    this.loading = true
    this.getTaskSituation()
    this.getTask(this.taskId)
  },
  methods: {
    // 每页大小改变 参数 value 为每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val
      // 重新请求,刷新页面
      this.getTaskSituation()
    },
    stateFormat(row, column) {
      if (row.level === 1) {
        return '优秀'
      }
      if (row.level === 2) {
        return '良好'
      }
      if (row.level === 3) {
        return '及格'
      }
      if (row.level === 4) {
        return '不及格'
      }
    },
    read(taskid, userid) {
      this.$router.push({ path: 'teacherreply', query: { userid, taskid }})
    },
    goback() {
      this.$router.go(-1)
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getTaskSituation()
    },
    getTaskSituation() {
      this.page.list = []
      this.loading = true
      taskApi.getTaskSituation(this.page, this.taskId).then(res => {
        this.page = res.data
        this.situation = res.data.list
        this.loading = false
      })
    },
    getTask(taskId) {
      taskApi.getTask(taskId).then(res => {
        this.task = res.data
      })
    }
  }
}
</script>
<style scoped>
  .el-divider__text {
    background-color: rgb(240, 242, 245);
  }
</style>

<style lang="scss">
  .taskContent{
    table {
      border-top: 1px solid #ccc !important;
      border-left: 1px solid #ccc;
    }
    table td,
    table th {
      border-bottom: 1px solid #ccc;
      border-right: 1px solid #ccc;
      padding: 3px 5px;
    }
    table th {
      border-bottom: 2px solid #ccc;
      text-align: center;
    }

    /* blockquote 样式 */
    blockquote {
      display: block;
      border-left: 8px solid #d0e5f2;
      padding: 5px 10px;
      margin: 10px 0;
      line-height: 1.4;
      font-size: 100%;
      background-color: #f1f1f1;
    }

    /* code 样式 */
    code {
      display: inline-block;
      *display: inline;
      *zoom: 1;
      background-color: #f1f1f1;
      border-radius: 3px;
      padding: 3px 5px;
      margin: 0 3px;
    }
    pre code {
      display: block;
    }

    /* ul ol 样式 */
    ul, ol {
      margin: 10px 0 10px 20px;
    }
  }
</style>
