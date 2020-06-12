<template>
  <!-- 加载 -->
  <div v-loading="loading">
    <!-- 搜索栏 -->
    <!--
      1. inline 行内表单模式 默认:false
      2. :model -- v-bind:model="page" 动态绑定数据 此处主要用于绑定参数列表
    -->
    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini">
      <el-form-item label="点赞类型">
        <el-select v-model="page.params.goodType" placeholder="文章/评论/提问/答复/视频" width="80" clearable filterable>
          <el-option label="文章" :value="0" />
          <el-option label="评论" :value="1" />
          <el-option label="提问" :value="2" />
          <el-option label="答复" :value="3" />
          <el-option label="视频" :value="4" />
        </el-select>
      </el-form-item>
      <!-- 表单按钮 -->
      <el-form-item>
        <el-button type="success" icon="el-icon-search" sizi="mini" @click="getByPage">查询</el-button>
        <el-button type="warning" icon="el-icon-refresh-left" size="mini" @click="refresh">恢复</el-button>
      </el-form-item>
    </el-form>
    <!-- 列表 -->
    <!--
      1. :data 绑定数据 分页对象的的list数据
      2. show-overflow-tooltip 超出部分隐藏
     -->
    <el-table
      :data="page.list"
      border
      style="width: 100%"
      @sort-change="changeSort"
    >
      <el-table-column label="#" width="60" align="center" type="index" />
      <el-table-column prop="commentId" label="评论id" align="center" width="130" />
      <el-table-column prop="articleId" label="文章id" align="center" width="130" />
      <el-table-column prop="questionId" label="提问id" align="center" width="130" />
      <el-table-column prop="answerId" label="答复id" align="center" width="130" />
      <el-table-column prop="videoId" label="视频id" align="center" width="130" />
      <el-table-column prop="goodType" label="点赞类型" width="200" align="center" sortable="custom">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.goodType === 0" type="primary">文章的点赞</el-tag>
          <el-tag v-if="scope.row.goodType === 1" type="success">评论的点赞</el-tag>
          <el-tag v-if="scope.row.goodType === 2" type="info">提问的点赞</el-tag>
          <el-tag v-if="scope.row.goodType === 3" type="warning">答复的点赞</el-tag>
          <el-tag v-if="scope.row.goodType === 4" type="danger">视频的点赞</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="goodTime" label="点赞时间" width="250" align="center" sortable="custom" />
      <el-table-column label="操作" width="120" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="danger" @click="toDelete(scope.row.goodId)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

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
    <el-pagination
      v-if="page.totalCount > page.pageSize"
      align="center"
      class="pagination"
      :current-page="page.currentPage"
      :page-sizes="[5,10,20,50]"
      :page-size="page.pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="page.totalCount"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />

  </div>
</template>

<script>
// 导入api接口定义的方法 接收变量为 xxxApi
import goodApi from '@/api/article/good'
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
          userId: this.$store.getters.userId
        }, // 查询参数对象
        list: [], // 数据
        sortColumn: 'goodTime', // 排序列
        sortMethod: 'asc' // 排序方式
      },
      loading: true // 控制是否显示加载效果
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
      goodApi.getByPage(this.page).then(res => {
        this.page = res.data
        this.loading = false
      })
    },
    // 恢复搜索框
    refresh() {
      this.page.currentPage = 1
      this.page.params.goodType = null
      this.getByPage()
    },
    // 条件排序
    changeSort(e) {
      if (e.order) {
        this.page.sortColumn = e.prop
        this.page.sortMethod = e.order
      } else {
        this.page.sortColumn = ''
        this.page.sortMethod = 'asc'
      }
      this.getByPage()
      this.$message.success('操作成功!')
    },
    // 删除
    toDelete(id) {
      this.$confirm('是否删除?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        goodApi.delete(id).then(res => {
          this.$message.success(res.msg)
          this.getByPage()
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }

}
</script>

