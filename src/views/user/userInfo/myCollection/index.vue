<template>
  <!-- 加载 -->
  <div>
    <span class="user-info-index">我的收藏</span>
    <a-divider :style="{ marginTop: '1px' }" />
    <a-empty />
    <!-- 搜索栏 -->
    <!--
      1. inline 行内表单模式 默认:false
      2. :model -- v-bind:model="page" 动态绑定数据 此处主要用于绑定参数列表
    -->
<!--    <el-form :inline="true" :model="page" class="demo-form-inline" size="mini" :style="{marginTop: '10px'}">-->
<!--      <el-form-item label="收藏类型">-->
<!--        <el-select v-model="page.params.collectionType" placeholder="文章/提问/视频" width="80" clearable filterable>-->
<!--          <el-option label="文章" :value="1" />-->
<!--          <el-option label="提问" :value="2" />-->
<!--          <el-option label="视频" :value="3" />-->
<!--        </el-select>-->
<!--      </el-form-item>-->
<!--      &lt;!&ndash; 表单按钮 &ndash;&gt;-->
<!--      <el-form-item>-->
<!--        <el-button type="success" icon="el-icon-search" sizi="mini" @click="getByPage">查询</el-button>-->
<!--        <el-button type="warning" icon="el-icon-refresh-left" size="mini" @click="refresh">恢复</el-button>-->
<!--      </el-form-item>-->
<!--    </el-form>-->
<!--    &lt;!&ndash; 列表 &ndash;&gt;-->
<!--    &lt;!&ndash;-->
<!--      1. :data 绑定数据 分页对象的的list数据-->
<!--      2. show-overflow-tooltip 超出部分隐藏-->
<!--     &ndash;&gt;-->
<!--    <el-table-->
<!--      :data="page.list"-->
<!--      border-->
<!--      style="width: 100%"-->
<!--      @sort-change="changeSort"-->
<!--    >-->
<!--      <el-table-column label="#" width="60" align="center" type="index" />-->
<!--      <el-table-column prop="articleId" label="文章id" align="center" width="130" />-->
<!--      <el-table-column prop="questionId" label="提问id" align="center" width="130" />-->
<!--      <el-table-column prop="videoId" label="视频id" align="center" width="130" />-->
<!--      <el-table-column prop="collectionType" label="收藏类型" width="200" align="center" sortable="custom">-->
<!--        <template slot-scope="scope">-->
<!--          <el-tag v-if="scope.row.collectionType === 1" type="primary">文章的收藏</el-tag>-->
<!--          <el-tag v-if="scope.row.collectionType === 2" type="info">提问的收藏</el-tag>-->
<!--          <el-tag v-if="scope.row.collectionType === 3" type="danger">视频的收藏</el-tag>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--      <el-table-column prop="collectionTime" label="收藏时间" width="250" align="center" sortable="custom" />-->
<!--      <el-table-column label="操作" width="120" align="center">-->
<!--        <template slot-scope="scope">-->
<!--          <el-button size="mini" type="danger" @click="toDelete(scope.row.collectionId)">删除</el-button>-->
<!--        </template>-->
<!--      </el-table-column>-->
<!--    </el-table>-->

<!--    &lt;!&ndash;-->
<!--      分页组件-最完整版-->
<!--      class : 分页组件-->
<!--      current-page : 当前页 此处为动态绑定page对象的currentPage属性-->
<!--      page-sizes : 每页显示个数选择器的选项设置-->
<!--      page-size : 每页大小-->
<!--      layout : 组件布局-->
<!--      total : 总条目数 此处动态绑定page对象的totalCount属性-->
<!--      @size-change="handleSizeChange"  pageSize 改变时会触发  参数:每页条数-->
<!--      @current-change="handleCurrentChange" currentPage 改变时会触发 参数:当前页-->
<!--     &ndash;&gt;-->
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

  </div>
</template>

<script>
// 导入api接口定义的方法 接收变量为 xxxApi
import collectionApi from '@/api/article/collection'
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
        sortColumn: 'collectionTime', // 排序列
        sortMethod: 'asc' // 排序方式
      }
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
      collectionApi.getByPage(this.page).then(res => {
        this.page = res.data
        loading.close()
      })
    },
    // 恢复搜索框
    refresh() {
      this.page.currentPage = 1
      this.page.params.collectionType = null
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
        collectionApi.delete(id).then(res => {
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
<style scoped>
  .user-info-index{
    margin-left: 10px;
    font-size: 18px;
    white-space: nowrap;
  }
</style>
