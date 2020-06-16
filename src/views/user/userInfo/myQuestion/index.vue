<template>
  <!-- 加载 -->
  <div>
    <span class="user-info-index">我的提问</span>
    <a-divider :style="{ marginTop: '1px' }" />
    <div>
      <div v-for="item in page.list" :key="item">
        <h1>{{item.questionDescription}}</h1>
        <p>{{item.questionTime}} - {{item.answerCount}} 答复</p>
        <a-divider :style="{ marginTop: '1px' }" />
      </div>
    </div>
    <!-- 搜索栏 模糊查询-->
<!--    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini" :style="{marginTop: '10px'}">-->
<!--      <el-form-item label="问题描述">-->
<!--        <el-input v-model="page.params.questionDescription" placeholder="请输入关键字" clearable />-->
<!--      </el-form-item>-->
<!--      <el-form-item label="问题状态">-->
<!--        <el-select v-model="page.params.questionMark" placeholder="问题状态" width="80" clearable filterable>-->
<!--          <el-option label="未解决" :value="0" />-->
<!--          <el-option label="已解决" :value="1" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      <el-form-item label="起始日期">-->
<!--        <el-date-picker-->
<!--          v-model="page.params.questionTime"-->
<!--          type="daterange"-->
<!--          align="right"-->
<!--          unlink-panels-->
<!--          range-separator="至"-->
<!--          start-placeholder="开始日期"-->
<!--          end-placeholder="结束日期"-->
<!--          :default-time="['00:00:00', '23:59:59']"-->
<!--          :picker-options="pickerOptions"-->
<!--          format="yyyy 年 MM 月 dd 日"-->
<!--          value-format="yyyy-MM-dd HH:mm:ss"-->
<!--        />-->
<!--      </el-form-item>-->
<!--      <el-form-item>-->
<!--        <el-button type="success" icon="el-icon-search" sizi="mini" @click="getByPage">查询</el-button>-->
<!--        <el-button type="warning" icon="el-icon-refresh-left" size="mini" @click="refresh">恢复</el-button>-->
<!--        <el-button type="primary" icon="el-icon-plus" class="add-button" size="mini" @click="openAddDialog">添加</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
    <!-- 列表 -->
    <!--
      1. :data v-bind:model="page.list" 绑定数据 分页对象的的list数据
      2. show-overflow-tooltip 超出部分隐藏
      3. @selection-change="handleSelectionChange" selection-change	当选择项发生变化时会触发该事件
      4. @sort-change="changeSort" sort-change 事件回中可以获取当前排序的字段名[prop]和排序顺序[order]
     -->
<!--    <el-table-->
<!--      :data="page.list"-->
<!--      border-->
<!--      fit-->
<!--      style="width: 100%"-->
<!--      @sort-change="changeSort"-->
<!--    >-->
<!--      <el-table-column type="index" fixed="left" label="#" width="60" align="center" />-->
<!--      <el-table-column prop="questionDescription" label="问题描述" width="350" align="center" show-overflow-tooltip />-->
<!--      <el-table-column prop="questionAuthor" label="提问人" width="100" align="center" />-->
<!--      <el-table-column prop="questionGood" label="点赞量" width="100" align="center" sortable="custom" />-->
<!--      <el-table-column prop="answerCount" label="答复数" width="100" align="center" sortable="custom" />-->
<!--      <el-table-column prop="questionTime" label="提问时间" width="200" align="center" sortable="custom" />-->
<!--      <el-table-column prop="updateTime" label="修改时间" width="200" align="center" sortable="custom" />-->
<!--      <el-table-column prop="enable" label="状态" width="100" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag v-if="scope.row.questionMark === 0" type="danger">未解决</el-tag>-->
<!--          <el-tag v-else>已解决</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column label="操作" width="360" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button icon="el-icon-edit" size="mini" type="primary" @click="toUpdate(scope.row.questionId)">修改</el-button>-->
<!--          <el-button v-if="scope.row.questionMark === 0" icon="el-icon-s-tools" size="mini" type="success" @click="toIsSolve(scope.row.questionId)">设置已解决</el-button>-->
<!--          <el-button v-if="scope.row.questionMark === 1" icon="el-icon-s-tools" size="mini" type="warning" @click="toNoSlove(scope.row.questionId)">设置未解决</el-button>-->
<!--          <el-button icon="el-icon-delete" size="mini" type="danger" @click="toDelete(scope.row.questionId)">删除</el-button>-->

<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->

    <!--
      分页组件-最完整版
      class : 分页组件
      current-page : 当前页 此处为动态绑定page对象的currentPage属性
      page-sizes : 每页显示个数选择器的选项设置
      page-size : 每页大小
      layout : 组件布局
      total : 总条目数 此处动态绑定page对象的totalCount属性
      @size-change="handleSizeChange"  pageSize 改变时会触发  参数:每页条数
      @current-change="handleCurrentChange" currentPage 改变时会触发 参数:当前页
     -->
<!--    <el-pagination-->
<!--      v-if="page.totalCount > page.pageSize"-->
<!--      align="center"-->
<!--      class="pagination"-->
<!--      :current-page="page.currentPage"-->
<!--      :page-sizes="[5,10,20,50]"-->
<!--      :page-size="page.pageSize"-->
<!--      layout="total, sizes, prev, pager, next, jumper"-->
<!--      :total="page.totalCount"-->
<!--      @size-change="handleSizeChange"-->
<!--      @current-change="handleCurrentChange"-->
<!--    />-->

    <!-- 添加弹窗 -->
<!--    <el-dialog title="添加" :visible.sync="addDialog">-->
<!--      <question-add @closeAddDialog="closeAddDialog" @getByPage="getByPage" />-->
<!--    </el-dialog>-->
    <!--
      修改弹窗
      :question="question" 用于传递参数对象
    -->
<!--    <el-dialog title="修改" :visible.sync="updateDialog">-->
<!--      <question-update :question="question" @closeUpdateDialog="closeUpdateDialog" @getByPage="getByPage" />-->
<!--    </el-dialog>-->

  </div>
</template>

<script>
// 导入api接口定义的方法 接收变量为 xxxApi
import questionApi from '@/api/answer/question'
// 导入组件
import QuestionAdd from './question-add'
import QuestionUpdate from './question-update'
export default {
  //  定义添加的组件 子组件/私有组件
  components: {
    QuestionAdd,
    QuestionUpdate
  },
  data() {
    return {
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      },
      questionTime: {},
      // 定义page对象
      page: {
        currentPage: 1, // 当前页
        pageSize: 13, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {
          questionAuthor: this.$store.getters.userName
        }, // 查询参数对象
        list: [], // 数据
        sortColumn: 'questionTime', // 排序列
        sortMethod: 'desc' // 排序方式
      },
      question: {
        questionId: ''
      },
      addDialog: false, // 控制添加弹窗显示
      updateDialog: false // 控制修改弹窗显示
    }
  },
  // 初始化函数
  created() {
    this.getByPage()
  },
  // 定义方法
  methods: {
    // 每页大小改变 参数 value 为每页大小(pageSize)
    handleSizeChange(val) {
      this.page.pageSize = val
      // 重新请求,刷新页面
      this.getByPage()
    },
    // 当前页跳转 参数 value 当前页(currentPage)
    handleCurrentChange(val) {
      this.page.currentPage = val
      this.getByPage()
    },
    // 分页方法 调用封装的方法 getByPage()
    getByPage() {
      const loading = this.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
      })
      questionApi.getByPage(this.page).then(res => {
        this.page = res.data
        loading.close()
      })
    },
    // 恢复搜索框
    refresh() {
      this.page.currentPage = 1
      this.page.params.questionDescription = null
      this.page.params.questionContent = null
      this.page.params.questionAuthor = null
      this.page.params.questionTime = null
      this.page.params.questionMark = null
      this.getByPage()
    },
    // 条件排序 e 和 val 都行
    changeSort(e) {
      if (e.order) {
        this.page.sortColumn = e.prop
        this.page.sortMethod = e.order
      } else {
        this.page.sortColumn = ''
        this.page.sortMethod = 'asc'
      }
      this.getByPage()
    },
    // 操作部分相关方法
    // 修改
    toUpdate(id) {
      questionApi.get(id).then(res => {
        this.question = res.data
        this.updateDialog = true
      })
    },

    // 设置为 已解决
    toIsSolve(id) {
      this.$confirm('是否修改问题状态:已解决？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionApi.isSolve(id).then(res => {
          this.$message.success(res.msg)
          this.getByPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作取消!'
        })
      })
    },
    // 设置为 未解决
    toNoSlove(id) {
      this.$confirm('是否设置问题状态:未解决？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionApi.noSolve(id).then(res => {
          this.$message.success(res.msg)
          this.getByPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '操作取消!'
        })
      })
    },
    // 删除
    toDelete(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        questionApi.delete(id).then(res => {
          this.$message.success(res.msg)
          this.getByPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },

    // 模块功能组件
    openAddDialog() {
      // 打开添加弹窗
      this.addDialog = true
    },
    closeAddDialog() {
      // 关闭添加弹窗
      this.addDialog = false
    },
    closeUpdateDialog() {
      // 关闭修改弹窗
      this.updateDialog = false
    }
  }
}
</script>
<style scoped>
  .user-info-index{
    margin-left: 10px;
    font-size: 18px;
    white-space: nowrap;
  }
</style>
