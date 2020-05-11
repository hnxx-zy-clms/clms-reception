<template>
    <div>
    <a-table :columns="columns" :data-source="page.list">
        <a slot="name" slot-scope="text">{{ text }}</a>
    </a-table>
        <!--    底部分页栏-->
        <a-pagination
                v-model="page.currentPage"
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
import classesApi from '@/api/classes/classes.js'
const columns = [
  {
    title: '班级id',
    dataIndex: 'classesId',
    key: 'classesId',
    scopedSlots: { customRender: 'classesId' }
  },
  {
    title: '班级名称',
    dataIndex: 'classesName',
    key: 'classesName'
  },
  {
    title: '学院名称',
    dataIndex: 'collegeName',
    key: 'collegeName',
    ellipsis: true
  }
]
export default {
  data() {
    return {
      columns,
      page: {
        currentPage: 1, // 当前页
        pageSize: 5, // 每页显示条数
        totalPage: 0, // 总页数
        totalCount: 0, // 总条数
        params: {}, // 查询参数对象
        list: [], // 数据
        sortColumn: 'createdTime', // 排序列
        sortMethod: 'asc' // 排序方式
      }
    }
  },
  created() {
    this.getByPage()
  },
  methods: {
    // 分页获取数据
    getByPage() {
      classesApi.getByPage(this.page.currentPage, this.page.pageSize).then(res => {
        this.page.currentPage = res.data.pageNum
        this.page.pageSize = res.data.pageSize
        this.page.totalPage = res.data.pages
        this.page.totalCount = res.data.total
        this.page.list = res.data.list
      })
    },
    pageChange(pageNumber) {
      this.page.currentPage = pageNumber
      this.getByPage()
    }
  }
}
</script>

<style scoped>

</style>
